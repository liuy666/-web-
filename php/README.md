# 购物车与用户表结构：

### 购物车表的结构 `mall_carts`

	CREATE TABLE `mall_carts` (
	  `cid` int(11) NOT NULL auto_increment,
	  `uid` int(11) NOT NULL,
	  `pid` int(11) NOT NULL,
	  `title` varchar(255) collate utf8_unicode_ci NOT NULL,
	  `price` decimal(10,2) NOT NULL,
	  `amount` int(11) NOT NULL,
	  `img` varchar(255) collate utf8_unicode_ci NOT NULL,
	  `status` tinyint(1) NOT NULL,
	  PRIMARY KEY  (`cid`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;


### 用户表的结构 `mall_users`

	CREATE TABLE `mall_users` (
	  `uid` int(11) NOT NULL auto_increment,
	  `email` varchar(50) collate utf8_unicode_ci NOT NULL,
	  `password` varchar(50) collate utf8_unicode_ci NOT NULL,
	  `firstname` varchar(50) collate utf8_unicode_ci default NULL,
	  `lastname` varchar(50) collate utf8_unicode_ci default NULL,
	  `score` int(11) default '100',
	  `level` varchar(50) collate utf8_unicode_ci default 'VIP01',
	  `createtime` timestamp NULL default CURRENT_TIMESTAMP,
	  PRIMARY KEY  (`uid`),
	  UNIQUE KEY `email` (`email`)
	) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1;

# API接口说明

### 检测用户名(邮箱)是否存在

* 请求方式：GET
* URL：/php/check.php
* 参数：
	* email -- 邮箱地址，作为用户名
* 返回响应：JSON格式，如：


	{
	    "res_code":0,
	    "res_error":"",
	    "res_body":{
	        "status":0, // 0可用  1不可用
	        "message":"邮箱可用"
	    }
	}

### 注册

* 请求方式：POST
* URL：/php/register.php
* 参数：
	* email -- 邮箱地址，作为用户名
	* password -- 密码
	* firstname -- 名
	* lastname -- 姓
* 返回响应：JSON格式，如：


	{
	    "res_code":0,
	    "res_error":"",
	    "res_body":{
	        "uid":"3",
	        "email":"test@163.com",
	        "firstname":"小明",
	        "lastname":"吴",
	        "score":"100",
	        "level":"VIP01",
	        "createtime":"2018-03-01 10:41:56"
	    }
	}

### 登录

* 请求方式：POST
* URL：/php/login.php
* 参数：
	* email -- 邮箱地址，作为用户名
	* password -- 密码
* 返回响应：JSON格式，如：


	{
	    "res_code":0,
	    "res_error":"",
	    "res_body":{
	        "uid":"2",
	        "email":"xyz@163.com",
	        "firstname":"小明",
	        "lastname":"吴",
	        "score":"100",
	        "level":"VIP01",
	        "createtime":"2018-02-28 17:59:37"
	    }
	}

### 加载服务器已有保存购物车数据

* 请求方式：GET
* URL：/php/cart.php
* 参数：
	* action -- 操作类型，固定取值 "load"
	* uid -- 用户uid
* 返回响应：JSON格式，如：


	{
	    "res_code":0,
	    "res_error":"",
	    "res_body":{
	        "data":[
	            {
	                "cid":"7", // 购物车数据编号
	                "uid":"1", // 用户编号
	                "pid":"10", // 商品编号
	                "title":"test", // 商品标题
	                "price":"15.00", // 商品价格
	                "amount":"128", // 选购商品数量
	                "img":"test.jpg" // 商品图片
	            },
	            {
	                "cid":"8",
	                "uid":"1",
	                "pid":"1",
	                "title":"test1",
	                "price":"99.00",
	                "amount":"101",
	                "img":"1.jpg"
	            }
	        ]
	    }
	}

### 合并用户本地与服务器购物车信息

* 请求方式：GET
* URL：/php/cart.php
* 参数：
	* action -- 操作类型，固定取值 "combine"
	* uid -- 用户uid
	* products -- 待合并用户本地的购物车数据，JSON格式字符串，如：`[{"pid":1,"title":"test","price":15,"amount":13,"img":"test.jpg"},{"pid":2,"title":"test2","price":99,"amount":1,"img":"test2.jpg"}]`
* 返回响应：JSON格式，如：


	{
	    "res_code":0,
	    "res_error":"",
	    "res_body":{
	        "status":1,
	        "message":"success"
	    }
	}

### 新增购物车

* 请求方式：GET
* URL：/php/cart.php
* 参数：
	* action -- 操作类型，固定取值 "add"
	* uid -- 用户uid
	* pid -- 商品id
	* title -- 商品标题
	* price -- 商品价格
	* amount -- 选购数量
	* img -- 商品图片
* 返回响应：JSON格式，如：


	{
	    "res_code":0,
	    "res_error":"",
	    "res_body":{
	        "status":1,
	        "message":"success"
	    }
	}

### 修改购物车商品数量

* 请求方式：GET
* URL：/php/cart.php
* 参数：
	* action -- 操作类型，固定取值 "modify_amount"
	* uid -- 用户uid
	* pid -- 商品id
	* amount -- 修改后数量
* 返回响应：JSON格式，如：


	{
	    "res_code":0,
	    "res_error":"",
	    "res_body":{
	        "status":1,
	        "message":"success"
	    }
	}

### 删除购物车单件商品

* 请求方式：GET
* URL：/php/cart.php
* 参数：
	* action -- 操作类型，固定取值 "del_single"
	* uid -- 用户uid
	* pid -- 商品id
* 返回响应：JSON格式，如：


	{
	    "res_code":0,
	    "res_error":"",
	    "res_body":{
	        "status":1,
	        "message":"success"
	    }
	}

### 删除购物车选中商品(多件)

* 请求方式：GET
* URL：/php/cart.php
* 参数：
	* action -- 操作类型，固定取值 "del_multi"
	* uid -- 用户uid
	* pids -- 所有待删除商品id，字符串，用逗号分隔各id，如：3,5,7,9
* 返回响应：JSON格式，如：


	{
	    "res_code":0,
	    "res_error":"",
	    "res_body":{
	        "status":1,
	        "message":"success"
	    }
	}

### 清空购物车

* 请求方式：GET
* URL：/php/cart.php
* 参数：
	* action -- 操作类型，固定取值 "clear"
	* uid -- 用户uid
* 返回响应：JSON格式，如：


	{
	    "res_code":0,
	    "res_error":"",
	    "res_body":{
	        "status":1,
	        "message":"success"
	    }
	}