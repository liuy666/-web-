define(["jquery","cookie"],function(){
	// 加载除登录、注册外的页面头部
	$("header").load("/html/include/header.html",function(){
		$.cookie.json = true;
		let _cookie = $.cookie("userPhone"),
			_proMsg = $.cookie("proMsg"),
			amountTotal;
		if(_cookie){
			$(".loginBefore").hide();
			$(".loginAfter").show().children("a").text(_cookie.phonenumber);
			$(".registerBefore").hide();
			$(".registerAfter").show();
		}
		if(_proMsg){
			amountTotal = _proMsg.reduce(function(accumulator,curr){
				return accumulator += curr.amount;
			},0);
			$(".right .shopping_cart").text(amountTotal);
		}
		$(".right .registerAfter").click(function(){
			$.removeCookie("userPhone", { path: "/" });
			$(".loginBefore").show();
			$(".loginAfter").hide();
			$(".registerBefore").show();
			$(".registerAfter").hide();
		});

		// jsonp 调用淘宝搜索框接口
		$(".search #search").keyup(function(){
			let keyword = $(this).val(),
				_html = "";
			$.ajax({
				url : `https://suggest.taobao.com/sug?code=utf-8&q=${keyword}&callback=?`,
				dataType : "jsonp",
				success : function(responsedata){
					responsedata.result.forEach(function(curr){
						_html += `<span>${curr[0]}</span>`;
					});
					if($(".drop").length === 0){
						$("form").append(`<div class="drop">${_html}</div>`);
						$(".drop").on("click","span",function(){
							$(".search input:text").val($(this).text());
							return false;
						});
						$(".drop").mouseleave(function(){
							$(this).remove();
						});
					}
				}
				
			});
	});
	});

	// 加载登录、注册的页面头部
	$(".header").load("/html/include/lrHeader.html")

	// 加载页面尾部
	$("footer").load("/html/include/footer.html");
});