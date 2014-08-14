/**
 * RawMaterialDetail controller
 */
Ext.define('Prod.controller.raw_material.RawMaterialDetail', {

	extend: 'Base.abstract.entity.DetailMainController',

	requires : [ 
		'Prod.model.RawMaterial', 
		'Prod.store.RawMaterial', 
		'Prod.view.raw_material.RawMaterialDetail',
	],

	models : ['Prod.model.RawMaterial'],

	stores: ['Prod.store.RawMaterial'],

	views : ['Prod.view.raw_material.RawMaterialDetail'],

	refs: [ 
		{ ref : 'RawMaterialDetail', selector : 'prod_raw_material_detail' }
	],

	init: function() {
		this.callParent(arguments);

		this.control({
			'prod_raw_material_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_raw_material_form' : {
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
	 ** 				여기는 customizing area 						**
	 ****************************************************************/
	onPopupClose : function(view) {
		view.close();
	},

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
		HF.show('Prod.view.raw_material.RawMaterial', {}, {});
	},

	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.raw_material.RawMaterial', {}, {});
	},

	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getRawMaterialDetail();
	},

	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});