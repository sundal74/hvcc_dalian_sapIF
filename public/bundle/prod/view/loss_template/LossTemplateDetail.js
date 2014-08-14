Ext.define('Prod.view.loss_template.LossTemplateDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.loss_template.LossTemplateForm'
	],
	
	xtype : 'prod_loss_template_detail',
	
	title : T('title.loss_template'),
	
	height : 400,
	
	items : [ {
		xtype : 'prod_loss_template_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});