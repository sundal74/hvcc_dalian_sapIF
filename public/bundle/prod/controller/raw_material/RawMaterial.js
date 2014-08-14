/**
 * RawMaterial controller
 */
Ext.define('Prod.controller.raw_material.RawMaterial', {

	extend: 'Base.abstract.entity.ListMainController',

	requires : [ 
		'Prod.model.RawMaterial', 
		'Prod.store.RawMaterial', 
		'Prod.view.raw_material.RawMaterial',
	],

	models : ['Prod.model.RawMaterial'],

	stores: ['Prod.store.RawMaterial'],

	views : ['Prod.view.raw_material.RawMaterial'],

	refs: [ { ref : 'RawMaterial', selector : 'prod_raw_material' } ],

	init: function() {
		this.callParent(arguments);

		this.control({
			'prod_raw_material' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'prod_raw_material_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_inquiry : this.onInquiryDetail
			},
			'prod_raw_material_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	onPopupClose : function(view) {
		view.close();
	},
	
	/**
	 * after import success
	 */
	onImportSuccess : function(response) {
		var gridView = this.getGridView();
		gridView.store.load();
	},

	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 				   **
	 ****************************************************************/
	onPopupNew : function() {
		HF.popup(this.getDetailViewName(), {}, {});
	},

	/**
	 * detail view type(popup | view | none)을 리턴
	 */	
	getDetailViewType : function() {
		return 'popup';
	},

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getRawMaterial();
	}
});