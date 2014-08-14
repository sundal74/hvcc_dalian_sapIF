Ext.define('Term.controller.rwmt.OpRwmtM010', {
	
	extend : 'Term.abstract.TerminalController',
	
	views : ['Term.view.rwmt.OpRwmtM010'],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_rwmt_oprwmtm010' }
	],
	
	init : function() {
		this.control({
			'term_rwmt_oprwmtm010' : {
				paramschange : this.onParamsChange
			},
			'term_rwmt_oprwmtm010 #btn_ok' : {
				click : this.onInputLabel
			},
			'term_rwmt_oprwmtm010 #text_label_enter' : {
				keydown : this.downLabel
			}
		});
	},
	
	downLabel : function(f, e) {
		if(e.keyCode == 13) {
			if(f.getValue()) {
				this.scan(f.getValue());
			} else {
				HF.msg.alert(T('text.Invalid data'));
			}
		}
	},
	
	onParamsChange : function(view, params) {
		Ext.getCmp('label').reset();
		Ext.getCmp('label').focus(false, 20);
	},
	
	onBackClick : function() {
		HF.history.back();
	},
	
	onClickClose : function(view) {
		view.close();
	},
	
	onInputLabel : function(btn, e) {
		var view = this.getMainView();
		if(view.child(' #text_label_enter').getValue()) {
			this.scan(view.child(' #text_label_enter').getValue());
		} else {
			HF.msg.alert(T('text.Invalid data'));
		}
	},
	
	scan : function(label_no) {
		label_no = label_no.toUpperCase();
		var prod_order_id = this.getMainView().getParams().id;
		if(this.checkValidAtClient(label_no)) {
			this.checkValid(prod_order_id, label_no);
		}
	},
	
	checkValidAtClient : function(label) {
		var labelArr = label.split('|');
		if(labelArr.length != 5) {
			HF.msg.alert(T('text.Invalid Label'));
			return false;
		}
		
		// 첫 번째는 날짜 : 6자리 
		if(labelArr[0].length != 6) {
			HF.msg.alert(T('text.Invalid Label') + ' - Date');
			return false;
		}
		
		// 네 번째는 시리얼 : 4자리 
		if(labelArr[3].length != 4) {
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
	
	/**
	 * validation check
	 */
	checkValid : function(prod_order_id, label_no) {
		var self = this;

		// 스캔한 품목이 생산 품목의 BOM 자품목이 맞는지 체크, BOM 자품목 재공이 존재하는지 체크 
		Ext.Ajax.request({
			url : '/domains/' + login.current_domain_id + '/diy_services/CheckValidRm/shoot.json',
			method : 'POST',
			params : {
				prod_order_id : prod_order_id,
				label_no : label_no,
				operation_id : HF.setting.get('option-operation').id
			},
			success : function(response, opts) {
				self.scanRm(prod_order_id, label_no);
			},
		    failure: function(response, opts) {
				var respObj = Ext.decode(response.responseText);
				var msg = respObj.throwabel ? respObj.throwable.message : T('title.failure');
				var msgType = respObj.throwable ? respObj.throwable.type : '';
				
				if(msgType == 'Hatio::Exception::ValidationWarning') {
					HF.msg.confirm({
						msg : respObj.throwable.message + ",\n" + T('text.Sure to Going On'),
						fn : function(btn) {
							if(btn == 'yes') {
								self.scanRm(prod_order_id, label_no);
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
	
	/**
	 * 자재 투입 Request
	 */
	scanRm : function(prod_order_id, label_no) {
		Ext.Ajax.request({
			url : '/domains/' + login.current_domain_id + '/diy_services/CreateRmLot/shoot.json',
			method : 'POST',
			params : {
				prod_order_id : prod_order_id,
				label_no : label_no,
				operation_id : HF.setting.get('option-operation').id
			},
			success : function(response, opts) {
				var obj = Ext.decode(response.responseText);
				Ext.getCmp('label').reset();
				Ext.getCmp('label').focus(false, 20);
			}
		});		
	}
});