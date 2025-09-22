package com.mpt.mpt.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/static/");
        
        registry.addResourceHandler("/css/**")
                .addResourceLocations("classpath:/static/css/");
        
        registry.addResourceHandler("/js/**")
                .addResourceLocations("classpath:/static/js/");
        
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/images/");
        
        registry.addResourceHandler("/pdfs/**")
                .addResourceLocations("classpath:/static/pdfs/");
        
        registry.addResourceHandler("/videos/**")
                .addResourceLocations("classpath:/static/videos/");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Serve index.html for root path
        registry.addViewController("/").setViewName("forward:/index.html");
    }
}