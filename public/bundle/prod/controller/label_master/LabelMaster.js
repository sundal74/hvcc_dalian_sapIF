/**
 * LabelMaster controller
 */
Ext.define('Prod.controller.label_master.LabelMaster', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.LabelMaster', 
		'Prod.store.LabelMaster', 
		'Prod.view.label_master.LabelMaster' 
	],
	
	models : ['Prod.model.LabelMaster'],
			
	stores: ['Prod.store.LabelMaster'],
	
	views : ['Prod.view.label_master.LabelMaster'],
	
	refs: [ { ref : 'LabelMaster', selector : 'prod_label_master' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_label_master' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'prod_label_master_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'prod_label_master_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
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
		return this.getLabelMaster();
	}
});