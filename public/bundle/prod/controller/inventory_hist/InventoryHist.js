/**
 * InventoryHist controller
 */
Ext.define('Prod.controller.inventory_hist.InventoryHist', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.InventoryHist', 
		'Prod.store.InventoryHist', 
		'Prod.view.inventory_hist.InventoryHist' 
	],
	
	models : ['Prod.model.InventoryHist'],
			
	stores: ['Prod.store.InventoryHist'],
	
	views : ['Prod.view.inventory_hist.InventoryHist'],
	
	refs: [ { ref : 'InventoryHist', selector : 'prod_inventory_hist' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_inventory_hist' : {
				paramschange : this.onParamsChange
			},
			'prod_inventory_hist_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_inquiry : this.onInquiryDetail
			},
			'prod_inventory_hist_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['created_at-gte']) {
			params['created_at-gte'] = HF.getCurrentShiftDate();
		}
		return params;
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
		return this.getInventoryHist();
	}
});