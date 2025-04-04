package com.practice.app.chat.service.discovery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class ChatAppServiceDiscoveryApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatAppServiceDiscoveryApplication.class, args);
	}

}
