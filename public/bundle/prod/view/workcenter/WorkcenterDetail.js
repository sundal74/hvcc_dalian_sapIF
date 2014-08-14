Ext.define('Prod.view.workcenter.WorkcenterDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.workcenter.WorkcenterForm'
	],
	
	xtype : 'prod_workcenter_detail',
	
	title : T('title.workcenter'),
	
	height : 330,
		
	items : [ {
		xtype : 'prod_workcenter_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});