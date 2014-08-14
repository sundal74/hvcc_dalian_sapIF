Ext.define('Prod.view.notice.NoticeDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.notice.NoticeForm'
	],
	
	xtype : 'prod_notice_detail',
	
	title : T('title.notice'),
		
	items : [ {
		xtype : 'prod_notice_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
	},
	
	getRecord : function() {
		return this.record;
	}
});