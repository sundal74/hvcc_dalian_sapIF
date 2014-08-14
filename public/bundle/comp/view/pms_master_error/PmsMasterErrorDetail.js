Ext.define('Comp.view.pms_master_error.PmsMasterErrorDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Comp.view.pms_master_error.PmsMasterErrorForm'
	],
	
	xtype : 'comp_pms_master_error_detail',
	
	title : T('menu.PmsMasterError'),
	
	height : 350,
	
	width : 650,
		
	items : [ {
		xtype : 'comp_pms_master_error_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});