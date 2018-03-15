require(["config"],function(){
	require(["template","jquery","load","carousel"],function(template){
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

			// 轮播图
			$(".banner_carousel").carousel({
				imgs : [
					{src:"/images/b1.jpg", href:"#"},
					{src:"/images/b2.jpg", href:"#"},
					{src:"/images/b3.jpg", href:"#"},
					{src:"/images/b4.jpg", href:"#"},
					{src:"/images/b5.jpg", href:"#"}
				],
				width: 1080,
				height: 360,
				duration: 3000
			});

			// 手风琴效果
			// 初始化渲染页面
			let lis = $(".choiceness ul li"),
				_left = 620;
			$(lis[0]).css("border","0");
			for(let i = 1,len = lis.length; i < len; i++){
				$(lis[i]).css("left",_left + "px");
				_left += 92;
			}

			//绑定鼠标进入事件
			lis.on("mouseenter",function(){

				let _left = parseInt($(this).css("left")),
					fLeft = parseInt($(".flag").css("left"));

				//向左滑动
				if(_left < fLeft){
					let nexts = $(this).nextUntil(".flag");
					$(".flag").animate({
							left : parseInt($(".flag").css("left")) + 533 + "px"
						},500);
					for(let i = 0,len = nexts.length; i < len; i++){
						$(nexts[i]).animate({
							left : parseInt($(nexts[i]).css("left")) + 533 + "px"
						},500);
					}
				}

				//向右滑动
				if(_left > fLeft){
					let prevs = $(this).prevUntil(".flag");
					$(this).animate({
						left : parseInt($(this).css("left")) - 533 + "px"
					},500);
					for(let i = 0,len = prevs.length; i < len; i++){
						if(parseInt($(prevs[i]).css("left")) > 0){
							$(prevs[i]).animate({
								left : parseInt($(prevs[i]).css("left")) - 533 + "px"
							},500);
						}
					}
				}

				// 保证当前图片盒子有flag类名
				$(this).siblings().removeClass("flag");
				$(this).addClass("flag");
			});
		});
	});
});