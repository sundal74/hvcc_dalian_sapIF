/**
 * PmsMasterModelDetail controller
 */
Ext.define('Comp.controller.pms_master_model.PmsMasterModelDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Comp.model.PmsMasterModel', 
		'Comp.store.PmsMasterModel', 
		'Comp.view.pms_master_model.PmsMasterModelDetail'
	],
	
	models : ['Comp.model.PmsMasterModel'],
			
	stores: ['Comp.store.PmsMasterModel'],
	
	views : ['Comp.view.pms_master_model.PmsMasterModelDetail'],
	
	refs: [ { ref : 'PmsMasterModelDetail', selector : 'comp_pms_master_model_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'comp_pms_master_model_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' comp_pms_master_model_form' : {
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
		HF.show('Comp.view.pms_master_model.PmsMasterModel', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Comp.view.pms_master_model.PmsMasterModel', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getPmsMasterModelDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});