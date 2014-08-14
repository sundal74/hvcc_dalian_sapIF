/**
 * ProdClosing controller
 */
Ext.define('Prod.controller.prod_closing.ProdClosing', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.ProdClosing', 
		'Prod.store.ProdClosing', 
		'Prod.view.prod_closing.ProdClosing' 
	],
	
	models : ['Prod.model.ProdClosing'],
			
	stores: ['Prod.store.ProdClosing'],
	
	views : ['Prod.view.prod_closing.ProdClosing'],
	
	refs: [ { ref : 'ProdClosing', selector : 'prod_prod_closing' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_prod_closing' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'prod_prod_closing_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'prod_prod_closing_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'prod_prod_closing_list #confirm' : {
				click : this.onConfirm
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
	
	/**
	 * reload전에 처리 할 것 처리
	 */
	beforeParamsChange : function(view, params) {
		params = this.getSearchForm().getValues();
		if(!params['work_date-eq']) {
			params['work_date-eq'] = HF.getShiftDate(-1);
		}
		
		return params;
	},
	
	/**
	 * confirm 버튼 클릭했을 경우 처리 
	 */
	onConfirm : function(gridView, td, rowIdx, colIndx, e, record, tr) {
		var self = this;
		HF.msg.confirm({
			msg : T('text.Sure to Going On'),
			fn : function(btn) {
				if(btn != 'yes') {
					return;
				}
				
				self.closeProduction(gridView, record);
			}
		});
	},
	
	/**
	 * 마감 처리 
	 */
	closeProduction : function(grid, selectedRecord) {
		var values = {
			'domain_id' : login.current_domain_id,
			'work_date' : selectedRecord.data.work_date,
			'operation_id' : selectedRecord.data.operation_id,
			'closer_id' : login.id,
			'closed_flag' : true
		};
		var prodClosing = Ext.create(this.models[0], values);
		prodClosing.save({
			success : function(record, operation) {
				grid.getStore().load();
			}
		});
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
		return this.getProdClosing();
	}
});