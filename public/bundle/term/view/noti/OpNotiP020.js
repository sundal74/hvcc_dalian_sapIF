Ext.define('Term.view.noti.OpNotiP020', {
	
	extend : 'Base.abstract.Popup',
	
	requires : ['Ext.ux.CheckColumn'],

	xtype : 'term_noti_opnotip020',
	
	title : T('title.notice'),
	
	width : 700,
	
	height : 350,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'confirm']
	} ],
	
	items: [{
		layout : 'column',
		xtype : 'panel',
		defaultType : 'displayfield',
		cls : 'infoFields2Column',
		items : [ {
			fieldLabel : T('label.work_date'),
			itemId : 'work_date'
		}, {
			xtype : 'displayfield',
			fieldLabel : T('label.time'),
			itemId : 'created_at'
		}, {
			fieldLabel : T('label.operation'),
			itemId : 'operation'
		}, {
			xtype : 'displayfield',
			fieldLabel : ''
		} ]
	}, {
		xtype : 'textareafield',
		itemId : 'msg',
		fieldLabel : T('label.message'),
		labelAlign : 'top',
		readOnly : true,
		flex : 1
	}]
});