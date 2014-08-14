Ext.define('Prod.view.workcenter.Workcenter', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.workcenter.WorkcenterSearch',
		'Prod.view.workcenter.WorkcenterList'
	],
	
	xtype : 'prod_workcenter',
	
	title : T('title.workcenter'),
	
	searchView : 'prod_workcenter_search',
	
	gridView : 'prod_workcenter_list'
	
});