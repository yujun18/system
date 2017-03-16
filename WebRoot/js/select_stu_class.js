/**
 * 
 */

var department = "";//系部
 var year = "";//学年
 var classes = "";//班级
 
 var department2 = "";//系部
 var year2 = "";//学年
 var classes2 = "";//班级
 var stuId = "";//学号
 
 var number = 10;
 
 var specify_class = [];
 var specify_student = [];
 
 
/* var p_id = getParameterByName("p_id");
 var tot_id = getParameterByName("tot_id");
 var paper_detail = function(){
	 $.getJSON("api/paper/detail",{id:p_id},function(data){
		 var code = data.code;
		 if("0"==code){
			 var obj = data.data;
			 for(var item in obj){
				 $("form a[name="+item+"]").text(obj[item]);
			 }
		 }
	 });

 }*/

 var joinStr = function(arr){
		 return arr.join(",");
 }
 
 
/* var publish_paper = function(){
	$("#publish_paper").click(function(){
		 var param = $("form").serializeArray();
		 param.push({"name":"totId","value":tot_id});
		 param.push({"name":"paperName","value":$("a[name=name]").text()});
		param.push({"name":"clsStr","value":joinStr(specify_class)});
		param.push({"name":"stuStr","value":joinStr(specify_student)});
		 
		 //totId paperName
		$.post("api/paper/publish",param,function(data){
			 var obj = $.parseJSON(data);
			 var code = obj.code;
			 if("0"==code){
				 window.location.href ="paper.html";
			 }else{
				 alert("编辑试卷出错！");
			 }

		 }); 
		 return false;
	});
 }*/

 
 
 var curpage =1;
 var  temp1 = "";
 var pagebutton1 = function(pageNums,number){
 	$(".pageButton").click(function(){
 		var name = $(this).attr("name");
 			if(name=="sy"){
 				curpage = 1;
 			}else if(name=="syy"){
 				curpage = --curpage>1?curpage:1;
 			}else if(name=="xyy"){
 				curpage = ++curpage>pageNums?pageNums:curpage;
 			}else if(name=="wy"){
 				curpage=pageNums;
 			}
 			//loadData1(curpage);
 			if(temp1!=curpage){
 				loadData1(curpage);
 			}
 			temp1 = curpage;
 		});
 	
 }
 
 var curpage2 =1;
 var  temp = "";
 var pagebutton2 = function(pageNums,number){
 	$(".pageButton2").click(function(){
 		var name = $(this).attr("name");
 		
 		if(name=="sy"){
 				curpage2 = 1;
 			}else if(name=="syy"){
 				curpage2 = --curpage2>1?curpage2:1;
 			}else if(name=="xyy"){
 				curpage2 = ++curpage2>pageNums?pageNums:curpage2;
 			}else if(name=="wy"){
 				curpage2=pageNums;
 			}
 			if(temp!=curpage2){
 				loadData2(curpage2);
 			}
 			temp = curpage2;
 			
 		});
 	
 }
 
 
 var conditionQuery1 = function(){
		$("#conditionQuery1").click(function(){
			department = $("#dep1").val();
			year = $("#year1").val();
			classes = $.trim($("#class_query1").val());
			loadData1(1);
		});
	}
 
 
 var loadData1 = function(start){
	 var param = {"deptName":department,"year":year,"name":classes,"start":start,"number":number};
	 $.getJSON("api/classes/query",param,function(data){
		 $("#tbody_content1").empty();
		 var code = data.code;
		 if(code=="0"){
			var page = Math.ceil(data.size/number);
			$("#showCurrnetPage1").text(start+"/"+page);
			$(".pageButton").off();
			pagebutton1(page,number);

			 var arr = data.data;
			 $.each(arr,function(index){
				 var html = '<tr>'
		                +'<td>'+((start-1)*number+index+1)+'</td>'
		                +'<td>'+this.deptName+'</td>'
		                +'<td>'+this.year+'</td>'
		                +'<td>'+this.name+'</td>'
		                +'<td><input type="checkbox" num="'+((start-1)*number+index+1)+'" csid="'+this.id+'" name="'+this.name+'"></td>'
		               	+'</tr>';
		              $("#tbody_content1").append(html);
		              var ck_but = $("#tbody_content1").children().last().find("input[type=checkbox]");
		              check_state(ck_but,specify_class,class_obj);
			 });
			 reshow_check(specify_class,"#tbody_content1");
		 }

	 });
 }
 
 var removeByAttr = function(arr, attr, value){
	    var i = arr.length;
	    while(i--){
	       if( arr[i] 
	           && arr[i].hasOwnProperty(attr) 
	           && (arguments.length > 2 && arr[i][attr] === value ) ){ 
	           arr.splice(i,1);
	       }
	    }
	    return arr;
	}
 
 var removeArr = function(arr,obj){
	 var index = arr.indexOf(obj);
	 if (index > -1) {
		 arr.splice(index, 1);
	}
 }
 
 
 var class_obj = [];
 var stu_obj = [];
 
 //put or remove obj in arr
 var check_state = function(source,arr,arr_obj){
	 $(source).click(function(){
		 var num  = $(this).attr("num");
		 var csid  = $(this).attr("csid");
		 var name  = $(this).attr("name");
		 if($(this).prop('checked')){
			 arr.push(csid);
			 var obj ={"csid":csid,"name":name};
			 arr_obj.push(obj);
		 }else{
			 removeArr(arr,csid);
			 removeByAttr(arr_obj,"csid",csid);
		 }
	 });
 }

 
 //while modal open show checkbox state
 // arr tbody
 var reshow_check = function(arr,tbody){
	 var $trs = $(tbody).children();
	 $($trs.find("input[type=checkbox]")).prop('checked',false);
	 $.each(arr,function(index,value){
			 $($trs.find("input[type=checkbox]")).each(function(){
				 var curNum = $(this).attr("csid"); 
				 //$(this).prop('checked',false);
				 if(value==curNum){
					 $(this).prop('checked',true);
				 }
			 });
	 });
	 
 }
 
 
 
 
 
 var loadData2 = function(start){
	 var param = {"department":department2,"year":year2,"classes":classes2,"stuId":stuId,"start":start,"number":number};
	 $.getJSON("api/student/query",param,function(data){
		 $("#tbody_content2").empty();
		 var code = data.code;
		 if(code=="0"){
			var page = Math.ceil(data.size/number);
			$("#showCurrnetPage2").text(start+"/"+page);
			$(".pageButton2").off();
			pagebutton2(page,number);

			 var arr = data.data;
			 $.each(arr,function(index){
				 var html = '<tr>'
		                +'<td>'+((start-1)*number+index+1)+'</td>'
		                +'<td>'+this.department+'</td>'
		                +'<td>'+this.year+'</td>'
		                +'<td>'+this.classes+'</td>'
		                +'<td>'+this.stuId+'</td>'
		                +'<td>'+this.name+'</td>'
		                +'<td><input type="checkbox" num="'+((start-1)*number+index+1)+'" csid="'+this.stuId+'" name="'+this.name+'"></td>'
		               	+'</tr>';
		              $("#tbody_content2").append(html);
		              var ck_but = $("#tbody_content2").children().last().find("input[type=checkbox]");
		              check_state(ck_but,specify_student,stu_obj);
			 });
			 
			 reshow_check(specify_student,"#tbody_content2");
		 }

	 });
 }
 
 
 var conditionQuery2 = function(){
		$("#conditionQuery2").click(function(){
			department2 = $("#dept2").val();
			year2 = $("#year2").val();
			classes2 = $.trim($("#class_query2").val());
			stuId = $.trim($("#stuId_query").val());
			loadData2(1);
		});
	}
 
	 var removeItem = function(source,arr,arr_obj){
		 $(source).click(function(){
			var csid = $(this).attr("csid");
			 $(this).remove();
			 removeByAttr(arr_obj,"csid",csid);
			 removeArr(arr,csid);
		 });
	 }
 
	 
	 
	 
	 
	 
 $(function(){
	 $.datetimepicker.setLocale('ch');
	 $(".datetimepicker").datetimepicker();
	 /*$(".datetimepicker").datetimepicker({
		 format:'Y/m/d H:i:s',
		 lang:'ch'
	 });*/

	 
	 getAlldepartment();
	 getAllyear();
	 loadData1(1);//指定班级模态框数据
	 loadData2(1);//指定学生模态框数据
	// paper_detail();
	// publish_paper();
	 conditionQuery1();
	 conditionQuery2();
	 
	 $('#myModal1').on('show.bs.modal', function () {
		  // 执行一些动作...
		 reshow_check(specify_class,"#tbody_content1");
	});
	 $('#myModal2').on('show.bs.modal', function () {
		 reshow_check(specify_student,"#tbody_content2");
	});
	 
	 
	 
	 $('#myModal1').on('hidden.bs.modal', function () {
		 $("#select_class").empty();
		 $.each(class_obj,function(){
		 	$("#select_class").append('<span csid ="'+this.csid+'" class="label label-info cur-pointer">'+this.name+'<a>&nbsp;&#x2718;</a></span>&nbsp;');
		 	 var ck_but = $("#select_class").children().last();
		 	 removeItem(ck_but,specify_class,class_obj);
		 });
	 })
	 
	 
	 $('#myModal2').on('hidden.bs.modal', function () {
		 $("#select_stu").empty();
		 $.each(stu_obj,function(){
		 	$("#select_stu").append('<span csid ="'+this.csid+'" class="label label-info cur-pointer">'+this.name+'<a>&nbsp;&#x2718;</a></span>&nbsp;');
		 	 var ck_but = $("#select_stu").children().last();
		 	 removeItem(ck_but,specify_student,stu_obj);
		 });
	 })
	 
	 
 });
