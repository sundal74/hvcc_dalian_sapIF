Ext.define('<%= @bundle %>.view.<%= singular_name %>.<%= class_name %>List', {
	
	extend : 'Base.abstract.entity.ListGridView',
	
	xtype : '<%= @bundle.downcase %>_<%= singular_name %>_list',
		
	store : '<%= @bundle %>.store.<%= class_name %>',
	
	<%= HatioResourceViewUtil.generateGrid(@domain, singular_name, @columns, nil, nil) %>
});