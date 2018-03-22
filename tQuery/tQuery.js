;
(function(){
	function tQuery(selector) {
		return new tQuery.prototype.init(selector);
	};

	tQuery.fn = tQuery.prototype = {
		init : function(selector) {
			let nodelist = document.querySelectorAll(selector);
			for(let i = 0, len = nodelist.length; i < len; i++){
				this[i] = nodelist[i];
			}
			this.length = nodelist.length;
			return this;
		},
	 	extend : function(object){
	 		for(let attr in object){
	 			tQuery.fn[attr] = object[attr];
	 		}
	 	},
	 	/**
		 * 获取/设置指定元素的CSS属性值
		 * @param element 指定DOM元素
		 * @param attr css样式中的属性名，字符串，或设置属性用到的对象
		 * @param value 属性值，可选
		 * @return 返回查找到指定CSS属性的值
		 */
		function css(element,attr,value){
			// 传递的 attr 参数为对象的结构[属性名：属性值]，表示设置CSS属性
			if(typeof attr === "object"){
				for(var attrName in attr)
					element.style[attrName] = attr[attrName];
			}else if(typeof attr === "string"){// 传递的 attr 为字符串，则可能为获取CSS样式，也可能是为某单个CSS属性设置值
				//当没有传递value时，表示获取属性值
				if(typeof value === "undefined")
				//从内部或外部样式表中获取css样式的兼容方法
				return window.getComputedStyle 
							? window.getComputedStyle(element)[attr]
							: element.currentStyle[attr];
				//否则设置指定元素的CSS属性值
				element.style[attr] = value;
			}
			return this;
		}
	};

	/**
	 * 产生随机整数，包含下限值，但不包括上限值
	 * @parm {number} lower 表示下限值
	 * @parm {number} upper 表示上限值
	 * @return {number} 返回一个位于lower和upper之间的随机值，包含lower，不包含upper
	 */
	tQuery.random = function(lower,upper) {
 		return Math.floor(Math.random() * (upper - lower)) + lower;
	};
	/**
	 * 生成随机验证码，验证码字符可以包含字母(大/小写)和数字
	 * @parm {number} length 可选参数，定义验证码的长度，无参数时默认四位
	 * @return {string} code 返回一个指定长度的验证码
	 */
 	tQuery.gvCode = tQuery.generateValidateCode = function(length) {
	 	//unicode码
	 	//A~Z 65-90
	 	//a~z 97-122
	 	//0~9 48-57 
	 	var code = "";//存储生成的验证码
	 	//判断是否有参数传递
	 	// if(typeof length === "undefined")
	 	// 	length = 4;
	 	length = length || 4;  //  || 运算符短路操作的特性
	 	while(code.length < length){
	 		var randomValue = tQuery.random(48,123)   //生成48-122的随机整数
		 	if(randomValue >= 65 && randomValue <= 90 ||
		 		randomValue >= 97 && randomValue <= 122 ||
		 		randomValue >= 48 && randomValue <= 57){
		 		code += String.fromCharCode(randomValue);
		 	}
	 	}
	 	return code;
 	};
 	tQuery.extend = function(object) {
 		for(let attr in object){
 			tQuery[attr] = object[attr];
 		}
 	};

	tQuery.prototype.init.prototype = tQuery.prototype;
	window.t$ = window.tQuery = tQuery;

})();