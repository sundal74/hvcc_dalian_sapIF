/**
 * CustomerDetail controller
 */
Ext.define('Prod.controller.customer.CustomerDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.Customer', 
		'Prod.store.Customer', 
		'Prod.view.customer.CustomerDetail'
	],
	
	models : ['Prod.model.Customer'],
			
	stores: ['Prod.store.Customer'],
	
	views : ['Prod.view.customer.CustomerDetail'],
	
	refs: [ { ref : 'CustomerDetail', selector : 'prod_customer_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_customer_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_customer_form' : {
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
		HF.show('Prod.view.customer.Customer', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.customer.Customer', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getCustomerDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});