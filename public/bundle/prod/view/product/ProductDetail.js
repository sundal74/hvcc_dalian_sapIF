Ext.define('Prod.view.product.ProductDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.product.ProductForm'
	],
	
	xtype : 'prod_product_detail',
	
	title : T('label.product'),
	
	height : 595,
		
	items : [ {
		xtype : 'prod_product_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});