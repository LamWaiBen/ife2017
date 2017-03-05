window.onload = function(){
	game.load();
}
var game={
	oWrap: $("#game"),
	size:{x:10,y:8},
	lv:0,
	tempMap:[],
	stepNum:0,
	step:[],
	load:function(){
		$(".pre_lv").click(game.pre);
		$(".next_lv").click(game.next);
		$("#select_lv").change(function(){
			game.lv = Number($("#select_lv").val());
			game.mapchange();
		});
		this.map(game.Data[game.lv]);
		this.personControl();
	},
	map:function(data){
		let x= this.size.x , y = this.size.y;
		this.oWrap.html("");
		this.tempMap = data;
		for(let i = 0 ; i < y ; i++){
			for(let j =0 ; j < x ; j++){
				switch(data[i][j]){
					case 0 :
						game.createElement().className='empty';
						break;
					case 1 :
						game.createElement().className='wall';
						break;
					case 2 :
						game.createElement().className='box';
						break;
					case 3 :
						game.createElement().className='target';
						break;
					case 4 :
						game.createElement().className='person';
						this.step =[[j,i]];
						break;
				}
			}
		}
	},
	pre:function(){
		if(game.lv>0){
			game.lv-=1;
			game.mapchange();
		}else{
			alert("当前已是第一关");
		}
	},
	next:function(){
		if(game.lv<4){
			game.lv+=1;
			game.mapchange();
		}else{
			alert("当前已是最后一关");
		}
	},
	mapchange:function(){
		$(".levelNum")[0].innerHTML = game.lv+1;
		$("#select_lv").val(game.lv);
		game.map(game.Data[game.lv]);
	},
	createElement:function(){
		let ele = document.createElement("div");
		game.oWrap.append(ele);
		return ele;
	},
	personControl: function(){
		var self = this;
		document.onkeydown = function(ev){
			var position = self.step[self.step.length-1],
				x = position[0],
				y = position[1];
			var ev = ev || window.event,
			    keyCode = ev.keyCode;
			    switch(keyCode){//0：空地，1：围墙，2：箱子，3：目标点，4：人物  5:箱子匹配  6：人物位于目标点
			    	case 37 : //left
			    		if(self.tempMap[y][x-1] == 0 ){
			    				self.tempMap[y][x-1] = 4 ;
			    				self.oWrap.find("div")[y*10+x-1].className="person";
			    			if(self.tempMap[y][x] == 6){
			    					self.tempMap[y][x] = 3
			    					self.oWrap.find("div")[y*10+x].className="target";
			    				}else{
			    					self.tempMap[y][x] = 0;
			    					self.oWrap.find("div")[y*10+x].className="empty";
			    				};
			    			self.step.push([x-1,y]);  
			    		}else if(self.tempMap[y][x-1] == 3){
			    				self.tempMap[y][x-1] = 6 ;
			    				self.oWrap.find("div")[y*10+x-1].className="person2";
			    				if(self.tempMap[y][x] == 6){
			    					self.tempMap[y][x] = 3
			    					self.oWrap.find("div")[y*10+x].className="target";
			    				}else{
			    					self.tempMap[y][x] = 0;
			    					self.oWrap.find("div")[y*10+x].className="empty";
			    				};
			    			self.step.push([x-1,y]);
			    		}else if(self.tempMap[y][x-1] == 2){
			    			if(self.tempMap[y][x-2] == 0 ){
			    				self.tempMap[y][x-2] = 2 ;
			    				self.tempMap[y][x-1] = 4 ;
			    				if(self.tempMap[y][x] == 6){
			    					self.tempMap[y][x] = 3
			    					self.oWrap.find("div")[y*10+x].className="target";
			    				}else{
			    					self.tempMap[y][x] = 0;
			    					self.oWrap.find("div")[y*10+x].className="empty";
			    				};
			    				self.oWrap.find("div")[y*10+x-2].className="box";
			    				self.oWrap.find("div")[y*10+x-1].className="person";
			    				self.step.push([x-1,y]);
			    			}else if(self.tempMap[y][x-2] == 3){
			    				self.tempMap[y][x-2] = 5 ;
			    				self.tempMap[y][x-1] = 4 ;
			    				if(self.tempMap[y][x] == 6){
			    					self.tempMap[y][x] = 3
			    					self.oWrap.find("div")[y*10+x].className="target";
			    				}else{
			    					self.tempMap[y][x] = 0;
			    					self.oWrap.find("div")[y*10+x].className="empty";
			    				};
			    				self.oWrap.find("div")[y*10+x-2].className="match";
			    				self.oWrap.find("div")[y*10+x-1].className="person";
			    				self.step.push([x-1,y]);
			    			}else{
			    				return
			    			}
			    		}else if(self.tempMap[y][x-1] == 5 && ((self.tempMap[y][x-2] == 0)|| self.tempMap[y][x-2] ==3)){
		    				if(self.tempMap[y][x] == 6){
		    					self.tempMap[y][x] = 3
		    					self.oWrap.find("div")[y*10+x].className="target";
		    				}else{
		    					self.tempMap[y][x] = 0;
		    					self.oWrap.find("div")[y*10+x].className="empty";
		    				};
		    				if(self.tempMap[y][x-2] == 0){
			    				self.tempMap[y][x-2] = 2;
		    					self.oWrap.find("div")[y*10+x-2].className="box";
		    				}else if(self.tempMap[y][x-2] ==3){
		    					self.tempMap[y][x-2] = 5;
		    					self.oWrap.find("div")[y*10+x-2].className="match";
		    				}else{
		    					return;
		    				}
			    			self.tempMap[y][x-1] = 6;
		    				self.oWrap.find("div")[y*10+x-1].className="person2";
		    				self.step.push([x-1,y]);
			    		}else{
			    			return
			    		}
			    		break;
			    	case 38 : //up

			    		break;
			    	case 39 : // right

			    		break;
			    	case 40 : //down

			    		break; 
			    }
			    
		}
	},
	//1.遍历全图    2.遍历X/Y轴   3.只改变
	personMove: function(x,y){ 

	},
	perStep : function(){

	},
	passLevel : function(){

	},
	//10x8格子  0：空地，1：围墙，2：箱子，3：目的地，4：人物
	Data:[
		[
		  [0,3,0,3,3,0,3,2,0,4],
	      [0,0,0,1,1,1,0,0,0,0],
	      [0,0,1,1,3,3,1,0,0,0],
	      [0,0,1,3,2,2,0,1,0,0],
	      [0,0,1,0,0,0,0,1,0,0],
	      [0,0,1,1,1,1,1,1,0,0],
		  [0,0,0,0,0,0,0,0,0,0],
	      [0,0,0,0,0,0,0,0,0,0],
	    ],
	    [
	      [0,0,1,1,1,1,1,0,0,0],
	      [0,0,1,0,0,1,1,1,0,0],
	      [0,0,1,4,2,0,0,1,0,0],
	      [0,1,1,1,0,1,0,1,1,0],
	      [0,1,3,1,0,1,0,0,1,0],
	      [0,1,3,0,0,0,1,0,1,0],
	      [0,1,3,2,0,0,2,0,1,0],
	      [0,1,1,1,1,1,1,1,1,0]
	    ],
	    [
	      [0,0,0,1,1,1,1,1,1,0],
	      [0,1,1,1,0,0,0,0,1,0],
	      [1,1,3,0,2,1,1,0,1,1],
	      [1,3,3,2,0,2,0,0,4,1],
	      [1,3,3,0,2,0,2,0,1,1],
	      [1,1,1,1,1,1,0,0,1,0],
	      [0,0,0,0,0,1,1,1,1,0],
	      [0,0,0,0,0,0,0,0,0,0]
	    ],[//漏了一个
	      [0,1,1,1,1,1,1,1,0,0],
	      [0,1,0,0,0,0,0,1,1,1],
	      [1,1,2,1,1,1,0,0,0,1],
	      [1,0,4,0,2,0,0,2,0,1],
	      [1,0,3,3,1,0,2,0,1,1],
	      [1,1,3,3,1,0,0,0,1,0],
	      [0,1,1,1,1,1,1,1,1,0],
	      [0,0,0,0,0,0,0,0,0,0]
	    ],[
	      [0,0,0,0,0,0,0,0,0,0],
	      [0,1,1,1,1,1,1,1,0,0],
	      [0,1,0,0,0,0,0,1,1,1],
	      [1,1,2,1,1,1,0,0,0,1],
	      [1,0,4,0,2,0,0,2,0,1],
	      [1,0,3,3,1,0,2,0,1,1],
	      [1,1,3,3,1,0,0,0,1,0],
	      [0,1,1,1,1,1,1,1,1,0]
	    ]
	],
}