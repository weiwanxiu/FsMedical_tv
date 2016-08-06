


document.onkeydown = grabEvent;
function grabEvent(_event){
	if (_event.type == 'keydown') {
		document.onkeypress = null;
	};
	var code = Event(_event);
	switch(code){
		case "KEY_UP": //
			ctl.up();
			return 0;
			break;
		case "KEY_DOWN": //
			ctl.down();
			return 0;
			break;
		case "KEY_LEFT": //
			ctl.left();
			return 0;
			break;
		case "KEY_RIGHT": //
			ctl.right();
			return 0;
			break;	
		case "KEY_SELECT": //	
			ctl.enter();
			return 0;
			break;
		case "KEY_EXIT":
		case "KEY_BACK":
			ctl.back();
			return false;
			break;
		default:
			break;
	}
}
var ctl={};
ctl={
	back:function(){

	},
	left:function(){
	},
	right:function(){
	},
	up:function(){
	},
	down:function(){
	},
	enter:function(){
	}
};

window.onload = init;
function init(){
	loadingDiv = $('loadingDiv');
	
	selectPad.show();
	ctl=selectPad;
}

var selectPad={
	$f:$('selectFocus'),
	stepW:560,stepH:0,
	x:4,y:12,
	index:0,posY:0,posX:0,
	row:1,col:2,
	show:function(){
		this.$f.style.display='block';
	},
	hide:function(){
		this.$f.style.display='none';
	},
	left:function(){
		if(this.index%this.col==0){
			return;
		}
		this.index--;
		this.posX--;
		var newX=this.x+(this.posX*this.stepW);
		this.$f.style.left=newX+'px';
	},
	right:function(){
		if((this.index+1)%this.col==0){
			return;
		}
		this.index++;
		this.posX++;
		var newX=this.x+(this.posX*this.stepW);
		this.$f.style.left=newX+'px';
	},
	down:function(){
		if(this.index>=((this.row-1)*this.col)){
			return;
		}
		this.index+=this.col;
		this.posY++;
		var newY=this.y+(this.posY*this.stepH);
		this.$f.style.top=newY+'px';
	},
	up:function(){
		if(this.index<6){
			return;
		}
		this.index-=this.col;
		this.posY--;
		var newY=this.y+(this.posY*this.stepH);
		this.$f.style.top=newY+'px';
	},
	isShowQrBig:false,
	enter:function(){
		if(this.index==0){
			//放大二维码
			if(this.isShowQrBig){
				$('qrBigWrapper').style.visibility='hidden';
				var el=$('qrBigImg');
				el.style.left='92px';
				el.style.top='68px';
				el.style.width='220px';
				el.style.height='220px';
				this.isShowQrBig=false;
			}else{
				$('qrBigWrapper').style.visibility='visible';
				var el=$('qrBigImg');
				el.style.left='190px';
				el.style.top='-118px';
				el.style.width='585px';
				el.style.height='585px';

				this.isShowQrBig=true;
			}
		}
		if(this.index==1){
			//去登录
			window.location.href='addUser.html';
		}
	}

};


function $(id){
 return document.getElementById(id);
}

