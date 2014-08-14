Ext.define('Prod.view.bom.BomUpdatePopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'prod_bom_update_popup',
	
	title : T('title.update_raw_material'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
		
	items : [ {
		xtype : 'form',
		layout : 'column',
		cls : 'infoFields1Column marginB20',
		defaultType : 'displayfield',
		items : [{
			itemId: 'product',
			fieldLabel : T('label.product'),
			name : 'product',
			flex:1
		}]
	}, {
		xtype : 'form',
		autoScroll : true,
		defaults : { xtype : 'textfield', anchor : '100%' },
		items : [
			{ itemId:'id', name : 'id', fieldLabel : T('label.id'), hidden : true },
			{ itemId:'domain_id', name : 'domain_id', value : login.current_domain_id, hidden : true },
			{ itemId:'child_product', name : 'child_product_name', fieldLabel : T('label.child_product'), readOnly : true },
			{ itemId:'unit', name : 'unit', fieldLabel : T('label.unit') },
			{ itemId:'qty', name : 'qty', fieldLabel : T('label.lot_qty'), xtype : 'numberfield', minValue : 0 },
			{ itemId:'bom_type', fieldLabel : T('label.bom_type'), name : 'bom_type', xtype : 'codefield', commonCode : 'BOM_TYPE', width : 50 }
		]
	} ],
	
	parentNode : null,
	
	setRecord : function(record) {
		this.record = record;
		this.down('#id').setValue(record.data.id);
		this.down('#child_product').setValue(record.data.name);
		this.down('#unit').setValue(record.data.unit);
		this.down('#qty').setValue(record.data.qty);
		this.down('#bom_type').setValue(record.data.bom_type);
	},
	
	getRecord : function() {
		//this.record.data.child_product_name = this.down('#child_product').getValue();
		this.record.data.unit = this.down('#unit').getValue();
		this.record.data.qty = this.down('#qty').getValue();
		if(this.down('#bom_type').getSubmitValue()!='') {
			this.record.data.bom_type = this.down('#bom_type').getSubmitValue();
		}
		return this.record;
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'update', 'close']
	} ]
});