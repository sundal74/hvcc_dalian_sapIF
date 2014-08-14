/**
 * PmsMasterItem controller
 */
Ext.define('Comp.controller.pms_master_item.PmsMasterItem', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Comp.model.PmsMasterItem', 
		'Comp.store.PmsMasterItem', 
		'Comp.view.pms_master_item.PmsMasterItem' 
	],
	
	models : ['Comp.model.PmsMasterItem'],
			
	stores: ['Comp.store.PmsMasterItem'],
	
	views : ['Comp.view.pms_master_item.PmsMasterItem'],
	
	refs: [ { ref : 'PmsMasterItem', selector : 'comp_pms_master_item' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'comp_pms_master_item' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'comp_pms_master_item_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'comp_pms_master_item_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'comp_pms_master_item_list #go_detail' : {
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
		return this.getPmsMasterItem();
	}
});