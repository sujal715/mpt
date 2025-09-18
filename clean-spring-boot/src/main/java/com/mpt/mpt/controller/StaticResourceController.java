package com.mpt.mpt.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class StaticResourceController {

    @RequestMapping(value = {
        "/admin", "/booking", "/services", "/gallery", "/about", "/contact", 
        "/faq", "/privacy", "/terms", "/resources", "/products"
    })
    public String forward() {
        return "forward:/index.html";
    }

    @GetMapping("/manifest.json")
    public ResponseEntity<Resource> getManifest() {
        Resource resource = new ClassPathResource("static/manifest.json");
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.CACHE_CONTROL, "no-cache")
                .body(resource);
    }
}
