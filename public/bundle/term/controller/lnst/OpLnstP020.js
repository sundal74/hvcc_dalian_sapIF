/**
 * LineStop Report
 */
Ext.define('Term.controller.lnst.OpLnstP020', {
	
	extend : 'Term.abstract.TerminalController',
	
	views : ['Term.view.lnst.OpLnstP020'],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_lnst_oplnstm010' }
	],
	
	init : function() {
		this.control({
			'term_lnst_oplnstp020' : {
				paramschange : this.onParamsChange,
				click_save : this.onClickSave,
				click_close : this.onClickClose
			}
		});
	},
	
	onParamsChange : function(view, params) {
		view.child(' #event_time').setValue(new Date());
	},
	
	onBackClick : function() {
		HF.history.back();
	},
	
	onClickClose : function(view) {
		view.close();
	},
	
	onClickSave: function(popup, grid) {
		var formView = popup.child('form');
		var form = formView.getForm();
		var eventTime = formView.child('#event_time').getValue();
		
		if(!this.checkTime(eventTime)) {
			return;
		}
		
		var self = this;
		form.submit({
		    clientValidation : true,
		    url : '/domains/' + login.current_domain_id + '/diy_services/CreateLineStop/shoot.json',
			params : {
				operation_id : HF.setting.get('option-operation').id,
				machine_id : HF.setting.get('option-machine').id,
				shift : HF.setting.get('option-shift'),
				prod_order_id : popup.getParams().id,
				product_id : popup.getParams().product_id,
				event_time : eventTime
			},
		    success: function(form, action) {
				var result = action.result;
				popup.close();
				// self.showPopupResult(T('title.' + result.msg), result.msg);
				HF.msg.alert({title : result.message, msg : T('text.Success to Process')});
				var view = self.getMainView();
				if(view) {
					var gridStore = view.child('grid').getStore();
					gridStore.load();
				}
		    }
		});
	},
	
	checkTime : function(eventTime) {
		if(!eventTime) {
			HF.msg.notice({title : T('text.Invalid data'), msg : T('text.Empty data exist')});
			return false;
		}
		
		var currentTime = new Date();
		if(eventTime > currentTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.event_time'), y : T('label.current_time')})});
			return false;
		}
		
		return true;
	}
});