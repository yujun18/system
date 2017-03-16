package com.yujun.plan.system.daoimpl;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.yujun.plan.system.dao.AdminDao;
import com.yujun.plan.system.entities.Admin;

@Repository
public class AdminDaoImpl implements AdminDao {

	@Autowired
	private SessionFactory sessionfactory;
	
	private Session getSession(){
		return sessionfactory.getCurrentSession();
	}
	
	@Override
	public Admin adminLogin(String name,String password){
		String hql = "from Admin where name= :name and password= :password";
		Admin admin = (Admin) getSession().createQuery(hql).setString("name",name).setString("password", password).uniqueResult();
		return admin;
	}
}
