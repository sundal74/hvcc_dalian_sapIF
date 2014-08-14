/**
 * Deprecated
 */
Ext.define('Term.view.lnst.OpLnstP050', {
	
	extend : 'Base.abstract.Popup',
	
	requires : ['Ext.ux.CheckColumn'],

	xtype : 'term_lnst_oplnstp050',
	
	title : T('title.line_stop_adjust'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	width : 800,
	
	autoScroll: true,
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ],
	
	items: [{
		xtype: 'container',
		items: [{
			layout : 'column',
			xtype : 'panel',
			defaultType : 'displayfield',
			cls : 'infoFields2Column',
			flex : 1,
			items : [{
				fieldLabel : T('label.operation'),
				itemId : 'operation'
			}, {
				fieldLabel : T('label.machine'),
				itemId : 'machine'
			}]
		}]
	}, 	{
		xtype : 'form',
		flex : 1,
		items : [{
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			defaultType : 'displayfield',
			xtype : 'panel',
			title : T('title.line_maintenance_info'),
			flex : 1,
			items : [ {
				fieldLabel : T('label.maintainer'),
				flex : 1,
				name : 'maintainer',
				itemId : 'maintainer',
				xtype : 'entityfield',
				pickerConfig : {
					column_1_data_index : 'login',
					column_1_empty_text : T('label.login'),
					column_2_data_index : 'name',
					column_2_empty_text : T('label.name')
				},
				storeClass : 'Base.store.User',
				allowBlank : false
			}, {
				xtype: 'numberfield',
				name : 'maintainer_count',
				itemId : 'maintainer_count',
				fieldLabel: T('label.worker_count'),
				flex : 1,
				allowBlank : false
			}/*, {
				name : 'machine_loss_id',
				value : !this.getParams() ? '' : this.getParams().id,
				hidden : true
			}*/]
		}, {
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			defaultType : 'textfield',
			xtype : 'panel',
			flex : 1,
			items : [{
				xtype: 'container',
				layout: 'hbox',
				flex : 1,
				items : [{
					fieldLabel : T('label.maint_start_time'),
					itemId : 'maint_start_time_hour',
					name : 'maint_start_time_hour',
					xtype : 'combobox',
					store : Ext.create('Term.store.HourStore'),
					queryMode : 'local',
					displayField: 'hour',
					valueField: 'hour',
					flex : 1
				}, {
					itemId : 'maint_start_time_min',
					name : 'maint_start_time_min',
					xtype : 'combobox',
					store : Ext.create('Term.store.MinStore'),
					queryMode : 'local',
					displayField: 'min',
					valueField: 'min',
					flex : 0.6
				}]
			}, {
				xtype: 'container',
				layout: 'hbox',
				flex : 1,
				items : [{
					fieldLabel : T('label.maint_end_time'),
					itemId : 'maint_end_time_hour',
					name : 'maint_end_time_hour',
					xtype : 'combobox',
					store : Ext.create('Term.store.HourStore'),
					queryMode : 'local',
					displayField: 'hour',
					valueField: 'hour',
					flex : 1
				}, {
					itemId : 'maint_end_time_min',
					name : 'maint_end_time_min',
					xtype : 'combobox',
					store : Ext.create('Term.store.MinStore'),
					queryMode : 'local',
					displayField: 'min',
					valueField: 'min',
					flex : 0.6
				}]
			}, {
				fieldLabel : T('title.loss_code'),
				name : 'loss_code',
				itemId : 'loss_code',
				xtype : 'entityfield',
				storeClass : 'Prod.store.LossCode',
				flex : 1
			}, {
				fieldLabel : T('label.description'),
				name : 'maint_comment',
				itemId : 'maint_comment',
				flex : 1
			}]
		}]
	}, {
		layout : 'column',
		defaultType : 'displayfield',
		xtype : 'panel',
		cls : 'infoFields2Column',
		title : T('title.line_stop_report_info'),
		items : [ {
			xtype: 'displayfield',
			fieldLabel : T('label.line_stop_flag'),
			itemId : 'line_stop_flag',
			flex : 1
		}, {
			xtype: 'displayfield',
			fieldLabel: T('label.reporter'),
			itemId : 'reporter',
			flex : 1
		}, {
			xtype : 'displayfield',
			fieldLabel : T('label.event_time'),
			itemId : 'event_time',
			flex : 1
		}, {
			xtype : 'displayfield',
			fieldLabel : T('label.description'),
			itemId : 'reporter_comment',
			flex : 1
		}]
	}]
});