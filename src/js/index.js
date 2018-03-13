require(["config"],function(){
	require(["template","jquery","load"],function(template){
		$(function(){
			// 动态加载商品数据并渲染
			$.get({
				url : "/mock/index.json",
				dataType : "json",
				success : function(res_data){
					let temData = template("classify",res_data);
					$(".choiceness").after(temData);
				}
			});
		});
	});
});