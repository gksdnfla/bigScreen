function ajax(options){
	
	options=options||{};
	options.data =	options.data||{};
	options.type = options.type||'get';
	options.timeout = options.timeout || 0;
	options.success = options.success || null;
	options.error = options.error || null;
	options.statusCode = options.statusCode || null;
	
	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));
	}
	var str = arr.join('&');
	
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	if(options.type=='get'){
		oAjax.open('get',options.url+'?'+str,true);
		oAjax.send();
	}else{
		oAjax.open('post',options.url,true);
		
		oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		
		oAjax.send(str);
	}
	
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				options.success && options.success(oAjax.responseText);
				clearTimeout(timer);
			}else{
				options.error && options.error(oAjax.status);
			}
		}
	};
	
	if(options.timeout){
		var timer=setTimeout(function(){
			alert('超时了');
			oAjax.abort();
		},options.timeout);
	}
	
}
