// 引入需要的功能模块
let gulp = require("gulp"),  // gulp模块
	htmlmin = require("gulp-htmlmin"),  // html压缩
	connect = require("gulp-connect"),  // gulp服务器
	uglify = require("gulp-uglify"),  // js压缩
	imagemin = require("gulp-imagemin"),  // image压缩
	sass = require("gulp-sass"),  // sass编译
	babel = require("gulp-babel")  // ES6转码ES5
	_src = "src";  // 根目录

// 启动服务器
gulp.task("connect",function(){
	connect.server({
		root : _src,   // 根目录
		livereload : true,  // 是否自动浏览器刷新
		port : 8888   // 配置端口
	});
});

// 将模拟假数据(mock)、js库(lib)复制到 dist目录下
gulp.task("mock",function(){
	gulp.src("src/mock/**/*.*")
		.pipe(gulp.dest("dist/mock"));
});
gulp.task("lib",function(){
	gulp.src("src/lib/**/*.*")
		.pipe(gulp.dest("dist/lib"));
});
gulp.task("copyfile",["mock","lib"]);

// 定义sass编译压缩任务
gulp.task("sass",function(){
	gulp.src("src/sass/**/*.scss")
		.pipe(sass({outputStyle : "compressed"})) // 输出压缩格式css
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
gulp.task("default",["htmlmin","js","sass","image","copyfile","connect","watch"]);