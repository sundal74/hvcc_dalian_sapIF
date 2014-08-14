class OperationsDefects < ActiveRecord::Base

  set_table_name :operations_defects
  attr_accessible :operation_id, :defect_code_id
  
  belongs_to :operation
  belongs_to :defect_code

end
