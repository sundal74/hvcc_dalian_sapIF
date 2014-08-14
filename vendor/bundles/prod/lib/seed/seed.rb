debug_print "Loading [Prod] bundle data..."

domain = Domain.system_domain
admin = User.find_by_login('admin')
User.current_user = admin

puts "Common Code creating..."
# 1 : 가공, 2 : 조립 
CommonCode.setup domain, :DEPT_TYPE, {:description => 'Department type'} do
  code '1' => 'Processing'
  code '2' => "Ass'y"
end

# 1 : 제조1부, 2 : 제조2부, 3 : 제조3부, 4 : 제조4부
CommonCode.setup domain, :PROD_DEPT, {:description => 'Production department'} do
  code '1' => 'MANUFACTURING 1'
  code '2' => 'MANUFACTURING 2'
  code '3' => 'MANUFACTURING 3'
  code '4' => 'MANUFACTURING 4'
  code '5' => 'MANUFACTURING 5'
  code '6' => 'MANUFACTURING 6'
  code '7' => 'MANUFACTURING 7'
  code '8' => 'MANUFACTURING 8'
  code '9' => 'MANUFACTURING 9'
  code '10' => 'MANUFACTURING 10'
  code '11' => 'MANUFACTURING 11'
  code '12' => 'MANUFACTURING 12'
  code '13' => 'MANUFACTURING 13'
end

CommonCode.setup domain, :SHIFT, {:description => 'Shift'} do
  code '1' => 'Day'
  code '2' => 'Night'
end

CommonCode.setup domain, :PROD_TYPE, {:description => 'Product type'} do
  code 'FERT' => "Finished Good"
  code 'HALB' => 'Processing Good'
  code 'RM' => 'Raw Material'
end

CommonCode.setup domain, :OP_TYPE, {:description => 'Operation type'} do
  code 'LOT' => 'LOT'
  code 'FINAL' => 'FINAL'
  code 'MANUAL' => 'MANUAL'
end

CommonCode.setup domain, :BOM_TYPE, {:description => 'BOM Type'} do
  code '1' => 'Viscount'
  code '9' => 'Outsourcing'
end

CommonCode.setup domain, :RELEASE_STATUS, {:description => 'Release status'} do
  code 'PROPOSAL' => 'Proposal'
  code 'DRAFT' => 'Draft'
  code 'RELEASED' => 'Released'
end

CommonCode.setup domain, :INV_ACTION, {:description => 'Inventory action code'} do
  code 'IN' => 'IN'
  code 'OUT' => 'OUT'
  code 'TRANSFER' => 'TRANSFER'
  code 'RECONCILE' => 'RECONCILE'
end

CommonCode.setup domain, :DAY_OF_WEEK, {:description => 'Day Of Week'} do
  code '1' => 'SUN'
  code '2' => 'MON'
  code '3' => 'TUE'
  code '4' => 'WED'
  code '5' => 'THU'
  code '6' => 'FRI'
  code '7' => 'SAT'
end

CommonCode.setup domain, :COMPLETE_CODE, {:description => 'COMPLETE STATUS'} do
  code 'W' => 'WAITING'
  code 'T' => 'COMPLETED'
end

CommonCode.setup domain, :LINESTOP_STATUS, {:description => 'LINESTOP STATUS'} do
  code '1' => 'WAITING'
  code '2' => 'COMPLETED'
end

CommonCode.setup domain, :PM_PART, {:description => 'PM Part'} do
  code 'D01' => 'Machine'
  code 'D02' => 'Electricity'
  code 'D03' => 'Facilitiy'  
end

CommonCode.setup domain, :PM_TYPE, {:description => 'PM Type'} do
  code '004' => 'Insp.'
  code '005' => 'Maint.'
end

CommonCode.setup domain, :BREAKDOWN_CODE, {:description => 'Breakdown Code'} do
  code '111' => 'Machine'
  code '222' => 'Electricity'
  code '333' => 'Power'
  code '444' => 'Self Solved'
  code '555' => 'Report Fault'
  code '666' => 'Preventive Maintenance'
  code '999' => 'Etc'
end

CommonCode.setup domain, :WARNING_SIGNAL, {:description => 'WARNING SIGNAL'} do
  code 'PM' => '10'
  code 'STOP' => '5'
end

CommonCode.setup domain, :UNIT_TYPE, {:description => 'Product Unit Type'} do
  code 'EA' => 'EA'
  code 'KG' => 'KG'
  code 'M' => 'M'
  code 'MR' => 'MR'
  code 'GR' => 'GR'
  code 'AS' => 'AS'
  code 'LT' => 'LT'
  code 'PA' => 'PA'
  code 'AY' => 'AY'
  code 'ST' => 'ST'
  code 'BX' => 'BX'
  code 'SET' => 'SET'
end
puts "Entity creating..."

Entity.setup domain, Customer, {:bundle =>'prod'} do
  @list_columns = ['name', 'description', 'creator_id', 'created_at', 'updater_id', 'updated_at']
  @search_columns = ['name']
  @sort_columns = ['name']
  @editable_columns = ['description']
end

Entity.setup domain, Supplier, {:bundle =>'prod'} do
  @list_columns = ['name', 'description', 'creator_id', 'created_at', 'updater_id', 'updated_at']
  @search_columns = ['name']
  @sort_columns = ['name']
  @editable_columns = ['description']
end

Entity.setup domain, Workcenter, {:bundle =>'prod'} do
  @list_columns = ['name', 'description', 'prod_dept', 'creator_id', 'created_at', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description', 'prod_dept']
  @sort_columns = ['name']
  @editable_columns = ['description', 'prod_dept']
end

Entity.setup domain, Operation, {:bundle => 'prod'} do 
  @list_columns = ['name', 'description', 'workcenter_id', 'op_seq', 'dept_type', 'op_type', 'inv_flag', 'upload_flag', 'rm_input_flag', 'track_rm_store_id', 'creator_id', 'created_at', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description', 'dept_type', 'workcenter_id']
  @sort_columns = ['name']
  @editable_columns = ['description', 'workcenter_id', 'dept_type', 'inv_flag', 'upload_flag', 'rm_input_flag', 'track_rm_store_id']
  column :dept_type, :code => 'DEPT_TYPE'
  column :op_type, :code => 'OP_TYPE'  
end

Entity.setup domain, Machine, {:bundle => 'prod'} do 
  @list_columns = ['name', 'description', 'operation_id', 'main_op_flag', 'main_mc_flag', 'uph', 'cycletime', 'creator_id', 'created_at', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description', 'operation_id']
  @sort_columns = ['name']
  @editable_columns = []
end

Entity.setup domain, Product, {:bundle => 'prod'} do 
  @list_columns = ['name', 'description', 'prod_type', 'pack_type', 'unit', 'default_qty', 'creator_id', 'created_at', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description', 'prod_type']
  @sort_columns = ['name']
  @editable_columns = ['description']
  column :prod_type, :code => 'PROD_TYPE'
  column :unit, :code => 'UNIT_TYPE'
end

Entity.setup domain, ProdParam, {:bundle => 'prod'} do 
  @list_columns = ['operation_id', 'machine_id', 'product_id', 'target_uph', 'cycletime', 'creator_id', 'created_at', 'updater_id', 'updated_at']
  @search_columns = ['operation_id', 'machine_id', 'product_id']
  @sort_columns = ['operation_id', 'machine_id', 'product_id']
  @editable_columns = ['target_uph', 'cycletime']
end

Entity.setup domain, DefectCode, {:bundle => 'prod'} do 
  @list_columns = ['code_type', 'name', 'description', 'creator_id', 'created_at', 'updater_id', 'updated_at']
  @search_columns = ['code_type', 'name']
  @sort_columns = ['name']
  @editable_columns = ['code_type', 'name', 'description']
end

Entity.setup domain, LossTemplate, {:bundle => 'prod'} do 
  @list_columns = ['week_day', 'start_time', 'end_time', 'loss_term', 'loss_code_id', 'creator_id', 'created_at', 'updater_id', 'updated_at']
  @search_columns = ['week_day', 'loss_code_id']
  @sort_columns = ['week_day']
  @editable_columns = ['week_day', 'loss_code_id', 'start_time', 'end_time', 'loss_term', 'loss_code_id']
end

Entity.setup domain, LossCode, {:bundle => 'prod'} do 
  @list_columns = ['name', 'description', 'creator_id', 'created_at', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description']
  @sort_columns = ['name']
  @editable_columns = ['description']
end

Entity.setup domain, StdWorkDoc, {:bundle => 'prod'} do 
  @list_columns = ['name', 'description', 'operation_id', 'machine_id', 'product_id', 'doc_type', 'creator_id', 'created_at', 'updater_id', 'updated_at']
  @search_columns = ['name', 'operation_id', 'machine_id', 'product_id']
  @sort_columns = ['operation_id', 'machine_id', 'product_id']
  @editable_columns = []
end

Entity.setup domain, Notice, {:bundle => 'prod'} do 
  @list_columns = ['work_date', 'operation_id', 'machine_id', 'msg', 'creator_id', 'created_at', 'updater_id', 'updated_at']
  @search_columns = ['work_date', 'operation_id', 'machine_id']
  @sort_columns = ['work_date']
  @editable_columns = ['msg']
end

Entity.setup domain, ProdPlan, {:bundle => 'prod'} do 
  @list_columns = ['plan_date', 'workcenter_id', 'operation_id', 'product_id', 'shift1_plan_qty', 'shift2_plan_qty']
  @search_columns = ['plan_date', 'workcenter_id', 'operation_id', 'product_id']
  @sort_columns = ['plan_date', 'operation_id']
  @editable_columns = ['shift1_plan_qty', 'shift2_plan_qty']
end

Entity.setup domain, ProdOrder, {:bundle => 'prod'} do 
  @list_columns = ['name', 'order_date', 'shift', 'workcenter_id', 'operation_id', 'machine_id', 'product_id', 'order_seq', 'order_seq', 'order_qty', 'pallet_qty', 'uph']
  @search_columns = ['order_date', 'shift', 'workcenter_id', 'operation_id', 'machine_id', 'product_id']
  @sort_columns = ['order_date', 'shift']
  @editable_columns = ['order_qty']
end

Entity.setup domain, WorkerTime, {:bundle => 'prod'} do 
  @list_columns = ['work_date', 'shift', 'operation_id', 'machine_id', 'product_id', 'user_id', 'start_time', 'end_time', 'work_term', 'loss_term']
  @search_columns = ['work_date', 'shift', 'operation_id', 'machine_id', 'product_id']
  @sort_columns = ['work_date', 'shift', 'operation_id', 'machine_id', 'product_id']
  @editable_columns = ['start_time', 'end_time']
  @reverse_columns = ['work_date']
end

Entity.setup domain, Lot, {:bundle => 'prod'} do 
  @list_columns = ['name', 'prod_order_id', 'shift', 'product_id', 'workcenter_id', 'operation_id', 'machine_id', 'action', 'status', 'actual_qty', 'tran_time']
  @search_columns = ['product_id', 'operation_id', 'machine_id']
  @editable_columns = ['description']
  @sort_columns = ['updated_at']
  @reverse_columns = ['updated_at']
end

Entity.setup domain, RmLot, {:bundle => 'prod'} do 
  @list_columns = ['operation_id', 'lot_no', 'serial_no', 'supplier_code', 'serial_no', 'part_no', 'invoice_no', 'print_date', 'in_qty', 'out_qty', 'inv_qty', 'inv_in_time', 'inv_out_time']
  @search_columns = ['operation_id', 'lot_no', 'serial_no', 'supplier_code', 'serial_no', 'part_no']
  @editable_columns = []
  @sort_columns = ['inv_in_time']
end

Entity.setup domain, QtyActual, {:bundle => 'prod'} do 
  @list_columns = ['work_date', 'shift', 'operation_id', 'machine_id', 'product_id', 'actual_qty', 'defect_qty']
  @search_columns = ['work_date', 'shift', 'operation_id', 'machine_id', 'product_id']
  @editable_columns = ['actual_qty', 'defect_qty']
  @sort_columns = ['work_date', 'shift', 'operation_id', 'machine_id', 'product_id']
  @reverse_columns = ['work_date']
end

Entity.setup domain, Inventory, {:bundle => 'prod'} do 
  @list_columns = ['store_id', 'product_id', 'qty']
  @search_columns = ['store_id', 'product_id']
  @sort_columns = ['store_id', 'product_id']
  @editable_columns = []
end

Entity.setup domain, InventoryHist, {:bundle => 'prod'} do 
  @list_columns = ['store_id', 'product_id', 'product_id', 'qty', 'action_code', 'from_store_id', 'to_store_id']
  @search_columns = ['store_id', 'product_id', 'action_code']
  @sort_columns = ['store_id', 'product_id']
  @editable_columns = []
end

Entity.setup domain, MachineLoss, {:bundle => 'prod'} do 
  @list_columns = ['work_date', 'shift', 'workcenter_id', 'operation_id', 'machine_id', 'status', 'loss_code_id', 'reporter_id', 'event_time', 'maintainer_id', 'maint_start_time', 'maint_end_time']
  @search_columns = ['work_date', 'shift', 'workcenter_id', 'operation_id', 'machine_id', 'status']
  @sort_columns = ['work_date', 'shift']
  @editable_columns = ['work_date', 'shift', 'workcenter_id', 'operation_id', 'machine_id', 'status', 'loss_code_id', 'reporter_id', 'event_time', 'maintainer_id', 'maint_start_time', 'maint_end_time']
end

Entity.setup domain, MachineChkPlan, {:bundle => 'prod'} do 
  @list_columns = ['name', 'machine_id', 'status', 'plan_date', 'due_date', 'check_date', 'start_time', 'end_time', 'work_term']
  @search_columns = ['machine_id', 'plan_date', 'status']
  @sort_columns = ['work_date', 'shift']
  @editable_columns = ['plan_date', 'machine_id']
  @reverse_columns = ['plan_date']
end

Entity.setup domain, Defect, {:bundle => 'prod'} do 
  @list_columns = ['work_date', 'shift', 'dept_type', 'operation_id', 'machine_id', 'product_id', 'child_product_id', 'defect_code', 'defect_qty', 'description']
  @search_columns = ['work_date', 'shift', 'dept_type', 'operation_id', 'machine_id', 'product_id']
  @sort_columns = ['work_date', 'shift', 'dept_type', 'operation_id', 'machine_id', 'product_id']
  @editable_columns = ['defect_code', 'defect_qty', 'description']
  @reverse_columns = ['work_date']
end

Entity.setup domain, LabelModel, {:bundle => 'prod'} do 
  @list_columns = ['name', 'description', 'creator_id', 'created_at', 'updater_id', 'updated_at']
  @search_columns = ['name', 'description']
  @sort_columns = ['name']
  @editable_columns = ['name', 'description']
end

Entity.setup domain, LabelMaster, {:bundle => 'prod'} do 
  @list_columns = ['dept_type','operation_id','product_id','customer_id','part_no','part_name','part_no_seq','car_type','car_name','pallet_qty','cut_qty','ship_loc','area','customer_plant']
  @search_columns = ['dept_type','operation_id','product_id','customer_id','part_no','part_name']
  @sort_columns = ['dept_type','operation_id','product_id']
  @editable_columns = []
end

Entity.setup domain, LabelPlan, {:bundle => 'prod'} do 
  @list_columns = ['name', 'order_date', 'shift', 'prod_dept', 'dept_type', 'operation_id', 'product_id', 'order_qty', 'lot_qty', 'print_qty', 'printed_qty', 'reprinted_flag', 'completed_flag']
  @search_columns = ['order_date', 'shift', 'prod_dept', 'dept_type', 'operation_id', 'product_id']
  @sort_columns = ['order_date', 'shift', 'prod_dept', 'dept_type', 'operation_id', 'product_id']
  @editable_columns = []
  @reverse_columns = ['order_date']
end

Entity.setup domain, SpcItem, {:bundle => 'prod'} do 
  @list_columns = ['code', 'name', 'description', 'operation_id', 'x_usl', 'x_lsl', 'r_usl', 'r_lsl']
  @search_columns = ['code', 'name', 'operation_id']
  @sort_columns = ['name', 'operation_id']
  @editable_columns = []
end

puts "Menu creating..."
Menu.setup domain, :Master, {:rank => 1000} do
  submenu :ProductionSpr, {:rank => 1100, :menu_type => 'SEPARATOR'}
  submenu :Department, {:rank => 1200, :template => 'Prod.view.department.Department'}
  submenu :Customer, {:rank => 1300, :template => 'Prod.view.customer.Customer'}
  submenu :Supplier, {:rank => 1400, :template => 'Prod.view.supplier.Supplier'}
  submenu :Workcenter, {:rank => 1500, :template => 'Prod.view.workcenter.Workcenter'}
  submenu :Operation, {:rank => 1600, :template => 'Prod.view.operation.Operation'}  
  submenu :OperationsWorkers, {:rank => 1700, :template => 'Prod.view.operations_workers.OperationsWorkers'}  
  submenu :Product, {:rank => 1800, :template => 'Prod.view.product.Product'}  
  # submenu :RawMaterial, {:rank => 1900, :template => 'Prod.view.raw_material.RawMaterial'}  
  submenu :Bom, {:rank => 2000, :template => 'Prod.view.bom.Bom'}
  submenu :ProdParam, {:rank => 2100, :template => 'Prod.view.prod_param.ProdParam'}
  submenu :EquipmentSpr, {:rank => 4000, :menu_type => 'SEPARATOR'}
  submenu :Machine, {:rank => 4100, :template => 'Prod.view.machine.Machine'}
  submenu :QualitySpr, {:rank => 5000, :menu_type => 'SEPARATOR'}
  submenu :DefectCode, {:rank => 5100, :template => 'Prod.view.defect_code.DefectCode'}
  submenu :OperationsDefects, {:rank => 5200, :template => 'Prod.view.operations_defects.OperationsDefects'}
  submenu :SpcItem, {:rank => 5300, :template => 'Prod.view.spc_item.SpcItem'}
  submenu :EtcSpr, {:rank => 6000, :menu_type => 'SEPARATOR'}
  submenu :LossCode, {:rank => 6100, :template => 'Prod.view.loss_code.LossCode'}
  submenu :LossTemplate, {:rank => 6200, :template => 'Prod.view.loss_template.LossTemplate'}
  submenu :StdWorkDoc, {:rank => 6300, :template => 'Prod.view.std_work_doc.StdWorkDoc'}
  submenu :Notice, {:rank => 6400, :template => 'Prod.view.notice.Notice'}
end

Menu.setup domain, :Production, {:rank => 2000} do
  submenu :PlanSpr, {:rank => 1000, :menu_type => 'SEPARATOR'}
  submenu :ProdOrder, {:rank => 1100, :template => 'Prod.view.prod_order.ProdOrder'}
  submenu :ProdPlan, {:rank => 1200, :template => 'Prod.view.prod_plan.ProdPlan'}
  submenu :MonProdPlan, {:rank => 1300, :template => 'Prod.view.mon_prod_plan.MonProdPlan'}
  
  submenu :StatusSpr, {:rank => 2000, :menu_type => 'SEPARATOR'}
  submenu :WorkerTime, {:rank => 2300, :template => 'Prod.view.worker_time.WorkerTime'}
  submenu :ProdClosing, {:rank => 2400, :template => 'Prod.view.prod_closing.ProdClosing'}
  submenu :Lot, {:rank => 2500, :template => 'Prod.view.lot.Lot'}
  submenu :QtyActual, {:rank => 2600, :template => 'Prod.view.qty_actual.QtyActual'}
  submenu :Inventory, {:rank => 2700, :template => 'Prod.view.inventory.Inventory'}
  submenu :InventoryHist, {:rank => 2800, :template => 'Prod.view.inventory_hist.InventoryHist'}
  submenu :LabelPlan, {:rank => 2900, :template => 'Prod.view.label_plan.LabelPlan'}
end

Menu.setup domain, :MachineMgmt, {:rank => 3000} do
  submenu :PMSpr, {:rank => 1000, :menu_type => 'SEPARATOR'}
  submenu :MachineChkPlan, {:rank => 1100, :template => 'Prod.view.machine_chk_plan.MachineChkPlan'}
  submenu :MachineChkCalendar, {:rank => 1200, :template => 'Prod.view.machine_chk_plan.MachineChkCalendarDetail'}
  
  submenu :StopSpr, {:rank => 2000, :menu_type => 'SEPARATOR'}
  submenu :MachineLoss, {:rank => 2100, :template => 'Prod.view.machine_loss.MachineLoss'}
  submenu :LineStopTop10, {:rank => 2200, :template => 'Prod.view.line_stop_top10.LineStopTop10'}
  submenu :MachineLossState, {:rank => 2300, :template => 'Prod.view.machine_loss_state.MachineLossState'}
  submenu :MachineLossState2, {:rank => 2400, :template => 'Prod.view.machine_loss_state.MachineLossState2'}
end

Menu.setup domain, :Quality, {:rank => 4000} do
  submenu :ScrapSpr, {:rank => 1000, :menu_type => 'SEPARATOR'}
  submenu :DefectMgt, {:rank => 1100, :template => 'Prod.view.defect_mgt.DefectMgt'}  
  submenu :Defect, {:rank => 1200, :template => 'Prod.view.defect.Defect'}
end

Menu.setup domain, :Barcode, {:rank => 5000} do
  submenu :LabelSpr, {:rank => 1000, :menu_type => 'SEPARATOR'}
  submenu :LabelMaster, {:rank => 1100, :template => 'Prod.view.label_master.LabelMaster'}
  submenu :LabelModel, {:rank => 1100, :template => 'Prod.view.label_model.LabelModel'}
end

debug_print "Completed to load [Prod] bundle data!"