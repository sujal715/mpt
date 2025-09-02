package com.mpt.mpt;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class TestController {

    @GetMapping("/test-simple")
    public String testGet() {
        return "GET endpoint working!";
    }

    @PostMapping("/test-simple")
    public String testPost() {
        return "POST endpoint working!";
    }
}
