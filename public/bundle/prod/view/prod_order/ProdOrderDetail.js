Ext.define('Prod.view.prod_order.ProdOrderDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.prod_order.ProdOrderForm'
	],
	
	xtype : 'prod_prod_order_detail',
	
	title : T('title.prod_order'),
	
	height : 440,
		
	items : [ {
		xtype : 'prod_prod_order_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});