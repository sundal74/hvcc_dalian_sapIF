Ext.define('Prod.view.mon_prod_plan.MonProdPlanList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_mon_prod_plan_list',
	
	useCheckBox : false,
		
	store : 'Prod.store.MonProdPlan',
	
	columns : [
		{ 
			header : T('label.wc'), 
			dataIndex : 'workcenter_id', 
			flex : 0.5, 
			renderer : function(value) { 
				return HF.idToName(value); 
			} 
		},
		{ header : T('label.operation'), dataIndex : 'operation', width : 65 },
		{ header : T('label.operation_desc'), dataIndex : 'operation_desc', flex : 1.6 },
		{ header : T('label.product'), dataIndex : 'product', width : 120 },
		{ header : T('label.product_desc'), dataIndex : 'product_desc', flex : 2 },
		{ 
			header : T('label.plan_per_week'),
			columns : [{
				header : '1', dataIndex : 'w1_plan_qty', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 70
			}, {
				header : '2', dataIndex : 'w2_plan_qty', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 70
			}, {
				header : '3', dataIndex : 'w3_plan_qty', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 70
			}, {
				header : '4', dataIndex : 'w4_plan_qty', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 70
			}, {
				header : '5', dataIndex : 'w5_plan_qty', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 70
			}]
		},
		{ 
			header : T('label.total'),
			dataIndex : '',
			align : 'right',
			width : 80,
			renderer : function(value, meta, record, rowIndex, colIndex, store) {
				var val = record.get('w1_plan_qty') + record.get('w2_plan_qty') + record.get('w3_plan_qty') + record.get('w4_plan_qty') + record.get('w5_plan_qty');
				return Ext.util.Format.number(val, T('format.number'));
			}
		}
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		// items: ['->', 'import', 'export', 'add', 'save', 'delete']
		items: ['->']
	} ]
});