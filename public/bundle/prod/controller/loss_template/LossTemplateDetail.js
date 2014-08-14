/**
 * LossTemplateDetail controller
 */
Ext.define('Prod.controller.loss_template.LossTemplateDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.LossTemplate', 
		'Prod.store.LossTemplate', 
		'Prod.view.loss_template.LossTemplateDetail'
	],
	
	models : ['Prod.model.LossTemplate'],
			
	stores: ['Prod.store.LossTemplate'],
	
	views : ['Prod.view.loss_template.LossTemplateDetail'],
	
	refs: [ { ref : 'LossTemplateDetail', selector : 'prod_loss_template_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_loss_template_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_loss_template_form' : {
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
		this.getMainView().close();
		HF.show('Prod.view.loss_template.LossTemplate', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.loss_template.LossTemplate', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getLossTemplateDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});