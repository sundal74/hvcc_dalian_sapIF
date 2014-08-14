/**
 * PmsMasterErrorDetail controller
 */
Ext.define('Comp.controller.pms_master_error.PmsMasterErrorDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Comp.model.PmsMasterError', 
		'Comp.store.PmsMasterError', 
		'Comp.view.pms_master_error.PmsMasterErrorDetail'
	],
	
	models : ['Comp.model.PmsMasterError'],
			
	stores: ['Comp.store.PmsMasterError'],
	
	views : ['Comp.view.pms_master_error.PmsMasterErrorDetail'],
	
	refs: [ { ref : 'PmsMasterErrorDetail', selector : 'comp_pms_master_error_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'comp_pms_master_error_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' comp_pms_master_error_form' : {
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
	},
	
	/**
	 * override
	 */
	afterFormSaved : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Comp.view.pms_master_error.PmsMasterError', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Comp.view.pms_master_error.PmsMasterError', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getPmsMasterErrorDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});