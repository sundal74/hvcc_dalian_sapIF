/**
 * MachineChkPlanDetail controller
 */
Ext.define('Prod.controller.machine_chk_plan.MachineChkPlanDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.MachineChkPlan', 
		'Prod.store.MachineChkPlan', 
		'Prod.view.machine_chk_plan.MachineChkPlanDetail'
	],
	
	models : ['Prod.model.MachineChkPlan'],
			
	stores: ['Prod.store.MachineChkPlan'],
	
	views : ['Prod.view.machine_chk_plan.MachineChkPlanDetail'],
	
	refs: [ 
		{ ref : 'MachineChkPlanDetail', selector : 'prod_machine_chk_plan_detail' } 
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_machine_chk_plan_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_machine_chk_plan_form' : {
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
	 ** 					Override 구현 						   **
	 ****************************************************************/
	/**
	 * override
	 */
	afterDetailLoaded : function(record, operation) {
		var mainView = this.getMainView();
		
		if(!record.data.id) {
			mainView.setTitle(T('title.add_pm_plan'));
			var chkForm = mainView.down('form');
			chkForm.down('datetimefield[name=start_time]').hide();
			chkForm.down('datetimefield[name=end_time]').hide();
			chkForm.down('datefield[name=check_date]').hide();
			chkForm.down('entityfield[name=inspector]').hide();
			chkForm.down('numberfield[name=checker_count]').hide();
			chkForm.down('textarea[name=chk_comment]').hide();
			
		} else {
			mainView.setTitle(T('title.add_pm_actual'));
			var chkForm = mainView.down('form');
			chkForm.down('entityfield[name=machine]').setReadOnly(true);
			chkForm.down('codecombo[name=pm_type]').setReadOnly(true);
			chkForm.down('codecombo[name=pm_part]').setReadOnly(true);
			chkForm.down('datefield[name=plan_date]').setReadOnly(true);
			chkForm.down('datefield[name=due_date]').setReadOnly(true);
			chkForm.down('textfield[name=description]').setReadOnly(true);
		}
		
		mainView.setRecord(record);
		mainView.down(' #back').hide();
	},
	
	validateLogic : function(form) {
		var startTime = form.getValues().start_time;
		var endTime = form.getValues().end_time;
		var checkDate = form.getValues().check_date;
		
		if(checkDate > startTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X less than Y', {x : T('label.start_time'), y : T('label.check_date')})});
			return false;
		}
		
		if(startTime && endTime && (startTime > endTime)) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.start_time'), y : T('label.end_time')})});
			return false;
		}
		
		return true;
	},
	
	/**
	 * override
	 */
	afterFormSaved : function(form, newRecord) {
		var mainView = this.getMainView();
		if(mainView) {
			mainView.close();
			if(mainView.getParams()) {
				var openerXtype = mainView.getParams().openerXtype;
				var calendarStatus = mainView.getParams().calendarStatus;
				if(openerXtype) {
					HF.show(openerXtype, {'calendarStatus' : calendarStatus}, {});
				} else {
					HF.show('Prod.view.machine_chk_plan.MachineChkPlan', {}, {});
				}
			} else {
				HF.show('Prod.view.machine_chk_plan.MachineChkPlan', {}, {});
			}
		} else {
			HF.show('Prod.view.machine_chk_plan.MachineChkPlanDetail', {'calendarStatus' : 'machine_chk_calendar-multiweek'}, {});
		}
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.machine_chk_plan.MachineChkPlan', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getMachineChkPlanDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});