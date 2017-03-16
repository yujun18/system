package com.yujun.plan.system.dao;

import java.util.List;

import com.yujun.plan.system.entities.Student;

public interface StudentDao {
	
	public Student studentLogin(String name,String password);
	
	public boolean addStudent(Student student);
	
	public boolean deleteStudent(String id);
	
	public boolean updateStudent(Student student);
	
	public List<Student> getStudent();

}
