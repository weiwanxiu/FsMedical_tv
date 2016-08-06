


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
window.onload = init;
function init(){
	loadingDiv = $('loadingDiv');
	renderWords();

	inputPad.show();
	ctl=inputPad;
}
var words=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0'];
function renderWords(){
	var s='';
	for(var i=0,len=words.length;i<len;i++){
		s+='<div class="word-item">'+words[i]+'</div>';
	}
	$('wordBox').innerHTML=s;
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
var wordPad={
	$f:$('wordFocus'),
	stepW:58,stepH:58,
	x:63,y:110,
	index:0,posY:0,posX:0,
	row:6,col:6,
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
			this.hide();
			wordActionPad.show();
			ctl=wordActionPad;
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
	enter:function(){
		//console.log(words[this.index]);
		if(inputPad.currentInput=='id'){
			inputPad.idno+=words[this.index];
			$('inputId').innerHTML=inputPad.idno;
		}
		if(inputPad.currentInput=='psw'){
			inputPad.psw+=words[this.index];
			inputPad.psw2+='*';
			$('inputPsw').innerHTML=inputPad.psw2;
		}
	}

};

var wordActionPad={
	$f:$('wordActionFocus'),
	show:function(){
		this.$f.style.display='block';
		this.change();
	},
	hide:function(){
		this.$f.style.display='none';
	},
	btn:[
		{left:29,top:-2,width:76,height:40},
		{left:114,top:-2,width:76,height:40},
		{left:201,top:-2,width:120,height:40},
	],
	index:0,
	left:function(){
		if(this.index<=0){
			return;
		}
		this.index--;
		this.change();
	},
	right:function(){
		if(this.index>=(this.btn.length-1)){
			return;
		}
		this.index++
		this.change();
	},
	up:function(){
		this.hide();
		wordPad.show();
		ctl=wordPad;
	},
	down:function(){},
	enter:function(){
		if(this.index==0){
			//删除
			//console.log(1);
			if(inputPad.currentInput=='id'&&!!inputPad.idno){
				var id=inputPad.idno.split('');
				id.pop();
				inputPad.idno=id.join('');
				$('inputId').innerHTML=inputPad.idno;
			}
			if(inputPad.currentInput=='psw'&&!!inputPad.psw){
				var psw=inputPad.psw.split('');
				psw.pop();
				inputPad.psw=psw.join('');
				var psw2=inputPad.psw2.split('');
				psw2.pop();
				inputPad.psw2=psw2.join('');
				$('inputPsw').innerHTML=inputPad.psw2;
			}
		}
		if(this.index==1){
			//清空
			//console.log(2);
			if(inputPad.currentInput=='id'){
				inputPad.idno='';
				$('inputId').innerHTML=inputPad.idno;
			}
			if(inputPad.currentInput=='psw'){
				inputPad.psw='';
				inputPad.psw2='';
				$('inputPsw').innerHTML=inputPad.psw2;
			}
		}
		if(this.index==2){
			//完成输入
			//console.log(3);
			$('wordBoxWrapper').style.left='-418px';
			inputPad.hideSelect();
			inputPad.show();
			ctl=inputPad;
		}
	},
	change:function(){
		this.$f.style.top=this.btn[this.index].top+'px';
		this.$f.style.left=this.btn[this.index].left+'px';
		this.$f.style.width=this.btn[this.index].width+'px';
		this.$f.style.height=this.btn[this.index].height+'px';
	}
};

var inputPad={
	$f:$('inputFocus'),
	$s:$('inputSelect'),
	currentInput:'id',
	idno:'',//帐号id
	psw:'',//密码
	psw2:'',//密码*
	show:function(){
		this.$f.style.display='block';
		this.change();
	},
	hide:function(){
		this.$f.style.display='none';
	},
	showSelect:function(){
		this.$s.style.display='block';
		this.$s.style.top=this.btn[this.index].top+'px';
		this.$s.style.left=this.btn[this.index].left+'px';
		this.$s.style.width=this.btn[this.index].width+'px';
		this.$s.style.height=this.btn[this.index].height+'px';
	},
	hideSelect:function(){
		this.$s.style.display='none';
	},
	btn:[
		{left:116,top:-4,width:510,height:40},
		{left:116,top:61,width:510,height:40},
		{left:118,top:126,width:130,height:40},
	],
	index:0,
	left:function(){
	},
	right:function(){
	},
	up:function(){
		if(this.index<=0){
			return;
		}
		this.index--;
		this.change();

	},
	down:function(){
		if(this.index>=(this.btn.length-1)){
			return;
		}
		this.index++
		this.change();
	},
	enter:function(){
		if(this.index==0){
			//输入id
			//console.log(1);
			this.hide();
			this.showSelect();
			this.currentInput='id';
			$('wordBoxWrapper').style.left='0px';
			wordPad.show();
			wordActionPad.hide();
			ctl=wordPad;
		}
		if(this.index==1){
			//输入密码
			//console.log(2);
			this.hide();
			this.showSelect();
			this.currentInput='psw';
			$('wordBoxWrapper').style.left='0px';
			wordPad.show();
			wordActionPad.hide();
			ctl=wordPad;
		}
		if(this.index==2){
			//确定
			//console.log(3);
			//alert('确定');
			if(!!!this.psw||!!!this.idno){
				$('inputTips').style.display='block';
				return;
			}
			//去其他页面
			window.location.href='userInfo.html';
		}
	},
	change:function(){
		this.$f.style.top=this.btn[this.index].top+'px';
		this.$f.style.left=this.btn[this.index].left+'px';
		this.$f.style.width=this.btn[this.index].width+'px';
		this.$f.style.height=this.btn[this.index].height+'px';
	}
};


function $(id){
 return document.getElementById(id);
}

