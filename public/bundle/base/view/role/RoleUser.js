Ext.define('Base.view.role.RoleUser', {
	
	extend : 'Ext.grid.Panel',
	
	requires : ['Ext.ux.CheckColumn'],
	
	xtype : 'base_role_user',
	
	title : T('title.user'),
		
	store : Ext.create('Ext.data.Store', {
		fields : [
			{name: 'login', type: 'string'},
			{name: 'name', type: 'string'},
			{name: 'email', type: 'string'},
			{name: 'dept', type: 'string'},
			{name: '_cud_flag_', type : 'string'}
		]
	}),
	
	verticalScroller : { variableRowHeight: true },
	
	selModel : Ext.create('Ext.selection.CheckboxModel'),
	
	selType : 'cellmodel', 
	
	columns : [ { 
		dataIndex : 'id',
		text : T('label.id'),
		hidden : true
	}, {
		dataIndex : '_cud_flag_',
		hidden : true
	}, {
		dataIndex : 'login',
		text : T('label.login'),
		width : 100
	}, {
		dataIndex : 'name',
		text : T('label.name'),
		width : 150
	}, {
		dataIndex : 'email',
		text : T('label.email'),
		width : 200
	}, {
		dataIndex : 'dept',
		text : T('label.dept'),
		xtype : 'codecolumn',
		tpl : '{description}', 
		commonCode : 'PROD_DEPT', 
		width : 200
	} ],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'add', 'delete']
	} ],
	
	renderRoleUser : function(roleId, users) {
		this.roleId = roleId;
		this.store.loadRawData(users);
	},
	
	selectUsers : function(selections) {
		var self = this;
		var records = [];
		Ext.Array.each(selections, function(selection) {
			selection.set('_cud_flag_', 'c');
			records.push(selection.data);
		});
		
		Ext.Ajax.request({
			url : 'domains/' + login.current_domain_id + '/roles/' + this.roleId + '/update_users.json',
			method : 'POST',
			params : { 'role' : Ext.JSON.encode(records) },
			success : function(response) {
				var res = Ext.JSON.decode(response.responseText);
				Ext.Array.each(records, function(record) {
					self.store.insert(0, record);
				});
				Ext.Msg.alert(T('title.success'), T('text.Success to Update'));
			}
		});
	}
});
