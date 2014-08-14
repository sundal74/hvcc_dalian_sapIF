Ext.define('Prod.view.operation.OperationDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.operation.OperationForm'
	],
	
	xtype : 'prod_operation_detail',
	
	title : T('label.operation'),
		
	items : [ {
		xtype : 'prod_operation_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});