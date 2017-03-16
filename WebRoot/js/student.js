/**
 * 管理员相关js
 */
var stuId = "";

var isLoad = function(){
	var role = getCookie("role");
	if(role=="stu"){
		var userName = getCookie("userName");
		$("div.login a.userName").text(userName);
		stuId = getCookie("userId");
	}else{
		window.location.href="student_login.html";
	}
}

var loginOut = function(){
	$("div.login a.out").click(function(){
		deleteCookie("userId");
		deleteCookie("userName");
		deleteCookie("role");
		window.location.href="student_login.html";
	});
}


$(function(){
	isLoad();
	loginOut();
})