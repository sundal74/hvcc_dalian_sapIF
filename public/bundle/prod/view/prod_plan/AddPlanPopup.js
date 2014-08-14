Ext.define('Prod.view.prod_plan.AddPlanPopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'prod_add_plan_popup',
	
	title : T('title.add_plan'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	height : 450,
	
	initComponent : function() {
		this.items = [ this.createFormPart(this) ];
		this.callParent();
	},
	
	createFormPart: function(view) {
		return {
			xtype : 'form',
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			defaults : {
				xtype : 'textfield', anchor : '100%'
			},
			items : [
				{ name : 'id', fieldLabel : T('label.id'), hidden : true },
				{ name : 'domain_id', value : login.current_domain_id, hidden : true },
				{ xtype : 'datefield', name : 'plan_date', fieldLabel : T('label.date'), format : T('format.date'), submitFormat : T('format.submitDate'), allowBlank : false },
				{ name : 'shift', fieldLabel : T('label.shift'), xtype : 'codecombo', commonCode : 'SHIFT', displayField : 'description', allowBlank : false },
				{ fieldLabel : T('label.operation'), name : 'operation', xtype : 'entityfield', storeClass : 'Prod.store.Operation', allowBlank : false },
				{ fieldLabel : T('label.product'), name : 'product', xtype : 'entityfield', storeClass : 'Prod.store.Product', allowBlank : false },
				{ fieldLabel : T('label.option'), name : 'customer', xtype : 'entityfield', storeClass : 'Prod.store.Customer' },
				{ fieldLabel : T('label.shift') + '1 ' + T('label.priority'), name : 'shift1_seq', xtype : 'numberfield', allowBlank : false  },
				{ fieldLabel : T('label.shift') + '1 ' + T('label.qty'), name : 'shift1_plan_qty', xtype : 'numberfield', allowBlank : false },
				{ fieldLabel : T('label.shift') + '2 ' + T('label.priority'), name : 'shift2_seq', xtype : 'numberfield', allowBlank : false },
				{ fieldLabel : T('label.shift') + '2 ' + T('label.qty'), name : 'shift2_plan_qty', xtype : 'numberfield', allowBlank : false }
			]
		}
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ]
});