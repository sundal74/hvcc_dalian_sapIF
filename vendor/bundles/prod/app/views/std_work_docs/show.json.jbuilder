json.(@std_work_doc, :id,:domain_id,:name,:description,:operation_id,:machine_id,:file_group_id,:creator_id,:updater_id,:created_at,:updated_at)

json.operation do
	json.id @std_work_doc.operation_id
	json.name @std_work_doc.operation ? @std_work_doc.operation.name : ''
end

json.machine do
	json.id @std_work_doc.machine_id
	json.name @std_work_doc.machine ? @std_work_doc.machine.name : ''
end

json.attachments(@std_work_doc.file_group.attachments) do |json, attachment|
	json.(attachment, :id,:domain_id,:name,:description, :path, :file_size, :mimetype, :creator_id, :created_at, :updater_id, :updated_at)

  	json.creator do
    	json.id attachment.creator_id
    	json.name attachment.creator ? attachment.creator.name : ''
  	end if attachment.creator
  	json.updater do
    	json.id attachment.updater_id
    	json.name attachment.updater ? attachment.updater.name : ''
  	end if attachment.updater
end if @std_work_doc.file_group
