Ext.define('Term.controller.rwmt.OpRwmtM030', {
	
	extend : 'Term.abstract.TerminalController',
	
	views : ['Term.view.rwmt.OpRwmtM030'],
	
	requires : [
		'Term.abstract.TerminalController'
	],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_rwmt_oprwmtm030' },
	],
	
	init : function() {
		this.control({
			'term_rwmt_oprwmtm030' : {
				paramschange : this.onParamsChange
			},
			'term_rwmt_oprwmtm030 #rm_lot_modify' : {
				click : this.onRmLotModify
			},
			'term_rwmt_oprwmtm030 #rm_lot_del' : {
				click : this.onRmLotDelete
			}
		});
	},
	
	onParamsChange : function(view, params) {
		if(!HF.setting.get('option-operation')) {
			var field = Ext.getCmp('optionbar').down('field[name=option-operation]');
			HF.msg.tip(T('text.Select Operation First'), field);
			return;
		}
		
		if(params) {
			var grid = view.child('grid');
			var store = grid.getStore();
			store.getProxy().extraParams = params;
			grid.getStore().load();
		} else {
			var grid = view.child('grid');
			var store = grid.getStore();
			store.getProxy().extraParams = {
				operation_id : HF.setting.get('option-operation') == null ? "" : HF.setting.get('option-operation').id
			};
			store.load();
		}
	},
	
	onRmLotModify : function(grid, item, rowIndex, colIndex, e, record) {
		HF.popup('Term.view.rwmt.OpRwmtP040', record.data, null);
	},
	
	onRmLotDelete : function(grid, rowIndex, colIndex, item, e, record) {
		HF.msg.confirm({
			msg : T('text.Sure to Delete'),
			fn : function(confirmBtn) {
				if(confirmBtn == 'yes') {
					Ext.Ajax.request({
					    url: '/domains/' + login.current_domain_id + '/diy_services/UpdateRmLotQty/shoot.json',
					    method : 'POST',
					    params : {
							rm_lot_id : record.data.id,
							mode : 'delete'
						},
					    success: function(response, opts) {
							var obj = Ext.decode(response.responseText);
							HF.msg.alert({title : obj.message, msg : T('text.Success to Process')});

							grid.getStore().load();
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
	}
});