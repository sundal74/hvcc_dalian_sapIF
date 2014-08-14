Ext.define('Prod.view.label_model.LabelModelDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.label_model.LabelModelForm'
	],
	
	xtype : 'prod_label_model_detail',
	
	title : T('menu.LabelModel'),
		
	items : [ {
		xtype : 'prod_label_model_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});