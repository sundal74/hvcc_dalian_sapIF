Ext.define('Prod.view.defect.DefectDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.defect.DefectForm'
	],
	
	xtype : 'prod_defect_detail',
	
	title : T('title.defect'),
		
	items : [ {
		xtype : 'prod_defect_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});