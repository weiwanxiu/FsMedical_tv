var listData=
		[
		{"name":"张小妹0","reportTitle":"普通感冒伤风","userId":"20160800"},
		{"name":"张小妹1","reportTitle":"普通感冒伤风","userId":"20160801"},
		{"name":"张小妹2","reportTitle":"普通感冒伤风","userId":"20160802"},
		{"name":"张小妹3","reportTitle":"普通感冒伤风","userId":"20160803"},
		{"name":"张小妹4","reportTitle":"普通感冒伤风","userId":"20160804"},
		{"name":"张小妹5","reportTitle":"普通感冒伤风","userId":"20160805"},
		{"name":"张小妹6","reportTitle":"普通感冒伤风","userId":"20160806"},
		{"name":"张小妹7","reportTitle":"普通感冒伤风","userId":"20160807"}

		]



document.onkeydown = grabEvent;
function grabEvent(_event){
	if (_event.type == 'keydown') {
		document.onkeypress = null;
	};
	var code = Event(_event);
	switch(code){
		case "KEY_UP": //
			control.clickUp();
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
		case "KEY_RED": //
			control.editMode=true;
			 editList.isShowEditList(true);
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
			window.history.back();
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
	  listObj.init();
}

var keyRedEvent = {
	flag : false,
	changeStatus : function(){
		this.flag = !this.flag;
		$("info").style.opacity = !!this.flag ? 1 : 0;
		$("info_cont").style.webkitTransform = !!this.flag ? "scale(1)" : "scale(0)";
	}
}



var parmObj = {
	DivId:        "listImg_",           //行DIV的ID名称   
	focusId:      "listImg_focus",      //焦点的ID
	arrLength:     12,                //数据总长度
	listSize:      3,               //显示DIV数
	rowHeight:     670,             //每次移动距离
	focusStartPos: -322,              //显示的第一个焦点	X或Y轴（这里是X）坐标
	direction:     "left",          //方向 top 纵向 left 横向
 	cycle:         1,              //0：不循环，1：循环  默认为0
//	pageType:      0,              //翻页形式，0：不翻页 1：翻页  默认为0
//	duration:      "200ms",        //速度，默认为300ms
};

var listObj={
	$focusDiv:this.$("content_focus"),
	x:0,
	y:0,
	dataPos:0,
	visible:false,
	wStep:236,
	hStep:236,
	pageSize:9,
	rowSize:2,
	colSize:5,
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
		this.dataPos=this.y*this.colSize+this.x;

	},
	changeX:function(num){//num=1或者num=-1
		var _num=num;
		if (_num==1) {
			if (this.dataPos>=this.dataSize-1) {
				return false;
			}else if ((this.dataPos+1)%this.colSize==0) {
				this.x=0;
				this.y=this.y+1;				
			}else{
				this.x=this.x+_num;
			}
		}else if (_num==-1) {
			if (this.dataPos<=0) {
				return false;
			}else if (this.dataPos%this.colSize==0) {
				this.x=this.colSize-1;
				this.y=this.y-1;				
			}else{
				this.x=this.x+_num;
			}			
		};;
			this.changeFocus();
			this.dataPos=this.dataPos+_num;
			console.log(this.dataPos);
		
		

	},
	changeY:function(num){
		var _num=num;
		var oldY=this.y;
		
		if (_num==1) {
			if(this.y==Math.ceil(this.dataSize/this.colSize)-1){//最后一行
				return false;
			}else if (this.dataPos+this.colSize>this.dataSize-1) {//强置为最后一个
				this.x=(this.dataSize-1)%this.colSize;
				this.y=Math.ceil(this.dataSize/this.colSize)-1;
				this.changeFocus();
				this.dataPos=this.dataSize-1;
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
			this.dataPos=this.dataPos+_num*this.colSize;
			console.log(this.dataPos);

	},
	changeFocus:function(){
		this.$focusDiv.style.left=this.x*this.wStep-30+"px";
		this.$focusDiv.style.top=this.y*this.hStep-88+"px";
	},
	removeUser:function(){
		listData=listData.slice(0,this.dataPos).concat(listData.slice(this.dataPos+1));
		$("selectIcon_"+this.dataPos).style.display="none";
		listObj.init();
		control.focusArea=0;
	},
	cancLeRemoveUser:function(){
		$("selectIcon_"+this.dataPos).style.display="none";
	},
	clickSelect:function(){
		if (this.dataPos==this.dataSize-1) {
				window.location.href="syncUser.html";
				return false;
			};
		if (control.editMode=="ture") {

			$("selectIcon_"+this.dataPos).style.display="block";		
		}else if (control.editMode==false) {
			window.location.href="userInfo.html";
		};

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
			this.render(n);
		},
		render:function(n){
			var _listData=this.data;
			var sub=(n-1)*this.pageSize;					
			var up=sub+this.dataSize;
			this.clear();					
			for (var i =0; i <this.dataSize; i++) {
				$("itemName_"+i).innerText=_listData[sub+i].name;
				this.show("Listitem_"+i);
			};
			$("Listitem_"+(this.dataSize)).style.backgroundImage="url(images/addUser.png)";
			this.show("Listitem_"+this.dataSize);			
			listObj.resetFocus(0,0);
			this.show("itemName_"+(this.dataSize-1));
			listObj.dataSize=listObj.dataSize+1;
		},
		clear:function(){
			for (var i = 0,len=this.pageSize; i <len; i++) {
				$("itemName_"+i).innerText="";
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
//=================
var editList={
	focusPos:0
	,clickRight:function(){
		this.focusPos=1;
		$("bt0").style.border="2px solid #0d78ec";
		$("bt1").style.border=" 2px solid #FFF";
	}
	,clickLeft:function(){
		this.focusPos=0;
		$("bt1").style.border="2px solid #0d78ec";
		$("bt0").style.border="2px solid #FFF";
	}
	,clickSelect:function(){
		if (this.focusPos==0) {
			listObj.removeUser();
			editList.isShowEditList(false);			
		}else if (this.focusPos==1) {
			listObj.cancLeRemoveUser();
			editList.isShowEditList(false);
		}
		control.editMode=false;
	}
	,isShowEditList:function(flag){
		if (flag==true) {
			$("selectIcon_"+listObj.dataPos).style.display="block";
			$("editList").style.display=""
		};
		$("editList").style.display=(flag?"block":"none");
		control.focusArea=(flag?1:0);
		control.editMode=(flag?true:false);
	}
}
//============================
var control={
	focusArea:0
	,editMode:false
	,clickRight:function(){
		if (this.focusArea==0) {
			listObj.changeX(1);
		}else if (this.focusArea==1) {
			editList.clickRight();
		};;
	}
	,clickLeft:function(){
		if (this.focusArea==0) {
			listObj.changeX(-1);
		}else if (this.focusArea==1) {
			editList.clickLeft();
		}
	}
	,clickUp:function(){
		if (this.focusArea==0) {
			listObj.changeY(-1);
		}else if (this.focusArea==1) {
			
		}
	}
	,clickDown:function(){
		if (this.focusArea==0) {
			listObj.changeY(1);
		}else if (this.focusArea==1) {
			
		}
	}			
	,clickSelect:function(){
		if (this.focusArea==0) {
			listObj.clickSelect();
		}else if (this.focusArea==1) {
			editList.clickSelect();
		}
	}
}

function $(id){
 return document.getElementById(id);
}
function showText(_i,_pos){
	//$("listImg_"+ _i).innerHTML = json.contentList[_pos].publishTime.substring(0,10);
	$("listImg_"+_i).style.background = "url(images/info_detail_0.png)";
}

function clearText(_i){
	$("listImg_"+_i).style.background = "url(images/tm.gif)";
}

function changeListFocus(_num){
	listObj.changeFocus(_num);
	$("page").innerText = (listObj.listPos == 0 ? parmObj.arrLength : listObj.listPos) +"/"+ parmObj.arrLength;
}

