Ext.define('Hcc.view.bts.Bts2Search', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'hcc_bts2_search',
	
	items : [
		{ xtype: 'daterange', fieldLabel: T('label.work_date'), name: 'work_date' },
		{ fieldLabel : T('label.wc'), name : 'workcenter.name-eq', xtype : 'entitysearchcombo', storeClass : 'Prod.store.Workcenter', valueField : 'name' },
		{ fieldLabel : T('label.operation'), name : 'operation.name-eq', xtype : 'entitysearchcombo', storeClass : 'Prod.store.Operation', valueField : 'name', associationField : ['workcenter.name-eq'] },
		{ fieldLabel : T('label.machine'), name : 'machine.name-eq', xtype : 'entitysearchcombo', storeClass : 'Prod.store.Machine', valueField : 'name', associationField:['operation.name-eq'] },
		{
			name : 'main_op_flag-eq',
			fieldLabel : T('label.main_op_flag'),
			xtype : 'checkbox',
			inputValue : true,
			checked : true
		}
	]
	
}); 
