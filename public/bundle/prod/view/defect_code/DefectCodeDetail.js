Ext.define('Prod.view.defect_code.DefectCodeDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.defect_code.DefectCodeForm'
	],
	
	xtype : 'prod_defect_code_detail',
	
	title : T('title.defect_code'),
	
	height : 300,
		
	items : [ {
		xtype : 'prod_defect_code_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});