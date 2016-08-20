var listData=
		[
		{"hospital":"深圳恒生医院","reportTitle":"超声波检测报告1","reportId":"0","testPic":"test_0.jpg","isReaded":false},
		{"hospital":"深圳恒生医院","reportTitle":"超声波检测报告2","reportId":"1","testPic":"test_1.jpg","isReaded":false},
		{"hospital":"深圳恒生医院","reportTitle":"超声波检测报告3","reportId":"2","testPic":"test_2.jpg","isReaded":false},
		{"hospital":"深圳恒生医院","reportTitle":"超声波检测报告4","reportId":"3","testPic":"test_3.jpg","isReaded":false},
		{"hospital":"深圳恒生医院","reportTitle":"超声波检测报告5","reportId":"4","testPic":"test_4.jpg","isReaded":false},
		{"hospital":"深圳恒生医院","reportTitle":"超声波检测报告6","reportId":"5","testPic":"test_5.jpg","isReaded":false},
		{"hospital":"深圳恒生医院","reportTitle":"超声波检测报告7","reportId":"6","testPic":"test_6.jpg","isReaded":false},
		{"hospital":"深圳恒生医院","reportTitle":"超声波检测报告8","reportId":"7","testPic":"test_7.jpg","isReaded":false},
		{"hospital":"深圳恒生医院","reportTitle":"超声波检测报告9","reportId":"8","testPic":"test_0.jpg","isReaded":false},
		{"hospital":"深圳恒生医院","reportTitle":"超声波检测报告10","reportId":"9","testPic":"test_1.jpg","isReaded":false},
		{"hospital":"深圳恒生医院","reportTitle":"超声波检测报告11","reportId":"10","testPic":"test_2.jpg","isReaded":false},
		{"hospital":"深圳恒生医院","reportTitle":"超声波检测报告12","reportId":"11","testPic":"test_3.jpg","isReaded":false}
		]




document.onkeydown = grabEvent;
function grabEvent(_event){
	if (_event.type == 'keydown') {
		document.onkeypress = null;
	};
	var code = Event(_event);
	switch(code){
		case "KEY_UP": //
			control.clickTop();
			return 0;
			break;
		case "KEY_DOWN": //
			control.clickDown();
			return 0;
			break;
		case "KEY_LEFT": //
			control.clickLeft();
			return 0;
			break;
		case "KEY_RIGHT": //
			control.clickRight();
			return 0;
			break;		
		case "KEY_PAGE_UP": //
			listObj.pageObj.changPage(-1);
			return false;
		case "KEY_PAGE_DOWN": //
			listObj.pageObj.changPage(1);
			return false;					
		case "KEY_RED": //
			keyRedEvent.changeStatus();
			return false;
		case "KEY_GREEN": //			
			if(!keyRedEvent.flag)location.href = "index.html";
			return false;
			break;
		case "KEY_SELECT": //	
			control.clickSelect();
			return 0;
			break;
		case "KEY_EXIT":
		case "KEY_BACK":
			window.history.back()
			return false;
			break;
		default:
			break;
	}
}
window.onload = init;
function init(){
	loadingDiv = $('loadingDiv');
	userId = Q.getInt("userId","20160801");
	control.init();
}

var keyRedEvent = {
	flag : false,
	changeStatus : function(){
		this.flag = !this.flag;
		$("info").style.opacity = !!this.flag ? 1 : 0;
		$("info_cont").style.webkitTransform = !!this.flag ? "scale(1)" : "scale(0)";
	}
}





var listObj={
	$focusDiv:this.$("content_focus"),
	x:0,
	y:0,
	focusPos:0,
	visible:false,
	wStep:328,
	hStep:127,
	pageSize:9,
	rowSize:3,
	colSize:3,
	data:[],
	pageNum:0,
	render:function(){
		// var _listData=this.data;
		// len=this.dataSize<this.pageSize?this.dataSize:this.pageSize;		
		// for (var i = 0; i <len; i++) {
		// 	$("hospital_"+i).innerText=_listData[i].hospital;
		// 	$("reportTitle_"+i).innerText=_listData[i].reportTitle;
		// 	this.show("Listitem_"+i);
		// };
		// this.focus();
	},	
	init:function(){
		this.data=listData;
		// this.dataSize=this.data.length;
		this.pageObj.init();

	},
	focus:function(){
		this.$focusDiv.style.opacity = 1;
		this.$focusDiv.style.visibility = 'visible';
	},
	blur:function(){
		this.$focusDiv.style.opacity = 0;
		this.$focusDiv.style.visibility = 'hidden';
	},
	resetFocus:function(x,y){
		this.x=x;
		this.y=y;
		this.changeFocus();
		this.focusPos=this.y*this.colSize+this.x;

	},
	changeX:function(num){//num=1或者num=-1
		var _num=num;
		if (_num==1) {
			if (
				this.y*this.colSize+this.x==this.dataSize-1) {					
				return false;
			}else if (this.isRight()) {
				this.x=0;
				this.y=this.y+1;				
			}else{
				this.x=this.x+_num;
			}
		}else if (_num==-1) {
			if (
				this.y*this.colSize+this.x==0) {				
				return false;
			} else if (this.isLeft()) {
				this.x=this.colSize-1;
				this.y=this.y-1;				
			}else{
				this.x=this.x+_num;
			}			
		};;
			this.changeFocus();
			this.focusPos=this.focusPos+_num;
			
		
		

	},
	changeY:function(num){
		var _num=num;
		var oldY=this.y;
		
		if (_num==1) {
			if(this.isBottom()){//最后一行
				this.pageObj.changPage(1);
				return false;
			}else{
				this.y=this.y+_num;
			}
		}else if (_num==-1) {
			if(this.isTop()){
				this.pageObj.changPage(-1);
				return false;
			}else{
				this.y=this.y+_num;
			}		
		};;
			this.changeFocus();
			this.focusPos=this.focusPos+_num*this.colSize;
			console.log(this.focusPos);

	},
	changeFocus:function(){
		this.$focusDiv.style.left=this.x*this.wStep-74+"px";
		this.$focusDiv.style.top=this.y*this.hStep-78+"px";
	},
	clickSelect:function(){
		control.focusArea=1;
		testList.listPos=this.pageObj.pageSize*(this.pageObj.pageNum-1)+this.focusPos;
		testList.showList();
	},
	isTop:function(){
		return this.y==0;
	},
	isBottom:function(){
		return this.y==Math.ceil(this.dataSize/this.colSize)-1;
	},
	isLeft:function(){
		return this.x==0;
	},
	isRight:function(){
		return this.x==(this.colSize-1);
	},

	pageObj:{
		data:[],
		pageNum:1,
		totalPage:0,
		dataSize:0,
		pageSize:0,
		init:function(){
			this.data=listData;
			this.pageSize=listObj.pageSize;
			var len=this.data.length;
			if (len=0) {
				return false;
			};
			this.totalPage=Math.ceil(this.data.length/this.pageSize);		
			if (this.data.length>0) {
				this.goPage(1);
				listObj.focus();
			};
		},
		changPage:function(num){
			if (num==1) {
				if (this.pageNum==this.totalPage ) {
					return false;
				}else{
					this.pageNum++;
				}
			}else if(num==-1){
				if (this.pageNum==1) {
					return false;
				}else{
					this.pageNum--;
				}
			}
			// this.pageNum= n>this.totalPage?this.totalPage:( n<1?1:n);
			this.goPage(this.pageNum);			
		},
		goPage:function(n){
			this.pageNum= n>this.totalPage?this.totalPage:( n<1?1:n);
			if (this.pageNum==this.totalPage) {
				this.dataSize=this.data.length%this.pageSize;
			}else{
				this.dataSize=this.pageSize;
			}
			listObj.dataSize=this.dataSize;			
			this.render(this.pageNum);
			this.showIcon();

		},
		render:function(n){
			var _listData=this.data;
			var sub=(n-1)*this.pageSize;					
			var up=sub+this.dataSize;
			this.clear();					
			for (var i =0; i <this.dataSize; i++) {
				$("hospital_"+i).innerText=_listData[sub+i].hospital;
				$("reportTitle_"+i).innerText=_listData[sub+i].reportTitle;
				this.show("Listitem_"+i);
				if (listData[i].isReaded) {
					$("readflag_"+testList.listPos).style.backgroundImage="";

				}; ;
			};
			listObj.resetFocus(0,0);
		},
		clear:function(){
			for (var i = 0,len=this.pageSize; i <len; i++) {
				// $("hospital_"+i).innerText="";
				// $("reportTitle_"+i).innerText="";
				this.hide("Listitem_"+i);
			};			
		},
		show:function(id){
			var el=$(id);
			el.style.visibility="visible" ;
		},
		hide:function(id){
			var el=$(id);
			el.style.visibility="hidden" ;
		},
		showIcon:function(){
		$("bt1_listObj").style.backgroundImage='url(images/'+(this.pageNum==1?"off":"on")+'_25x26.png)';
		$("bt2_listObj").style.backgroundImage='url(images/'+(this.pageNum==this.totalPage?"off":"on")+'_25x26.png)';			
		}		
	}

}
//============================================
var parmObj = {
	DivId:        "listImg_",           //行DIV的ID名称   
	focusId:      "listImg_focus",      //焦点的ID
	arrLength:     listData.length,                //数据总长度
	listSize:      1,               //显示DIV数
	rowHeight:     639,             //每次移动距离
	focusStartPos: -228,              //显示的第一个焦点	X或Y轴（这里是X）坐标
	direction:     "left",          //方向 top 纵向 left 横向
 	cycle:         1,              //0：不循环，1：循环  默认为0
//	pageType:      0,              //翻页形式，0：不翻页 1：翻页  默认为0
//	duration:      "200ms",        //速度，默认为300ms
};

var testList = null;
function initList(){
	testList = new listSlip(parmObj);
	testList.startline = 1; //起始行 从0开始数，默认为0 (注意：pageType=1，不起作用)
	testList.endline   = 1; //其实列 从0开始数,默认为最后一行(注意：pageType=1，不起作用)
	testList.firstFlag = true;//按向上的时候是否能滑到 第一行条目的位置 (注意：cycle=1，不起作用)
	testList.lastFlag = true;//按向下的时候是否能滑到 最后一行条目的位置; (注意：cycle=1，不起作用)
	//焦点位置默认为0，重新赋值或者焦点定位时必须在 文字输出之前
	testList.listPos = 1; 
	testList.focusPos = 1;	
	//输出文字
	testList.haveData = showText;
	testList.notData = clearText;
	testList.initInfo();

	//焦点定位处理
	// testList.focusObj.style.webkitTransitionDuration = "0ms";
	// testList.onfocus();
	testList.focusObj.style.webkitTransitionDuration = testList.duration;
	$("page").innerText = (testList.listPos == 0 ? parmObj.arrLength : testList.listPos) +"/"+ parmObj.arrLength;
	// $("listImg_focus").style.visibility = "visible";
	// $("listImg_focus").style.opacity = 0;
	testList.changeList=function(_num){
		this.changeFocus(_num);
		this.changReadStatus();
		this.showIcon();
		this.changPageText();

	};
	testList.showList=function(){
		$("testList").style.display="block";
		$("pageText").innerText = (testList.listPos+1) +"/"+ parmObj.arrLength;

	}
	testList.hidelist=function(){
		$("testList").style.display="none";
	}		
	testList.showIcon=function(){
		$("bt1_testList").style.backgroundImage='url(images/'+(this.listPos==0?"off":"on")+'_100x80.png)';
		$("bt2_testList").style.backgroundImage='url(images/'+( testList.listPos== parmObj.arrLength-1?"off":"on")+'_100x80.png)';
	}
	testList.changReadStatus=function(){
		if (testList.listPos<listObj.dataSize) {
			$("readflag_"+(testList.listPos)).style.backgroundImage="";
		};
		if (!listData[testList.listPos].isReaded) {
			listData[testList.listPos].isReaded=true;
		};	
	}
	testList.changPageText=function(){
		$("pageText").innerText = (testList.listPos < 0 ? parmObj.arrLength :(testList.listPos > parmObj.arrLength-1? 1:testList.listPos+1) ) +"/"+ parmObj.arrLength;
		
	}
}

function showText(_i,_pos){
	//$("listImg_"+ _i).innerHTML = json.contentList[_pos].publishTime.substring(0,10);
	$("listImg_"+_i).style.background = 'url(images/'+listData[_pos].testPic+')';
}

function clearText(_i){
	$("listImg_"+_i).style.background = "";
}



var control = {
	focusArea : 0,//[0,1]==[主菜单,频道内容]
	init : function(){
	  	listObj.init();
		initList();	
	},
	clickTop : function(){
		if(this.focusArea == 0){
			listObj.changeY(-1);
		}else if(this.focusArea == 1){
			return false;
		}
	},
	clickDown : function(){
		if(this.focusArea == 0){
			listObj.changeY(1);
		}else if(this.focusArea == 1){
			return false;
		}
	},
	clickRight : function(){
		if(this.focusArea == 0){
			listObj.changeX(1);
		}else if(this.focusArea == 1){
			testList.changeList(1);
		}
	},
	clickLeft : function(){
		if(this.focusArea == 0){
			listObj.changeX(-1);
		}else if(this.focusArea == 1){
			testList.changeList(-1);
		}
	},
	clickSelect : function(){
		if(this.focusArea == 0){
			listObj.clickSelect();
			control.focusArea=1;
		}else if(this.focusArea == 1){
			testList.hidelist();
			control.focusArea=0;
		}
	}
}
//==================================



function $(id){
 return document.getElementById(id);
}
