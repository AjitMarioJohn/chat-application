package com.practice.app.chat.presentation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {
        "com.practice.app.chat.presentation.*",
        "com.practice.app.chat.security.*"
})
public class PresentationApplication {
    public static void main(String[] args) {
        SpringApplication.run(PresentationApplication.class, args);
    }
}
