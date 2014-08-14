Ext.define('Term.controller.lnst.OpLnstP040', {
	
	extend : 'Base.abstract.FormController',
	
	views : ['Term.view.lnst.OpLnstP040'],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_lnst_oplnstm010' },
	],
	
	init : function() {
		this.control({
			'term_lnst_oplnstp040' : {
				paramschange : this.onParamsChange,
				click_save : this.onClickSave,
				click_close : this.onClickClose
			}
		});
	},
	
	onParamsChange : function(view, params) {
		params = view.getParams();
		var opName = params.operation.name + '  (' + params.operation.desc + ')';
		var mcName = params.machine.name + '  (' + params.machine.desc + ')';
		view.child(' #operation').setValue(opName);
		view.child(' #machine').setValue(mcName);
		view.child(' #breakdown_code').setValue(params.breakdown_code);
		view.child(' #line_stop_flag').setValue(params.line_stop_flag);
		view.child(' #reporter').setValue(params.reporter);
		view.child(' #reporter_comment').setValue(params.reporter_comment);
		view.child(' #event_time').setValue(params.event_time);
	},
	
	onClickSave: function(popup) {
		var formView = popup.child('form');
		var self = this;
		var eventTime = formView.child('#event_time').getValue();
		if(!this.checkTime(eventTime)) {
			return;
		}
		
		formView.getForm().submit({
		    clientValidation : true,
		    url : '/domains/' + login.current_domain_id + '/diy_services/UpdateLineStopReport/shoot.json',
			params : {
				machine_loss_id : popup.getParams().id,
				event_time : eventTime,
			},
		    success: function(form, action) {
				var result = action.result;
				popup.close();
				HF.msg.notice({title : result.message, msg : T('text.Success to Process')});
				var view = self.getMainView();
				var gridStore = view.child('grid').getStore();
				gridStore.load();
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