(function(){
	
	 /**
	  * 解决数组ES6新增API:indexOf()不兼容 IE9 以下浏览器问题
	  * 找出数组中元素第一次出现的位置
	  * @parm value 待查找元素 
	  * @parm {Array} array 待查找数组
	  * @return 返回查找到的数组元素的位置
	  */
	function inArray(value,array){
		 // 浏览器支持使用数组的 indexOf() 方法
		if(Array.prototype.indexOf)
			return array.indexOf(value);

		// 浏览器不支持使用数组的 indexOf() 方法
		for(var i = 0,len = array.length; i < len; i++){
			if(array[i] === value)
				return i;
		}
		return -1;
	}

	 /**
	  * 解决IE9以下浏览器不兼容根据类名查找元素的问题
	  * @parm str {string} 表示要查找的类名 
	  * @parm context 可选参数 查找上下文DOM对象,默认使用 document
	  * @return result {Array} 返回一个含有指定类名的元素集合
	  */
	function getElementsByClassName(str,contextObject){ 
		contextObject = contextObject || document;
		if(contextObject.getElementsByClassName)//浏览器支持类名查找
			return contextObject.getElementsByClassName(str);

		// 浏览器不支持类名查找
		var result = [];  
		// 获取contextObject下所有元素
		var tags = contextObject.getElementsByTagName("*");
		// 遍历获取到的元素集合，这里的tags不是数组
		for(var i = 0,len = tags.length; i < len; i++){
			// 把遍历到的元素的类名分割存入数组
			var classNames = tags[i].className.split(" ");
			// 遍历上面分割得到的数组，查询是否存在指定字符串str的类名
			if(inArray(str,classNames) !== -1) { 
				// 如果存在则向result 数组中插入查询到的元素
				result.push(tags[i]);
				//返回找到的指定类名的元素集合
				return result;
			 }    
		}
		//找不到则返回-1；
		return -1; 
	}



	 /**
	  * String对象的indexOf()不存在兼容问题，所以下面的方式似乎有些多余...
	  * 拓展 : 找出数组/字符串中元素第一次出现的位置
	  * @parm value 待查找元素 
	  * @parm object 待查找数组/字符串
	  * @return 返回查找到的数组下标/字符串索引
	  */
	function inObject(value,object){
		//判断待查找的是数组还是字符串
		var objectType = typeof object === "object"? Array : String;
			 // 浏览器支持使用 indexOf() 方法
			if(objectType.prototype.indexOf)
				return object.indexOf(value);
			// 浏览器不支持使用数组 indexOf() 方法
			else
				for(var i = 0,len = array.length; i < len; i++){
					if(array[i] === value)
						return i;
				}
		return -1;
	}



	 /**
	  * 根据传入的id、class类型、标签名（元素名），查找元素
	  * @parm {string} selector 要查找元素的css选择器 #id .class p 
	  * @parm {obj} contextObject 可选参数，查找上下文DOM对象，默认使用 document
	  * @return 返回查找到的DOM元素 或者 HTMLCollection （元素集合，类似于数组，但不是！）
	  */
	function $(selector,contextObject){
	  	//判断是否有可选参数传入
	  	// if(typeof content === "undefined")
	  	// 	contextObject = document;
	  	contextObject = contextObject || document;

	  	//可选方法 slice(0,1)、charAt(0)、indexOf
	  	if(selector.indexOf("#") === 0)
	  		return document.getElementById(selector.slice(1));//id 选择器
	  	if(selector.indexOf(".") === 0)
	  		return getElementsByClassName(selector.slice(1),contextObject);  //class选择器
	  	return contextObject.getElementsByTagName(selector);  //元素选择器
	}



	


	/**
	 * 注册事件监听
	 * @param element 需要注册事件监听的DOM元素
	 * @param {String} type 需要监听的事件
	 * @param callback 回调函数
	 */
	function on(element,type,callback){
		if(element.addEventListener){// 支持 addEventListener() 方法
			//如果事件类型以“on”开头,则去掉"on"
			type = type.slice(0,2) === "on" ? type.slice(2) : type;
			element.addEventListener(type,callback);
		}
		else{
			//如果事件类型不是“on”开头,则添加"on"
			type = type.slice(0,2) === "on" ? type : "on" + type;
			element.attachEvent(type,callback);
		}
	}



	/**
	 * Function.prototype.bind(thisArg)
	 * 事件委派delegate 改变函数中 this 的指向
	 * @param parentElement -- 需要委派事件监听的祖先元素
	 * @param {string} childSelector --子元素的类名 .class ID名 #id 标签名 DIV
	 * @param {String} type -- 事件类型
	 * @param callback 回调函数
	 */
	function delegate(parentElement,childSelector,type,callback){
		// 支持 addEventListener() 方法
		if(parentElement.addEventListener){
			// 如果事件类型以“on”开头,则去掉"on"
			type = type.slice(0,2) === "on" ? type.slice(2) : type;
			// 给祖先元素注册事件监听
			parentElement.addEventListener(type,function(event){
				// 获取触发事件的事件源元素
				var src = event.target;
				// 判断是哪种选择器
				var flag = childSelector.charAt(0);
				if(flag === ".")
					className = childSelector.slice(1);
				else if(flag === "#")
					id = childSelector.slice(1)
				else
					tagName = childSelector.toUpperCase();
				// 判断 childSelector 和事件源元素是否相同
				if(className === src.className || id === src.id || tagName === src.tagName){
					// callback中的 this 指向 src 所表示的对象
					var newCb = callback.bind(src);
					newCb(event);
				}
			});
		}else{// 兼容IE9以下浏览器
			//如果事件类型不是“on”开头,则添加"on"
			type = type.slice(0,2) === "on" ? type : "on" + type;
			parentElement.attachEvent(type,function(event){
				event = window.event;
				var src = event.srcElement;
				if(childSelector === src){
					var newCb = callback.bind(src);
					newCb(event);
				}
			});
		}
	}



	/**
	 * 移除事件监听
	 */
	function off(element,type,callback){
		if(element.removeEventListener){// 支持 removeEventListener 方法
			//如果事件类型以“on”开头,则去掉"on"
			type = type.slice(0,2) === "on" ? type.slice(2) : type;
			element.removeEventListener(type,callback);
		}
		else{
			//如果事件类型不是“on”开头,则添加"on"
			type = type.slice(0,2) === "on" ? type : "on" + type;
			element.detachEvent(type,callback);
		}
	}

	/**
	 * show
	 */
	function show(element){
		element.style.display = "block";
	}

	/**
	 * hide
	 */
	function hide(element){
		element.style.display = "none";
	}

	/**
	 * 获取/设置指定元素在文档中的坐标
	 * @param element 元素
	 * @param coordinates 可选参数，待设置的指定元素在文档中定位坐标 {top, left} = 鼠标在文档中的坐标 - 鼠标在指定元素中的坐标
	 * @return 返回坐标对象 {top, left}
	 */
	function offset(element,coordinates){
		// 获取
		if(typeof coordinates === "undefined"){
			var _top = 0,_left = 0;
			// 计算当前元素在文档中的坐标
			while(element !== null){
				_top += element.offsetTop;
				_left += element.offsetLeft;
				element = element.offsetParent;
			}
			// 返回坐标对象
			return {
				top : _top,
				left : _left
			};
		}

		// 设置
		var parentElement = element.offsetParent,
			_top = 0,_left = 0;
		// 计算父元素在文档中的坐标
		while(parentElement !== null){
			_top += parentElement.offsetTop;
			_left += parentElement.offsetLeft;
			parentElement = parentElement.offsetParent;
		}
		// 计算子元素在其父元素坐标系中的坐标定位
		_top = coordinates.top - _top;
		_left = coordinates.left - _left;
		// 修改css样式
		css(element,{
			top : _top + "px",
			left : _left + "px"
		});
	}

	// 各种兼容性封装
	// 格式化日期时间

	/**
	 * 产生一个随机的颜色rgb(a,b,c)
	 * @return {String} 产生的颜色值
	 */
	function generateRandomColor(){
		// 产生三个0-255 之间的随机数,代表三原色
		var red = random(0,256),
			yellow = random(0,256),
			blue = random(0,256);
		return "rgb(" + red + "," + yellow + "," + blue + ")";
	}


	/** 
	 * 简单的字符串转换操作
	 * 将字符串中特殊字符转换为HTML特殊符号，如将 < 转换为 &lt;
	 * @param str 待处理的字符串
	 * @returen 返回新的字符串;
	 */
	function encode(str){
		return str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
	}


	/** 
	 * 获取/保存cookie
	 * @param {String} key cookie名
	 * @param {String} value cookie值
	 * @param {Object} options 可选配置参数 {expires:7, path:"/", domain:"", secure:true}
	 */
	function cookie(key,value,options){
		//保存cookie
		if(typeof value !== "undefined"){
			// 连接cookie字符串 _cookie
			options = options || {};//判断是否有可选配置参数,没有设为空对象
			var _cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + "; ";
			// 判断是否失效时间
			if(options.expires){
				var date = new Date();
				date.setDate(date.getDate()+options.expires);
				_cookie += "expires=" + date.toUTCString() + "; ";
			}
			// 判断是否有路径
			if(options.path)
				_cookie += "path=" + options.path + "; ";
			// 判断是否有域设置
			if(options.domain)
				_cookie += "domain=" + options.domain + "; ";
			// 判断是否使用安全链接
			if(options.secure)
				_content += "secure";
			// 保存 cookie
			document.cookie = _cookie;
			return;
		}

		// 获取cookie
		var cookies = document.cookie.split("; ");//["key=value","expires=7"]
		for(var i = 0,len= cookies.length; i < len; i++){
			// 使用“=”将"key=value"的结构分割
			var parts = cookies[i].split("=");
			// 获得第一个“=”前面的属性名
			var name = decodeURIComponent(parts.shift());
			// 比较是否和待查找的 key 一致
			if(name === key){
				return decodeURIComponent(parts.join("="));
			}
		}
		return undefined;
	}

	/**
	 * cookie删除
	 * @param key cookie名
	 * @param options 可选参数 {expires:7, path:"/",domain:"",secure:true}
	 */
	function delCookie(key,options){
		options = options || {};
		options.expires = -1;
		cookie(key,"",options);
	}



	/**
	 * 运动框架封装
	 * @param element 要进行运动动画效果的DOM元素
	 * @param options  多属性运动终值对象 {left : "20px", top : "50px"}
	 * @param duration 运动持续的时间
	 * @param 可选参数 fn ,表示是否继续执行下一个运动动画
	 */
	function animate(element,options,duration,fn){
		// 清除当前元素上原有的计时器
		clearTimeout(element.timer);
		// 初始化 duration
		var durations = {
			normal : 1000,
			fast : 700,
			slow : 1500
		}
		duration = duration || 1000;
		if(typeof duration === "string" )
			duration = durations[duration] || 1000;

		// 遍历 options 初始化多属性的初值、范围值
		var _start = {},range = {};
		for(var attr in options){// attr 表示当前遍历到的属性
			_start[attr] = parseFloat(css(element,attr));
			range[attr] = parseFloat(options[attr]) - _start[attr];
		}
		// 记录计时器启动时间
		var _startTime = Date.now();
		// 启动计时器,并给当前对象添加 timer 属性,保存计时器 id
		element.timer = setInterval(function(){
			// 计算运动经过时间
			var elapsed = Math.min(Date.now() - _startTime, duration);
			// 遍历 options 利用公式计算当前步各属性运动值
			for(var attr in options){
				var value = range[attr] / duration * elapsed + _start[attr];
				// 修改当前步各属性的 css样式值
				css(element,attr,(attr === "opacity" ? value : value + "px"));
			}
			// 判断运动持续时间是否结束,如果是,则关闭计时器
			if(elapsed === duration){
				clearInterval(element.timer);
				fn && fn();  //等价于 if(fn) fn()  完全是更短的一种写法，它是安全的
			}
		},1000/60);// 运动频率 每秒 60 次
	}


	/**
	 * 淡入
	 */
	function fadeIn(element,duration,fn){
		show(element);
		element.style.opacity = 0;
		animate(element,{opacity : 1},duration,fn);
	}
	/**
	 * 淡出
	 */
	function fadeOut(element,duration,fn){
		animate(element,{opacity : 0},duration,function(){
			hide(element);
			fn && fn();
		});
	}



	/**
	 * 抛物线运动 公式： y = ax^2 + bx + c
	 * @param element 要做抛物线运动的元素
	 * @param reference 运动后的定位参考元素
	 * @param speed 可选 运动的时间 默认 1000ms
	 * @param 系数 a 可选 决定抛物线运动的开口方向和大小 默认为 0.005
	 */
	function parabola(element,reference,a,speed){
		// 只传一个可选参数且大于 1 则传入的为speed值  默认设置系数 a
		if(a > 1){
			speed = a;
			a = 0.005;
		}
		a = a || 0.005
		speed = speed || 1000;
			// 获取待运动元素和参考元素 在文档中的位置
		var e_location = offset(element),
			r_location = offset(reference),
			// 获得相对于坐标原点的位置 此时系数 c为 0
			x = r_location.left - e_location.left,
			y = r_location.top - e_location.top,
			// 计算系数 b
			b = (y - a * x * x) / x,
			// 记录计时器启动时间
			startTime = Date.now();
		// 启动计时器
		var timer = setInterval(function(){
			// 计算当前运动耗时
			var elapsed = Math.min(Date.now() - startTime ,speed);
			// 计算当前运动位置
			var _x = elapsed * x / speed,
				_y = a * _x * _x + b * _x;
			// 设置 css 样式 需要加上相对于坐标原点的初始位置
			css(element,{
				left : _x + e_location.left + "px",
				top : _y + e_location.top + "px"
			});
			// 判断运动持续时间是否结束,如果是,则关闭计时器
			if(elapsed === speed)
				clearInterval(timer);
		},1000/60);
	}


	/**
	 * 查找数字数组中最小值的下标
	 * @param array 待查找数字数组
	 * @return 最小值的下标
	 */
	function findMin(array){
		let min = array[0],index = 0;
		for(let j = 0,len = array.length; j < len; j++){
			if(array[j] < min){
				min = array[j];
				index = j;
			}
		}
		return index;
	}


	/**
	 * js实现瀑布流布局
	 * @param parent 父元素
	 * @param childs 所有图片盒子 子元素集合
	 */
	function waterfall(parent,childs){
			// 获得图片盒子的个数
		var len = childs.length,
			// 获得图片盒子的宽度
			imgWidth = childs[0].offsetWidth,
			// 计算包含框的宽度
			parentWidth = parent.clientWidth,
			// 计算图片盒子的列数
			cols = Math.floor(parentWidth / imgWidth),
			// 计算图片盒子间空白的宽度
			spaceWidth = (parentWidth - imgWidth * cols) / (cols + 1),
			// 存储当前列的索引
			currentColIndex = 0,
			// 存储每列的高度
			colHeight = new Array(cols);
		colHeight.fill(0);
		for(var i = 0; i < len; i ++){
			// currentColIndex = i % cols; //顺序排列
			currentColIndex = findMin(colHeight); // 每次查找最短的那列 并做添加图片盒子
			childs[i].style.left = spaceWidth * (currentColIndex + 1) + imgWidth * currentColIndex + "px";
			childs[i].style.top = colHeight[currentColIndex] + 10 + "px";
			colHeight[currentColIndex] += childs[i].offsetHeight + 10;
		}
	}
	/**
	 * ajax 
	 * @param {
	 *		method:"GET"|"POST" 请求方式，默认为 "GET"
	 *		url:"", 请求的资源url
	 *		data:{username:"", password:""}, 向服务器提交的数据
	 *		dataType: "json"|"text", 预期从服务器返回的数据格式
	 *		success : function(responseData){}, 请求成功执行的函数
	 *		error : function(msg){} 请求失败时执行的函数
	 * }
	 */
	function ajax({method = "GET",url,data,dataType = "json",success,error}){
		// 定义请求字符串
		var queryString = null;
		// 设置请求方式为大写
		method = method.toUpperCase();
		// 如果未传递url，则退出函数
		if(!url)
			return;
		// 如果有向服务器传送数据,则构建数据字符串
		if(data){
			queryString = [];
			for(var attr in data){
				queryString.push(attr + "=" + data[attr]);
			}
			queryString = queryString.join("&");
		}
		// 如果是GET请求，并且有向服务器传送数据，则构建请求字符串
		if(method === "GET" && queryString){
			url += "?" + queryString;
			queryString = null;
		}
		// 创建核心对象
		var xhr = new XMLHttpRequest();
		// 建立连接
		xhr.open(method,url,true);
		// 如果是post请求，则构建请求头信息
		if(method === "POST")
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		// 发送请求
		xhr.send(queryString);
		// 处理响应
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					// 获取响应文本
					var responseData = xhr.responseText;
					// 判断是否预期返回JSON数据
					if(dataType === "json")
						responseData = JSON.parse(responseData);
					// 如果有请求成功执行的函数，则调用
					success && success(responseData);
				} else 
					// 如果有请求失败执行的函数，则调用
					error && error(xhr.status,xhr.statusText);
			}
		}
	}
})();