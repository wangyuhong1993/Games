// 管道沙箱模型
(function(Game){
	function Pipe(option){
		this.ctx=option.ctx;  //接受传递的画布
		this.upImg=option.upImg;  //接受传递的上管道图片
		this.downImg=option.downImg;  //接受传递的下管道图片
		this.width=this.upImg.width;  //定义管道的宽度45
		this.index=option.index||0;  //第几根管道索引信息
		this.spaceX=200;//x空白距离
		this.spaceY=150;
		this.x=(this.index+1)*this.spaceX;  //管道的x,y坐标
		this.y=0;  //上管道的高度
		this.setPos();  //初始化调用获取上管道长度
	}
	Pipe.prototype={
		construtor:Pipe,
		rander:function(){
			//运动公式
			this.x-=5;
			if(this.x<-this.spaceX){
				//当管道运动至-spaceX时，抽回到第五个位置
				this.x=4*this.spaceX;
			}
			var sy=this.upImg.height-this.y;  //上管道开始绘制相对于图片的y坐标
			//绘制上管道
		  this.ctx.drawImage(this.upImg,0,sy,this.width,this.y,this.x,0,this.width,this.y);
		  
		  //下管道的距离(画布高度-上管道高度-中间空白区域)
		  var dy=this.ctx.canvas.height-this.y-this.spaceY;
		  
		  //绘制下管道
		  this.ctx.drawImage(this.downImg,0,0,this.width,dy,this.x,this.y+this.spaceY,this.width,dy);
		  
		  //绘制碰撞路径
		  this.ctx.rect(this.x,0,this.width,this.y); //上官道区域
		  this.ctx.rect(this.x,this.y+this.spaceY,this.width,dy); //下管道区域
		 
		  // this.ctx.strokeStyle="red";
		  // this.ctx.stroke();
		},
		//随机获取一个高度
		setPos:function(){
			this.y=100+parseInt(Math.random()*100);
		}
	}
	Game.Pipe=Pipe;  //陆地构造函数暴露给window对象
})(Game)