Ext.define('Prod.view.qty_actual.QtyActual', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.qty_actual.QtyActualSearch',
		'Prod.view.qty_actual.QtyActualList'
	],
	
	xtype : 'prod_qty_actual',
	
	title : T('title.qty_actual'),
	
	searchView : 'prod_qty_actual_search',
	
	gridView : 'prod_qty_actual_list'
	
});