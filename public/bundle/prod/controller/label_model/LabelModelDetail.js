/**
 * LabelModelDetail controller
 */
Ext.define('Prod.controller.label_model.LabelModelDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.LabelModel', 
		'Prod.store.LabelModel', 
		'Prod.view.label_model.LabelModelDetail'
	],
	
	models : ['Prod.model.LabelModel'],
			
	stores: ['Prod.store.LabelModel'],
	
	views : ['Prod.view.label_model.LabelModelDetail'],
	
	refs: [ { ref : 'LabelModelDetail', selector : 'prod_label_model_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_label_model_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_label_model_form' : {
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
		HF.show('Prod.view.label_model.LabelModel', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.label_model.LabelModel', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getLabelModelDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});