package com.yuval.EmailApplication.controller;

import com.yuval.EmailApplication.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class EmailController {
    @Autowired
    private EmailService emailService;

    @GetMapping("/sendEmail")
    @ResponseBody
    public String sendEmail() {
        emailService.sendEmail("ydayansecond@gmail.com", "Im hoping this works", "Hello from Java");
        return "sent successfully";
    }
}
