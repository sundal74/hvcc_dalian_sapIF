Ext.define('Prod.view.customer.CustomerDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.customer.CustomerForm'
	],
	
	xtype : 'prod_customer_detail',
	
	title : T('title.customer'),
	
	height : 300,
		
	items : [ {
		xtype : 'prod_customer_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});