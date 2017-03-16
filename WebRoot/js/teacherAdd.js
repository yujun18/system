$(function(){
	/**
	 * 获取所有教师
	 */
	$.ajax({
		url : "api/teacher/all",
		dataType:"json",
		type:"get",
		success:function(data){
			$("#teacherSelect").children().remove();
			if(data.code == 0){
				if(data.data.length == 0){
					html = "<option value =\"-1\">暂时没有教师 </option>";

					$("#teacherSelect").append(html);
				}else{
					for(var i=0;i<data.data.length;i++){
						
						var name = data.data[i].name;
						//alert(name);
						html = "<option value =\""+ name + "\">" + name + "</option>";
						$("#teacherSelect").append(html);
					}
				}
			}
			else{
				html = "<option value =\"-1\">暂时没有教师 </option>";

				$("#teacherSelect").append(html);
			}
			
			
		},
		error:function(data){
			console.log(data);
			console.log("error");
			
			html = "<option value =\"-1\">暂时没有教师</option>";
			$("#teacherSelect").append(html);
		}
	});
});