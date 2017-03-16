$(function(){
	$("#submitButton").click(function(){
		var name = $("#name").val();
		
		if(name == ""){
			$("#info").text("名称不能为空");
		}
		
		else if(!$.isNumeric(name)){
			$("#info").text("名称必须为数字");
		}
		
		else{
			var url = "api/year/add";
			$.ajax({
				url : url,
				dataType:"json",
				type:"post",
				data: {
					"name" : name
				},
				success:function(data){
					//alert(data.code);
					if(data.code == 0){
						window.location = "year.html";
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