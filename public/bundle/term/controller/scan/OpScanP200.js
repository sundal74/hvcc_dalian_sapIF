/**
 * WIP Input
 */
Ext.define('Term.controller.scan.OpScanP200', {
	
	extend : 'Term.abstract.TerminalController',
	
	views : ['Term.view.scan.OpScanP200'],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_scan_opscanp200' },
		{ ref : 'ProdStatusView', selector : 'term_prod_opprodm010' }
	],
	
	init : function() {
		this.control({
			'term_scan_opscanp200' : {
				paramschange : this.onParamsChange
			},
			'term_scan_opscanp200 #btn_ok' : {
				click : this.onScanLabel
			},
			'term_scan_opscanp200 #text_label_enter' : {
				keydown : this.downLabel
			}
		});
	},
	
	downLabel : function(f, e) {
		if(e.keyCode == 13) {
			this.doActual();
		}
	},
	
	onParamsChange : function(view, params) {
		view.child(' image').show();
		view.child(' #text_label_enter').reset();
		view.child(' #text_label_enter').focus(false, 20);
	},
	
	onBackClick : function() {
		HF.history.back();
	},
	
	onClickClose : function(view) {
		view.close();
	},
	
	onScanLabel : function(btn, e) {
		this.doActual();
	},
	
	doActual : function() {
		var view = this.getMainView();
		var label = view.child(' #text_label_enter').getValue().toUpperCase();
		
		if(this.checkValidAtClient(label)) {
			//this.checkValidRun(label);
			this.inputWip(label);
		}
	},
	
	checkValidAtClient : function(label) {
		if(label == null || label == '') {
			return false;
		}
		
		var labelArr = label.split('|');
		if(labelArr.length != 6 && labelArr.length != 7) {
			HF.msg.alert(T('text.Invalid Label'));
			return false;
		}
		
		// 첫 번째는 날짜 : 8 자리 
		if(labelArr[0].length != 8) {
			HF.msg.alert(T('text.Invalid Label') + ' - Date');
			return false;
		}

		// 두 번째는 로케이션 코드 : 4 자리
		if(labelArr[1].length != 4) {
			HF.msg.alert(T('text.Invalid Label') + ' - Location');
			return false;
		}
		
		// 세 번째는 품목 코드 : 오더의 픔목 코드와 일치 해야 함 
		/*if(labelArr[2] != this.getMainView().getParams().product) {
			HF.msg.alert(T('text.Invalid Label') + ' - Product');
			return false;
		}*/
		
		// 네 번째는 LOT NO : 3 자리 
		if(labelArr[3].length != 3) {
			HF.msg.alert(T('text.Invalid Label') + ' - LOT NO');
			return false;
		}
		
		// 네 번째는 시리얼 : 3 자리 
		if(labelArr[4].length != 3) {
			HF.msg.alert(T('text.Invalid Label') + ' - Serial');
			return false;
		}
		
		// 다섯번째는 수량 : Integer 형 
		try {
			var qty = parseInt(labelArr[4]);
			if(!qty) {
				HF.msg.alert(T('text.Invalid Label') + ' - Qty.');
				return false;
			}
		} catch (e) {
			HF.msg.alert(T('text.Invalid Label') + ' - Qty.');
			return false;
		}
		
		return true;
	},
	
	checkValidRun : function(label_no) {
		var view = this.getMainView();
		var self = this;
		
		// label_no validation check
		Ext.Ajax.request({
			url : '/domains/' + login.current_domain_id + '/diy_services/CheckValidLot/shoot.json',
			method : 'POST',
			params : {
				prod_order_id : view.getParams().id,
				label_no : label_no,
				operation_id : HF.setting.get('option-operation').id
			},
			success : function(response, opts) {
				self.actualOnly(label_no);
			},
		    failure: function(response, opts) {
				var respObj = Ext.decode(response.responseText);
				var msg = respObj.throwable ? respObj.throwable.message : T('title.failure');
				var msgType = respObj.throwable ? respObj.throwable.type : '';
				
				if(msgType == 'Hatio::Exception::ValidationWarning') {
					HF.msg.confirm({
						msg : respObj.throwable.message + ",\n" + T('text.Sure to Going On'),
						fn : function(btn) {
							if(btn == 'yes') {
								self.actualOnly(label_no);
							}
						},
						scope: this
					});
				} else if(msgType == 'Hatio::Exception::InvalidRequest') {
					HF.msg.alert({
						title : T('title.error'),
						msg : respObj.throwable.message
					});
				} else {
					HF.msg.alert(msg);
				}
		    }
		});
	},
	
	inputWip : function(label_no) {
		var self = this;
		var view = this.getMainView();
		Ext.Ajax.request({
		    url: '/domains/' + login.current_domain_id + '/diy_services/WipInput/shoot.json',
		    method : 'POST',
		    params : {
				operation_id : HF.setting.get('option-operation').id,
				machine_id : HF.setting.get('option-machine').id,
				label_no : label_no
			},
		    success: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				view.child(' #text_label_enter').reset();
				view.child(' #text_label_enter').focus(false, 20);
				HF.msg.success({title : T('title.success'), msg : T('text.Success to Process')});
			}
		});
	}
});