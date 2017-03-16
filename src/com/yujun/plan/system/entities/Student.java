package com.yujun.plan.system.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;
@Entity
@Table(name="student")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE, region="javaClassName")
public class Student {
	
	private String id;
	private String name;
	private String password;
	private String grand;
	private String xuehao;
	private String hobby;
	
	
	@Id
	@Column(length = 32)
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "uuid")
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getGrand() {
		return grand;
	}
	public void setGrand(String grand) {
		this.grand = grand;
	}
	public String getXuehao() {
		return xuehao;
	}
	public void setXuehao(String xuehao) {
		this.xuehao = xuehao;
	}
	public String getHobby() {
		return hobby;
	}
	public void setHobby(String hobby) {
		this.hobby = hobby;
	}
	@Override
	public String toString() {
		return "Student [id=" + id + ", name=" + name + ", password="
				+ password + ", grand=" + grand + ", xuehao=" + xuehao
				+ ", hobby=" + hobby + "]";
	}

	
	

}
