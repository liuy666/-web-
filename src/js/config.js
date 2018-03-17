require.config({
	baseUrl : "/",
	paths : {
		jquery : "lib/jquery/jquery-1.12.4.min",
		cookie : "lib/jquery_plugins/jquery-cookie-master/jquery.cookie",
		template : "lib/artTemplate/template",
		carousel : "lib/jquery_plugins/ly-jquery-carousel",
		zoom : "lib/jquery_plugins/jquery.elevateZoom-3.0.8.min",
		load : "js/loadHeaderFooter"
	},
	shim : {
		carousel : {
			deps : ["jquery"]
		},
		zoom : {
			deps : ["jquery"]
		}
	}
});