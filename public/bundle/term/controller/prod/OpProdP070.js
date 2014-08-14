Ext.define('Term.controller.prod.OpProdP070', {
	
	extend : 'Term.abstract.TerminalController',
	
	views : ['Term.view.prod.OpProdP070'],
	
	refs: [
		{ ref : 'ModifyOperator', selector : 'term_prod_opprodp070' },
		{ ref : 'MainView', selector : 'term_prod_opprodm010' }
	],
	
	init : function() {
		this.control({
			'term_prod_opprodp070' : {
				paramschange : this.onParamsChange,
				click_save : this.onClickSave,
				click_close : this.onClickClose,
				click_add : this.onGridAdd,
			}
		});
	},
	
	onParamsChange : function(view, params) {
		view.child(' #date').setValue(HF.setting.get('option-work_date_disp'));
		view.child(' #shift').setValue(SHIFT_NAME);
		view.child(' #operation').setValue(params.operation);
		view.child(' #machine').setValue(params.machine);
		
		var gridStore = view.child('grid').getStore();
		var statusMainViewStore = this.getMainView().child('grid').getStore();
		
		// 작업개시 : 현재 진행 중인 작업을 찾고 없으면 가장 최근에 완료된 작업을 찾아 해당 작업에 할당된 작업자 리스트를 찾아서 뿌려준다. 
		if(params.popup_mode == 'status') {
			var prod_order_ids = null;
			var jobCnt = statusMainViewStore.data.items.length;
			
			for( i = 0 ; i < jobCnt ; i++) {
				if(statusMainViewStore.data.items[i].get("status") == 'R') {
					prod_order_ids = statusMainViewStore.data.items[i].get("id");
				}
			}

			if(!prod_order_ids) {
				var maxEndTime = statusMainViewStore.max('actual_end_time');
				for(i = 0 ; i < jobCnt ; i++) {
					var job = statusMainViewStore.data.items[i];
					if(maxEndTime == job.get("actual_end_time")) {
						prod_order_ids = job.get("id");
					}
				}
			}
			view.child(' #end_time').hide();
			gridStore.getProxy().extraParams = {
				prod_order_id : prod_order_ids,
				record_type : 'new'
			};
		// 작업자 변경 : 현재 선택한 작업의 작업자 리스트를 조회하여 뿌려준다.
		} else {
			gridStore.getProxy().extraParams = {
				prod_order_id : view.getParams().id
			};
		}

		// 기존에 등록된 작업자는 변경하지 못하고 추가 혹은 삭제만 가능하다.
		view.child('grid').on('beforeedit', function(editor, e, eOpts) {
			var recordId = e.record.get('id');
			if(recordId == '' || e.colIdx > 1) {
				return true;
			} else {
				return false;
			}
		});

		gridStore.load();
	},
	
	onClickClose : function(view) {
		view.close();
	},
	
	/**
	 * 저장 버튼 클릭시 
	 */
	onClickSave: function(popup, grid) {
		// popupMode : 작업개시일 경우 - status, 작업자 변경 버튼을 눌렀을 경우 : manual
		var viewParams = popup.getParams();
		var popupMode = viewParams.popup_mode;
		var jobStatus = viewParams.status;
		
		var statusMainView = this.getMainView();
		var gridStore = popup.child('grid').getStore();
		
		if(!this.checkValidate(gridStore, popupMode, jobStatus)) {
			return;
		}
		
		var newRecords = gridStore.getNewRecords();
		var modifiedRecords = gridStore.getModifiedRecords();
		var removedRecords = gridStore.getRemovedRecords();

		var status_worker_times = [];
		var new_worker_times = [];
		var modified_worker_times = [];
		var removed_worker_times = [];
		var params = {prod_order_id : popup.getParams().id};
		var work_date = HF.setting.get('option-work_date');
		var shift = HF.setting.get('option-shift');
		
		// 작업 개시일 경우 
		if(popupMode == 'status') {
			for (var j = 0 ; j < gridStore.data.length ; j++) {
				if(gridStore.data.items[j].get('user') && gridStore.data.items[j].get('start_time')) {
					status_worker_times.push({
						'user_id' : gridStore.data.items[j].get('user').id, 
						'start_time' : HF.getSysTime(work_date, shift, Ext.util.Format.date(gridStore.data.items[j].get('start_time'), T('format.time')))
					})
				}
			}
			params.status_worker_times = Ext.JSON.encode(status_worker_times);
		// 작업자 변경 버튼 클릭일 경우 
		} else {
			for (var i = 0 ; i < newRecords.length ; i++) {
				if(newRecords[i].get('user') && newRecords[i].get('start_time')) {
					var newEndTime = null;
					if(newRecords[i].get('end_time') && newRecords[i].get('end_time') != '') {
						newEndTime = HF.getSysTime(work_date, shift, Ext.util.Format.date(newRecords[i].get('end_time'), T('format.time')));
					}
					new_worker_times.push({
						'user_id' : newRecords[i].get('user').id, 
						'start_time' : HF.getSysTime(work_date, shift, Ext.util.Format.date(newRecords[i].get('start_time'), T('format.time'))),
						'end_time' : newEndTime
					});
				}
			}
			
			for (var i = 0 ; i < modifiedRecords.length ; i++) {
				if(modifiedRecords[i].get('user') && modifiedRecords[i].get('start_time') && modifiedRecords[i].get('end_time') && modifiedRecords[i].get('id')) {
					modified_worker_times.push({
						'id' : modifiedRecords[i].get('id'),
						'user_id' : modifiedRecords[i].get('user').id,
						'start_time' : HF.getSysTime(work_date, shift, Ext.util.Format.date(modifiedRecords[i].get('start_time'), T('format.time'))),
						'end_time' : HF.getSysTime(work_date, shift, Ext.util.Format.date(modifiedRecords[i].get('end_time'), T('format.time')))
					});
				}
			}

			for (var j = 0 ; j < removedRecords.length ; j++) {
				removed_worker_times.push({
					'id' : removedRecords[j].get('id')
				})
			}
			params.new_worker_times = Ext.JSON.encode(new_worker_times);
			params.modified_worker_times = Ext.JSON.encode(modified_worker_times);
			params.removed_worker_times = Ext.JSON.encode(removed_worker_times);
		}

		var self = this;
		Ext.Ajax.request({
		   	url: '/domains/' + login.current_domain_id + '/diy_services/UpdateWorkerPlanModifyTime/shoot.json',
			// url: '/domains/' + login.current_domain_id + '/diy_services/UpdateOperatorsTime/shoot.json',
		    method : 'POST',
		    params : params,
		    success: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				if(popupMode == 'status') {
					statusMainView.fireEvent('statusMainView', true, popup.getParams());
				}
				popup.close();
			}
		});
	},
	
	onGridAdd : function(btn) {
		var view = this.getModifyOperator().child('grid');
		var modifyOperatorStore = view.getStore();
		if(this.getModifyOperator().getParams().popup_mode == 'status') {
			if(!this.workStartFlag()) {
				modifyOperatorStore.worker_add_row(new Date());
			}else {
				modifyOperatorStore.worker_add_row(WORK_DATE + ' ' + SHIFT_START);
			}
		}else {
			modifyOperatorStore.worker_add_row(new Date());
		}
	},
	
	workStartFlag : function() {
		var gridStore = this.getMainView().child('grid').getStore();
		valid = true;
		Ext.Array.each(gridStore.data.items, function(record) {
			status = record.get('status');
			if(status != 'W') {
				valid = false;
				return;
			}
		});
		return valid;
	},
	
	/**
	 * validation check
	 */
	checkValidate : function(gridStore, popupMode, jobStatus) {
		// 1. 그리드에 데이터가 없으면 invalid
		if(gridStore.data.length == 0) {
			HF.msg.notice({title : T('text.Nothing selected'), msg : T('text.Select x First', {x : T('label.operator')})});
			return false;
		}
		
		var newRecords = gridStore.getNewRecords();
		var modifiedRecords = gridStore.getModifiedRecords();
		
		if(!this.checkEmpty(newRecords, popupMode, jobStatus) || !this.checkTime(newRecords, popupMode)) {
			return false;
		}
		
		if(!this.checkEmpty(modifiedRecords, popupMode, jobStatus) || !this.checkTime(modifiedRecords, popupMode)) {
			return false;
		}
		
		// 4. 중복 Operator 체크 
		if(!this.checkDuplicatedOperator(gridStore)) {
			return false;
		}
		
		return true;
	},
	
	/**
	 * record에 빈 값이 있는지 체크 
	 * 1) status mode(작업개시) : user, start_time이 없을 경우만 체크 
	 * 2) manual mode(작업자 변경) && jobStatus가 진행(R) 중인 경우 : user, start_time이 없는 경우 체크 
	 * 3) manual mode(작업자 변경) && jobStatus가 완료(T) 된 경우 : user, start_time, end_time이 없는 경우 체크 
	 */
	checkEmpty : function(records, popupMode, jobStatus) {
		var valid = true;
		
		Ext.Array.each(records, function(record) {
			if((popupMode == 'status') || (popupMode == 'manual' && jobStatus == 'R')) {
				valid = (record.data.user && record.data.user.id && record.data.start_time);
			} else {
				valid = (record.data.user && record.data.user.id && record.data.start_time && record.data.end_time);
			}
			
			if(!valid) {
				HF.msg.notice({title : T('text.Invalid data'), msg : T('text.Empty data exist')});
				return;
			}
		});
		
		return valid;
	},
	
	/**
	 * 시간 체크, start_time, end_time이 있을 경우 : 각각 start_time이 end_time보다 크거나 end_time이 현재 시간보다 큰 경우
	 */
	checkTime : function(records, popupMode) {
		var valid = true;
		var currentTime = new Date();
		var work_date = HF.setting.get('option-work_date');
		var shift = HF.setting.get('option-shift');
		var self = this;
		
		Ext.Array.each(records, function(record) {
			var startTime = HF.getSysTime(work_date, shift, Ext.util.Format.date(record.data.start_time, T('format.time')));
			if(!self.checkStartTime(startTime, currentTime) || !self.checkValidShiftTime(startTime)) {
				valid = false;
				return;
			}
			
			//if(popupMode != 'status') {
			if(record.data.end_time && record.data.end_time != '') {
				var endTime = HF.getSysTime(work_date, shift, Ext.util.Format.date(record.data.end_time, T('format.time')));
				if(!self.checkEndTime(endTime, currentTime) || !self.checkValidShiftTime(endTime)) {
					valid = false;
					return;
				}
				
				if(!self.checkStartEndTime(startTime, endTime) || !self.checkValidShiftTime(endTime)) {
					valid = false;
					return;
				}
			} 
		});
		
		return valid;
	},
	
	/**
	 * StartTime이 현재 시간보다 큰 경우 validation error
	 */
	checkStartTime : function(startTime, currentTime) {
		if(startTime > currentTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.start_time'), y : T('label.current_time')})});
			return false;
		} else {
			return true;
		}
	},
	
	/**
	 * EndTime이 현재 시간보다 큰 경우 validation error
	 */
	checkEndTime : function(endTime, currentTime) {
		if(endTime > currentTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.end_time'), y : T('label.current_time')})});
			return false;
		} else {
			return true;
		}
	},
	
	/**
	 * StartTime이 EndTime 보다 큰 경우 validation error
	 */
	checkStartEndTime : function(startTime, endTime) {
		if(startTime > endTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.start_time'), y : T('label.end_time')})});
			return false;
		} else {
			return true;
		}
	},
	
	/**
	 * 시간이 현재 시프트의 시간 내에 있는지 체크
	 */
	checkValidShiftTime : function(time) {
		var shiftStartTime = HF.getCurrentShiftStartTime();
		var shiftEndTime = HF.getCurrentShiftEndTime();
		
		if(time > shiftEndTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.time'), y : T('label.shift_end_time')})});
			return false;
		} 
		
		if(time < shiftStartTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X less than Y', {x : T('label.time'), y : T('label.shift_start_time')})});
			return false;
		}
		
		return true;
	},
	
	checkBetweenTime : function(startTime, endTime, newTime) {
		if(newTime > startTime && newTime < endTime) {
			HF.msg.notice(T('text.Invalid Time'));
			return false;
		}
		
		return true;
	},
	
	/**
	 * Operator가 중복된 사용자가 있는지 체크 
	 */
	checkDuplicatedOperator : function(gridStore) {
		var valid = true;
		var invalidUser = null;
		var work_date = HF.setting.get('option-work_date');
		var shift = HF.setting.get('option-shift');
		var newRecords = gridStore.getNewRecords();
		var removedRecords = gridStore.getRemovedRecords();
		
		if(!newRecords || newRecords.length == 0) {
			return true;
		}
		
		var newUsers = [];
		for(var i = 0 ; i < newRecords.length ; i++) {
			var newUser = newRecords[i].data.user;
			if(newUsers.indexOf(newUser.id) >= 0) {
				valid = false;
				invalidUser = newUser;
				break;
			}
			newUsers.push(newUser.id);
		}
		
		if(!valid) {
			var invalidStr = invalidUser.name + ' (' + invalidUser.id + ')';
			HF.msg.notice(T('text.Duplicated X : Y', {x : T('label.operator'), y : invalidStr}));
			return false;
		}		
		
		var remUsers = [];
		if(removedRecords) {
			for(var i = 0 ; i < removedRecords.length ; i++) {
				remUsers.push(removedRecords[i].data.user.id);
			}
		}
		
		var self = this;
		gridStore.each(function(record) {
			var operator = record.data;			
			if(operator.id && newUsers.indexOf(operator.user.id) >= 0 && remUsers.indexOf(operator.user.id) < 0) {
				if(!operator.end_time) {
					valid = false;
					invalidUser = operator.user;
					return false;					
				} else {
					// newUsers에서 newUser 찾아서 newUser start_time, end_time이 operator start_time, end_time 사이에 있는지 체크 
					var newUser = null;
					for(var i = 0 ; i < newRecords.length ; i++) {
						if(newRecords[i].data.user.id == operator.user.id) {
							newUser = newRecords[i].data;
							break;
						}
					}
										
					if(newUser) {
						var newUserStartTime = HF.getSysTime(work_date, shift, Ext.util.Format.date(newUser.start_time, T('format.time')));					
						var opStartTime = HF.getSysTime(work_date, shift, Ext.util.Format.date(operator.start_time, T('format.time')));
						var opEndTime = HF.getSysTime(work_date, shift, Ext.util.Format.date(operator.end_time, T('format.time')));

						valid = self.checkBetweenTime(opStartTime, opEndTime, newUserStartTime);
						if(valid && newUser.end_time) {
							var newUserEndTime = HF.getSysTime(work_date, shift, Ext.util.Format.date(newUser.end_time, T('format.time')));
							valid = self.checkBetweenTime(opStartTime, opEndTime, newUserEndTime);
						}
						
						if(!valid) {
							invalidUser = newUser.user;
							return false;
						}
					}		
				}
			}
		});
		
		if(!valid) {
			var invalidStr = invalidUser.name + ' (' + invalidUser.id + ')';
			HF.msg.notice(T('text.Duplicated X : Y', {x : T('label.operator'), y : invalidStr}));
			return false;
		}
		
		return true;
	}
});