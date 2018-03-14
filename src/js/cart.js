require(["config"],function(){
	require(["jquery","template","load","cookie"],function($,tmp){
		$(function(){
			$.cookie.json = true;
			let _cookie = $.cookie("proMsg");
			// 判断购物车是否有商品
			if(_cookie === undefined || _cookie === "[]"){
				$(".empty").show();
				$(".notEmpty").hide();
			}else{
				$(".empty").hide();
				$(".notEmpty").show();
			}
			$(".empty .login").click(function(){
				location = "/html/login.html";
				return false;
			});
			$(".empty .toBuy").click(function(){
				location = "/index.html";
				return false;
			});

			let tmpHtml = tmp("tmpid",_cookie);
			$(".shops").after(tmpHtml);
			$(".subtotal").text($(".totalprice").text());
			$(".total em").text($(".totalprice").text());

			//为所有数量修改 / 删除操作 添加事件句柄
			let tbody = $("tbody");
			$(".add").click(function(){
				let _input = $(this).siblings("input"),
					_val = Number(_input.val()) + 1;
				_input.val(_val);
				$(".totalprice").text("¥" + _val * Number($(".price").text().slice(1)));
				console.log(_cookie);
				let pid = $(this).parents(".detail").find(".pid").text();
				_cookie.forEach(function(curr){
					if(curr.pid == pid)
						curr.amount = _val;
				});
				$.cookie("proMsg",_cookie,{expires : 7, path : "/"});
				$(".subtotal").text($(".totalprice").text());
				$(".total em").text($(".totalprice").text());
			});

			$(".sub").click(function(){
				let _input = $(this).siblings("input");
					_val = Number(_input.val()) - 1;
				if(_val < 1)
					_val = 1;
				_input.val(_val);
				$(".totalprice").text("¥" + _val * Number($(".price").text().slice(1)));
				let pid = $(this).parents(".detail").find(".pid").text();
				_cookie.forEach(function(curr){
					if(curr.pid == pid)
						curr.amount = _val;
				});
				$.cookie("proMsg",_cookie,{expires : 7, path : "/"});
				$(".subtotal").text($(".totalprice").text());
				$(".total em").text($(".totalprice").text());
			});

			$(".input").blur(function(){
				let regexp = /^[1-9]\d*$/,
					_val = $(this).val();
				if(!regexp.test(_val)){
					// 不合法则弹出警告框，并重置数量
					alert("你输入不合法的数量，请重新输入！")
					$(this).val("1");
				}
				$(".totalprice").text("¥" + _val * Number($(".price").text().slice(1)));
				let pid = $(this).parents(".detail").find(".pid").text();
				_cookie.forEach(function(curr){
					if(curr.pid == pid)
						curr.amount = _val;
				});
				$.cookie("proMsg",_cookie,{expires : 7, path : "/"});
				$(".subtotal").text($(".totalprice").text());
				$(".total em").text($(".totalprice").text());
			});
			
			// 判断数组中是否存在某项，没有返回-1
			function exist(arr,id){
				for(let i = 0,len = arr.length; i < len; i++){
					if(arr[i].pid == id)
						return i;
				}
				return -1;
			}
		});
	});
});