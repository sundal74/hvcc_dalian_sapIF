Ext.define('Prod.view.label_master.LabelMasterDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.label_master.LabelMasterForm'
	],
	
	xtype : 'prod_label_master_detail',
	
	height : 558,
	
	title : T('title.label_master'),
		
	items : [ {
		xtype : 'prod_label_master_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});