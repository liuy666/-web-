require(["config"],function(){
	require(["jquery","load","cookie"],function($){
		$(function(){
				// 判断是否是手机号码
			let pattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/,
				isRegister = false, // 是否可以注册
				phoneNot = $(".phone_notice"), // 获取用户名验证信息提示框
				submitNot = $(".submit_notice"); // 获取注册提交验证信息提示框

			// 用户名输入框失去焦点时判断是否可以注册
			$(".phoneNumber").blur(function(){
				if(pattern.exec(this.value)){
					$.get({
						url : "http://127.0.0.1/project_php/check.php",
						data : {phonenumber : this.value},
						dataType : "json",
						success : function(res_data){
							if(res_data.res_code == 0){
								if(res_data.res_body.status == 1){
									isRegister = false;
									phoneNot.css("color","blue");
								} else{
									isRegister = true;
									phoneNot.css("color","green");
								}
								phoneNot.text(res_data.res_body.message).show();
							} else 
								phoneNot.text(res_data.res_error).show();
						}
					});
				} else
					phoneNot.text("* 请输入正确的手机号码！").show().css("color","red");
			});

			// 提交用户注册并写入cookie
			$("form").submit(function(){
				let _phoneNum = $(".phoneNumber").val(), // 获取用户名
					_password = $(".password").val(), // 获取密码
					_verify = $(".verify").val(), // 获取验证密码
					isChecked = $("input:checkbox").prop("checked"); // 获取多选框的状态
				if(_password && _verify && isChecked && isRegister){
					if(_password == _verify){
						$.post({
							url : "http://127.0.0.1/project_php/register.php",
							data : {
								phonenumber : _phoneNum,
								password : _password
							},
							dataType : "json",
							success : function(res_data){
								if(res_data.res_code == 0){
									$.cookie.json = true;
									$.cookie("userPhone", res_data.res_body, { expires: 7, path: '/' });
									location = "/index.html";
								} else
									submitNot.text(res_data.res_error).show();
							}
						});
					} else 
						submitNot.text("* 前后输入密码不一致！").show();
				} else 
					submitNot.text("* 请输入完整的注册信息！").show();
				return false;
			});
		});
	});
});