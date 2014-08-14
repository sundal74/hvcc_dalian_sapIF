/**
 * StdWorkDocDetail controller
 */
Ext.define('Prod.controller.std_work_doc.StdWorkDocDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.StdWorkDoc', 
		'Prod.store.StdWorkDoc', 
		'Prod.view.std_work_doc.StdWorkDocDetail'
	],
	
	models : ['Prod.model.StdWorkDoc'],
			
	stores: ['Prod.store.StdWorkDoc', 'Base.store.Attachment'],
	
	views : ['Prod.view.std_work_doc.StdWorkDocDetail'],
	
	refs: [ { ref : 'StdWorkDocDetail', selector : 'prod_std_work_doc_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_std_work_doc_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_std_work_doc_form' : {
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
		// this.getMainView().setRecord(newRecord);
		this.getMainView().close();
		HF.show('Prod.view.std_work_doc.StdWorkDoc', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.std_work_doc.StdWorkDoc', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getStdWorkDocDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});