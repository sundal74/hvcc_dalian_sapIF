/** 
 * Manual Output
 */
Ext.define('Term.controller.scan.OpScanP100', {
	
	extend : 'Term.abstract.TerminalController',
		
	views : ['Term.view.scan.OpScanP100'],
	
	refs : [ 
		{ ref : 'MainView', selector : 'term_scan_opscanp100' },
		{ ref : 'ProdStatusView', selector : 'term_prod_opprodm010' }
	],
	
	init : function() {
		this.control({
			'term_scan_opscanp100' : {
				paramschange : this.onParamsChange,
				click_close : this.onClickClose,
				click_save : this.onSave,
				click_keypad : this.onKeyPad
			}
		});
	},
	
	onParamsChange : function(view, params) {
		view.child('#qty').reset();
		this.reload(null);
	},
	
	onClickClose : function(view) {
		view.close();
	},
	
	onSave : function(btn, e) {
		var self = this;
		var view = this.getMainView();
		var qty = view.child('#qty').getValue();
		var reason = view.child('#reason').getValue();
		
		if(qty == 0) {
			HF.msg.alert(T('text.Empty Data Exist'));
		} else {
			if(qty > 10000) {
				HF.msg.alert(T('text.X less than Y', {x : T('label.qty'), y : '10000'}));
				return;
			}
			
			if(qty < -10000) {
				HF.msg.alert(T('text.X greater than Y', {x : T('label.qty'), y : '10000'}));
				return;
			}
			
			Ext.Ajax.request({
			    url: '/domains/' + login.current_domain_id + '/diy_services/DoManualInput/shoot.json',
			    method : 'POST',
			    params : {
					prod_order_id : view.getParams().id,
					actual_qty : qty,
					description : reason,
					operation_id : HF.setting.get('option-operation') ? HF.setting.get('option-operation').id : ""
				},
			    success: function(response, opts) {
					var obj = Ext.decode(response.responseText);
					view.child('#qty').reset();
					self.reload(obj.actual_qty);
					HF.msg.alert({title : obj.message, msg : T('text.Success to Process')});
					var prodStatusView = self.getProdStatusView();
					var prodStatusViewStore = prodStatusView.child('grid').getStore();
					prodStatusViewStore.load();
				}
			});
		}
	},
	
	onKeyPad : function(btn, e) {
		var view = this.getMainView();
		var actualField = view.child('#qty');
		HF.popup('Term.view.cmm.TouchPadPopup', {owner : actualField, owner_type : 'simple', data_type : 'number'}, {});
	},
	
	reload : function(current_actual_qty) {
		var view = this.getMainView();
		var viewParams = view.getParams();
		
		var product = view.child(' #product');
		var product_desc = view.child(' #product_desc');
		var plan = view.child(' #plan_qty');
		var actual = view.child(' #actual_qty');

		product.setValue(viewParams.product);
		product_desc.setValue(viewParams.product_desc);
		plan.setValue(viewParams.order_qty);
		
		if(current_actual_qty) {
			actual.setValue(current_actual_qty);
		} else {
			actual.setValue(viewParams.actual_qty);
		}
	}
});