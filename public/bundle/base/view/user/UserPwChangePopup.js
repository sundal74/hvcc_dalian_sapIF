Ext.define('Base.view.user.UserPwChangePopup', {

	extend: 'Base.abstract.Popup',

	xtype: 'base_user_pw_change_popup',

	title: T('button.user_profile'),
	
	width : 600,
	
	height : 350,

	items: [{
		xtype: 'form',

		defaults: {
			xtype: 'textfield',
			anchor: '100%'
		},

		items: [ {
			xtype: 'hidden',
			name: 'id'
		}, {
			xtype: 'textfield',
			name: 'login',
			fieldLabel: T('label.login'),
			readOnly : true
		}, {
			xtype: 'textfield',
			name: 'name',
			fieldLabel: T('label.name'),
			readOnly : true
		}, {
			xtype: 'textfield',
			name: 'password',
			fieldLabel: T('label.password'),
			inputType: 'password',
			allowBlank : false,
			minLength : 4,
			maxLength : 32
		}, {
			xtype: 'textfield',
			name: 'password_confirmation',
			fieldLabel: T('label.password_confirmation'),
			inputType: 'password',
			allowBlank : false,
			minLength : 4,
			maxLength : 32,
			validator: function(value) {
				var pwd = this.previousSibling('[name=password]');
				return (value === pwd.getValue()) ? true : T('text.Passwords do not match')
			}
		}, {
			xtype: 'textfield',
			name: 'dept',
			fieldLabel: T('label.dept'),
			xtype: 'codecombo',
			commonCode: 'PROD_DEPT',
			displayField : 'description'
		} ]
	}],

	dockedItems: [{
		xtype: 'controlbar',
		items: ['->', 'update', 'close']
	}]
});
