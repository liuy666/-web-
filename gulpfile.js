// 引入需要的功能模块
let gulp = require("gulp"),
	htmlmin = require("gulp-htmlmin"),
	connect = require("gulp-connect"),
	uglify = require("gulp-uglify"),
	imagemin = require("gulp-imagemin"),
	sass = require("gulp-sass"),
	babel = require("gulp-babel")
	_src = "src";

// 启动服务器
gulp.task("connect",function(){
	connect.server({
		root : _src,
		livereload : true
	});
});

// 将模拟假数据、js库、php文件 复制到 dist目录下
gulp.task("mock",function(){
	gulp.src("src/mock/**/*.*")
		.pipe(gulp.dest("dist/mock"));
});
gulp.task("lib",function(){
	gulp.src("src/lib/**/*.*")
		.pipe(gulp.dest("dist/lib"));
});
gulp.task("php",function(){
	gulp.src("src/php/**/*.*")
		.pipe(gulp.dest("dist/php"));
});
gulp.task("copyfile",["mock","lib","php"]);

// 定义scss编译压缩任务
gulp.task("sass",function(){
	gulp.src("src/sass/**/*.scss")
		.pipe(sass({outputStyle : "compressed"}))
		.pipe(gulp.dest(_src + "/css"))
		.pipe(connect.reload());
});

// 定义html压缩任务
gulp.task("htmlmin",function(){
	gulp.src("src/**/*.html")
		.pipe(htmlmin({collapseWhitespace : true, minifyCSS : true, minifyJS : true}))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
});

// 定义js压缩任务
gulp.task("js",function(){
	gulp.src("src/js/**/*.js")
		.pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
});

// 定义图片压缩任务
gulp.task("image",function(){
	gulp.src("src/images/**/*.*")
		.pipe(imagemin())
		.pipe(gulp.dest("dist/images"));
});

// 定义监视任务
gulp.task("watch",function(){
	gulp.watch("src/sass/**/*.scss",["sass"]);
	gulp.watch("src/js/**/*.js",["js"]);
	gulp.watch("src/**/*.html",["htmlmin"]);
});

// 定义默认任务
gulp.task("default",["htmlmin","js","image","copyfile","sass","connect","watch"]);