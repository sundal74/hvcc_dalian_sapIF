/**
 * ProdParamDetail controller
 */
Ext.define('Prod.controller.prod_param.ProdParamDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.ProdParam', 
		'Prod.store.ProdParam', 
		'Prod.view.prod_param.ProdParamDetail'
	],
	
	models : ['Prod.model.ProdParam'],
			
	stores: ['Prod.store.ProdParam'],
	
	views : ['Prod.view.prod_param.ProdParamDetail'],
	
	refs: [ { ref : 'ProdParamDetail', selector : 'prod_prod_param_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_prod_param_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_prod_param_form' : {
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
		// this.getMainView().setRecord(newRecord);
		this.getMainView().close();
		HF.show('Prod.view.prod_param.ProdParam', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.prod_param.ProdParam', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getProdParamDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});