require(["config"],function(){
	require(["jquery","load","cookie"],function($,load){
		load.done(function(){
			$(".head-top-wrap").hide();
			$(".search").hide();
			$(".head-bottom p").show();
			$("header").css({
				boxShadow : "0 5px 5px -5px rgba(0,0,0,0.3)",
				zIndex : 15,
				position : "relative"
			});
		});
		$(function(){
			$(".submit").click(function(){
				let _phone = $(".phoneNumber").val(),
					_password = $(".password").val(),
					_submit = $(".submit_notice");
				if(_password && _password){
					$.ajax({
						url : "http://127.0.0.1/project_php/login.php",
						type : "POST",
						dataType : "json",
						data : {
							phonenumber : _phone,
							password : _password
						},
						success : function(res_data){
							if(res_data.res_code == 0){
								$.cookie.json = true;
								$.removeCookie("userPhone", { path: "/" });
								$.cookie("userPhone", res_data.res_body, { expires: 7, path: "/" });
								location = "/index.html";
							} else
								_submit.text("* " + res_data.res_error).show().css("color","red");
						}
					});
				} else 
					_submit.text("* 请输入完整的登录信息！").show().css("color","red");
				return false;
			});
		});
	});
});