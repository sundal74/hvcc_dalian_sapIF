Ext.define('Prod.view.operations_defects.OperationsDefectsList', {
	
	extend : 'Base.abstract.entity.ListGridView',
	
	xtype : 'prod_operations_defects_list',
	
	useDetailBtn : false,
	
	store : 'Prod.store.Operation',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.operation'), dataIndex : 'operation_id', hidden : true },
		{ 
			header : T('label.wc'),
			dataIndex : 'workcenter',
			flex: 0.5,
			renderer : function(value) {
				return value ? value.name : '';
			}
		},
		{ header : T('label.op_seq'), dataIndex : 'op_seq', hidden : true },
		{ header : T('label.operation'), dataIndex : 'name', flex: 0.5 },
		{ header : T('label.description'), dataIndex : 'description', flex: 1.2 }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: []
	} ]
});