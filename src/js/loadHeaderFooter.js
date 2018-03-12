define(["jquery"],function(){
	// 加载除登录、注册外的页面头部
	$("header").load("/html/include/header.html");

	// 加载登录、注册的页面头部
	$(".header").load("/html/include/lrHeader.html")

	// 加载页面尾部
	$("footer").load("/html/include/footer.html");
});