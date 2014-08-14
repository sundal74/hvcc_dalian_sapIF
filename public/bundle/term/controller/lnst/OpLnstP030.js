Ext.define('Term.controller.lnst.OpLnstP030', {
	
	extend : 'Base.abstract.FormController',
	
	views : ['Term.view.lnst.OpLnstP030'],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_lnst_oplnstm010' },
	],
	
	init : function() {
		this.control({
			'term_lnst_oplnstp030' : {
				paramschange : this.onParamsChange,
				click_save : this.onClickSave,
				click_close : this.onClickClose
			}
		});
	},
	
	onParamsChange : function(view, params) {
		var opName = params.operation.name + ' (' + params.operation.desc + ')';
		var mcName = params.machine.name + ' (' + params.machine.desc + ')';
		view.child(' #operation').setValue(opName);
		view.child(' #machine').setValue(mcName);
		var lineStopFlag = params.line_stop_flag;
		var lineStop = (!lineStopFlag) ? 'N' : ((lineStopFlag == 'false' || lineStopFlag == '0' || lineStopFlag == 'n' || lineStopFlag == 'no') ? 'N' : 'Y')
		view.child(' #line_stop_flag').setValue(lineStop);
		view.child(' #reporter').setValue(params.reporter.name);
		view.child(' #event_time').setValue(Ext.util.Format.date(params.event_time, T('format.datetime')));
		view.child(' #reporter_comment').setValue(params.reporter_comment);
		view.child(' #breakdown_code').setValue(params.breakdown_code);
		view.child(' #maint_start_time').setValue(params.event_time);
		view.child(' #maint_end_time').setValue(new Date());
	},
	
	onClickSave: function(popup) {
		var formView = popup.child('form');
		var maintStartTime = formView.child(' #maint_start_time').getValue();
		var maintEndTime = formView.child(' #maint_end_time').getValue();
		if(!this.checkTime(popup.getParams().event_time, maintStartTime, maintEndTime)) {
			return;
		}
		
		var form = formView.getForm();
		var self = this;
		
		// TODO machine loss controller로 보내기 
		form.submit({
		    clientValidation : true,
		    url : '/domains/' + login.current_domain_id + '/diy_services/UpdateLineStopAdjust/shoot.json',
			params : {
				machine_loss_id : popup.getParams().id,
				maint_start_time : maintStartTime,
				maint_end_time : maintEndTime
			},
		    success: function(form, action) {
				var result = action.result;
				popup.close();
				// self.showPopupResult(T('title.' + result.msg), result.msg);
				HF.msg.alert({title : result.message, msg : T('text.Success to Process')});
				var view = self.getMainView();
				var gridStore = view.child('grid').getStore();
				gridStore.load();
		    }
		});
	},
	
	/**
	 * 1. 조치 시작 시간은 report time보다 커야 하고 현재 시간, 조치 완료시간 보다는 작아야 하고 
	 * 2. 조치 완료 시간은 조치 시작 시간보다는 커야 하고 현재 시간보다는 작아야 한다.
	 */
	checkTime : function(eventTime, maintStartTime, maintEndTime) {
		if(!maintStartTime || !maintEndTime) {
			HF.msg.notice({title : T('text.Invalid data'), msg : T('text.Empty data exist')});
			return false;
		}
		
		var currentTime = new Date();
		
		if(maintStartTime > currentTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.maint_start_time'), y : T('label.current_time')})});
			return false;
		}
		
		if(maintEndTime > currentTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.maint_end_time'), y : T('label.current_time')})});
			return false;
		}
		
		if(maintStartTime < eventTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.event_time'), y : T('label.maint_start_time')})});
			return false;
		}
		
		if(maintStartTime > maintEndTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.maint_start_time'), y : T('label.maint_end_time')})});
			return false;
		}
		
		return true;
	}
});