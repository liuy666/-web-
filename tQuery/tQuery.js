;
(function(){
	function tQuery(selector) {
		return document.querySelectorAll(selector);
	};

	tQuery.prototype = {
		/**
		 * 产生随机整数，包含下限值，但不包括上限值
		 * @parm {number} lower 表示下限值
		 * @parm {number} upper 表示上限值
		 * @return {number} 返回一个位于lower和upper之间的随机值，包含lower，不包含upper
		 */
		 random : function(lower,upper) {
		 	return Math.floor(Math.random() * (upper - lower)) + lower;
		 },


	 	/**
		  * 生成随机验证码，验证码字符可以包含字母(大/小写)和数字
		  * @parm {number} length 可选参数，定义验证码的长度，无参数时默认四位
		  * @return {string} code 返回一个指定长度的验证码
		  */
	 	generateValidateCode : function(length) {
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
		 		var randomValue = random(48,123)   //生成48-122的随机整数
			 	if(randomValue >= 65 && randomValue <= 90 ||
			 		randomValue >= 97 && randomValue <= 122 ||
			 		randomValue >= 48 && randomValue <= 57){
			 		code += String.fromCharCode(randomValue);
			 	}
		 	}
		 	return code;
	 	}
	};
	window.t$ = window.tQuery = tQuery;

})();