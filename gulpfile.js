let gulp = require("gulp"),
	htmlmin = require("gulp-htmlmin"),
	connect = require("gulp-connect"),
	css = require("gulp-clean-css"),
	uglify = require("gulp-uglify"),
	imagemin = require("gulp-imagemin"),
	sass = require("gulp-sass");

gulp.task("connect",function(){
	connect.server({
		root : "dist",
		livereload : true
	});
});

gulp.task("sass",function(){
	gulp.src("sass/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("css"))
		.pipe(connect.reload());
});

gulp.task("indexmin",function(){
	gulp.src("index.html")
		.pipe(htmlmin({collapseWhitespace : true}))
		.pipe(gulp.dest("dist"));
});

gulp.task("htmlmin",function(){
	gulp.src("html/*.html")
		.pipe(htmlmin({collapseWhitespace : true}))
		.pipe(gulp.dest("dist/html"));
});

gulp.task("css",function(){
	gulp.src("css/*.css")
		.pipe(css())
		.pipe(gulp.dest("dist/css"));
});

gulp.task("js",function(){
	gulp.src("js/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"));
});

gulp.task("image",function(){
	gulp.src("images/*")
		.pipe(imagemin())
		.pipe(gulp.dest("dist/images"));
});

gulp.task("watch",function(){
	gulp.watch("sass/*.scss",["sass"]);
});

gulp.task("default",["sass","js","image","htmlmin","indexmin","connect","watch"]);