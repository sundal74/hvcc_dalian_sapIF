/**
 * Production List
 */
Ext.define('Ops.controller.prod.ProdList', {
	
	extend : 'Ops.abstract.OpsController',
	
	views : ['Ops.view.prod.ProdList'],
	
	requires : [ 'Ops.abstract.OpsController' ],
	
	refs: [ { ref : 'MainView', selector : 'ops_prod_list' } ],
	
	init : function() {
		this.control({
			'ops_prod_list' : {
				paramschange : this.onParamsChange,
				click_back : this.onBackClick
			},
			'ops_prod_list #modify_actual' : {
				click : this.onModifyActual
			},
			'ops_prod_list #delete_lot' : {
				click : this.onDeleteLot
			}
		});
	},
	
	onParamsChange : function(view, params) {
		var grid = view.child('grid');
		var store = grid.getStore();

		if(params) {
			store.getProxy().extraParams = { 'prod_order_id-eq' : params.id };
			grid.getStore().load();
		} else {
			store.getProxy().extraParams = {
				operation_id : HF.setting.get('option-operation').id,
				work_date : HF.setting.get('option-work_date'),
				shift : HF.setting.get('option-shift')
			};
			grid.getStore().load();
		}
	},

	onModifyActual : function(grid, item, rowIndex, colIndex, e, record) {
		var view = this.getMainView();
		HF.popup('Term.view.prod.OpProdP040', record.data, null);
	},
	
	onDeleteLot : function(grid, item, rowIndex, colIndex, e, record) {
		HF.msg.confirm({
			msg : T('text.Sure to Delete'),
			fn : function(confirmBtn) {
				if(confirmBtn == 'yes') {
					Ext.Ajax.request({
					    url: '/domains/' + login.current_domain_id + '/diy_services/OpsCancelLot/shoot.json',
					    method : 'POST',
					    params : { lot_id : record.data.id },
					    success: function(response, opts) {
							var obj = Ext.decode(response.responseText);
							grid.store.load();
						}
					});
				}
			}
		});
	},
	
	onClickClose : function(view) {
		view.close();
	},
	
	onBackClick : function() {
		HF.history.back();
	},
	
	getViewModel : function() {
		var selectMainView = this.getMainView();
		var grid = selectMainView.child("grid");
		var selectionModel = grid.getSelectionModel();
		var model = selectionModel.getSelection();
		return model;
	}
});