class OperationsUsers < ActiveRecord::Base

  set_table_name :operations_users
  attr_accessible :operation_id,:user_id,:manager_flag
  
  belongs_to :operation
  belongs_to :user

end
