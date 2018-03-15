define(["jquery","cookie"],function(){
	var loadHeader = $.ajax("/html/include/header.html").done(function(data){
		// 渲染页面
		$("header").html(data);
	}).done(function(){
		// 读取cookie
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
				return accumulator + Number(curr.amount);
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
	}).done(function(){		
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

	var loadFooter = $.ajax("/html/include/footer.html").done(function(data){
		$("footer").html(data);
	});

	return $.when(loadHeader,loadFooter);
});