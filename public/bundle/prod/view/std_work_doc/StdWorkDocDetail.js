Ext.define('Prod.view.std_work_doc.StdWorkDocDetail', {
	
	extend : 'Base.abstract.Popup',
	
 	requires : [ 
		'Prod.view.std_work_doc.StdWorkDocForm'
	],
	
	xtype : 'prod_std_work_doc_detail',
	
	title : T('title.std_work_doc'),
		
	items : [ {
		xtype : 'prod_std_work_doc_form'
	} ],
	
	setRecord : function(record) {
		this.record = record;
		this.down('form').loadRecord(this.record);
		var upload = this.down('attachment_grid');
		
		if(record && record.data.file_group_id) {
			upload.setFileGroupId(record.data.file_group_id);
		}
		
		if(record && record.data.attachments && record.raw.attachments) {
			upload.getStore().loadData(record.get('attachments'));
		}
	},
	
	getRecord : function() {
		return this.record;
	}
});