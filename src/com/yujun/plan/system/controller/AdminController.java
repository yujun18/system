package com.yujun.plan.system.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.yujun.plan.system.service.AdminService;

@RestController
@RequestMapping(value="/admin")
public class AdminController {

	@Autowired
	private AdminService adminservice;
	
	@RequestMapping(value="/login",method = RequestMethod.GET)
	public String adminLogin(String name,String password){
		return adminservice.adminLogin(name, password);
	}
}
