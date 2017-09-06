//Game沙箱模型
(function(window){
	function Game(option){
		this.ctx=option.ctx; //接受画布
		this.imgArr=['birds','land','sky','pipe1','pipe2'];  //所有的图片的名字
		this.roles=[];  //存放所有的角色
		this.timer=null;  //初始化时间定时器
		this.hero=null; //英雄

		//时间函数
		this.startTime=new Date(); //开始时间
    this.endTime=0;  //运动结束时间
    this.Dvalue=0;  //时间差值

    this.loadImg();  //创建第一步即加载图片  
	};
	//所有的方法添加至原型中
	Game.prototype={
		constructor:Game,  //原型替换,将constructor属性指向回Game;
		//1.游戏开始函数
		start:function(){
			var that=this;  //缓存指针
			this.loadImg(function(imgList){
				//创建游戏图片对象
				that.initGame(imgList);
				//用户控制
				that.userControl();
				//定时器不停渲染
					console.log(that.roles);
			  	that.timer=setInterval(function(){
					that.endTime=new Date();  //结束时间
          that.Dvalue=that.endTime-that.startTime; //时间间隔
          that.startTime=that.endTime; //结束时间赋给开始时间
          that.ctx.clearRect(0,0,that.ctx.canvas.width,that.ctx.canvas.height);
          that.ctx.beginPath(); //开始新路径
          that.rander(that.Dvalue);  //不停的渲染
          //不停的检测碰撞
          that.imapct();
				},30)
			});
		},
		//2.游戏图片加载
		//参数为回调函数，只为先执行loadImg函数，执行完，传递图片对象
		//回调函数用于先执行什么函数,执行完再做什么操作
		loadImg:function(callback){
			var imgList={};  //键值对，存放所有图片对象，创建游戏对象时需要
			var count=0;  //记录成功加载的图片数 
			var that=this;  //缓存对象指针
			//循环创建对象
			for (var i = 0; i < this.imgArr.length; i++) {
				var obj=this.imgArr[i];
				var img=new Image();  //创建图片对象
				img.src="imgs/"+obj+".png";
				imgList[obj]=img;
				img.onload=function(){
					count++;
					if(count==that.imgArr.length){
						callback&&callback(imgList);  //执行回调函数
					}
				}
			}
		},
		//3.初始化游戏对象
		initGame:function(imgList){
			var imgList=imgList;  //接受图片对象
		  //天空
      for (var i = 0; i < 3; i++) {
        var sky=new Game.Sky({
          ctx:this.ctx,
          img:imgList["sky"],
          index:i
        });
        this.roles.push(sky);  //添加至role对像数组中
      }
      //柱子
      for (var i = 0; i < 5; i++) {
        var pipe=new Game.Pipe({
          ctx:this.ctx,
          upImg:imgList['pipe2'],
          downImg:imgList['pipe1'],
          index:i
        });
        this.roles.push(pipe);  //添加至role中
      }
			//初始化大地
			for (var i = 0; i < 4; i++) {
				var land=new Game.Land({
					ctx:this.ctx,
					img:imgList["land"],
					index:i
				});
				this.roles.push(land);  //所有的大地角色添加至roles数组中
			};
		  //鸟
      var bird=new Game.Bird({
          ctx:this.ctx,
          img:imgList['birds']
      })
      this.roles.push(bird);
      this.hero=bird;//英雄
		},
		//4.渲染游戏对象
		rander:function(Dvalue){

			for (var i = 0; i < this.roles.length; i++) {
				var obj=this.roles[i];
				obj.rander(Dvalue);

			}
		},
		//5.碰撞检测
		imapct:function(){
			console.log(this.hero.y);
		  	if (this.ctx.isPointInPath(this.hero.x,this.hero.y)||this.hero.y<0||this.hero.y>this.ctx.canvas.height-112){
		  		 //如果碰到,清除定时器
            clearInterval(this.timer);
		  	}
		},
		//6.用户控制
		userControl:function(){
			var that=this; //缓存指针
	  	window.onclick=function(){
	  		that.hero.speed=-0.3;
	  	}
		},
		//7.游戏结束
		gameOver:function(){

		}
	}

	window.Game=Game;
})(window)