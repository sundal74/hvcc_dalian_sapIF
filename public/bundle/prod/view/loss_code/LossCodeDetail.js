Ext.define('Prod.view.loss_code.LossCodeDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.loss_code.LossCodeForm'
	],
	
	xtype : 'prod_loss_code_detail',
	
	title : T('title.loss_code'),
	
	height : 300,
		
	items : [ {
		xtype : 'prod_loss_code_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});