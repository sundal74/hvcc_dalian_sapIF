/**
 * SupplierDetail controller
 */
Ext.define('Prod.controller.supplier.SupplierDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.Supplier', 
		'Prod.store.Supplier', 
		'Prod.view.supplier.SupplierDetail'
	],
	
	models : ['Prod.model.Supplier'],
			
	stores: ['Prod.store.Supplier'],
	
	views : ['Prod.view.supplier.SupplierDetail'],
	
	refs: [ { ref : 'SupplierDetail', selector : 'prod_supplier_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_supplier_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_supplier_form' : {
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
		
		if(record.data.id) {
			var chkForm = mainView.down('form');
			chkForm.down('textfield[name=name]').setReadOnly(true);
		}
		
		mainView.setRecord(record);
		mainView.down(' #back').hide();
	},
	
	/**
	 * override
	 */
	afterFormSaved : function(form, newRecord) {
		// this.getMainView().setRecord(newRecord);
		this.getMainView().close();
		HF.show('Prod.view.supplier.Supplier', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.supplier.Supplier', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getSupplierDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});