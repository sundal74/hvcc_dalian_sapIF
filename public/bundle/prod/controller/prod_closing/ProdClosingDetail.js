/**
 * ProdClosingDetail controller
 */
Ext.define('Prod.controller.prod_closing.ProdClosingDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.ProdClosing', 
		'Prod.store.ProdClosing', 
		'Prod.view.prod_closing.ProdClosingDetail'
	],
	
	models : ['Prod.model.ProdClosing'],
			
	stores: ['Prod.store.ProdClosing'],
	
	views : ['Prod.view.prod_closing.ProdClosingDetail'],
	
	refs: [ { ref : 'ProdClosingDetail', selector : 'prod_prod_closing_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_prod_closing_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_prod_closing_form' : {
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
		HF.show('Prod.view.prod_closing.ProdClosing', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.prod_closing.ProdClosing', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getProdClosingDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});