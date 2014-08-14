/**
 * LineStop Report
 */
Ext.define('Term.view.lnst.OpLnstP020', {
	
	extend : 'Base.abstract.Popup',
	
	requires : ['Ext.ux.CheckColumn', 'Base.view.common.DatetimeCombo'],

	xtype : 'term_lnst_oplnstp020',
	
	title : T('title.line_stop_report'),
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ],
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	height : 490,

	items: [{
		xtype : 'panel', 
		layout : 'column',
		cls : 'infoFields2Column',
		defaultType : 'displayfield',
		items: [ {
			fieldLabel : T('label.date'),
			name : 'date',
			itemId : 'date',
			value : HF.setting.get('option-work_date_disp')
		}, {
			fieldLabel : T('label.shift'),
			name : 'shift',
			itemId : 'shift',
			value : HF.setting.get('option-shift_name')
		}, {
			fieldLabel : T('label.operation'),
			itemId : 'operation',
			value : HF.setting.get('option-operation').name
		},	{
			fieldLabel : T('label.machine'),
			itemId : 'machine',
			value : HF.setting.get('option-machine').name
		} ]
	}, {
		xtype : 'form',
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
			items : [ {
				name : 'line_stop_flag',
				fieldLabel : T('label.line_stop_flag'),
				xtype : 'checkboxfield',
				inputValue : true,
				flex : 1
			}, {
				fieldLabel : T('label.reporter'),
				flex : 2,
				name : 'reporter',
				xtype : 'entityfield',
				pickerConfig : {
					column_1_data_index : 'login',
					column_1_empty_text : T('label.login'),
					column_2_data_index : 'name',
					column_2_empty_text : T('label.name')
				},
				//customSelectionUrl : '/domains/' + login.current_domain_id + '/diy_selections/SelectOperationUsers/query.json?operation_id-eq=' + HF.setting.get('option-operation').id,
				storeClass : 'Base.store.User',
				allowBlank : false
			} ]
		}, {
			fieldLabel : T('label.breakdown_code'),
			cls : 'marginT10',
			name : 'breakdown_code',
			xtype : 'codecombo',
			commonCode : 'BREAKDOWN_CODE',
			displayField : 'description',
			allowBlank : false
		}, {
			xtype : 'datetimecombo',
			cls : 'marginT10',
			name : 'event_time',
			itemId : 'event_time',
			fieldLabel : T('label.event_time')
		}, {
			xtype : 'textareafield',
			cls : 'marginT10',
			name : 'reporter_comment',
			fieldLabel : T('label.description'),
			maxLength : 1300
		} ]
	}]	
});