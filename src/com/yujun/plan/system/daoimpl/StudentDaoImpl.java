package com.yujun.plan.system.daoimpl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yujun.plan.system.dao.StudentDao;
import com.yujun.plan.system.entities.Student;

@Repository
public class StudentDaoImpl implements StudentDao{
	@Autowired
	private SessionFactory sessionfactory;
	
	public Session getSession(){
		return sessionfactory.getCurrentSession();
	}

	@Override
	public Student studentLogin(String name,String password){
		String hql = "from Student where name= :name and password= :password";
		Student stu = (Student) getSession().createQuery(hql).setString("name", name).setString("password", password).uniqueResult();
		return stu;
	}
	
	@Override
	public boolean addStudent(Student student){
		getSession().save(student);
		return true;
	}
	
	@Override
	public boolean deleteStudent(String id){
		String hql = "delete from Student where id= :id";
		int ex = getSession().createQuery(hql).setString("id",id).executeUpdate();
		if(ex>0){
			return true;
		}
		else{
			return false;
		}
	}
	
	@Override
	public boolean updateStudent(Student student){
		getSession().update(student);
		return true;
	}
	
	@Override
	public List<Student> getStudent(){
		String hql = "from Student";
		List<Student> list = getSession().createQuery(hql).list();
		return list;
	}
}
