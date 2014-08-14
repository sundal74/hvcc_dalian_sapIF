Ext.define('Term.controller.rwmt.OpRwmtP040', {
	
	extend : 'Base.abstract.FormController',
	
	views : ['Term.view.rwmt.OpRwmtP040'],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_rwmt_oprwmtm030' },
	],
	
	init : function() {
		this.control({
			'term_noti_oprwmtp040' : {
				paramschange : this.onParamsChange,
				click_save : this.onClickSave
			}
		});
	},
	
	onParamsChange : function(view, params) {
		view.child(' #id').setValue(view.getParams().id);
		view.child(' #lot_no').setValue(view.getParams().lot_no);
		view.child(' #serial_no').setValue(view.getParams().serial_no);
		view.child(' #supplier_code').setValue(view.getParams().supplier_code);
		view.child(' #part_no').setValue(view.getParams().part_no);
		view.child(' #in_qty').setValue(view.getParams().in_qty);
		view.child(' #inv_in_time').setValue(Ext.util.Format.date(view.getParams().inv_in_time, T('format.datetime')));
	},
	
	onBackClick : function() {
		HF.history.back();
	},
	
	onClickSave: function(popup, grid) {
		var grid = popup.child('grid');
		var modify_qty = popup.child(' #modify_qty').getValue();
		var calculation = popup.child(' #calculation').getValue();
		var self = this;

		Ext.Ajax.request({
		    url: '/domains/' + login.current_domain_id + '/diy_services/UpdateRmLotQty/shoot.json',
		    method : 'POST',
		    params : {
				rm_lot_id : popup.getParams().id,
				modify_qty : modify_qty,
				mode : 'update',
				calculation : calculation
			},
		    success: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				popup.close();
				HF.msg.alert({title : obj.message, msg : T('text.Success to Process')});
				
				var view = self.getMainView();
				var gridStore = view.child('grid').getStore();
				gridStore.load();
			}
		});
	}
});