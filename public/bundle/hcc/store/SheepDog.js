Ext.define('Hcc.store.SheepDog', {
	
	extend : 'Ext.data.Store',
	
	/* TODO SheepDog Store에서 Operation Name을 name으로 두는 구조는 다음과 같이 바뀌어야 하며, 제품별 total 값은 group으로 처리햐여야 한다. */
	/*
	fields : [
		{ name : 'product', type : 'string' },
		{ name : 'operation', type : 'string' },
		{ name : 'qty', type : 'integer' }
	],
	*/
	fields : [
		{ name : 'store', type : 'string' },
		{ name : 'product', type : 'string' },
		{ name : 'product_desc', type : 'string' },
		{ name : 'qty', type : 'integer' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	// TODO url : shoot.json, method : post
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/SheepDog/query.json',
		format : 'json',
		reader : {
			type : 'json'
		}
	}
});