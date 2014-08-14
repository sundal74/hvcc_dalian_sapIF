/**
 * PmsMasterItemDetail controller
 */
Ext.define('Comp.controller.pms_master_item.PmsMasterItemDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Comp.model.PmsMasterItem', 
		'Comp.store.PmsMasterItem', 
		'Comp.view.pms_master_item.PmsMasterItemDetail'
	],
	
	models : ['Comp.model.PmsMasterItem'],
			
	stores: ['Comp.store.PmsMasterItem'],
	
	views : ['Comp.view.pms_master_item.PmsMasterItemDetail'],
	
	refs: [ { ref : 'PmsMasterItemDetail', selector : 'comp_pms_master_item_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'comp_pms_master_item_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' comp_pms_master_item_form' : {
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
		HF.show('Comp.view.pms_master_item.PmsMasterItem', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Comp.view.pms_master_item.PmsMasterItem', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getPmsMasterItemDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});