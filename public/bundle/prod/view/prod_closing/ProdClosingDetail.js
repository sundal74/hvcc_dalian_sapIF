Ext.define('Prod.view.prod_closing.ProdClosingDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.prod_closing.ProdClosingForm'
	],
	
	xtype : 'prod_prod_closing_detail',
	
	title : T('title.prod_closing'),
		
	items : [ {
		xtype : 'prod_prod_closing_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});