Ext.define('Prod.view.workcenter.WorkcenterSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_workcenter_search',
		
	items : [
		{ fieldLabel : T('label.code'), name : 'name-like' },
		{ fieldLabel : T('label.description'), name : 'description-like' }
	]
	
});