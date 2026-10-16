require 'sketchup.rb'
require 'socket'
require 'json'
require 'thread'
module FreeScanCAD
  def self.scene
    vertices=[]; triangles=[]
    walk=nil
    walk=proc do |entities,transform,depth|
      raise 'Model quá lớn (100k triangles / 32 levels)' if triangles.length>300000 || depth>32
      entities.each do |entity|
        next if entity.hidden?
        if entity.is_a?(Sketchup::Face)
          mesh=entity.mesh(0)
          offset=vertices.length/3
          mesh.points.each {|p| p=p.transform(transform); vertices.concat([p.x.to_f*25.4,p.y.to_f*25.4,p.z.to_f*25.4])}
          mesh.polygons.each do |poly|
            indices=poly.map {|i| offset+i.abs-1}
            (1...indices.length-1).each {|i| triangles.concat([indices[0],indices[i],indices[i+1]])}
          end
        elsif entity.is_a?(Sketchup::Group)
          walk.call(entity.entities,transform*entity.transformation,depth+1)
        elsif entity.is_a?(Sketchup::ComponentInstance)
          walk.call(entity.definition.entities,transform*entity.transformation,depth+1)
        end
      end
    end
    walk.call(Sketchup.active_model.entities,Geom::Transformation.new,0)
    {'vertices'=>vertices,'triangles'=>triangles,'units'=>'mm'}
  end
  def self.handle(data)
    keyfile=File.join(Dir.home,'FreeScanDrawing','cad-suite','sketchup.key')
    raise 'Chạy Ket-noi-CAD.cmd trước.' unless File.file?(keyfile)
    raise 'Invalid local key' unless data['key']==File.read(keyfile).strip
    model=Sketchup.active_model
    case data['action']
    when 'status'
      {'ready'=>true,'engine'=>'sketchup','document'=>model.title}
    when 'scene'
      scene
    when 'run'
      raise 'Ruby code quá lớn' if data['code'].to_s.bytesize>200000
      model.start_operation('FreeScan code',true)
      begin
        eval(data['code'],TOPLEVEL_BINDING,'FreeScan.rb')
        model.commit_operation
      rescue Exception
        model.abort_operation
        raise
      end
      model.active_view.zoom_extents
      {'engine'=>'sketchup','document'=>model.title,'output'=>'Ruby đã chạy. Dùng Đồng bộ 3D để xem geometry.'}
    when 'export'
      path=File.expand_path(data['path'].to_s)
      root=File.expand_path(File.join(Dir.home,'FreeScanDrawing','cad-suite','exports'))+File::SEPARATOR
      raise 'Export path không hợp lệ' unless path.start_with?(root)
      raise 'SketchUp adapter chỉ xuất SKP' unless data['format']=='skp' && File.extname(path).downcase=='.skp'
      raise 'Không lưu được SKP' unless model.save(path)
      {'saved'=>true}
    else
      raise 'Unknown SketchUp operation'
    end
  end
  unless @server
    @queue=Queue.new
    @server=TCPServer.new('127.0.0.1',12346)
    @thread=Thread.new do
      loop do
        client=@server.accept
        Thread.new(client) do |socket|
          begin
            raise 'Request timeout' unless IO.select([socket],nil,nil,5)
            line=socket.gets(250000)
            raise 'Invalid request' unless line && line.end_with?("\n")
            @queue << [socket,JSON.parse(line)]
          rescue Exception => e
            socket.write(JSON.generate({'ok'=>false,'error'=>e.message})+"\n") rescue nil
            socket.close rescue nil
          end
        end
      end
    end
    @timer=UI.start_timer(0.1,true) do
      unless @queue.empty?
        client,data=@queue.pop
        begin
          result=handle(data)
          client.write(JSON.generate({'ok'=>true,'result'=>result})+"\n")
        rescue Exception => e
          client.write(JSON.generate({'ok'=>false,'error'=>e.message})+"\n") rescue nil
        ensure
          client.close rescue nil
        end
      end
    end
    UI.menu('Extensions').add_item('FreeScan CAD: trạng thái') { UI.messagebox('FreeScan Ruby bridge: 127.0.0.1:12346. Chạy Ket-noi-CAD.cmd để ghép nối website. Ruby chạy bằng quyền tài khoản của bạn.') }
  end
end
