Ext.define('Prod.view.operations_defects.OperationsDefects', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
	layout : { type : 'hbox', align : 'stretch' },
	
 	requires : [ 
		'Prod.view.operations_defects.OperationsDefectsSearch',
		'Prod.view.operations_defects.OperationsDefectsList',
		'Prod.view.operations_defects.OperationsDefectsSubList'
	],
	
	xtype : 'prod_operations_defects',
	
	title : T('menu.OperationsDefects'),
	
	searchView : 'prod_operations_defects_search',
	
	gridView : 'prod_operations_defects_list',
	
	subView : 'prod_operations_defects_sub_list'

});