/**
 * InventoryDetail controller
 */
Ext.define('Prod.controller.inventory.InventoryDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.Inventory', 
		'Prod.store.Inventory', 
		'Prod.view.inventory.InventoryDetail'
	],
	
	models : ['Prod.model.Inventory'],
			
	stores: ['Prod.store.Inventory'],
	
	views : ['Prod.view.inventory.InventoryDetail'],
	
	refs: [ { ref : 'InventoryDetail', selector : 'prod_inventory_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_inventory_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_inventory_form' : {
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
	 ** 					Override 구현 						   **
	 ****************************************************************/
	/**
	 * 추가적으로 필요한 validation을 수행 
	 */
	validateLogic : function(form) {
		var addQty = form.getValues().add_qty;
		var reason = form.getValues().reason;
		
		if(addQty == 0) {
			HF.msg.notice(T('text.Empty data exist') + ' : Add Qty.');
			return false;
		}
		
		if(reason == '') {
			HF.msg.notice(T('text.Empty data exist') + ' : Reason');
			return false;
		}
		
		return true;
	},
	
	/**
	 * override
	 */
	afterDetailLoaded : function(record, operation) {
		var mainView = this.getMainView();
		mainView.setRecord(record);
		mainView.down(' #back').hide();
		var chkForm = mainView.down('form');
		
		// 추가 
		if(!record.data.id) {
			chkForm.down('entityfield[name=store]').setReadOnly(false);
			chkForm.down('entityfield[name=product]').setReadOnly(false);
			chkForm.down('numberfield[name=qty]').setReadOnly(false);
			chkForm.down('numberfield[name=add_qty]').setDisabled(true);
			chkForm.down('textarea[name=reason]').setDisabled(true);
			chkForm.down('numberfield[name=add_qty]').hide();
			chkForm.down('textarea[name=reason]').hide();
		// 수정 
		} else {
			chkForm.down('entityfield[name=store]').setReadOnly(true);
			chkForm.down('entityfield[name=product]').setReadOnly(true);
			chkForm.down('numberfield[name=qty]').setReadOnly(true);
		}
	},
	
	/**
	 * override
	 */
	afterFormSaved : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.inventory.Inventory', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.inventory.Inventory', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getInventoryDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});