$(function(){
	$("#submitButton").click(function(){
		
		if($("#name").val() == ""){
			$("#info").text("名称不能为空");
		}
		else{
			var url = "api/department/add";
			$.ajax({
				url : url,
				dataType:"json",
				type:"post",
				data: {
					"name" : $("#name").val()
				},
				success:function(data){
					//alert(data.code);
					if(data.code == 0){
						window.location.href = "department.html";
					}else if(data.code=="8"){
						$(".import_msg").text("该条数据已存在！");
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