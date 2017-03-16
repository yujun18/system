$(function(){
	/**
	 * 获取所有院系
	 */
	$.ajax({
		url : "api/department/all",
		dataType:"json",
		type:"get",
		success:function(data){
			$("#deptSelect").children().remove();
			if(data.code == 0){
				if(data.data.length == 0){
					html = "<option value =\"-1\">暂时没有院系 </option>";

					$("#deptSelect").append(html);
				}else{
					for(var i=0;i<data.data.length;i++){
						
						var name = data.data[i].name;
						//alert(name);
						html = "<option value =\""+ name + "\">" + name + "</option>";
						$("#deptSelect").append(html);
					}
				}
			}
			else{
				html = "<option value =\"-1\">暂时没有院系 </option>";

				$("#deptSelect").append(html);
			}
			
			
		},
		error:function(data){
			console.log(data);
			console.log("error");
			
			html = "<option value =\"-1\">暂时没有院系</option>";
			$("#deptSelect").append(html);
		}
	});
	
	/**
	 * 获取所有学级
	 */
	$.ajax({
		url : "api/year/all",
		dataType:"json",
		type:"get",
		success:function(data){
			$("#yearSelect").children().remove();
			if(data.code == 0){
				if(data.data.length == 0){
					html = "<option value =\"-1\">暂时没有学级</option>";

					$("#yearSelect").append(html);
				}else{
					for(var i=0;i<data.data.length;i++){
						var name = data.data[i].name;
						html = "<option value =\""+ name + "\">" + name + "</option>";
						$("#yearSelect").append(html);
					}
				}
			}
			else{
				html = "<option value =\"-1\">暂时没有学级</option>";

				$("#yearSelect").append(html);
			}
			
		},
		error:function(data){
			console.log(data);
			console.log("error");
			
			html = "<option value =\"-1\">暂时没有学级</option>";
			$("#yearSelect").append(html);
		}
	});
	
	$("#submitButton").click(function(){
		
		if($("#name").val() == ""){
			$("#info").text("名称不能为空");
		}
		else if("-1" == $("#deptSelect").val()){
			$("#info").text("院系不能为空，请先添加院系");
		}
		else if("-1" == $("#yearSelect").val()){
			$("#info").text("学级不能为空，请先添加学级");
		}
		else{
			var url = "api/classes/add";
			$.ajax({
				url : url,
				dataType:"json",
				type:"post",
				data: {
					"name" : $("#name").val(),
					"deptName" : $("#deptSelect").val(),
					"year" : $("#yearSelect").val()
				},
				success:function(data){
					//alert(data.code);
					if(data.code == 0){
						
						window.location = "class.html";
					}
					else if(data.code == 8){
						$("#info").text("班级名称已存在");
					}
					
				},
				error:function(data){
					
					console.log(data);
					console.log("error");
					
				}
			});
		}
		
	});
	
});