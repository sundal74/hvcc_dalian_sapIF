/**
 * PmsSpcAlarmDetail controller
 */
Ext.define('Comp.controller.pms_spc_alarm.PmsSpcAlarmDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Comp.model.PmsSpcAlarm', 
		'Comp.store.PmsSpcAlarm', 
		'Comp.view.pms_spc_alarm.PmsSpcAlarmDetail'
	],
	
	models : ['Comp.model.PmsSpcAlarm'],
			
	stores: ['Comp.store.PmsSpcAlarm'],
	
	views : ['Comp.view.pms_spc_alarm.PmsSpcAlarmDetail'],
	
	refs: [ { ref : 'PmsSpcAlarmDetail', selector : 'comp_pms_spc_alarm_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'comp_pms_spc_alarm_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' comp_pms_spc_alarm_form' : {
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
		mainView.setRecord(record);
		mainView.down(' #back').hide();
	},
	
	/**
	 * override
	 */
	afterFormSaved : function(form, newRecord) {
		//this.getMainView().setRecord(newRecord);
		this.getMainView().close();
		HF.show('Comp.view.pms_spc_alarm.PmsSpcAlarm', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Comp.view.pms_spc_alarm.PmsSpcAlarm', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getPmsSpcAlarmDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});