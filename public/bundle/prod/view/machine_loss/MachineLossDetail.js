Ext.define('Prod.view.machine_loss.MachineLossDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.machine_loss.MachineLossForm'
	],
	
	xtype : 'prod_machine_loss_detail',
	
	title : '',
	
	items : [ {
		xtype : 'prod_machine_loss_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});