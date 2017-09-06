//小鸟的沙箱模型
(function(Game){
	function Bird(option){
		this.ctx=option.ctx;  //接受画布信息
		this.img=option.img;  ///接受图片信息
		this.width=this.img.width/3;  //宽度、身高
		this.height=this.img.height; 
		this.index=0;  //当前帧图索引
		this.x=100;  //当前x,y位置
		this.y=100; 

		//小鸟运动参数
		this.speed=0;  //初始速度
		this.a=0.0005;  //加速度
		this.maxSpeed=0.5;  //最大速度
		this.angle=0; //初始运动角度
		this.maxAngle=45;  //最大角度
	}	
	Bird.prototype={
		constructor:Bird,  //原型替换，将原型指向回Bird小鸟
		rander:function(Dvalue){
		  this.speed=this.speed+this.a*Dvalue; //速度公式，得到当前速度
		  //最大速度判断
		  if(this.speed>this.maxSpeed){
		  	this.speed=this.maxSpeed;
		  }
		  this.angle=this.speed/this.maxSpeed*this.maxAngle;  //比例公式，得到当前角度
		  this.y=this.y+this.speed*Dvalue+this.a*Dvalue*Dvalue/2;  //当前运动距离

		  this.ctx.save();  //保存画布
		  this.ctx.translate(this.x,this.y);  //坐标系移动至小鸟的位置
		  this.ctx.rotate(this.angle*Math.PI/180);  //坐标系旋转相应角度-->转弧度
			this.ctx.drawImage(this.img,this.index*this.width,0,this.width,this.height,-this.width/2,-this.height/2,this.width,this.height);
			this.ctx.restore();  //恢复画布

			//索引++
			this.index++;
			this.index=this.index%3;  //取余0,1,2,相对索引
		},
		move:function(){

		},
	}
	Game.Bird=Bird;  //小鸟构造函数暴露给window对象
})(Game)