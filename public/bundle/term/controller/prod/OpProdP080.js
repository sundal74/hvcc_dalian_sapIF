Ext.define('Term.controller.prod.OpProdP080', {
	
	extend : 'Term.abstract.TerminalController',
	
	views : ['Term.view.prod.OpProdP080'],
	
	refs: [
		{ ref : 'MainView', selector : 'term_prod_opprodm010' }
	],
	
	init : function() {
		this.control({
			'term_prod_opprodp080' : {
				paramschange : this.onParamsChange,
				click_save : this.onClickSave,
				click_close : this.onClickClose
			}
		});
	},
	
	onParamsChange : function(view, params) {
		view.child(' #date').setValue(HF.setting.get('option-work_date_disp') ? HF.setting.get('option-work_date_disp') : "");
		view.child(' #shift').setValue(HF.setting.get('option-shift_name') ? HF.setting.get('option-shift_name') : "");
		view.child(' #operation').setValue(HF.setting.get('option-operation') ? HF.setting.get('option-operation').name : "");
		view.child(' #machine').setValue(HF.setting.get('option-machine') ? HF.setting.get('option-machine').name : "");
	},
	
	onBackClick : function() {
		HF.history.back();
	},
	
	onClickClose : function(view) {
		view.close();
	},
	
	onClickSave: function(popup, grid) {
		var formView = popup.child('form');
		var self = this;
		
		if (!formView.getForm().isValid()) {
			HF.msg.notice(T('text.Invalid data'));
			return;
		}
		
		var lotSize = formView.down('textfield[name=lot_size]').getValue();
		var reqQty = formView.down('numberfield[name=request_qty]').getValue();
		var normalFlag = ((reqQty % lotSize) == 0);
			
		formView.getForm().submit({
		    clientValidation : true,
		    url : '/domains/' + login.current_domain_id + '/diy_services/RequestRm/shoot.json',
			params : {
				'operation' : HF.setting.get('option-operation').name,
				'machine' : HF.setting.get('option-machine').name,
				'request_time' : Ext.util.Format.date(new Date(), 'YmdHim'),
				'request_date' : Ext.util.Format.date(HF.setting.get('option-work_date'), 'Ymd'),
				'remote_ip' : REMOTE_IP
			},
			timeout : 20000,
		    success: function(form, action) {
				var result = action.result;
				popup.close();
				
				if(normalFlag) {
					HF.msg.success({title : result.message, msg : T('text.Success to Process')});
				} else {
					HF.msg.alert(T('text.Mismatch Lot Size'));
				}
				
				var view = self.getMainView();
				var gridStore = view.child('grid').getStore();
				gridStore.load();
		    }
		});
	}
});