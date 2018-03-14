require(["config"],function(){
	require(["template","jquery","load"],function(template){
		$(function(){
			// 动态加载商品数据并渲染
			$.get({
				url : "/mock/index.json",
				dataType : "json",
				success : function(res_data){
					let temData = template("classify",res_data);
					$(".apply").append(temData).on("click","li",function(){
						if($(this).attr("class") !== "firstLi"){
							let pid = $(this).children("i").text();
							location = `/html/detail.html?${pid}`;
						} else {
							let className = $(this).parents("div").attr("class");
							location = `/html/list.html?${className}`;
						}
					});
				}
			});
		});
	});
});