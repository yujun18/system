package com.yujun.plan.system.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.yujun.plan.system.dao.AdminDao;
import com.yujun.plan.system.entities.Admin;
import com.yujun.plan.system.model.RESCODE;
import com.yujun.plan.system.utils.Contants;
import com.yujun.plan.system.utils.MD5;

@Transactional
@Service
public class AdminService {

	@Autowired
	private AdminDao adao;
	
	private JSONObject resultJson;
	public String adminLogin(String name,String password){
		resultJson = new JSONObject();
		String paw = MD5.compute(password);
		Admin admin = adao.adminLogin(name, paw);
		if(admin!=null){
			resultJson.put(Contants.RESPONSE_CODE_KEY, RESCODE.SUCCESS);
			resultJson.put(Contants.RESPONSE_MSG_KEY, RESCODE.SUCCESS.getMsg());
			resultJson.put(Contants.RESPONSE_DATA_KEY, new JSONObject(admin));
			return resultJson.toString();
		}
		else{
			resultJson.put(Contants.RESPONSE_CODE_KEY, RESCODE.CREATE_ERROR);
			resultJson.put(Contants.RESPONSE_MSG_KEY, RESCODE.CREATE_ERROR.getMsg());
			return resultJson.toString();
		}
	}
	
}
