/**
 * MachineLoss controller
 */
Ext.define('Prod.controller.machine_loss.MachineLoss', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.MachineLoss', 
		'Prod.store.MachineLoss', 
		'Prod.view.machine_loss.MachineLoss' 
	],
	
	models : ['Prod.model.MachineLoss'],
			
	stores: ['Prod.store.MachineLoss'],
	
	views : ['Prod.view.machine_loss.MachineLoss'],
	
	refs: [ { ref : 'MachineLoss', selector : 'prod_machine_loss' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_machine_loss' : {
				paramschange : this.onParamsChange
			},
			'prod_machine_loss_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'prod_machine_loss_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	warning_signal_hour : -1,

	/**
	 * override
	 */	
	onParamsChange: function(view, params) {
		params = this.beforeParamsChange(view, params);
		var searchForm = this.getSearchForm();
		searchForm.setValues(params);

		var self = this;
		if(self.warning_signal_hour == -1) {
			var store = Ext.create('Base.store.Code');
			store.getProxy().setExtraParam('name', 'WARNING_SIGNAL');

			store.load({
				scope : this,
				callback : function(records, operation, success) {
					Ext.each(records, function(record) {
						if(record.get('name') == 'STOP') {
							self.warning_signal_hour = record.get('description');
							view.child('grid').signal = self.warning_signal_hour;
							self.reload(view.child('grid'), searchForm.getValues());
						}
					});
				}
			});
		} else {
			view.child('grid').signal = self.warning_signal_hour;
			self.reload(view.child('grid'), searchForm.getValues());
		}
	},
	
	getMultipleUpdateUrl : function(grid) {
		if(!this.multipleUpdateUrl)
			this.multipleUpdateUrl = '/domains/' + login.current_domain_id + '/machine_losses/update_multiple.json';

		return this.multipleUpdateUrl;
	},
	
	beforeParamsChange : function(view, params) {
		params = this.getSearchForm().getValues();
		if(!params['work_date-gte']) {
			params['work_date-gte'] = HF.getShiftDate(-7);
		}
		if(!params['work_date-lte']) {
			params['work_date-lte'] = HF.getCurrentShiftDate();
		}
		return params;
	},
	
	getExportUrl : function() {
		return 'domains/' + login.current_domain_id + '/machine_losses/export.xls';
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
		return this.getMachineLoss();
	}
});