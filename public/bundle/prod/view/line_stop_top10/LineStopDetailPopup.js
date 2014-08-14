Ext.define('Prod.view.line_stop_top10.LineStopDetailPopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'prod_line_stop_detail_popup',
	
	title : T('title.details'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	height : 400,
	
	autoScroll : true,	
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'close']
	} ],

	record : null,
	
	items: [ {
		layout : 'column',
		cls : 'infoFields1Column marginB20',
		defaultType : 'displayfield',
		items : [ {
			itemId: 'machine',
			fieldLabel : T('label.machine'),
			name : 'machine',
			flex:1
		}, {
			itemId: 'mc_desc',
			fieldLabel : T('label.description'),
			name : 'mc_desc',
			flex:1
		} ]
	}, {
		xtype : 'grid',
		
		flex : 1,
		
		id : 'LineStopDetailPopupGrid',
		
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'breakdown_code', type : 'string' },
				{ name : 'breakdown_code_desc', type : 'string' },
				{ name : 'loss_count', type : 'string' },
				{ name : 'loss_term', type : 'string' },
				{ name : 'maint_term', type : 'string' }
			],
			proxy: {
				type : 'ajax',
				url : '/domains/' + login.current_domain_id + '/diy_selections/LineStopDetail/query.json',
				format : 'json',
				reader : {
					type : 'json'
				}
			}
		}),

		columns : [
			{ header : T('label.breakdown_code'), dataIndex : 'breakdown_code', flex : 1 },
			{ header : T('label.x_desc', {x : T('label.breakdown_code')}), dataIndex : 'breakdown_code_desc', flex : 1.5 },
			{ header : T('label.loss_count'), dataIndex : 'loss_count', flex : 0.6, align : 'right', xtype : 'numbercolumn', format : T('format.number') },
			{ header : T('label.loss_term'), dataIndex : 'loss_term', flex : 0.6, align : 'right', xtype : 'numbercolumn', format : T('format.number') },
			{ header : T('label.maint_term'), dataIndex : 'maint_term', flex : 0.6, align : 'right', xtype : 'numbercolumn', format : T('format.number') }
		]
	} ]	
});