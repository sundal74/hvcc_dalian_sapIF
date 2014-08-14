Ext.define('Base.view.role.RoleUserBind', {
	
	extend: 'Ext.panel.Panel',
	
	xtype : 'base_role_user_bind',
	
	title : T('title.user'),
	
	
   	items : [
		{
			xtype: 'container',
			layout: {
				type: 'hbox',
				padding : 10
			},
			items: [{               
		        xtype: 'treepanel',
		        itemId : 'groupTree',
		        margin : '0 5 0 0',
		        width : 300,
		        height: 600,
		        rootVisible: false,
		        store: Ext.create('Ext.data.TreeStore', {
				        proxy: {
				           type : 'ajax',
							url : '/domains/' + login.current_domain_id + '/diy_selections/UserGroupInfoTest/query.json?test=y',
							format : 'json',
							reader : {
								type : 'json'
							}
				        },
				        autoLoad : false,
				        sorters: [{
				            property: 'leaf',
				            direction: 'ASC'
				        }, {
				            property: 'text',
				            direction: 'ASC'
				        }]
				}),viewConfig: {
		            listeners : {
						itemclick : function( target, record, item, index, e, eOpts ){
							this.up().up().up().fireEvent('groupTreeItemClick', target, record, item, index, e, eOpts);
						}
					}
		        }
		    },{
		    	xtype:'gridpanel',
		    	itemId : 'userbyGroupGrid',
		    	margin : '0 60 0 0',
		    	width : 300,
		    	height: 500,
		    	multiSelect: true,
		    	columns : [ {
					header : T('label.id'),
					dataIndex : 'id',
					hidden : true
				},  { 
					dataIndex : 'name',
					header : T('label.name'),
					flex : 1
				},  { 
					dataIndex : 'groupId',
					header : T('label.group'),
					flex : 1
				} ],
				store : Ext.create('Ext.data.Store', {
					fields : [
						{ name : 'id',   type : 'string' },
						{ name : 'name',  type : 'string' },
						{ name : 'groupId',     type : 'string' }
					],
					autoLoad : false,
					remoteFilter : true,
					proxy : {
						type : 'ajax',
						format : 'json',
						reader : {
							type : 'json'
						}
					}
				}),viewConfig: {
		            plugins: {
		                ptype: 'gridviewdragdrop',
		                ddGroup: 'GridExample'
		            }
		        }
		    },{
		    	xtype: 'panel',
		    	title : '선택된사용자',
		    	margin : '0 30 0 0',
				width : 500,
				height: 500,
				layout: {
					type: 'hbox'
				},
				items:[
					{
				    	xtype:'gridpanel',
				    	itemId : 'selectUserGrid',
				    	flex : 1,
				    	multiSelect: true,
				    	columns : [ {
							header : T('label.id'),
							dataIndex : 'id',
							hidden : true
						},  { 
							dataIndex : 'name',
							header : T('label.name'),
							flex : 1
						},  { 
							dataIndex : 'groupId',
							header : T('label.group'),
							flex : 1
						} ],
						store : Ext.create('Ext.data.Store', {
							fields : [
								{ name : 'id',   type : 'string' },
								{ name : 'name',  type : 'string' },
								{ name : 'groupId',     type : 'string' }
							],
							autoLoad : false,
							remoteFilter : true,
							proxy : {
								type : 'ajax',
								format : 'json',
								reader : {
									type : 'json'
								}
							}
						}),
					    dockedItems: [{
			                xtype: 'toolbar',
			                dock: 'bottom',
			                items: [{
			                    iconCls: 'icon-delete',
			                    text: 'Delete',
			                    disabled: false,
			                    itemId: 'delete',
			                    scope: this,
			                    listeners : {
				                    click : function( target, e, eOpts ){
										this.up().up().up().up().up().onDeleteClick();
									}
			                    }
			                }]
			            }]
				    }
				]
		    }
		    ]
		}
	],

	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'save']
	} ],
	
	afterRender: function() {
		this.fireEvent('roleUserBindAfterRender', this);
	},
	
	afterComponentLayout: function() {
		var self = this;
    	this.callParent();
    	Ext.create('Ext.dd.DropTarget', this.child(' #selectUserGrid').getEl(), {
        	 ddGroup: 'GridExample',
	        notifyEnter: function(ddSource, e, data) { 
	        },
	        notifyDrop  : function(ddSource, e, data){
	        	//alert(ddSource.dragData.records[0].data.name);
	        	for(var i=0; i<ddSource.dragData.records.length; i++){
	        		self.child(' #selectUserGrid').store.add(ddSource.dragData.records[i].data);
	        	}
	            return true;
	        }
        },this);
    },
	
	onDeleteClick: function(){
       var selection = this.child(' #selectUserGrid').getSelectionModel().getSelection()[0];
       if (selection) {
           this.child(' #selectUserGrid').store.remove(selection);
       }
    }
});
