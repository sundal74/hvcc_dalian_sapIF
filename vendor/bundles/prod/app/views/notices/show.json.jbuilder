json.(@notice, :id,:domain_id,:work_date,:operation_id,:msg,:creator_id,:updater_id,:created_at,:updated_at)
json.operation do
	json.id @notice.operation_id
	json.name @notice.operation ? @notice.operation.name : ''
end		
