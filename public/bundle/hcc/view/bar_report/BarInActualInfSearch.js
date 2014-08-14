Ext.define('Hcc.view.bar_report.BarInActualInfSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'hcc_bar_in_actual_inf_search',
	
	items : [
		{ xtype: 'daterange', fieldLabel: T('label.work_date'), name: 'work_date' },
		{ fieldLabel : T('label.product'), name : 'product.name-eq', xtype : 'entitysearchcombo', storeClass : 'Prod.store.Product', valueField : 'name', associationField:['product.name-eq'] },
		{
			xtype      : 'fieldcontainer',
			fieldLabel : 'View Type',
			defaultType : 'radiofield',
			defaults : { flex: 1 },
			layout : 'hbox',
			items : [ {
				boxLabel  : 'MES',
				name      : 'std_type',
				inputValue: 'mes',
				checked : true
			}, {
				boxLabel  : 'Barcode',
				name      : 'std_type',
				inputValue: 'bar'
			}, {
				boxLabel  : 'Interface',
				name      : 'std_type',
				inputValue: 'ifc'
			}, {
				boxLabel  : 'ERP',
				name      : 'std_type',
				inputValue: 'erp'
			} ]
		},
		{
			name : 'diff-eq',
			fieldLabel : 'Different Only',
			xtype : 'checkbox',
			inputValue : true,
			checked : true
		}
	]
	
});