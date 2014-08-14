Ext.define('Prod.view.operations_workers.WorkerUpdatePopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'prod_workers_popup',
	
	title : 'Transfer Operator',
	
	height : 300,
	
	y : 50,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ],
	
	items: [{
		xtype : 'panel',
		layout : 'column',
		cls : 'infoFields2Column marginB20',
		defaultType : 'displayfield',
		items : [ {
			itemId: 'operation',
			fieldLabel : 'From ' + T('label.operation'),
			name : 'operation'
		}, {
			itemId: 'operation_desc',
			fieldLabel : T('label.operation_desc'),
			name : 'operation_desc'
		} ]
	}, {
		xtype : 'form',
		flex : 0.14,
		cls : 'marginT10',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items : [ {
			fieldLabel : T('title.workcenter'), 
			name : 'workcenter.name-eq', 
			xtype : 'entitysearchcombo', 
			storeClass : 'Prod.store.Workcenter', 
			valueField : 'name',
			flex : 1
		}, {
			fieldLabel : 'To ' + T('label.operation'), 
			name : 'operation.name-eq', 
			xtype : 'entitysearchcombo', 
			storeClass : 'Prod.store.Operation', 
			valueField : 'name', 
			associationField : ['workcenter.name-eq'],
			flex : 1,
			allowBlank : false
		} ]
	} ]	
});