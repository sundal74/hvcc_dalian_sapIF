Ext.define('Prod.view.inventory.InventoryList', {
	
	extend : 'Base.abstract.entity.ListGrid2View',
	
	xtype : 'prod_inventory_list',
		
	store : 'Prod.store.Inventory',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.domain_id'), dataIndex : 'domain_id', sortable : false,  hidden : true },
		{ header : T('label.operation'), dataIndex : 'store', width : 85, xtype : 'entitycolumn', sortOption : { sortSeq : 10, sortDirection : 'asc' } },
		{ header : T('label.operation_desc'), dataIndex : 'store', width : 200, renderer : function(val) { return val.desc; } },
		//{ header : T('label.machine'), dataIndex : 'machine', width : 85, xtype : 'entitycolumn' },
		//{ header : T('label.machine_desc'), dataIndex : 'machine', width : 160, renderer : function(val) { return val.desc; } },
		{ header : T('label.product'), dataIndex : 'product', width : 120, xtype : 'entitycolumn', sortOption : { sortSeq : 20, sortDirection : 'asc' } },
		{ header : T('label.product_desc'), dataIndex : 'product', width : 230, renderer : function(val) { return val.desc; } },
		{ header : T('label.qty'), dataIndex : 'qty', align : 'right', xtype : 'numbercolumn', format : T('format.number') },
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'export', 'add', 'update', 'delete']
	} ],
});