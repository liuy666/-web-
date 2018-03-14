require(["config"],function(){
	require(["jquery","template","load","cookie"],function($,tmp){
		$(function(){
			// 根据url获得商品id
			let pid = location.search.slice(1);
			
			// 发起资源请求 加载商品信息
			$.getJSON({
				url : "/mock/index.json",
				success : function(res_data){
					res_data.res_body.forEach(function(curr){
						let index = exist(curr.products,pid),
							tmpIntro;
						if(index !== -1){
							tmpIntro = tmp("pro_intro",curr.products[index]);
							$(".intro").append(tmpIntro);

							// 选择商品样式
							$(".small").on("click","div",function(){
								$(this).addClass("noMargin").siblings().removeClass("noMargin");
								$(".mid img").attr("src",$(this).children().attr("src"));
							});

							// 选择商品颜色
							$(".color").on("click",".miniimg",function(){
								$(this).addClass("purple").siblings().removeClass("purple");
								$(".mid img").attr("src",$(this).children("img").attr("src"));
							});

							// 选择商品尺寸
							$(".size").on("click",".minisize",function(){
								$(this).addClass("purple").siblings().removeClass("purple");
							});

							// 增加商品数量
							$(".add").click(function(){
								let count = Number($(".count").text());
									count += 1;
								$(".count").text(count);
							});

							// 减少商品数量
							$(".sub").click(function(){
								let count = Number($(".count").text());
									count -= 1;
								count = count < 1 ? 1 : count;
								$(".count").text(count);
							});

							// 加入购物车
							$(".toCart").click(function(){

								// 获取商品信息
								let product = {
									pid : Number($(".id").text()),
									title : $("h2").text(),
									price : Number($(".price_num i").text()),
									img : $(".color .purple img").attr("src"),
									size : $(".size .purple").text(),
									amount : Number($(".amount .count").text())
								}

								// 获取商品cookie信息
								$.cookie.json = true;
								let _cookie = $.cookie("proMsg"),
									index;
								_cookie = _cookie || [];

								// 判断当前选购商品是否以前已经加入了购物车
								index = _cookie.length > 0 ? exist(_cookie,product.pid) : -1;

								// 修改/添加商品信息
								if(index === -1)
									_cookie.push(product);
								else
									_cookie[index].amount += product.amount;

								// 保存到cookie
								$.cookie("proMsg",_cookie,{expires: 7, path: "/"});

								// 跳转到购物车
								location = "/html/cart.html";
								return false;
							});
						}
					});
				}
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