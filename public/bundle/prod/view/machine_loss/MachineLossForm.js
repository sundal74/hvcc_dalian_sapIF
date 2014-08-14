Ext.define('Prod.view.machine_loss.MachineLossForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_machine_loss_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items: [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ 
			xtype: 'container',
			layout: 'hbox',
			items : [ {
				xtype: 'container',
				flex : 1,
				layout : 'anchor',
				defaults: {
					anchor : '90%'
				},
			    items: [
					{ xtype : 'datefield', name : 'work_date', fieldLabel : T('label.work_date'), format : T('format.date'), submitFormat : T('format.submitDate') },
					{ 
						fieldLabel : T('label.operation'), 
						name : 'operation', 
						xtype : 'entityfield', 
						storeClass : 'Prod.store.Operation'
					},
					{ 
						fieldLabel : T('label.reporter'), 
						name : 'reporter', 
						xtype : 'entityfield', 
						storeClass : 'Base.store.User',
						pickerConfig : {
							column_1_data_index : 'login',
							column_1_empty_text : T('label.login'),
							column_2_data_index : 'name',
							column_2_empty_text : T('label.name')
						}
					},
					{ fieldLabel : T('label.status'), name : 'status', xtype : 'codecombo', commonCode : 'LINESTOP_STATUS', displayField : 'description' },
					{ xtype : 'datetimefield', name : 'maint_start_time', fieldLabel : T('label.maint_start_time'), format : T('format.date'), submitFormat : T('format.submitDatetime'), vtype : 'currentTimeRange' },
					{ name : 'maintainer_count', fieldLabel : T('label.worker_count'), xtype : 'numberfield' },
					{ name : 'line_stop_flag', fieldLabel : T('label.line_stop_flag'), xtype : 'checkboxfield', inputValue : true }
				]
			}, {
				xtype: 'container',
				flex : 1,
				layout : 'anchor',
				defaults: {
					anchor : '90%'
				},
				items: [
					{ name : 'shift', fieldLabel : T('label.shift'), xtype : 'codecombo', commonCode : 'SHIFT', displayField : 'description' },
					{ 
						fieldLabel : T('label.machine'), 
						name : 'machine', 
						xtype : 'entityfield', 
						storeClass : 'Prod.store.Machine',
						associationField : [ {
							name : 'operation.name-eq',
							value : function(host) {
								var form = host.up('form');
								var opfield = form.down('entityfield[name=operation]');
								return opfield.getValue();
							}
						} ]
					},					
					{ xtype : 'datetimefield', name : 'event_time', fieldLabel : T('label.event_time'), format : T('format.date'), submitFormat : T('format.submitDatetime'), vtype : 'currentTimeRange' },
					{ 
						fieldLabel : T('label.maintainer'), 
						name : 'maintainer', 
						xtype : 'entityfield', 
						storeClass : 'Base.store.User',
						pickerConfig : {
							column_1_data_index : 'login',
							column_1_empty_text : T('label.login'),
							column_2_data_index : 'name',
							column_2_empty_text : T('label.name')
						}
					},
					{ xtype : 'datetimefield', name : 'maint_end_time', fieldLabel : T('label.maint_end_time'), format : T('format.date'), submitFormat : T('format.submitDatetime'), vtype : 'currentTimeRange' },
					{ fieldLabel : T('label.breakdown_code'), name : 'breakdown_code', xtype : 'codecombo', commonCode : 'BREAKDOWN_CODE', displayField : 'description' }
				]
			} ]
		}, { 
			name : 'reporter_comment', fieldLabel : T('label.reporter_comment'), xtype : 'textarea', rows : 3
		}, { 
			name : 'maint_comment', fieldLabel : T('label.maint_comment'), xtype : 'textarea', rows : 4 
		}
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});