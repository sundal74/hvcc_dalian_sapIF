Ext.define('Comp.view.pms_master_item.PmsMasterItem', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Comp.view.pms_master_item.PmsMasterItemSearch',
		'Comp.view.pms_master_item.PmsMasterItemList'
	],
	
	xtype : 'comp_pms_master_item',
	
	title : T('menu.PmsMasterItem'),
	
	searchView : 'comp_pms_master_item_search',
	
	gridView : 'comp_pms_master_item_list'
	
});