package com.yujun.plan.system.dao;

import com.yujun.plan.system.entities.Admin;

public interface AdminDao {

	public Admin adminLogin(String name,String password);
}
