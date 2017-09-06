//天空的沙箱模型
(function(Game){
	function Sky(option){
		this.ctx=option.ctx;  //接受画布信息
		this.img=option.img;  ///接受图片信息
		this.height=this.ctx.canvas.height;  //高度、宽度(根据高度自适应) 
		this.width=this.height/this.img.height*this.img.width;    
		this.index=option.index||0;  //当前帧图索引
		this.x=this.index*this.width;  //当前x,y位置
		this.y=0; 
		this.offsetX=this.x;  //定义一个offset函数控制天空的移动距离
	}	
	Sky.prototype={
		constructor:Sky,  //原型替换，将原型指向回Bird小鸟
		rander:function(Dvalue){
			this.offsetX-=5; 
			if(this.offsetX<=this.x-this.width){
				this.offsetX=this.x;
			}
			this.ctx.drawImage(this.img,this.index*this.width,0,this.width,this.height,this.x,0,this.width,this.height);
		}
	}
	Game.Sky=Sky;  //小鸟构造函数暴露给window对象
})(Game)