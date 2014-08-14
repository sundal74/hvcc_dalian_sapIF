/**
 * InventoryHistDetail controller
 */
Ext.define('Prod.controller.inventory_hist.InventoryHistDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.InventoryHist', 
		'Prod.store.InventoryHist', 
		'Prod.view.inventory_hist.InventoryHistDetail'
	],
	
	models : ['Prod.model.InventoryHist'],
			
	stores: ['Prod.store.InventoryHist'],
	
	views : ['Prod.view.inventory_hist.InventoryHistDetail'],
	
	refs: [ { ref : 'InventoryHistDetail', selector : 'prod_inventory_hist_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_inventory_hist_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_inventory_hist_form' : {
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
		HF.show('Prod.view.inventory_hist.InventoryHist', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.inventory_hist.InventoryHist', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getInventoryHistDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});