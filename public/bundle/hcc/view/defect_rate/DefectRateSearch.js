Ext.define('Hcc.view.defect_rate.DefectRateSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'hcc_defect_rate_search',
	
	items : [
		{ xtype: 'daterange', fieldLabel: T('label.work_date'), name: 'work_date' },
		{ fieldLabel : T('label.defect_code'), name : 'defect_code.name-eq', xtype : 'entitynamecombo', valueField : 'name', storeClass : 'Prod.store.DefectCode' }
	]
	
});