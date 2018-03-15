require(["config"],function(){
	require(["template","jquery","load","cookie"],function(tmp,$,load){
		load.done(function(){
			$(".classify").hide();
			$("#search").css("width","300px");
			$("header").css({
				boxShadow : "0 5px 5px -5px rgba(0,0,0,0.3)",
				zIndex : 15,
				position : "relative"
			});
		});
		$(function(){
			// 根据url获得商品分类名称
			let _className = location.search.slice(1);

			// 发起资源请求 加载商品信息
			$.getJSON({
				url : "/mock/index.json",
				success : function(res_data){
					let tmpList = [];
					tmpList = res_data.res_body.filter(function(curr){
						if(curr.className == _className){
							return curr.products
						}
					});
					tmpList = tmp("list",tmpList[0]);
					$(".main ul").append(tmpList).on("click","li",function(){
						let pid = $(this).children("i").text();
						location = `/html/detail.html?${pid}`;
					});

				}
			});
		});
	});
});