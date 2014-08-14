Ext.define('Term.controller.prod.OpProdP020', {
	
	extend : 'Term.abstract.TerminalController',
	
	views : ['Term.view.prod.OpProdP020'],
	
	refs: [
		{ ref : 'MainView', selector : 'term_prod_opprodm010' }
	],
	
	init : function() {
		this.control({
			'term_prod_opprodp020' : {
				paramschange : this.onParamsChange,
				click_save : this.onClickSave,
				click_close : this.onClickClose
			}
		});
	},
	
	onParamsChange : function(view, params) {
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
		var productObj = formView.getValues().product;
		
		if(productObj && productObj.id) {
			var addPlans = [];
			addPlans.push({
				'order_date' : HF.setting.get('option-work_date'),
				'shift' : HF.setting.get('option-shift'),
				'operation_id' : HF.setting.get('option-operation').id,
				'machine_id' : HF.setting.get('option-machine').id,
				'status' : 'W',
				'order_qty' : 0,
				'product_id' : productObj.id
			});
			
			Ext.Ajax.request({
			    url : '/domains/' + login.current_domain_id + '/diy_services/DoAddPlan/shoot.json',
			    method : 'POST',
			    params : {
					addPlans : Ext.JSON.encode(addPlans)
				},
			    success: function(response, opts) {
					popup.close();
					//HF.msg.alert({title : result.message, msg : T('text.Success to Process')});
					var view = self.getMainView();
					var gridStore = view.child('grid').getStore();
					gridStore.load();
				}
			});
		} else {
			HF.msg.alert(T('text.Select x First', {x : T('label.product')}));
		}
	}
});