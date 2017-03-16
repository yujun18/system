/**
 * 管理员相关js
 */
var isLoad = function(){
	var role = getCookie("role");
	if(role=="tea" || role=="admin"){
		var userName = getCookie("userName");
		$("div.login a.userName").text(userName);
		if(role=="tea"){
			$('li#student').prevAll().remove();
		}
		
	}else{
		window.location.href="login.html";
	}
}

var loginOut = function(){
	$("div.login a.out").click(function(){
		deleteCookie("userId");
		deleteCookie("userName");
		deleteCookie("role");
		window.location.href="login.html";
	});
}

$(function(){
	isLoad();
	loginOut();
})