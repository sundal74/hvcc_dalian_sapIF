Ext.define('Hcc.view.bar_report.BarOutActualInfSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'hcc_bar_out_actual_inf_search',
	
	items : [
		//{ xtype: 'daterange', fieldLabel: T('label.work_date'), name: 'work_date' },
		{ 
			fieldLabel : T('label.date'), 
			name : 'work_date-eq', 
			xtype : 'datefield', 
			format : T('format.date'), 
			submitFormat : T('format.submitDate') 
		},
		{ fieldLabel : T('label.product'), name : 'product.name-eq', xtype : 'entitysearchcombo', storeClass : 'Prod.store.Product', valueField : 'name', associationField:['product.name-eq'] },
		{
			xtype      : 'fieldcontainer',
			fieldLabel : 'View Type',
			defaultType : 'radiofield',
			defaults : { flex: 1 },
			layout : 'hbox',
			items : [ {
				boxLabel  : 'Barcode',
				name      : 'std_type',
				inputValue: 'bar',
				checked : true
			}, {
				boxLabel  : 'Interface',
				name      : 'std_type',
				inputValue: 'ifc'
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