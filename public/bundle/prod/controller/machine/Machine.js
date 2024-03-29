/**
 * Machine controller
 */
Ext.define('Prod.controller.machine.Machine', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.Machine', 
		'Prod.store.Machine', 
		'Prod.view.machine.Machine' 
	],
	
	models : ['Prod.model.Machine'],
			
	stores: ['Prod.store.Machine'],
	
	views : ['Prod.view.machine.Machine'],
	
	refs: [ { ref : 'Machine', selector : 'prod_machine' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_machine' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'prod_machine_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'prod_machine_search' : {
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
		return this.getMachine();
	}
});