/**
 * DefectDetail controller
 */
Ext.define('Prod.controller.defect.DefectDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.Defect', 
		'Prod.store.Defect', 
		'Prod.view.defect.DefectDetail'
	],
	
	models : ['Prod.model.Defect'],
			
	stores: ['Prod.store.Defect'],
	
	views : ['Prod.view.defect.DefectDetail'],
	
	refs: [ { ref : 'DefectDetail', selector : 'prod_defect_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_defect_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_defect_form' : {
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
		this.getMainView().setRecord(newRecord);
		HF.show('Prod.view.defect.Defect', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.defect.Defect', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getDefectDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});