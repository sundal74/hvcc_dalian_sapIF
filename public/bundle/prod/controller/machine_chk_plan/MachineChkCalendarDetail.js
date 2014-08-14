/**
 * MachineChkCalendarDetail controller
 */
Ext.define('Prod.controller.machine_chk_plan.MachineChkCalendarDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.MachineChkPlan', 
		'Prod.store.MachineChkPlan', 
		'Prod.view.machine_chk_plan.MachineChkCalendarDetail'
	],
	
	models : ['Prod.model.MachineChkPlan'],
			
	stores: ['Prod.store.MachineChkPlan', 'Base.store.HatioCalendar', 'Prod.store.MachineChkCalendarEvent'],
	
	views : ['Prod.view.machine_chk_plan.MachineChkCalendarDetail'],
	
	refs: [ { 
		ref : 'MachineChkCalendarDetail', 
		selector : 'prod_machine_chk_calendar_detail' 
	} ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_machine_chk_calendar_detail' : {
				paramschange : this.onParamsChange,
				click_add : this.onPopupNew
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
	 * params change
	 */
	onParamsChange : function(view, params) {
		HF.setTitle(T('title.machine_chk_calendar'));
		this.getMainView().buildCalendar();
		if(params){
			var calendarStatus = params.calendarStatus;
			if(calendarStatus && calendarStatus=='machine_chk_calendar-multiweek'){
				this.getMainView().down('#machine_chk_calendar').onMultiWeekNavClick();
			}	
		}
	},
	
	onPopupNew : function(view, params) {
		var calendarStatus = this.getMainView().down('#machine_chk_calendar').getCurrentStatus();
		HF.popup('Prod.view.machine_chk_plan.MachineChkPlanDetail', {openerXtype:'Prod.view.machine_chk_plan.MachineChkCalendarDetail', calendarStatus:calendarStatus}, {});
	},
		
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getMachineChkCalendarDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});