Ext.define('Prod.view.qty_actual.QtyActualSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_qty_actual_search',
		
	items : [
		{ fieldLabel : T('label.work_date'), name : 'work_date-eq', xtype : 'datefield', format : T('format.date'), submitFormat : T('format.submitDate') },
		{ fieldLabel : T('label.shift'), name : 'shift-eq', xtype : 'codecombo', commonCode : 'SHIFT', displayField : 'description' },
		{ fieldLabel : T('label.operation'), name : 'operation.name-eq', xtype : 'entitynamefield', storeClass : 'Prod.store.Operation', associationField : ['workcenter.name-eq'] },
		{ fieldLabel : T('label.machine'), name : 'machine.name-eq', xtype : 'entitynamefield', storeClass : 'Prod.store.Machine', associationField:['operation.name-eq']},
	]
});
