package com.mpt.mpt;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WebController {

    @GetMapping("/")
    public ResponseEntity<String> home() {
        try {
            Resource resource = new ClassPathResource("static/index.html");
            if (!resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.TEXT_HTML)
                        .body(getSimpleWebsite());
            }
            String content = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            return ResponseEntity.ok()
                    .contentType(MediaType.TEXT_HTML)
                    .body(content);
        } catch (IOException e) {
            return ResponseEntity.ok()
                    .contentType(MediaType.TEXT_HTML)
                    .body(getSimpleWebsite());
        }
    }

    @GetMapping("/test")
    @ResponseBody
    public String test() {
        return "✅ Test endpoint is working! Spring Boot is running successfully.";
    }

    @GetMapping("/debug")
    @ResponseBody
    public String debug() {
        try {
            Resource resource = new ClassPathResource("static/index.html");
            Resource adminResource = new ClassPathResource("static/advanced-admin.html");
            
            StringBuilder debug = new StringBuilder();
            debug.append("🔍 Debug Info:<br>");
            debug.append("✅ Spring Boot is running<br>");
            debug.append("✅ WebController is working<br>");
            debug.append("📁 React index.html exists: ").append(resource.exists()).append("<br>");
            debug.append("📁 Admin panel exists: ").append(adminResource.exists()).append("<br>");
            
            if (resource.exists()) {
                debug.append("📏 index.html size: ").append(resource.contentLength()).append(" bytes<br>");
            }
            
            // List static directory contents
            try {
                Resource staticDir = new ClassPathResource("static/");
                debug.append("📂 Static directory accessible: ").append(staticDir.exists()).append("<br>");
            } catch (Exception e) {
                debug.append("📂 Static directory error: ").append(e.getMessage()).append("<br>");
            }
            
            return debug.toString();
        } catch (Exception e) {
            return "❌ Error: " + e.getMessage();
        }
    }


    @GetMapping("/{path:^(?!api|images|css|js|static|videos|mp\\.jpeg|homepage-test\\.jpeg).*}/**")
    public ResponseEntity<String> serveReactApp(@PathVariable(required = false) String path) {
        try {
            Resource resource = new ClassPathResource("static/index.html");
            if (!resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.TEXT_HTML)
                        .body(getSimpleWebsite());
            }
            String content = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            return ResponseEntity.ok()
                    .contentType(MediaType.TEXT_HTML)
                    .body(content);
        } catch (IOException e) {
            return ResponseEntity.ok()
                    .contentType(MediaType.TEXT_HTML)
                    .body(getSimpleWebsite());
        }
    }

    private String getSimpleWebsite() {
        return """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Movement Performance Training</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
                    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
                    .header { text-align: center; padding: 40px 0; }
                    .logo { font-size: 2.5em; font-weight: bold; margin-bottom: 10px; }
                    .tagline { font-size: 1.2em; opacity: 0.9; }
                    .nav { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0; }
                    .nav a { color: white; text-decoration: none; margin: 0 15px; padding: 10px 20px; border-radius: 5px; transition: background 0.3s; }
                    .nav a:hover { background: rgba(255,255,255,0.2); }
                    .hero { text-align: center; padding: 60px 0; }
                    .hero h1 { font-size: 3em; margin-bottom: 20px; }
                    .hero p { font-size: 1.3em; margin-bottom: 30px; }
                    .cta-button { background: #ff6b6b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-size: 1.1em; transition: background 0.3s; }
                    .cta-button:hover { background: #ff5252; }
                    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin: 40px 0; }
                    .feature { background: rgba(255,255,255,0.1); padding: 30px; border-radius: 10px; text-align: center; }
                    .feature h3 { margin-bottom: 15px; }
                    .footer { text-align: center; padding: 40px 0; border-top: 1px solid rgba(255,255,255,0.2); margin-top: 40px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">🏄‍♀️ Movement Performance Training</div>
                        <div class="tagline">Elite Training for Water Sports Enthusiasts</div>
                    </div>
                    
                    <nav class="nav">
                        <a href="#home">Home</a>
                        <a href="#about">About</a>
                        <a href="#services">Services</a>
                        <a href="#contact">Contact</a>
                        <a href="/admin">Admin</a>
                    </nav>
                    
                    <div class="hero">
                        <h1>Master the Waves</h1>
                        <p>Professional training for kitesurfing, wing foiling, and water sports performance</p>
                        <a href="#contact" class="cta-button">Book Your Session</a>
                    </div>
                    
                    <div class="features">
                        <div class="feature">
                            <h3>🏄‍♀️ Kitesurfing</h3>
                            <p>Learn from certified instructors with years of experience</p>
                        </div>
                        <div class="feature">
                            <h3>🪂 Wing Foiling</h3>
                            <p>Master the latest water sport sensation</p>
                        </div>
                        <div class="feature">
                            <h3>💪 Performance Training</h3>
                            <p>Build strength and endurance for water sports</p>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>📍 Birtinya, QLD 4575 | 📞 04 98 471 509 | ✉️ chloebarrettraining@icloud.com</p>
                        <p>© 2024 Movement Performance Training. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            """;
    }
}

