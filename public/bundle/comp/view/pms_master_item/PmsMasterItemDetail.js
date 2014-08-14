Ext.define('Comp.view.pms_master_item.PmsMasterItemDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Comp.view.pms_master_item.PmsMasterItemForm'
	],
	
	xtype : 'comp_pms_master_item_detail',
	
	title : T('menu.PmsMasterItem'),
	
	height : 595,
		
	items : [ {
		xtype : 'comp_pms_master_item_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});