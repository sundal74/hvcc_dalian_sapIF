/**
 * SpcItemDetail controller
 */
Ext.define('Prod.controller.spc_item.SpcItemDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.SpcItem', 
		'Prod.store.SpcItem', 
		'Prod.view.spc_item.SpcItemDetail'
	],
	
	models : ['Prod.model.SpcItem'],
			
	stores: ['Prod.store.SpcItem'],
	
	views : ['Prod.view.spc_item.SpcItemDetail'],
	
	refs: [ { ref : 'SpcItemDetail', selector : 'prod_spc_item_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_spc_item_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_spc_item_form' : {
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
		this.getMainView().close();
		HF.show('Prod.view.spc_item.SpcItem', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.spc_item.SpcItem', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getSpcItemDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});