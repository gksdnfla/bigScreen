window.onload = function(){
	$("#login").click(function(){
		var username=$("#username").val();
  		 var password=$("#password").val();
        if(username==""){
    	   $('#user_tit').text('用户名不能为空');
   	   $('#user_tit').css('color','red');
           return false;
        }else if(password==""){
     	   $('#pass_tit').text('密码不能为空');
   	   $('#pass_tit').css('color','red');
           return false;
        }else{
        	ajax({
				type: 'get',
		         dataType : "json",  
		         url:"../app/login/login",
		         data:{
		         	"name" : username,
		         	"password" : password
		         },
		         success : function(){
		         	window.location.href = "index.html";
		         },
		         error : function(){
		         	console.log("page not found");
			         $('#pass_tit').text('密码异常');
			         $('#pass_tit').css('color','red');
		         }
			})
		}
	});
	//	�뽹�¼�
	$(document).ready(function(){
		$("#username").focus(function(){
		  
		});
		$("#username").blur(function(){
			var username = $("#username").val();
//        加入代码  
//			if(username.length < 5 || username.length > 16){
//	        	   $('#user_tit').text('请输入5-16位字符');
//	        	   $('#user_tit').css('color','red');
//			}else{	
			ajax({
				type: 'get', 
				url:"../app/login/checkName",
				data:{
					"name":username,
					"meetingName":"phicomm2017"
				},
				success : function(){
					console.log('用户名正常');
		        	   $('#user_tit').text('用户名正常');
		        	   $('#user_tit').css('color','green'); 
				},
				error : function(){
					console.log("用户名异常"); 
		        	   $('#user_tit').text('用户名异常');
		        	   $('#user_tit').css('color','red');
				}
			});
//		}
		});
	});
}