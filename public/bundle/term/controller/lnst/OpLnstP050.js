Ext.define('Term.controller.lnst.OpLnstP050', {
	
	extend : 'Base.abstract.FormController',
	
	views : ['Term.view.lnst.OpLnstP050'],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_lnst_oplnstm010' },
	],
	
	init : function() {
		this.control({
			'term_lnst_oplnstp050' : {
				paramschange : this.onParamsChange,
				click_save : this.onClickSave,
				click_close : this.onClickClose
			}
		});
	},
	
	onParamsChange : function(view, params) {
		//view.child(' #workcenter').setValue(view.getParams().workcenter);
		view.child(' #operation').setValue(view.getParams().operation);
		view.child(' #machine').setValue(view.getParams().machine);
		view.child(' #maintainer').setValue(view.getParams().maintainer);
		view.child(' #maintainer_count').setValue(view.getParams().maintainer_count);
		view.child(' #maint_start_time_hour').setValue(Ext.util.Format.date(view.getParams().maint_start_time, T('format.hour')));
		view.child(' #maint_start_time_min').setValue(Ext.util.Format.date(view.getParams().maint_start_time, T('format.min')));
		view.child(' #maint_end_time_hour').setValue(Ext.util.Format.date(view.getParams().maint_end_time, T('format.hour')));
		view.child(' #maint_end_time_min').setValue(Ext.util.Format.date(view.getParams().maint_end_time, T('format.min')));
		view.child(' #loss_code').setValue(view.getParams().loss_code);
		view.child(' #line_stop_flag').setValue(view.getParams().line_stop_flag);
		view.child(' #reporter').setValue(view.getParams().reporter);
		view.child(' #event_time').setValue(Ext.util.Format.date(view.getParams().event_time, T('format.datetime')));
		view.child(' #reporter_comment').setValue(view.getParams().reporter_comment);
		view.child(' #maint_comment').setValue(view.getParams().maint_comment);
	},
	
	onClickSave: function(popup) {
		var formView = popup.child('form');
		var self = this;
		var maint_start_time_hour = popup.child(' #maint_start_time_hour').getValue();
		var maint_start_time_min = popup.child(' #maint_start_time_min').getValue();
		var maint_start_time = maint_start_time_hour + ':' + maint_start_time_min;
		var maint_end_time_hour = popup.child(' #maint_end_time_hour').getValue();
		var maint_end_time_min = popup.child(' #maint_end_time_min').getValue();
		var maint_end_time = + maint_end_time_hour + ':' + maint_end_time_min;
		
		formView.getForm().submit({
		    clientValidation : true,
		    url : '/domains/' + login.current_domain_id + '/diy_services/UpdateLineStopAdjust/shoot.json',
			params : {
				machine_loss_id : popup.getParams().id,
				maint_start_time : maint_start_time,
				maint_end_time : maint_end_time
			},
			timeout : 20000,
		    success: function(form, action) {
				var result = action.result;
				popup.close();
				HF.msg.alert({title : result.message, msg : T('text.Success to Process')});
				var view = self.getMainView();
				var gridStore = view.child('grid').getStore();
				gridStore.load();
		    }
		});
	},
	
	onBackClick : function() {
		HF.history.back();
	}
});