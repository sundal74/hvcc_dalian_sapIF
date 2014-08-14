Ext.define('Term.controller.TermController', {
	extend: 'Ext.app.Controller',
	
	requires: ['Term.mixin.OpsExt'],

	stores: [],
	
	models: [],

	views: [],

	controllers: [],

	init: function() {
		var self = this;
		this.shiftChangeTimer();
		HF.setting.set('option-work_date', WORK_DATE);
		HF.setting.set('option-work_date_disp', Ext.util.Format.date(WORK_DATE, T('format.date')));
		HF.setting.set('option-shift', SHIFT);
		HF.setting.set('option-shift_name', SHIFT_NAME);
		
		Ext.each(this.controllers, function(ctl) {
			self.getController('Term.controller.' + ctl);
		});

		this.control({
		});
		
		HF.mixin('Term.mixin.OpsExt');
		
		HF.custom.optionbar([ {
			xtype : 'entityfield',
			name : 'option-workcenter',
			fieldLabel : T('label.wc'),
			labelWidth : 85,
			width : 160,
			storeClass : 'Prod.store.Workcenter',
			listeners : {
				afterrender : function(field) {
					if(!HF.setting.get('option-workcenter')) {
						HF.msg.tip(T('text.Select x First', {x : T('label.wc')}), field);
					}
				}
			}
		}, {
			xtype : 'entityfield',
			name : 'option-operation',
			fieldLabel : T('label.operation'),
			labelWidth : 80,
			width : 205,
			storeClass : 'Prod.store.Operation',
			pageSize : 9,
			associationField : [{
				name : 'workcenter_id-eq',
				value : function() {
					var wc = HF.setting.get('option-workcenter');
					return wc ? wc.id : '';
				}
			}],
			listeners : {
				afterrender : function(field) {
					if(!HF.setting.get('option-operation')) {
						HF.msg.tip(T('text.Select Operation First'), field);
					}
				}
			}
		}, {
			xtype : 'entityfield',
			name : 'option-machine',
			fieldLabel : T('label.machine'),
			labelWidth : 105,
			width : 215,
			storeClass : 'Prod.store.Machine',
			associationField : [{
				name : 'operation_id-eq',
				value : function() {
					var op = HF.setting.get('option-operation');
					return op ? op.id : '';
				}
			}],
			listeners : {
				afterrender : function(field) {
					if(!HF.setting.get('option-machine')) {
						HF.msg.tip(T('text.Select Machine First'), field);
					}
				}
			}
		}, {
			xtype : 'button',
			text : T('button.search'),
			handler : function() {
				location.reload();
			}
		}, {
			xtype : 'displayfield',
			text : '',
			width : 5
		}, {
			xtype : 'textfield',
			name : 'option-work_date_disp',
			fieldLabel : T('label.work_date'),
			labelWidth : 50,
			width : 180,
			readOnly : true
		},	{
			xtype : 'textfield',
			name : 'option-shift_name',
			fieldLabel : T('label.shift'),
			labelWidth : 55,
			width : 125,
			readOnly : true
		}, {
			xtype : 'displayfield',
			text : '',
			width : 10
		} ]);
		
		this.operationInfo();
		HF.setting.on('option-operation', this.onOperationChange, this);
		HF.setting.on('option-machine', this.onMachineChange, this);
		if(HF.setting.get('option-operation')) {
			this.noticeTimer();
		}
		
		var menuStore = Ext.getStore('Menu');
		menuStore.on('load', function(store) {
			var favstore = Ext.getStore('Favorite');
			if(favstore.getCount() === 0) {
				store.each(function(record) {
					var tobeadded = Ext.clone(record.getData());
		
					delete tobeadded.id;
					favstore.add(tobeadded);
				});
			}
		});
	},
	
	/**
	 * Shift Change Timer 
	 * 좀 더 정확한 계산 로직 필요
	 */
	shiftChangeTimer : function() {
		var shiftChangeTask = new Ext.util.DelayedTask(function() {
			HF.msg.notice({
				msg : T('text.Time to shift change'),
				fn : function(confirmBtn) {
					location.reload();
				}
			});
		});
		
		shiftChangeTask.delay(SHIFT_CHANGE_DELAY);
		//var change_mins = Math.round(SHIFT_CHANGE_DELAY / 1000 / 60);
		//Ext.Msg.notice(WORK_DATE + '-' + SHIFT, 'Welcome To HMES!<br/>Shift remained ' + change_mins + ' min!');
	},
	
	noticeTimer : function() {
		var noticeTask = new Ext.util.DelayedTask(function() {
			Ext.Ajax.request({
			    url: '/domains/' + login.current_domain_id + '/diy_services/GetNotices/query.json',
			    method : 'GET',
			    params : {
					operation_id : HF.setting.get('option-operation') == null ? "" : HF.setting.get('option-operation').id,
					machine_id : HF.setting.get('option-machine') == null ? "" : HF.setting.get('option-machine').id,
					work_date : HF.setting.get('option-work_date')
				},
			    success: function(response, opts) {
					var obj = Ext.decode(response.responseText);
					if(Object.keys(obj).length > 0) {
						HF.popup('Term.view.noti.OpNotiP020', obj, null);
					}
					noticeTask.delay(60000 * 5);
				},
				failure: function(response, opts) {
					// notice 오류시 팝업 안 띄우게 
					noticeTask.delay(60000 * 5);
				}
			});
		});
		
		noticeTask.delay(60000 * 5);
	},
	
	operationInfo : function() {
		if(HF.setting.get('option-operation')) {
			operation_id = HF.setting.get('option-operation').id;
			Ext.Ajax.request({
			    url: '/domains/' + login.current_domain_id + '/operations/' + operation_id + '.json',
			    method : 'GET',
			    success: function(response, opts) {
					var obj = Ext.decode(response.responseText);
					HF.setting.set('option-operation_info', obj);
					// OPS 들어가서 활성화된 메뉴가 없다면 기본으로 생산현황 화면이 실행된다.
					var content = Ext.getCmp('content');
					if(content) {
						if(!content.getLayout().getActiveItem()) {
							HF.show('Term.view.prod.OpProdM010', null, {});
						}
					}
				}
			});
		}
	},
	
	onOperationChange : function() {
		if(HF.setting.get('option-operation')) {
			operation_id = HF.setting.get('option-operation').id;
			Ext.Ajax.request({
			    url: '/domains/' + login.current_domain_id + '/operations/' + operation_id + '.json',
			    method : 'GET',
			    success: function(response, opts) {
					var obj = Ext.decode(response.responseText);
					HF.setting.set('option-operation_info', obj);
				}
			});
		}
	},
	
	onMachineChange : function() {
		/*if(HF.setting.get('option-machine')) {
			machine_id = HF.setting.get('option-machine').id;
			Ext.Ajax.request({
			    url: '/domains/' + login.current_domain_id + '/machines/' + machine_id + '.json',
			    method : 'GET',
			    success: function(response, opts) {
					var obj = Ext.decode(response.responseText);
					HF.setting.set('option-machine_info', obj);
				}
			});
		}*/
	}
});
