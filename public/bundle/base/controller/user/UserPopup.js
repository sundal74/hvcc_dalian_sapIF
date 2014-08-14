Ext.define('Base.controller.user.UserPopup', {

	extend: 'Base.abstract.PopupController',

	models: ['Base.model.User'],

	views: ['Base.view.user.UserPopup'],

	refs: [{
		selector: 'base_user_popup',
		ref: 'userPopup'
	}],

	init: function() {
		this.control({
			'base_user_popup': {
				paramschange: this.onParamsChange,
				click_close: this.onClickClose,
				click_save: this.onClickSave
			},
			'base_usercolumn': {
				userpopup: this.onUserPopup
			},
			'base_user_popup form': {
				validitychange: this.onValidityChange
			}
		});
	},

	onParamsChange: function(popup, params) {
		var form = popup.down('form').getForm();
		
		Base.model.User.load(params.id, {
			success: function(user) {
				form.setValues(user.data);
			}
		});
	},

	onUserPopup: function(column, user) {
		HF.popup('Base.view.user.UserPopup', user);
	},

	onValidityChange: function(form, valid) {
		this.getUserPopup().down('button#save').setDisabled(!valid);
	},

	onClickSave: function(popup) {
		/* TODO 기능 확인, Validation 처리 우아하게 변경 */
		var formView = popup.down('form');
		var form = formView.getForm();
		
		if(!form.isValid()) {
			Ext.Msg.alert('Validation Error', 'Please Check Password Input');
			return;
		}
		
		var values = form.getValues();

		if (values.id) {
			// update
			var user = Ext.create('Base.model.User', values);
			user.save({
				success: function(record, operation) {
					var newRecord = operation.resultSet.records[0];
					form.loadRecord(newRecord);
					popup.fireEvent('after_form_saved', newRecord);
					popup.close();
				}
			});
		} else {
			// create
			var user = {};
			Ext.iterate(values, function(name, value) {
				if (name != 'id') {
					user['user[' + name + ']'] = value;
				}
			});
			Ext.Ajax.request({
				url: 'add_user.json',
				method: 'POST',
				params: user,
				success: function(response) {
					var res = Ext.JSON.decode(response.responseText);
					popup.fireEvent('after_form_saved', res);
					HF.success(T('text.Success to Create'));
					popup.close();
				}
			});
		}
	}
});
