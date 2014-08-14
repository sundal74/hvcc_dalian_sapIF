Ext.define('Prod.view.supplier.SupplierDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.supplier.SupplierForm'
	],
	
	xtype : 'prod_supplier_detail',
	
	title : T('title.supplier'),
	
	height : 300,
		
	items : [ {
		xtype : 'prod_supplier_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});