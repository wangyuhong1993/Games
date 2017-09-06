// 陆地沙箱模型
(function(Game){
	function Land(option){
		this.ctx=option.ctx;  //接受传递的画布
		this.img=option.img;  //接受传递的图片
		this.width=this.img.width;
		this.height=this.img.height;
		this.index=option.index;  //陆地索引信息
		this.x=this.index*this.width;  //当前陆地块的坐标信息
		this.y=this.ctx.canvas.height-this.img.height;  //y坐标的起画节点为画布高度-图片高度		
		this.offsetX=this.x;  //定义一个offset函数控制陆地的一定距离
	}	
	Land.prototype={
		construtor:Land,
		rander:function(){
			//运动函数
			this.offsetX-=5; //运动公式
			if(this.offsetX<=this.x-this.width){
				//控制只运动一个陆地距离
				this.offsetX=this.x;
			}
			this.ctx.drawImage(this.img,0,0,this.width,this.height,this.offsetX,this.y,this.width,this.height);
		}
	}
	Game.Land=Land;  //陆地构造函数暴露给window对象
})(Game)