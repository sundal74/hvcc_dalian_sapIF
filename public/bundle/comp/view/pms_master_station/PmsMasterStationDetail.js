Ext.define('Comp.view.pms_master_station.PmsMasterStationDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Comp.view.pms_master_station.PmsMasterStationForm'
	],
	
	xtype : 'comp_pms_master_station_detail',
	
	title : T('menu.PmsMasterStation'),
	
	height : 350,
	
	width : 650,
		
	items : [ {
		xtype : 'comp_pms_master_station_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});