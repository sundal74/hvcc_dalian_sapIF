/** 
 * Multiple Manual Output
 */
Ext.define('Term.controller.prod.OpProdP090', {
	
	extend : 'Term.abstract.TerminalController',
	
	views : ['Term.view.prod.OpProdP090'],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_prod_opprodp090' },
		{ ref : 'ProdStatusView', selector : 'term_prod_opprodm010' }
	],
	
	init : function() {
		this.control({
			'term_prod_opprodp090' : {
				paramschange : this.onParamsChange,
				click_save : this.onSave,
				click_close : this.onClickClose
			},
			'term_prod_opprodp090 #keypad' : {
				click : this.onKeypad
			}
		});
	},
	
	onParamsChange : function(view, params) {
		this.reload(params);
	},
	
	onClickClose : function(view) {
		view.close();
	},
	
	onKeypad : function(gridView, td, rowIndex, colIndex, event, record, tr, grid) {
		var params = {owner : gridView.store, owner_type : 'store', data_type : 'number', row_idx : rowIndex, field : 'add_qty'};
		HF.popup('Term.view.cmm.TouchPadPopup', params, {});
	},
	
	onSave : function(btn, e) {
		var self = this;
		var grid = this.getMainView().child('grid');
		var allAddQtyZero = true;
		var maxValid = true;
		var minValid = true;
		var params = [];
		
		grid.store.each(function(record) {
			if(record.data.add_qty != 0) {
				allAddQtyZero = false;
			} 
			
			if(record.data.add_qty > 10000) {
				maxValid = false;
				return true;
			}
			
			if(record.data.add_qty < -10000) {
				minValid = false;
				return true;
			}
			
			params.push(record.data);
		});
		
		if(allAddQtyZero) {
			HF.msg.notice('All Add Qty. is zero!');
			return;
		}
		
		if(!maxValid) {
			HF.msg.notice(T('text.X greater than Y', {x : T('label.add'), y : '10000'}));
			return;
		}
		
		if(!minValid) {
			HF.msg.notice(T('text.X less than Y', {x : T('label.add'), y : '-10000'}));
			return;
		}
		
		Ext.Ajax.request({
		    url: '/domains/' + login.current_domain_id + '/diy_services/DoMultiManualOutput/shoot.json',
		    method : 'POST',
		    params : { 'orders' : Ext.JSON.encode(params) },
		    success: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				HF.msg.alert({title : obj.message, msg : T('text.Success to Process')});
				self.getMainView().close();
				var prodStatusView = self.getProdStatusView();
				var prodStatusViewStore = prodStatusView.child('grid').getStore();
				prodStatusViewStore.load();
			}
		});
	},
	
	reload : function(params) {
		if(params) {
			this.getMainView().child('grid').store.loadRawData(params);
		}
	}
});