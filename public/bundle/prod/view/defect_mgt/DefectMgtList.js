Ext.define('Prod.view.defect_mgt.DefectMgtList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'prod_defect_mgt_list',
		
	store : 'Prod.store.DefectMgt',
	
	selType : 'cellmodel', 
	
	plugins :  [ Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit : 1
	}) ],
	
	selModel : Ext.create('Ext.selection.CheckboxModel', { pruneRemoved : false, mode: 'SINGLE' }),
		
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('title.product_id'), dataIndex : 'product_id', hidden : true },
		{ xtype : 'codecolumn', header : T('label.shift'), width : 50, dataIndex : 'shift', tpl : '{description}', commonCode : 'SHIFT', align : 'center' },
		{ header : T('label.operation'), dataIndex : 'operation', width : 65 },
		{ header : T('label.operation_desc'), dataIndex : 'operation_desc', width : 150 },
		{ header : T('label.machine'), dataIndex : 'machine', width : 85 },
		{ header : T('label.machine_desc'), dataIndex : 'machine_desc', width : 150 },
		{ header : T('label.product'), dataIndex : 'product' },
		{ header : T('label.product_desc'), dataIndex : 'product_desc', width : 160 },
		{ header : T('label.actual_qty'), dataIndex : 'actual_qty', xtype : 'numbercolumn', format : T('format.number'), width : 70, align : 'right' }, 
		{ header : T('label.scrap_qty'), dataIndex : 'defect_qty', xtype : 'numbercolumn', format : T('format.number'), width : 70, align : 'right' }, 
		{ header : T('label.rework_qty'), dataIndex : 'rework_qty', xtype : 'numbercolumn', format : T('format.number'), width : 70, align : 'right' }, 
		{ header : 'cud flag', dataIndex : '_cud_flag_', hidden : true, sortable : false, width : 0, value : '' }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'export', 'update']
	} ]
});