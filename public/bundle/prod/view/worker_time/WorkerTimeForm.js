Ext.define('Prod.view.worker_time.WorkerTimeForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'prod_worker_time_form',
		
	autoScroll : true,
	
	defaults : { xtype : 'textfield', anchor : '100%' },
	
	items : [
		{ name : 'id', fieldLabel : T('label.id'), hidden : true },
		{ name : 'domain_id', value : login.current_domain_id, hidden : true },
		{ name : 'prod_order_id', hidden : true },
		{ xtype : 'datefield', name : 'work_date', readOnly : true, fieldLabel : T('label.work_date'), format : T('format.date'), submitFormat : T('format.submitDate') },
		{ fieldLabel : T('label.shift'), name : 'shift', xtype : 'codecombo', commonCode : 'SHIFT', displayField : 'description', allowBlank : false },
		{ fieldLabel : T('label.operation'), name : 'operation', xtype : 'entityfield', storeClass : 'Prod.store.Operation', allowBlank : false },
		{  
			fieldLabel : T('label.machine'), 
			name : 'machine', 
			xtype : 'entityfield', 
			storeClass : 'Prod.store.Machine',
			allowBlank : false,
			associationField : [ {
				name : 'operation.name-eq',
				value : function(host) {
					var form = host.up('form');
					var opfield = form.down('entityfield[name=operation]');
					return opfield.getValue();
				}
			} ]
		},
		{ fieldLabel : T('label.product'), name : 'product', xtype : 'entityfield', storeClass : 'Prod.store.Product', allowBlank : false },
		{ 
			fieldLabel : T('title.user'), 
			name : 'user', 
			xtype : 'entityfield', 
			storeClass : 'Base.store.User',
			allowBlank : false,
			pickerConfig : {
				column_1_data_index : 'login',
				column_1_empty_text : T('label.login'),
				column_2_data_index : 'name',
				column_2_empty_text : T('label.name')
			},
		},
		{ xtype : 'datetimefield', name : 'start_time', fieldLabel : T('label.start_time'), format : T('format.date'), submitFormat : T('format.submitDatetime'), vtype : 'currentTimeRange', allowBlank : false },
		{ xtype : 'datetimefield', name : 'end_time', fieldLabel : T('label.end_time'), format : T('format.date'), submitFormat : T('format.submitDatetime'), vtype : 'currentTimeRange' },
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save', 'close']
	} ]
});