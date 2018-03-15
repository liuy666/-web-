require(["config"],function(){
	require(["jquery","template","load","cookie"],function($,tmp, load){
		load.done(function(){
			$(".search").hide();
		});

		$(function(){
			// 读取cookie
			$.cookie.json = true;
			let _cookie = $.cookie("proMsg");

			// 判断本地cookie是否为空
			if(_cookie === undefined || _cookie.length === 0){
				$(".empty").show();
				$(".notEmpty").hide();
			}else{
				$(".empty").hide();
				$(".notEmpty").show();
			}

			// 引导跳转
			$(".empty .login").click(function(){
				location = "/html/login.html";
				return false;
			});
			$(".empty .toBuy").click(function(){
				location = "/index.html";
				return false;
			});

			// 从cookie中读取数据并做渲染
			let tmpHtml = tmp("tmpid",_cookie);
			$(".shops").after(tmpHtml);

			// 更新商品总价、合计、总数量
			update();
	
			function update(){

				// 累加计算购物车内所有商品的小计
				let totalArr = Array.from($(".totalprice")),
					totalValue = totalArr.reduce(function(accumulate,curr){
					return accumulate + Number(curr.innerText.slice(1));
				},0);
				$(".subtotal").text("¥" + totalValue);
				$(".total_price").text("¥" + totalValue);

				// 累加计算购物车内所有商品的数量
				let totalInput = Array.from($(".input")),
					totalAmount = totalInput.reduce(function(accumulate,curr){
					return accumulate + Number(curr.value);
				},0);
				$(".amount").text(totalAmount);
			}

			

			// 增加
			$(".add").click(function(){
				let _input = $(this).siblings("input"),
					_price = $(this).parents(".detail").find(".price"),
					_totalprice = $(this).parents(".detail").find(".totalprice"),
					_value = Number(_input.val()) + 1,
					_pid = $(this).parents(".detail").find(".pid").text();

				// 修改相应的显示数量、小计值
				_input.val(_value);
				_totalprice.text("¥" + _value * Number(_price.text().slice(1)));
				
				// 修改cookie
				_cookie.forEach(function(curr){
					if(curr.pid == _pid)
						curr.amount = _value;
				});

				// 保存cookie
				$.cookie("proMsg",_cookie,{expires : 7, path : "/"});
				update();
			});

			// 减少
			$(".sub").click(function(){
				let _input = $(this).siblings("input"),
					_price = $(this).parents(".detail").find(".price"),
					_totalprice = $(this).parents(".detail").find(".totalprice"),
					_value = Number(_input.val()) - 1,
					_pid = $(this).parents(".detail").find(".pid").text();
				if(_value < 1)
					_value = 1;

				// 修改相应的显示数量、小计值
				_input.val(_value);
				_totalprice.text("¥" + _value * Number(_price.text().slice(1)));
				
				// 修改cookie
				_cookie.forEach(function(curr){
					if(curr.pid == _pid)
						curr.amount = _value;
				});

				// 保存cookie
				$.cookie("proMsg",_cookie,{expires : 7, path : "/"});
				update();
			});

			// 直接修改
			$(".input").blur(function(){
				let regexp = /^[1-9]\d*$/,
			 		_value = $(this).val(),
					_price = $(this).parents(".detail").find(".price"),
					_totalprice = $(this).parents(".detail").find(".totalprice"),
					_pid = $(this).parents(".detail").find(".pid").text();

				// 不合法则弹出警告框，并重置数量
				if(!regexp.test(_value)){
					alert("请输入合法数量值！");
					_value = 1;
				}

				// 修改相应的显示数量、小计值
				$(this).val(_value);
				_totalprice.text("¥" + _value * Number(_price.text().slice(1)));
				
				// 修改cookie
				_cookie.forEach(function(curr){
					if(curr.pid == _pid)
						curr.amount = _value;
				});

				// 保存cookie
				$.cookie("proMsg",_cookie,{expires : 7, path : "/"});
				update();
			});

			// 删除
			$(".del").click(function(){
				let _pid = $(this).parents(".detail").find(".pid").text(),
				 	index;

				index = exist(_cookie,_pid);
				_cookie.splice(index,1);
				$(this).parents(".detail").remove();

				if(_cookie.length === 0){
					$(".empty").show();
					$(".notEmpty").hide();
					location.reload();
				}

				// 保存cookie
				$.cookie("proMsg",_cookie,{expires : 7, path : "/"});
				update();
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