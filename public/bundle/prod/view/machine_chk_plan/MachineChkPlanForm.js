Ext.define('Prod.view.machine_chk_plan.MachineChkPlanForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_machine_chk_plan_form',
	
	height : 800,
		
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
					{ 
						fieldLabel : T('label.machine'), 
						name : 'machine', 
						xtype : 'entityfield', 
						storeClass : 'Prod.store.Machine',
						allowBlank : false
					},
					{ name : 'pm_type', fieldLabel : T('label.pm_type'), xtype : 'codecombo', commonCode : 'PM_TYPE', displayField : 'description', allowBlank : false },
					{ xtype : 'datefield', name : 'due_date', fieldLabel : T('label.due_date'), format : T('format.date'), allowBlank : false, submitFormat : T('format.submitDate') },
					{ fieldLabel : T('label.status'), name : 'status', hidden : true },
					{ 
						fieldLabel : T('label.inspector'), 
						name : 'inspector', 
						xtype : 'entityfield', 
						storeClass : 'Base.store.User',
						pickerConfig : {
							column_1_data_index : 'login',
							column_1_empty_text : T('label.login'),
							column_2_data_index : 'name',
							column_2_empty_text : T('label.name')
						}
					},
					{ xtype : 'datetimefield', name : 'start_time', fieldLabel : T('label.start_time'), format : T('format.date'), submitFormat : T('format.submitDatetime'), vtype : 'currentTimeRange' },
				]
			}, {
				xtype: 'container',
				flex : 1,
				layout : 'anchor',
				defaults: {
					anchor : '90%'
				},
				items: [
					{ name : 'pm_part', fieldLabel : T('label.pm_part'), xtype : 'codecombo', commonCode : 'PM_PART', displayField : 'description', allowBlank : false },
					{ xtype : 'datefield', name : 'plan_date', fieldLabel : T('label.plan_date'), format : T('format.date'), allowBlank : false, submitFormat : T('format.submitDate') },
					{ xtype : 'datefield', name : 'check_date', fieldLabel : T('label.check_date'), format : T('format.date'), submitFormat : T('format.submitDate') },
					{ name : 'checker_count', fieldLabel : T('label.worker_count'), xtype : 'numberfield' },
					{ xtype : 'datetimefield', name : 'end_time', fieldLabel : T('label.end_time'), format : T('format.date'), submitFormat : T('format.submitDatetime'), vtype : 'currentTimeRange' }
				]
			} ]
		},
		{ name : 'description', fieldLabel : T('label.check_point'), allowBlank : false, xtype : 'textfield', maxLength : 255 },
		{ 
			name : 'chk_comment', 
			xtype : 'textarea',
			fieldLabel : T('label.chk_comment'), 
			maxLength : 2000 
		}
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});