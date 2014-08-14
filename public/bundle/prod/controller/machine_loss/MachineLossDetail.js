/**
 * MachineLossDetail controller
 */
Ext.define('Prod.controller.machine_loss.MachineLossDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.MachineLoss', 
		'Prod.store.MachineLoss', 
		'Prod.view.machine_loss.MachineLossDetail'
	],
	
	models : ['Prod.model.MachineLoss'],
			
	stores: ['Prod.store.MachineLoss'],
	
	views : ['Prod.view.machine_loss.MachineLossDetail'],
	
	refs: [ { ref : 'MachineLossDetail', selector : 'prod_machine_loss_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_machine_loss_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_machine_loss_form' : {
				click_close : this.onClickClose,
				click_save :  this.onFormSave,
				click_delete : this.onFormDelete,
				after_form_saved : this.afterFormSaved,
				after_form_deleted : this.afterFormDeleted,
				validitychange: this.onFormValidityChange
			}
		});
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	// Customized code here ...
	
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/
	/**
	 * override
	 */
	afterDetailLoaded : function(record, operation) {
		var mainView = this.getMainView();
		var chkForm = mainView.down('form');
		
		if(!record.data.id) {
			mainView.setTitle(T('title.line_stop_report'));
			chkForm.down('textfield[name=status]').setVisible(false);
			chkForm.down('textfield[name=maint_start_time]').setVisible(false);
			chkForm.down('textfield[name=maint_end_time]').setVisible(false);
			chkForm.down('textfield[name=maintainer]').setVisible(false);
			chkForm.down('textfield[name=maintainer_count]').setVisible(false);
			chkForm.down('textfield[name=maint_comment]').setVisible(false);
			record.data.work_date = HF.getCurrentShiftDate();
		}else {
			mainView.setTitle(T('title.line_stop_adjust'));
			chkForm.down('textfield[name=event_time]').setReadOnly(true);
			chkForm.down('textfield[name=status]').setReadOnly(true);
		}
		
		mainView.setRecord(record);
		mainView.down(' #back').hide();
	},
	
	validateLogic : function(form) {
		var formValues = form.getValues();
		var lineStopId = formValues.id;
		var eventTime = formValues.event_time;
		var maintStartTime = formValues.maint_start_time;
		var maintEndTime = formValues.maint_end_time;
		
		if(!lineStopId) {
			// 생성시에 빠진 내용 체크 shift, operation, machine, reporter, reason code
			if(!formValues.shift) {
				HF.msg.notice({title : T('text.Invalid data'), msg : (T('text.Empty data exist') + ' : ' + T('label.shift'))});
				return false;
			}
			
			if(!formValues.operation_id) {
				HF.msg.notice({title : T('text.Invalid data'), msg : (T('text.Empty data exist') + ' : ' + T('label.operation'))});
				return false;
			}
			
			if(!formValues.machine_id) {
				HF.msg.notice({title : T('text.Invalid data'), msg : (T('text.Empty data exist') + ' : ' + T('label.machine'))});
				return false;
			}
			
			if(!formValues.reporter_id) {
				HF.msg.notice({title : T('text.Invalid data'), msg : (T('text.Empty data exist') + ' : ' + T('label.reporter'))});
				return false;
			}
			
			if(!formValues.breakdown_code) {
				HF.msg.notice({title : T('text.Invalid data'), msg : (T('text.Empty data exist') + ' : ' + T('label.breakdown_code'))});
				return false;
			}
		} else {
			// 업데이트 시에 빠진 내용 체크, maint start, end time, maintainer
			if(!maintStartTime) {
				HF.msg.notice({title : T('text.Invalid data'), msg : (T('text.Empty data exist') + ' : ' + T('label.maint_start_time'))});
				return false;
			}
			
			if(!maintEndTime) {
				HF.msg.notice({title : T('text.Invalid data'), msg : (T('text.Empty data exist') + ' : ' + T('label.maint_end_time'))});
				return false;
			}
			
			if(!formValues.maintainer_id) {
				HF.msg.notice({title : T('text.Invalid data'), msg : (T('text.Empty data exist') + ' : ' + T('label.maintainer'))});
				return false;
			}
		}
		
		return this.checkTime(lineStopId, eventTime, maintStartTime, maintEndTime);
	},
	
	checkTime : function(id, eventTime, maintStartTime, maintEndTime) {
		var currentTime = new Date();		
		if(maintStartTime > currentTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.maint_start_time'), y : T('label.current_time')})});
			return false;
		}
		
		if(maintEndTime > currentTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.maint_end_time'), y : T('label.current_time')})});
			return false;
		}
		
		if(id && (maintStartTime < eventTime)) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.event_time'), y : T('label.maint_start_time')})});
			return false;
		}
		
		if(maintStartTime > maintEndTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.maint_start_time'), y : T('label.maint_end_time')})});
			return false;
		}
		
		return true;
	},
	
	/**
	 * override
	 */
	afterFormSaved : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.machine_loss.MachineLoss', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.machine_loss.MachineLoss', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getMachineLossDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});