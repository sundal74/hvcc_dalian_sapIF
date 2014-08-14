Ext.define('Comp.view.pms_master_model.PmsMasterModelDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Comp.view.pms_master_model.PmsMasterModelForm'
	],
	
	xtype : 'comp_pms_master_model_detail',
	
	title : T('menu.PmsMasterModel'),
	
	height : 350,
	
	width : 650,
		
	items : [ {
		xtype : 'comp_pms_master_model_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});