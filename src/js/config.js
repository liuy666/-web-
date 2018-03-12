require.config({
	baseUrl : "/",
	paths : {
		jquery : "lib/jQuery/jquery-1.12.4.min",
		cookie : "lib/jquery-cookie-master/jquery.cookie",
		template : "lib/artTemplate-master/template",
		carousel : "lib/jquery_plugins/jquery.xmcarousel",
		zoom : "lib/jquery_plugins/jquery.elevateZoom-3.0.8.min",
		load : "js/loadHeaderFooter"
	},
	shim : {
		carousel : {
			deps : ["jquery"]
		}
	}
});