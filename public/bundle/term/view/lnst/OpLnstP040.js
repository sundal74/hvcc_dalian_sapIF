/**
 * Modify LineStop Report
 */
Ext.define('Term.view.lnst.OpLnstP040', {
	
	extend : 'Base.abstract.Popup',
	
	requires : ['Ext.ux.CheckColumn', 'Base.view.common.DatetimeCombo'],

	xtype : 'term_lnst_oplnstp040',
	
	title : T('title.line_stop_report_info'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	height : 510,
	
	width : 840,
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ],
	
	items: [ {
		xtype : 'panel',
		layout : 'column',
		cls : 'infoFields1Column',
		defaultType : 'displayfield',
		items: [ {
			fieldLabel : T('label.operation'),
			itemId : 'operation'
		}, {
			fieldLabel : T('label.machine'),
			itemId : 'machine'
		} ]
	}, 	{
		xtype : 'form',
		title : T('title.line_stop_report_info'),
		flex : 1,
		cls : 'marginT10',
		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		items : [{
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			xtype : 'panel',
			items : [{
				name : 'line_stop_flag',
				itemId : 'line_stop_flag',
				fieldLabel : T('label.line_stop_flag'),
				xtype : 'checkboxfield',
				inputValue : true,
				flex : 1
			}, {
				fieldLabel : T('label.reporter'),
				name : 'reporter',
				itemId : 'reporter',
				xtype : 'entityfield',
				pickerConfig : {
					column_1_data_index : 'login',
					column_1_empty_text : T('label.login'),
					column_2_data_index : 'name',
					column_2_empty_text : T('label.name')
				},
				//customSelectionUrl : '/domains/' + login.current_domain_id + '/diy_selections/SelectOperationUsers/query.json?operation_id-eq=' + HF.setting.get('option-operation').id,
				storeClass : 'Base.store.User',
				allowBlank : false,
				flex : 2,
			}]
		}, /*{
			fieldLabel : T('title.loss_code'),
			cls : 'marginT10',
			name : 'loss_code',
			itemId : 'loss_code',
			xtype : 'entityfield',
			storeClass : 'Prod.store.LossCode',
			allowBlank : false
		},*/ {
			fieldLabel : T('label.breakdown_code'),
			cls : 'marginT10',
			name : 'breakdown_code',
			itemId : 'breakdown_code',
			xtype : 'codecombo',
			commonCode : 'BREAKDOWN_CODE',
			displayField : 'description',
			allowBlank : false
		}, {
			xtype : 'displayfield',
			cls : 'marginT10',
			name : 'event_time',
			itemId : 'event_time',
			fieldLabel : T('label.event_time')
		},/*{
			xtype: 'container',
			layout: 'hbox',
			cls : 'marginT10',
			items : [ {
				fieldLabel : T('label.event_time'),
				name : 'event_time_hour',
				itemId : 'event_time_hour',
				xtype : 'combobox',
				store : Ext.create('Term.store.HourStore'),
				queryMode : 'local',
				displayField: 'hour',
				valueField: 'hour',
				flex : 1
			}, {
				name : 'event_time_min',
				itemId : 'event_time_min',
				xtype : 'combobox',
				store : Ext.create('Term.store.MinStore'),
				queryMode : 'local',
				displayField: 'min',
				valueField: 'min',
				flex : 0.6
			} ]
		},*/ {
			xtype : 'textareafield',
			cls : 'marginT10',
			name : 'reporter_comment',
			itemId : 'reporter_comment',
			fieldLabel : T('label.reporter_comment'),
			maxLength : 1300
		} ]
	} ]
});