//JavaScript Document
var hostUrl = "http://192.168.34.81";
var serverUrl  = hostUrl +"/utvgoWeb/hifi/";
var imgBasePath = hostUrl +":81/news/uploadFile/";  //基于首页栏目的图片
var imgRecordPath = hostUrl +":81";  //基于专辑的图片
var linkBasePath = "";
var apiBasePath = hostUrl;
var location_url = hostUrl + "/HiFi_cq/index.html";
var req = null; // ajax requset对象
var orderStrtus = null;  //false表示未订购

var keyNo = (typeof (CA) != 'undefined' && CA.card.cardId) || "notFound"; 
//keyNo = "9950000001855937";  //无家长锁
//keyNo = "9950000002272843";  //有家长锁

var loadingDiv = null;
function showLoadingDiv(){
	document.onkeydown = null;
	loadingDiv.style.visibility = "visible";
}
function hideLoadingDiv(){
	document.onkeydown = grabEvent;
	loadingDiv.style.visibility = "hidden";
}

window.onerror=function(a,b,c,d,e,f){
	//alert(a+'||'+b+'||'+c+'||'+d+'||'+e+'||'+f);
};