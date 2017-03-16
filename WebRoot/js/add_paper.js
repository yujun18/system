/**
 * 
 */
	var isNum = function(v_id){
		var num = $("#"+v_id).val();
		if(!$.isNumeric(num)){
			if(""==$.trim(num)){
				alert("无需选择难度");
				return false;
				
			}
			alert("请输入正确的题目数量！");
			$("#"+v_id).val("");
			return false;
		}else if(parseInt(num)==0){
			alert("无需选择难度");
			return false;
		}
		return num;
	};
  
  var chooseDiffi = function(){
		$(".diffi").click(function(){
			if($(this).hasClass("danxuan")){
				var re =  isNum("sim_num");
				if(!re){
					return re;
				}
				window.location.href="difficulty.html?type=0&num="+re;
			}else if($(this).hasClass("duoxuan")){
				var re =  isNum("mul_num");
				if(!re){
					return re;
				}
				window.location.href="difficulty.html?type=1&num="+re;
			}else if($(this).hasClass("tiankong")){
				var re =  isNum("fill_num");
				if(!re){
					return re;
				}
				window.location.href="difficulty.html?type=2&num="+re;
			}else if($(this).hasClass("wenda")){
				var re =  isNum("faq_num");
				if(!re){
					return re;
				}
				window.location.href="difficulty.html?type=3&num="+re;
			}else if($(this).hasClass("panduan")){
				var re =  isNum("jud_num");
				if(!re){
					return re;
					}
				window.location.href="difficulty.html?type=4&num="+re;
			}
		});
	};
  
	
	
  var add_paper = function(){
	  $("#add_paper_button").click(function(){
		  var param = $("#add_paper").serializeArray();
		 
		  var p_name = $("input[name=name]").val();
		  if($.trim(p_name)==""){
			  alert("请填写试卷名称！");
			  return false;
		  }
		  
		  
		  
		  
		  var sim_num =  $("#sim_num").val();
		  if(parseInt(sim_num)>0){
			  var simplePts = $("input[name=simplePts]").val();
			  if(simplePts==""){
				  alert("请填写单选题每题的分值！");
				  return false;
			  }
		  }
		  
		  var mul_num =  $("#mul_num").val();
		  if(parseInt(mul_num)>0){
			  var multiPts = $("input[name=multiPts]").val();
			  if(multiPts==""){
				  alert("请填写多选题每题的分值！");
				  return false;
			  }
		  }
		  
		  var fill_num =  $("#fill_num").val();
		  if(parseInt(fill_num)>0){
			  var blankPts = $("input[name=blankPts]").val();
			  if(blankPts==""){
				  alert("请填写填空题每题的分值！");
				  return false;
			  }
		  }
		  
		  var faq_num =  $("#faq_num").val();
		  if(parseInt(faq_num)>0){
			  var essayPts = $("input[name=essayPts]").val();
			  if(essayPts==""){
				  alert("请填写问答题每题的分值！");
				  return false;
			  }
		  }
		  var jud_num =  $("#jud_num").val();
		  if(parseInt(jud_num)>0){
		  var judgePts = $("input[name=judgePts]").val();
		   if(judgePts==""){
		  alert("请填写判断题每题的分值！");
		    return false;
			  }
		   }
		  
		  
		  
		  var lev0 = getCookie("lev0");
		  var lev1 = getCookie("lev1");
		  var lev2 = getCookie("lev2");
		  var lev3 = getCookie("lev3");
		  var lev4 = getCookie("lev4");

		  param.push({"name":"levelA","value":lev0});
		  param.push({"name":"levelB","value":lev1});
		  param.push({"name":"levelC","value":lev2});
		  param.push({"name":"levelD","value":lev3});
		  param.push({"name":"levelE","value":lev4});
		  param.push({"name":"subject","value":$("#all_subject option").filter(":selected").text()});
		  param.push({"name":"creator","value":getCookie("userName")});//暂时没有创建者
		  param.push({"name":"points","value":$("#total_point").text()});//暂时没有创建者
		 
		  if(getCookie("role")=="tea"){
			  param.push({"name":"subjectId","value":getCookie("subjectId")});//暂时没有创建者
		  }
		  
		  $.post("api/paper/add",param).done(function(data){
			  var obj = $.parseJSON(data);
			  console.log(obj);
			  var code = obj.code;
			  if("0"==code){
				  alert("添加试卷成功");
				  clearCookie();
				  window.location.href="paper.html";
			  }else if("11"==code){
				  var d = obj.data;
				  var type = "";
				  if(d.type=="A"){
					  type = "单选题";
				  }else if(d.type=="B"){
					  type = "多选题";
				  }else if(d.type=="C"){
					  type = "填空题";
				  }else if(d.type=="D"){
					  type = "问答题";
				  }else if(d.type=="E"){
					  type = "判断题";
				  }
				  //alert(type+"难度为"+d.level+"题库不足");
				  alert(type+"题库不足");
				  //window.location.href="paper.html";
			  }else{
				  alert("添加试卷失败！");
				  //window.location.href="paper.html";
			  }
		  }).fail(function(xhr, textStatus, errorThrown){
			  if(xhr.status==400){
				  alert("请填写正确的数量或分值！");
			  }
		  });
		  
	  });
  };
  
  
  var show_total = function(){
	  var _total = 0;
		var _total_item=0;//一个   数量*题数
		$("input.computer").each(function(index){
			var val = $(this).val();
			if($.isNumeric(val)){
				val = parseInt(val);	
			}else{
				val = 0;
			}
			if(index%2==0){
				_total_item=val
			}else{
				_total += _total_item*val;
				_total_item=0;
			}
		});
		$("#total_point").text(_total);
  }
  
  
	  
   var show_total_point = function(){
		$("input.computer").change(function(){
			show_total();
		});
   };
	  
   //吧表单的数据set cookie
   var setInputInCookie = function(){
	   $(":input").change(function(){
		   var name = $(this).attr("name");
		   var value = $(this).val();
		   //登陆管理员的时候，subjectId为-1，这里的subjectId 取别名：sub_id;
		   
		   if(name=="subjectId"){
			   setCookie("sub_id", value);
		   }else{
			   setCookie(name, value);
		   }
	   });
   }
   
   
   var clearCookie = function(){
	   $(":input").each(function(){
		   var name = $(this).attr("name");
		   //
		   if(name=="subjectId"){
			   name="sub_id";
		   }
		   deleteCookie(name);
	   });
	   
	   for(var i=0;i<5;i++){
		   deleteCookie("lev"+i);
	   }
   }
   
   var review = function(){
	   $(":input").each(function(){
		   var name = $(this).attr("name");
		   if(name=="subjectId"){
			   name="sub_id";
		   }
		   var value = getCookie(name);
		   if(null!=value){
			   $(this).val(value);
		   }
	   });
	   
	   $("span.lev").each(function(){
		   var name = $(this).attr("name");
		   var value = getCookie(name);
		   if(null!=value && "null"!=value && ""!=value){
			   var split = value.split(",");
			   var text = "";
			   $.each(split,function(index,value){
				  text+="难度"+(index+1)+"："+value+"题&nbsp;";
			   });
			   
			   $(this).html(text);
		   }
	   });
   }
  
   
   var getAllSubject2 = function(){
		$.getJSON("api/subject/all",function(data){
			var code = data.code;
			var arr = data.data;
			if(code=="0"){
				$.each(arr,function(){
					var html ='<option value="'+this.id+'">'+this.name+'</option>';
					$("#all_subject").append(html);
				});
				
				//如果是教师登陆，锁定科目名称、
				var role = getCookie("role");
				if(role=="tea"){
					var subjectId = getCookie("subjectId");
					$("#all_subject").val(subjectId).attr("disabled","disabled");
				}
				
				review();
				show_total();
			}
		});
	}
   
  $(function(){
	  getAllSubject2();
	  //review();
	  show_total_point();
	  setInputInCookie();
	  chooseDiffi();
	  add_paper();
  });