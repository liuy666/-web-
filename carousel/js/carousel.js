function Carousel({width,height,duration,aImg,type}){
	this.width = width;
	this.height = height;
	this.duration = duration;
	this.aImg = aImg; // 存放轮播图片的数组，每个元素是个对象，包含图片的src href
	this.len = aImg.length;
	this.type = type;
	this.timer = null; // 计时器
	this.currIndex = 0;
	this.nextIndex = 1;
	this.lis = null;
	this.circles = null;
}

Carousel.prototype = {
	constructor : Carousel,
	init : function(container){
		let liHtml = "",
			iHtml = "";
		for(let i = 0; i < this.len; i++){
			liHtml += `<li><img src="${this.aImg[i].src}" alt="加载失败" /></li>`;
			iHtml += `<i></i>`;
		}
		liHtml = `
			<div class="carousel">
				<ul class="imgs">
					${liHtml}
				</ul>
				<div class="pages">${iHtml}</div>
				<div class="toLeft">&lt;</div>
				<div class="toRight">&gt;</div>
			</div>
		`;
		$(container).html(liHtml);
		$(".carousel",container).css({
			width : this.width,
			height : this.height,
			overflow : "hidden",
			position : "relative"
		});
		$(".imgs",container).css({
			width : (this.type === "fade" ? this.width : this.width * this.len),
			height : this.height,
			position : (this.type === "fade" ? "relative" : "absolute")
		});
		this.lis = $(".imgs li",container).css({
			width : this.width,
			height : this.height
		});
		if(this.type === "fade"){
			this.lis.css({
				position : "absolute",
				left : 0,
				top : 0,
				display : "none"
			}).first().show();
		} else 
			this.lis.css("float","left");

		this.circles = $(".pages",container).css({
			width : this.width
		}).children("i");

		let cHeight = parseInt(this.circles.css("height")),
			pHeight = parseInt($(".pages").css("height")),
			cWidth = parseInt(this.circles.css("width")),
			pWidth = this.width,
			_marginTop = (pHeight - cHeight) / 2,
			_marginLeft = (pWidth - cWidth * this.len) / (this.len + 1);
		this.circles.css({
			marginTop : _marginTop,
			marginLeft : _marginLeft
		}).first().css("background","#f00");
		

	}
}