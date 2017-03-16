package com.yujun.plan.system.service;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;






import com.yujun.plan.system.dao.StudentDao;
import com.yujun.plan.system.entities.Student;
import com.yujun.plan.system.model.RESCODE;
import com.yujun.plan.system.utils.Contants;
import com.yujun.plan.system.utils.MD5;

@Transactional
@Service
public class StudentService {

	@Autowired
	private StudentDao studao;
	
	private JSONObject resultJson;
	public String studentLogin(String name,String password){
		
		resultJson = new JSONObject();
		String paw = MD5.compute(password);
		Student s = studao.studentLogin(name, paw);
		if (s == null) {
			resultJson.put(Contants.RESPONSE_CODE_KEY, RESCODE.CREATE_ERROR);
			resultJson.put(Contants.RESPONSE_MSG_KEY,
					RESCODE.CREATE_ERROR.getMsg());
			return resultJson.toString();
		}
		resultJson.put(Contants.RESPONSE_CODE_KEY, RESCODE.SUCCESS);
		resultJson.put(Contants.RESPONSE_MSG_KEY, RESCODE.SUCCESS.getMsg());
		resultJson.put(Contants.RESPONSE_DATA_KEY, new JSONObject(s));
		return resultJson.toString();
	}
	
	public String addStudent(Student student){
		resultJson = new JSONObject();
		boolean bool = studao.addStudent(student);
		if(bool==true){
			resultJson.put(Contants.RESPONSE_CODE_KEY, RESCODE.SUCCESS);
			resultJson.put(Contants.RESPONSE_MSG_KEY, RESCODE.SUCCESS.getMsg());
			return resultJson.toString();
		}
		else{
			resultJson.put(Contants.RESPONSE_CODE_KEY, RESCODE.CREATE_ERROR);
			resultJson.put(Contants.RESPONSE_MSG_KEY,
					RESCODE.CREATE_ERROR.getMsg());
			return resultJson.toString();
		}
	}
	
	public String deleteStudent(String id){
		resultJson  =new JSONObject();
		boolean bool = studao.deleteStudent(id);
		if(bool==true){
			resultJson.put(Contants.RESPONSE_CODE_KEY, RESCODE.SUCCESS);
			resultJson.put(Contants.RESPONSE_MSG_KEY, RESCODE.SUCCESS.getMsg());
			return resultJson.toString();
		}
		else{
			resultJson.put(Contants.RESPONSE_CODE_KEY, RESCODE.DELETE_ERROR);
			resultJson.put(Contants.RESPONSE_MSG_KEY,
					RESCODE.DELETE_ERROR.getMsg());
			return resultJson.toString();
		}
	}
	
	public String updateStudent(Student student){
		resultJson = new JSONObject();
		boolean bool = studao.updateStudent(student);
		if(bool==true){
			resultJson.put(Contants.RESPONSE_CODE_KEY, RESCODE.SUCCESS);
			resultJson.put(Contants.RESPONSE_MSG_KEY, RESCODE.SUCCESS.getMsg());
			return resultJson.toString();
		}
		else{
			resultJson.put(Contants.RESPONSE_CODE_KEY, RESCODE.UPDATE_ERROR);
			resultJson.put(Contants.RESPONSE_MSG_KEY,
					RESCODE.UPDATE_ERROR.getMsg());
			return resultJson.toString();
		}
	}
	
	public String getStudetn(){
		resultJson = new JSONObject();
		List<Student> list = studao.getStudent();
		if(list!=null){
			resultJson.put(Contants.RESPONSE_CODE_KEY, RESCODE.SUCCESS);
			resultJson.put(Contants.RESPONSE_MSG_KEY, RESCODE.SUCCESS.getMsg());
			resultJson.put(Contants.RESPONSE_DATA_KEY, list);
			return resultJson.toString();
		}
		else{
			resultJson.put(Contants.RESPONSE_CODE_KEY, RESCODE.NOT_FOUND);
			resultJson.put(Contants.RESPONSE_MSG_KEY,
					RESCODE.NOT_FOUND.getMsg());
			return resultJson.toString();
		}
	}
}
