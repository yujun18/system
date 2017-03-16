package com.yujun.plan.system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.yujun.plan.system.entities.Student;
import com.yujun.plan.system.service.StudentService;

@RestController
@RequestMapping(value="/student")
public class StudentController {

	@Autowired
	private StudentService stuservice;
	
	@RequestMapping(value="/login",method=RequestMethod.GET)
	public String studentLogin(String name,String password){
		return stuservice.studentLogin(name, password);
	}
	
	@RequestMapping(value="/add",method=RequestMethod.POST)
	public String addStudent(Student student){
		return stuservice.addStudent(student);
	}
	
	@RequestMapping(value="/delete",method=RequestMethod.GET)
	public String deleteStudent(String id){
		return stuservice.deleteStudent(id);
	}
	
	@RequestMapping(value="update",method=RequestMethod.POST)
	public String updateStudent(Student student){
		return stuservice.updateStudent(student);
	}
	
	@RequestMapping(value="get",method=RequestMethod.GET)
	public String getStudent(){
		return stuservice.getStudetn();
	}
}
