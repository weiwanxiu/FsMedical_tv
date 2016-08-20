var subMenu =[
			{"name":"健康检测报告","icon":"images/pic_00.png","x":0,"y":0,"w":1,"h":2,"focusImg":"images/focus-454x294.png","type":1,"focusDiv":"content_0_00","link":""},
			{"name":"健康检测报告","icon":"images/pic_01.png","x":1,"y":0,"w":2,"h":1,"focusImg":"images/focus-220x294.png","type":2,"focusDiv":"content_0_01","link":""},
			{"name":"健康检测报告","icon":"images/pic_02.png","x":3,"y":0,"w":1,"h":2,"focusImg":"images/focus-220x294.png","type":0,"focusDiv":"content_0_03","link":""},
			{"name":"健康检测报告","icon":"images/pic_03.png","x":4,"y":0,"w":1,"h":1,"focusImg":"images/focus-220x294.png","type":0,"focusDiv":"content_0_04","link":""},
			{"name":"健康检测报告","icon":"images/pic_04.png","x":1,"y":1,"w":1,"h":1,"focusImg":"images/focus-220x140.png","type":0,"focusDiv":"content_0_11","link":""},
			{"name":"健康检测报告","icon":"images/pic_05.png","x":2,"y":1,"w":1,"h":1,"focusImg":"images/focus-220x140.png","type":0,"focusDiv":"content_0_12","link":""},
			{"name":"健康检测报告","icon":"images/pic_05.png","x":4,"y":1,"w":1,"h":1,"focusImg":"images/focus-220x140.png","type":0,"focusDiv":"content_0_12","link":""}
			
		]
var userInfo={
	"20160800":{
		"userId":"20160800",
		"name":"张三",
		"sex":"男",
		"age":"26",
		"weight":"76kg",
		"height":"176cm",
		"medicalHistory":"糖尿病",
		"":""
	},	
	"20160801":{
		"userId":"20160801",
		"name":"李四",
		"sex":"男",
		"age":"25",
		"weight":"76kg",
		"height":"176cm",
		"medicalHistory":"伤风感冒",
		"":""
	},	
	"20160802":{
		"userId":"20160802",
		"name":"王五",
		"sex":"男",
		"age":"23",
		"weight":"76kg",
		"height":"176cm",
		"medicalHistory":"心脏病",
		"":""
	},	
	"20160803":{
		"userId":"20160803",
		"name":"马六",
		"sex":"男",
		"age":"29",
		"weight":"76kg",
		"height":"176cm",
		"medicalHistory":"糖尿病",
		"":""
	},	
	"20160804":{
		"userId":"20160804",
		"name":"春梅",
		"sex":"女",
		"age":"5",
		"weight":"76kg",
		"height":"176cm",
		"medicalHistory":"禽流感",
		"":""
	},	
	"20160805":{
		"userId":"20160805",
		"name":"夏荷",
		"sex":"女",
		"age":"29",
		"weight":"76kg",
		"height":"176cm",
		"medicalHistory":"发烧",
		"":""
	},	
	"20160806":{
		"userId":"20160806",
		"name":"秋香",
		"sex":"女",
		"age":"56",
		"weight":"76kg",
		"height":"176cm",
		"medicalHistory":"哮喘",
		"":""
	},	
	"20160807":{
		"userId":"20160807",
		"name":"冬雪",
		"sex":"女",
		"age":"6",
		"weight":"76kg",
		"height":"176cm",
		"medicalHistory":"糖尿病",
		"":""
	}	
}


window.onerror=function(a,b,c,d,e,f){
	//alert(a+'||'+b+'||'+c+'||'+d+'||'+e+'||'+f);
};

document.onkeydown = grabEvent;
function grabEvent(_event){
	if (_event.type == 'keydown') {
		document.onkeypress = null;
	};
	var code = Event(_event);
	switch(code){
		case "KEY_UP": //
			if(!keyRedEvent.flag) subMenuObj.changeY(-1);
			return 0;
			break;
		case "KEY_DOWN": //
			if(!keyRedEvent.flag) subMenuObj.changeY(1);
			return 0;
			break;
		case "KEY_LEFT": //
			if(!keyRedEvent.flag) subMenuObj.changeX(-1);
			return 0;
			break;
		case "KEY_RIGHT": //
			if(!keyRedEvent.flag) subMenuObj.changeX(1);
			return 0;
			break;
		case "KEY_RED": //
			keyRedEvent.changeStatus();
			return false;
		case "KEY_GREEN": //
			 window.location.href = "index.html";
			return false;
			break;
		case "KEY_NUMBER1": //
		case "KEY_NUMBER2": //
		case "KEY_NUMBER3": //
		case "KEY_NUMBER4": //
		case "KEY_NUMBER5": //
		case "KEY_NUMBER6": //
		case "KEY_NUMBER7": //
		case "KEY_NUMBER8": //
		case "KEY_NUMBER9": //
			;
			return false;
			break;
		case "KEY_SELECT": //	
			subMenuObj.onSelect();
			return 0;
			break;
		case "KEY_EXIT":
		case "KEY_BACK":
          window.history.back();
			return false;
			break;
		default:
			break;
	}
}
window.onload = init;
var subPos = 0;
function init(){
	//loadingDiv = $('loadingDiv');
	subPos = Q.getInt("subPos",0);
	userId = Q.getInt("userId",20160801);
	showUserInfo(userId);
	subMenuObj.init();
}

var keyRedEvent = {
	flag : false,
	changeStatus : function(){
		this.flag = !this.flag;
		$("info").style.opacity = !!this.flag ? 1 : 0;
		$("info_cont").style.webkitTransform = !!this.flag ? "scale(1)" : "scale(0)";
	}
}



var currHours = new Date().getHours();
var subMenuObj = {
	$focusDiv:this.$("content_focus"),
	x:0,
	y:0,
	subPos:0,
	visible:false,
	wStep:236,
	hStep:236,
	leftOut : false,
	rightOut : false,
	popular : "", //在线人数基数
	clear:function(){
		// $("content").innerHTML = "";
		this.x = 0;
		this.y = 0;
		this.subPos = 0;
	},
	initAttr:function(){//焦点初始化
		// this.subPos = mainMenuObj.getPos();
		this.subPos = 0;
		this.updateFocus();
		this.focus();
	},
	init:function(){
		// subMenuObj.mainPos = menuBox.position;
		this.initAttr();
		// this.clear();
		// this.render();
	},
	render:function(){

	},
	setXY:function(){
		var item = subMenu[this.subPos];
		this.x = item.x;
		this.y = item.y;
	},
	point:function(position){
		this.subPos = position >subMenu.length - 1 ? 0 : position;
		this.setXY();
		this.updateFocus();
		this.focus();
	},
	focus:function(){
		this.$focusDiv.style.opacity = 1;
		this.$focusDiv.style.visibility = 'visible';
		//var item = subMenu[this.subPos];
		//this.focusContral(item.focusDiv);
	},
	blur:function(){
		this.$focusDiv.style.opacity = 0;
		this.$focusDiv.style.visibility = 'hidden';
		//var item = subMenu[this.subPos];
		//this.blurContral(item.focusDiv);
	},
	isTop:function(){
		return this.y == 0 || ((this.y == 1)&& subMenu[this.subPos].h == 2);
	},
	isBottom:function(){
		this.getSubPos();
		return this.y == 2 || ((this.y == 1)&& subMenu[this.subPos].h == 2);
	},
	getSubPos:function(){
		for(var i = 0 ; i < subMenu.length; i++){
			var item = subMenu[i];
			if(item.x <= this.x && this.x < (item.x + item.w) && item.y <= this.y && this.y < item.y + item.h){
				this.subPos = i;
				this.x = item.x;
				this.y = item.y; //计算因为形状非宽和高都大于1的时候光标初始化
				return this.subPos;
			}
		}
	},
	changeX:function(_num){
		var pre_obj = subMenu[this.subPos].focusDiv;
		this.resetX();
		if(_num > 0){
			this.x = this.x + subMenu[this.subPos].w;
		}else{ 
			this.x--;
		}
		
		if(this.x < 0){
			this.x = 0;
			this.touchLeft();
			return 0;
		}else if(this.x > 4){
			this.x = 4;
			this.touchRight();
			return 0;
		}
		//this.blurContral(pre_obj);
		this.getSubPos();
		this.updateFocus();
		//this.focusContral(subMenu[this.subPos].focusDiv);
	},
	resetX:function(){
		this.x = subMenu[this.subPos].x;
	},
	resetY:function(){
		this.y = subMenu[this.subPos].y;
	},
	touchLeft : function(){
		if(this.leftOut){
			subMenuObj.changeMenu(-1);
			this.focus();
		}
	},
	touchRight : function(){
		if(this.rightOut){
			subMenuObj.changeMenu(1);
			this.focus();
		}
	},
	updateFocus:function(){
		var item = subMenu[this.subPos];
		var focusDiv = this.$focusDiv;
		var width  = (item.w - 1) * this.wStep+214;
		var height = (item.h - 1) * this.hStep+214 ;
		var left   = (item.x - 0) * this.wStep-3;
		var top    = (item.y - 0) * this.hStep-3;
		//var focusImg = "url("+item.focusImg +")";
		focusDiv.style.width  = width  + "px";
		focusDiv.style.height = height + "px";
		focusDiv.style.left   = left   + "px";
		focusDiv.style.top    = top    + "px";
		// focusDiv.style.background = focusImg;
	},
	changeY:function(_num){
		//this.blurContral(subMenu[this.subPos].focusDiv);
		if(_num < 0 && this.isTop()){
			// subMenuObj.focusArea = 0;
			// this.blur();
			// $("menu_focus1").style.opacity = 1;
			return false;
		}else if(_num > 0 && this.isBottom()){
			//this.blur();
		}else if(_num > 0){
			this.y = this.y + subMenu[this.subPos].h;
		}else if(_num < 0){
			this.y = this.y - subMenu[this.subPos].h;
		}
		if(this.y < 0){
			this.y = 0;
		}else if(this.y > 1){
			this.y = 1;
		}
		this.getSubPos();
		this.updateFocus();
		//this.focusContral(subMenu[this.subPos].focusDiv);
	},
	fromUserStatus : function(_url){  //获取用户信息，做相应跳转
		// var backUrl = "index.html?subPos="+ menuBox.position;
		var backUrl = "index.html?subPos="+0;
		var url = _url.indexOf('?')>-1 ? _url : _url+'?';
		if(jsonUser == ""){
			showLoadingDiv();
			ajaxGetUser(function(_status){
				if(_status == 1){
					url += "&backUrl="+ Q.encode(backUrl);
					//showOrder(url);
					panelTop.init(0);
				}else{
					url += "&backUrl="+ Q.encode(backUrl);
					location.href = url;
				}					 
			});
		}else if(jsonUser.status == 1){
			url += "&backUrl="+ Q.encode(backUrl);
			//showOrder(url);	
			panelTop.init(0);
		}else{
			url += "&backUrl="+ Q.encode(backUrl);
			location.href = url;	
		}	
	},
	onSelect:function(){
		window.location.href='reportList.html?userId='+userInfo[""+userId].userId;
	},
	show:function(){
		if(!this.visible){
			this.visible = true;
			//$("subMenuDiv").style.visibility = "visible";
		}
	},
	hide:function(){
		if(this.visible){
			this.visible = false;
			//$("subMenuDiv").style.visibility = "hidden";
		}
	},
	focusContral : function(_focusObj){
		if(typeof(_focusObj) != "undefined"){
			$(_focusObj).style.webkitTransform = "scale(1.1,1.1)";
			$(_focusObj).style.zIndex = 5;
			//$("content0_focus").style.webkitTransform = "scale(1.1,1.1)";
		}
	},
	blurContral : function(_focusObj){
		if(typeof(_focusObj) != "undefined"){
			$(_focusObj).style.webkitTransform = "scale(1,1)";
			$(_focusObj).style.zIndex = 1;
			//$("content0_focus").style.webkitTransform = "scale(1,1)";
		}
	}
};
function showUserInfo(userId){
	var data=userInfo[userId];
	var userHtmlStr='姓名:'+data.name+'<br>性别:'+data.sex+'<br> 年龄:'+data.age+'<br>体重:'+data.weight+'<br>身高:'+data.height+'<br>病史:'+data.medicalHistory;
	$("userInfo").innerHTML=userHtmlStr;
	$("userId").innerHTML="ID:"+data.userId;
}

