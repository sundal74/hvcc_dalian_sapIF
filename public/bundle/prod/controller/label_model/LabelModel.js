/**
 * LabelModel controller
 */
Ext.define('Prod.controller.label_model.LabelModel', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.LabelModel', 
		'Prod.store.LabelModel', 
		'Prod.view.label_model.LabelModel' 
	],
	
	models : ['Prod.model.LabelModel'],
			
	stores: ['Prod.store.LabelModel'],
	
	views : ['Prod.view.label_model.LabelModel'],
	
	refs: [ { ref : 'LabelModel', selector : 'prod_label_model' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_label_model' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'prod_label_model_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'prod_label_model_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'prod_label_model_list #go_detail' : {
				click : this.onShowDetail
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	// Customized code here ...
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
		return this.getLabelModel();
	}
});