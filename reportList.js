var listData=
		[
		{"hospital":"天河中医院0","reportTitle":"普通感冒伤风","reportId":"0","testPic":"test0.Jpeg"},
		{"hospital":"天河中医院1","reportTitle":"普通感冒伤风","reportId":"1","testPic":"test1.Jpeg"},
		{"hospital":"天河中医院2","reportTitle":"普通感冒伤风","reportId":"2","testPic":"test2.Jpeg"},
		{"hospital":"天河中医院3","reportTitle":"普通感冒伤风","reportId":"3","testPic":"test3.Jpeg"},
		{"hospital":"天河中医院4","reportTitle":"普通感冒伤风","reportId":"4","testPic":"test4.Jpeg"},
		{"hospital":"天河中医院5","reportTitle":"普通感冒伤风","reportId":"5","testPic":"test0.Jpeg"},
		{"hospital":"天河中医院6","reportTitle":"普通感冒伤风","reportId":"6","testPic":"test1.Jpeg"},
		{"hospital":"天河中医院7","reportTitle":"普通感冒伤风","reportId":"7","testPic":"test2.Jpeg"},
		{"hospital":"天河中医院8","reportTitle":"普通感冒伤风","reportId":"8","testPic":"test3.Jpeg"},
		{"hospital":"天河中医院9","reportTitle":"普通感冒伤风","reportId":"9","testPic":"test4.Jpeg"},
		{"hospital":"天河中医院10","reportTitle":"普通感冒伤风","reportId":"10","testPic":"test0.Jpeg"},
		{"hospital":"天河中医院11","reportTitle":"普通感冒伤风","reportId":"11","testPic":"test1.Jpeg"}
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
			if (this.focusPos>=this.dataSize-1) {
				return false;
			}else if ((this.focusPos+1)%this.colSize==0) {
				this.x=0;
				this.y=this.y+1;				
			}else{
				this.x=this.x+_num;
			}
		}else if (_num==-1) {
			if (this.focusPos<=0) {
				return false;
			}else if (this.focusPos%this.colSize==0) {
				this.x=this.colSize-1;
				this.y=this.y-1;				
			}else{
				this.x=this.x+_num;
			}			
		};;
			this.changeFocus();
			this.focusPos=this.focusPos+_num;
			// console.log(this.focusPos);
		
		

	},
	changeY:function(num){
		var _num=num;
		var oldY=this.y;
		
		if (_num==1) {
			if(this.y==Math.ceil(this.dataSize/this.colSize)-1){//最后一行
				return false;
			}else if (this.focusPos+this.colSize>this.dataSize-1) {//强置为最后一个
				this.x=(this.dataSize-1)%this.colSize;
				this.y=Math.ceil(this.dataSize/this.colSize)-1;
				this.changeFocus();
				this.focusPos=this.dataSize-1;
				return false;
			}else{
				this.y=this.y+_num;
			}
		}else if (_num==-1) {
			if(this.y<=0){
				return false;
			}else{
				this.y=this.y+_num;
			}		
		};;
			this.changeFocus();
			this.focusPos=this.focusPos+_num*this.colSize;
			// console.log(this.focusPos);

	},
	changeFocus:function(){
		this.$focusDiv.style.left=this.x*this.wStep-30+"px";
		this.$focusDiv.style.top=this.y*this.hStep-86+"px";
	},
	clickSelect:function(){
		control.focusArea=1;
		testList.showList();
	},
	isTop:function(){
		return this.y==0;
	},
	isBottom:function(){
		return this.focusPos>this.dataSize-this.colSize-1;
	},
	isLeft:function(){
		return this.x==0;
	},
	isRight:function(){
		return this.focusPos==this.dataSize%this.colSize-1;
	},
	isEndItem:function(){
		return this.focusPos>this.dataSize-1;
	},
	isEndLine:function(){
		return this.focusPos>this.dataSize-this.colSize-1;
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
		}		
	}

}
//============================================

 var testList={};
function initList(){
	 testList={
		dataSize:7
		,dataPos:0
		,currentPic:"listImg_0"
		,changeList:function(_num){
			if (_num==1) {
				if (this.dataPos==this.dataSize-1) {
					this.dataPos=0;
				}else{
					this.dataPos++;	
				}			
			}else if (_num==-1) {
				if (this.dataPos==0) {
					this.dataPos=this.dataSize-1;
				}else{
					this.dataPos--;
				}				
					
			};
			this.changPic();

			// $("page").innerText = (listObj.listPos == 0 ? parmObj.arrLength : listObj.listPos) +"/"+ parmObj.arrLength;
		}
		,changPic:function(){

			$(this.currentPic).style.display="none";
			this.currentPic="listImg_"+this.dataPos;
			$("listImg_"+this.dataPos).style.display="block";
			// $("imgList").style.left=-this.dataPos*456+"px";
		}
		,showList:function(){
			$("mask").style.display="block";
			$("testList").style.display="block";
		}
		,hidelist:function(){
			$("mask").style.display="none";
			$("testList").style.display="none";
		}
	}
}

function showText(_i,_pos){
	//$("listImg_"+ _i).innerHTML = json.contentList[_pos].publishTime.substring(0,10);
	$("listImg_"+_i).style.src= 'url(images/'+listData[_i].testPic+')';
}

function clearText(_i){
	$("listImg_"+_i).style.background = "";
}

function changeListFocus(_num){
	testList.changeFocus(_num);
	$("page").innerText = (testList.listPos == 0 ? parmObj.arrLength : testList.listPos) +"/"+ parmObj.arrLength;
}

var control = {
	focusArea : 0,//[0,1]==[主菜单,频道内容]
	init : function(){
		initList();
	  	listObj.init();
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
			testList.showList();
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
