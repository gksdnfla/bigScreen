//url,data,type,timeout,success,error
function ajax(options){
	//1.整理options
	options=options||{};
	//if(!options.url) return;
	options.data =	options.data||{};
	options.type = options.type||'get';
	options.timeout = options.timeout || 0;
	options.formdata = options.formdata||false;
	options.statusCode  = options.statusCode || null;
	options.contentType = options.contentType || null;
	//2.整理data
	options.data.t=Math.random();
	var arr=[];
	var oFormData=null;
	if(options.data.tagName){
		oFormData=new FormData(options.data);
	}else{
		oFormData=new FormData();
		for(var key in options.data){
			arr.push(key+'='+encodeURIComponent(options.data[key]));
			oFormData.append(key,options.data[key]);
		}
		var str = arr.join('&');
		console.log(oFormData);
	}
	
	
	//创建ajax
	var oAjax=new XMLHttpRequest();
	
	//f进度	推荐先做进度的侦听
	oAjax.onprogress=function(ev){
		options.progress && options.progress(parseInt(ev.loaded/ev.total*100));	
	};
	
	//连接
	if(options.type=='get'){
		oAjax.open('get',options.url+'?'+str,true);
		oAjax.send();
	}else{
		oAjax.open('post',options.url,true);
			oAjax.setRequestHeader( 'Content-Type', 'application/json;charset=UTF-8');
		}
		//3.发送
		if(options.formdata){
			oAjax.send(oFormData);
		}else{
			oAjax.send(str);
		}
	}
	
	//c.接收
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			/*if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){

				//alert(oAjax.responseText);
				options.success && options.success(oAjax.responseText);
				clearTimeout(timer);
			}else{
				//alert(oAjax.status);
				options.error && options.error(oAjax.status);
			}*/
			options.statusCode && options.statusCode({
				code:oAjax.status,
				value:oAjax.responseText
			});
		}
	};
	
	//d.超时
	if(options.timeout){
		oAjax.timeout=options.timeout;
		oAjax.ontimeout=function(){
			options.error('超时了');	
		};
	}
	//e发生错误时
	oAjax.onabort=oAjax.onerror=function(){
		options.error && options.error(oAjax.status);	
	};
	
	
	
}
