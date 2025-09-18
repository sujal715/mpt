package com.mpt.mpt;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mpt.mpt.entity.Gallery;
import com.mpt.mpt.entity.Team;
import com.mpt.mpt.service.GalleryService;
import com.mpt.mpt.service.TeamService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:8081", allowCredentials = "true")
public class MainController {

    @Autowired
    private GalleryService galleryService;
    
    @Autowired
    private TeamService teamService;

    // Static list to store services (in-memory storage)
    private static java.util.List<Map<String, Object>> services = new java.util.ArrayList<>(Arrays.asList(
        Map.of("id", 1, "name", "Kitesurfing Training", "description", "Comprehensive kitesurfing lessons for all skill levels", "price", 99.99, "category", "Training", "isActive", true, "duration", "2 hours"),
        Map.of("id", 2, "name", "Hydrofoil Training", "description", "Master the art of hydrofoiling with expert instructors", "price", 149.99, "category", "Training", "isActive", true, "duration", "2 hours"),
        Map.of("id", 3, "name", "Wing Foil Training", "description", "Learn wing foiling techniques and safety protocols", "price", 129.99, "category", "Training", "isActive", true, "duration", "2 hours"),
        Map.of("id", 4, "name", "Equipment Rental", "description", "High-quality kitesurfing and foiling equipment rental", "price", 79.99, "category", "Rental", "isActive", true, "duration", "Full day"),
        Map.of("id", 5, "name", "Private Coaching", "description", "One-on-one personalized coaching sessions", "price", 199.99, "category", "Coaching", "isActive", true, "duration", "1 hour")
    ));
    private static int nextServiceId = 6;

    @GetMapping("/test")
    public Map<String, Object> test() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Backend is working!");
        response.put("status", "success");
        return response;
    }

    @GetMapping("/test-image")
    public String testImage() {
        return "<!DOCTYPE html><html><head><title>Image Test</title></head><body><h1>Image Test</h1><img src='/images/training/WhatsApp Image 2025-09-01 at 11.21.30 AM.jpeg' alt='Test Image' style='max-width: 300px;'><p>If you can see the image above, static file serving is working.</p></body></html>";
    }

    @PostMapping("/debug-payment")
    public ResponseEntity<Map<String, Object>> debugPayment(@RequestBody Map<String, Object> request) {
        Map<String, Object> response = new HashMap<>();
        response.put("received_data", request);
        response.put("timestamp", System.currentTimeMillis());
        response.put("status", "debug_success");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/gallery-debug")
    public String galleryDebug() {
        return "<!DOCTYPE html><html><head><title>Gallery Debug Test</title><style>body { font-family: Arial, sans-serif; margin: 20px; } .gallery-item { border: 1px solid #ccc; margin: 10px; padding: 10px; } .gallery-item img { max-width: 200px; max-height: 200px; } .error { color: red; } .success { color: green; }</style></head><body><h1>Gallery Debug Test</h1><div id='status'></div><h2>Gallery Items:</h2><div id='gallery'></div><h2>Upload Test:</h2><form id='uploadForm'><input type='file' id='fileInput' accept='image/*' required><input type='text' id='titleInput' placeholder='Title' required><select id='categoryInput'><option value='Action'>Action</option><option value='Training'>Training</option><option value='Scenic'>Scenic</option><option value='Equipment'>Equipment</option></select><button type='submit'>Upload</button></form><script>const statusDiv = document.getElementById('status'); const galleryDiv = document.getElementById('gallery'); function log(message, type = 'info') { const className = type === 'error' ? 'error' : type === 'success' ? 'success' : ''; statusDiv.innerHTML += '<div class=\"' + className + '\">' + new Date().toLocaleTimeString() + ': ' + message + '</div>'; } async function fetchGallery() { try { log('Fetching gallery...'); const response = await fetch('http://localhost:8081/api/gallery'); const data = await response.json(); log('Received ' + data.length + ' gallery items', 'success'); galleryDiv.innerHTML = ''; data.forEach(item => { const itemDiv = document.createElement('div'); itemDiv.className = 'gallery-item'; itemDiv.innerHTML = '<h3>' + item.title + ' (ID: ' + item.id + ')</h3><p>Category: ' + item.category + '</p><p>Featured: ' + item.isFeatured + '</p><img src=\"http://localhost:8081' + item.url + '\" alt=\"' + item.title + '\" onerror=\"this.style.border=\\\'2px solid red\\\'\"><p>URL: ' + item.url + '</p>'; galleryDiv.appendChild(itemDiv); }); } catch (error) { log('Error fetching gallery: ' + error.message, 'error'); } } document.getElementById('uploadForm').addEventListener('submit', async (e) => { e.preventDefault(); const file = document.getElementById('fileInput').files[0]; const title = document.getElementById('titleInput').value; const category = document.getElementById('categoryInput').value; if (!file) { log('No file selected', 'error'); return; } try { log('Uploading file...'); const formData = new FormData(); formData.append('file', file); formData.append('title', title); formData.append('category', category); formData.append('isFeatured', 'false'); const response = await fetch('http://localhost:8081/api/gallery/upload', { method: 'POST', body: formData }); const result = await response.json(); if (result.success) { log('Upload successful! ID: ' + result.data.id, 'success'); fetchGallery(); } else { log('Upload failed: ' + result.message, 'error'); } } catch (error) { log('Upload error: ' + error.message, 'error'); } }); fetchGallery();</script></body></html>";
    }

    @GetMapping("/test-gallery")
    public String galleryTest() {
        return "<!DOCTYPE html><html><head><title>Gallery Test</title><style>body { font-family: Arial, sans-serif; margin: 20px; } .gallery-item { border: 1px solid #ccc; margin: 10px; padding: 10px; display: inline-block; width: 300px; } .gallery-item img { max-width: 280px; max-height: 200px; } .error { color: red; } .success { color: green; } .upload-form { border: 2px solid #007bff; padding: 20px; margin: 20px 0; } input, select, button { margin: 5px; padding: 8px; } button { background: #007bff; color: white; border: none; cursor: pointer; }</style></head><body><h1>🎯 Gallery Test Page</h1><div id='status'></div><h2>📸 Current Gallery Items (7 total):</h2><div id='gallery'></div><div class='upload-form'><h2>📤 Upload New Image:</h2><form id='uploadForm'><input type='file' id='fileInput' accept='image/*' required><input type='text' id='titleInput' placeholder='Image Title' required><select id='categoryInput'><option value='Action'>Action</option><option value='Training'>Training</option><option value='Scenic'>Scenic</option><option value='Equipment'>Equipment</option></select><button type='submit'>Upload Image</button></form></div><script>const statusDiv = document.getElementById('status'); const galleryDiv = document.getElementById('gallery'); function log(message, type = 'info') { const className = type === 'error' ? 'error' : type === 'success' ? 'success' : ''; statusDiv.innerHTML += '<div class=\"' + className + '\">' + new Date().toLocaleTimeString() + ': ' + message + '</div>'; } async function fetchGallery() { try { log('🔄 Fetching gallery from backend...'); const response = await fetch('http://localhost:8081/api/gallery'); const data = await response.json(); log('✅ Received ' + data.length + ' gallery items', 'success'); galleryDiv.innerHTML = ''; data.forEach(item => { const itemDiv = document.createElement('div'); itemDiv.className = 'gallery-item'; itemDiv.innerHTML = '<h3>' + item.title + ' (ID: ' + item.id + ')</h3><p><strong>Category:</strong> ' + item.category + '</p><p><strong>Featured:</strong> ' + (item.isFeatured ? 'Yes' : 'No') + '</p><img src=\"http://localhost:8081' + item.url + '\" alt=\"' + item.title + '\" onerror=\"this.style.border=\\\'3px solid red\\\'; this.alt=\\\'❌ Image failed to load\\\'\"><p><strong>URL:</strong> ' + item.url + '</p>'; galleryDiv.appendChild(itemDiv); }); } catch (error) { log('❌ Error fetching gallery: ' + error.message, 'error'); } } document.getElementById('uploadForm').addEventListener('submit', async (e) => { e.preventDefault(); const file = document.getElementById('fileInput').files[0]; const title = document.getElementById('titleInput').value; const category = document.getElementById('categoryInput').value; if (!file) { log('❌ No file selected', 'error'); return; } try { log('📤 Uploading file...'); const formData = new FormData(); formData.append('file', file); formData.append('title', title); formData.append('category', category); formData.append('isFeatured', 'false'); const response = await fetch('http://localhost:8081/api/gallery/upload', { method: 'POST', body: formData }); const result = await response.json(); if (result.success) { log('✅ Upload successful! ID: ' + result.data.id, 'success'); fetchGallery(); document.getElementById('uploadForm').reset(); } else { log('❌ Upload failed: ' + result.message, 'error'); } } catch (error) { log('❌ Upload error: ' + error.message, 'error'); } }); fetchGallery();</script></body></html>";
    }

    @GetMapping("/api/test-gallery")
    public String apiGalleryTest() {
        return "<!DOCTYPE html><html><head><title>Gallery Test</title><style>body { font-family: Arial, sans-serif; margin: 20px; } .gallery-item { border: 1px solid #ccc; margin: 10px; padding: 10px; display: inline-block; width: 300px; } .gallery-item img { max-width: 280px; max-height: 200px; } .error { color: red; } .success { color: green; } .upload-form { border: 2px solid #007bff; padding: 20px; margin: 20px 0; } input, select, button { margin: 5px; padding: 8px; } button { background: #007bff; color: white; border: none; cursor: pointer; }</style></head><body><h1>🎯 Gallery Test Page</h1><div id='status'></div><h2>📸 Current Gallery Items:</h2><div id='gallery'></div><div class='upload-form'><h2>📤 Upload New Image:</h2><form id='uploadForm'><input type='file' id='fileInput' accept='image/*' required><input type='text' id='titleInput' placeholder='Image Title' required><select id='categoryInput'><option value='Action'>Action</option><option value='Training'>Training</option><option value='Scenic'>Scenic</option><option value='Equipment'>Equipment</option></select><button type='submit'>Upload Image</button></form></div><script>const statusDiv = document.getElementById('status'); const galleryDiv = document.getElementById('gallery'); function log(message, type = 'info') { const className = type === 'error' ? 'error' : type === 'success' ? 'success' : ''; statusDiv.innerHTML += '<div class=\"' + className + '\">' + new Date().toLocaleTimeString() + ': ' + message + '</div>'; } async function fetchGallery() { try { log('🔄 Fetching gallery from backend...'); const response = await fetch('http://localhost:8081/api/gallery'); const data = await response.json(); log('✅ Received ' + data.length + ' gallery items', 'success'); galleryDiv.innerHTML = ''; data.forEach(item => { const itemDiv = document.createElement('div'); itemDiv.className = 'gallery-item'; itemDiv.innerHTML = '<h3>' + item.title + ' (ID: ' + item.id + ')</h3><p><strong>Category:</strong> ' + item.category + '</p><p><strong>Featured:</strong> ' + (item.isFeatured ? 'Yes' : 'No') + '</p><img src=\"http://localhost:8081' + item.url + '\" alt=\"' + item.title + '\" onerror=\"this.style.border=\\\'3px solid red\\\'; this.alt=\\\'❌ Image failed to load\\\'\"><p><strong>URL:</strong> ' + item.url + '</p>'; galleryDiv.appendChild(itemDiv); }); } catch (error) { log('❌ Error fetching gallery: ' + error.message, 'error'); } } document.getElementById('uploadForm').addEventListener('submit', async (e) => { e.preventDefault(); const file = document.getElementById('fileInput').files[0]; const title = document.getElementById('titleInput').value; const category = document.getElementById('categoryInput').value; if (!file) { log('❌ No file selected', 'error'); return; } try { log('📤 Uploading file...'); const formData = new FormData(); formData.append('file', file); formData.append('title', title); formData.append('category', category); formData.append('isFeatured', 'false'); const response = await fetch('http://localhost:8081/api/gallery/upload', { method: 'POST', body: formData }); const result = await response.json(); if (result.success) { log('✅ Upload successful! ID: ' + result.data.id, 'success'); fetchGallery(); document.getElementById('uploadForm').reset(); } else { log('❌ Upload failed: ' + result.message, 'error'); } } catch (error) { log('❌ Upload error: ' + error.message, 'error'); } }); fetchGallery();</script></body></html>";
    }

    @GetMapping("/customers")
    public Map<String, Object> getCustomers() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", new Object[]{
            Map.of("customerId", 1, "firstName", "John", "lastName", "Doe", "email", "john@example.com"),
            Map.of("customerId", 2, "firstName", "Jane", "lastName", "Smith", "email", "jane@example.com")
        });
        return response;
    }

    @GetMapping("/packages")
    public Map<String, Object> getPackages() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", new Object[]{
            Map.of("packageId", 1, "packageName", "Basic Package", "price", 99.99, "duration", "1 hour"),
            Map.of("packageId", 2, "packageName", "Premium Package", "price", 199.99, "duration", "2 hours"),
            Map.of("packageId", 3, "packageName", "Deluxe Package", "price", 299.99, "duration", "3 hours"),
            Map.of("packageId", 4, "packageName", "VIP Package", "price", 499.99, "duration", "4 hours"),
            Map.of("packageId", 5, "packageName", "Corporate Package", "price", 799.99, "duration", "6 hours")
        });
        return response;
    }

    // Removed /bookings endpoint to avoid conflict with BookingController

    // Testimonials endpoint moved to TestimonialController to avoid conflicts

    @GetMapping("/services")
    public ResponseEntity<List<Map<String, Object>>> getServices() {
        return ResponseEntity.ok(services);
    }

    @PostMapping("/services")
    public ResponseEntity<Map<String, Object>> createService(@RequestBody Map<String, Object> serviceData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Map<String, Object> newService = new HashMap<>(serviceData);
            newService.put("id", nextServiceId++);
            services.add(newService);
            
            response.put("success", true);
            response.put("message", "Service created successfully!");
            response.put("data", newService);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error creating service: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/services/{id}")
    public ResponseEntity<Map<String, Object>> updateService(@PathVariable Integer id, @RequestBody Map<String, Object> serviceData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            for (int i = 0; i < services.size(); i++) {
                Map<String, Object> service = services.get(i);
                if (service.get("id").equals(id)) {
                    Map<String, Object> updatedService = new HashMap<>(serviceData);
                    updatedService.put("id", id);
                    services.set(i, updatedService);
                    
                    response.put("success", true);
                    response.put("message", "Service updated successfully!");
                    response.put("data", updatedService);
                    return ResponseEntity.ok(response);
                }
            }
            
            response.put("success", false);
            response.put("message", "Service not found");
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating service: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/services/{id}")
    public ResponseEntity<Map<String, Object>> deleteService(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            for (int i = 0; i < services.size(); i++) {
                Map<String, Object> service = services.get(i);
                if (service.get("id").equals(id)) {
                    services.remove(i);
                    
                    response.put("success", true);
                    response.put("message", "Service deleted successfully!");
                    return ResponseEntity.ok(response);
                }
            }
            
            response.put("success", false);
            response.put("message", "Service not found");
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error deleting service: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/videos")
    public Map<String, Object> getVideos() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("videos", new Object[]{
            Map.of("filename", "training-video.mp4", "title", "Training Video", "url", "/videos/training-video.mp4", "size", 1024000, "lastModified", "2025-09-07T20:00:00Z"),
            Map.of("filename", "demo-video.mp4", "title", "Demo Video", "url", "/videos/demo-video.mp4", "size", 2048000, "lastModified", "2025-09-07T19:00:00Z")
        });
        return response;
    }

    // Gallery Management Endpoints
    @GetMapping("/gallery")
    public ResponseEntity<List<Gallery>> getGallery() {
        List<Gallery> galleryItems = galleryService.getAllGalleryItems();
        return ResponseEntity.ok(galleryItems);
    }

    @GetMapping("/gallery-fresh")
    public ResponseEntity<List<Gallery>> getGalleryFresh() {
        List<Gallery> galleryItems = galleryService.getAllGalleryItems();
        // Add cache-busting headers
        return ResponseEntity.ok()
            .header("Cache-Control", "no-cache, no-store, must-revalidate")
            .header("Pragma", "no-cache")
            .header("Expires", "0")
            .body(galleryItems);
    }

    @GetMapping("/cleanup-duplicates")
    public ResponseEntity<Map<String, Object>> cleanupDuplicates() {
        Map<String, Object> response = new HashMap<>();
        try {
            // Get all gallery items
            List<Gallery> allItems = galleryService.getAllGalleryItems();
            
            // Group by URL and keep only the first occurrence of each URL
            Map<String, Gallery> uniqueItems = new HashMap<>();
            int duplicatesRemoved = 0;
            
            for (Gallery item : allItems) {
                if (!uniqueItems.containsKey(item.getUrl())) {
                    uniqueItems.put(item.getUrl(), item);
                } else {
                    // This is a duplicate, remove it
                    galleryService.deleteGalleryItem(item.getId());
                    duplicatesRemoved++;
                }
            }
            
            response.put("success", true);
            response.put("totalItems", allItems.size());
            response.put("uniqueItems", uniqueItems.size());
            response.put("duplicatesRemoved", duplicatesRemoved);
            response.put("message", "Gallery cleanup completed successfully");
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/cleanup-missing-files")
    public ResponseEntity<Map<String, Object>> cleanupMissingFiles() {
        Map<String, Object> response = new HashMap<>();
        try {
            // Get all gallery items
            List<Gallery> allItems = galleryService.getAllGalleryItems();
            int totalItems = allItems.size();
            int missingFilesRemoved = 0;
            
            for (Gallery item : allItems) {
                // Check if the file exists
                String filePath = "src/main/resources/static" + item.getUrl();
                java.io.File file = new java.io.File(filePath);
                
                if (!file.exists()) {
                    // File doesn't exist, remove the database entry
                    galleryService.deleteGalleryItem(item.getId());
                    missingFilesRemoved++;
                }
            }
            
            response.put("success", true);
            response.put("totalItems", totalItems);
            response.put("missingFilesRemoved", missingFilesRemoved);
            response.put("remainingItems", totalItems - missingFilesRemoved);
            response.put("message", "Missing files cleanup completed successfully");
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
        }
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/gallery")
    public ResponseEntity<Map<String, Object>> createGalleryItem(@RequestBody Map<String, Object> galleryData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Gallery gallery = new Gallery();
            gallery.setTitle((String) galleryData.get("title"));
            gallery.setUrl((String) galleryData.get("url"));
            gallery.setCategory((String) galleryData.get("category"));
            gallery.setIsFeatured((Boolean) galleryData.get("isFeatured"));
            
            Gallery savedGallery = galleryService.createGalleryItem(gallery);
            
            response.put("success", true);
            response.put("message", "Gallery item created successfully!");
            response.put("data", savedGallery);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error creating gallery item: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/gallery/{id}")
    public ResponseEntity<Map<String, Object>> updateGalleryItem(@PathVariable Long id, @RequestBody Map<String, Object> galleryData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Gallery gallery = new Gallery();
            gallery.setTitle((String) galleryData.get("title"));
            gallery.setUrl((String) galleryData.get("url"));
            gallery.setCategory((String) galleryData.get("category"));
            gallery.setIsFeatured((Boolean) galleryData.get("isFeatured"));
            
            Gallery updatedGallery = galleryService.updateGalleryItem(id, gallery);
            
            if (updatedGallery != null) {
                response.put("success", true);
                response.put("message", "Gallery item updated successfully!");
                response.put("data", updatedGallery);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Gallery item not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating gallery item: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/gallery/{id}")
    public ResponseEntity<Map<String, Object>> deleteGalleryItem(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            boolean deleted = galleryService.deleteGalleryItem(id);
            
            if (deleted) {
                response.put("success", true);
                response.put("message", "Gallery item deleted successfully!");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Gallery item not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error deleting gallery item: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // File upload endpoint for Gallery images
    @PostMapping("/gallery/upload")
    @CrossOrigin(origins = {"http://localhost:8081", "http://localhost:3000", "http://localhost:3001", "https://ppt-app-y42f.onrender.com"}, allowCredentials = "true")
    public ResponseEntity<Map<String, Object>> uploadGalleryImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("category") String category,
            @RequestParam(value = "isFeatured", defaultValue = "false") Boolean isFeatured) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Validate file
            if (file.isEmpty()) {
                response.put("success", false);
                response.put("message", "Please select a file to upload");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Validate file type
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                response.put("success", false);
                response.put("message", "Please upload an image file");
                return ResponseEntity.badRequest().body(response);
            }
            
            // Save to target/classes/static/images directory for Spring Boot static serving
            String uploadDir = "target/classes/static/images";
            // Convert to absolute path to ensure it works regardless of working directory
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.isAbsolute()) {
                uploadDirFile = new File(System.getProperty("user.dir"), uploadDir);
            }
            uploadDir = uploadDirFile.getAbsolutePath();
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            
            // Generate unique filename with better naming convention
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            
            // Create a more unique filename using timestamp + random number + original name hash
            long timestamp = System.currentTimeMillis();
            int randomNum = (int) (Math.random() * 1000);
            int nameHash = Math.abs(originalFilename.hashCode() % 1000);
            String uniqueFilename = String.format("gallery-%d-%d-%d%s", timestamp, randomNum, nameHash, fileExtension);
            
            // Ensure the file doesn't already exist (very unlikely but good practice)
            File targetFile = new File(directory, uniqueFilename);
            int counter = 1;
            while (targetFile.exists()) {
                uniqueFilename = String.format("gallery-%d-%d-%d-%d%s", timestamp, randomNum, nameHash, counter, fileExtension);
                targetFile = new File(directory, uniqueFilename);
                counter++;
            }
            
            // Save file
            Path filePath = Paths.get(uploadDir, uniqueFilename);
            Files.copy(file.getInputStream(), filePath);
            
            // Log the upload for debugging
            System.out.println("Gallery upload successful:");
            System.out.println("  Original filename: " + originalFilename);
            System.out.println("  Saved as: " + uniqueFilename);
            System.out.println("  Title: " + title);
            System.out.println("  Category: " + category);
            System.out.println("  File size: " + file.getSize() + " bytes");
            
            // Create gallery item with uploaded file URL
            Gallery gallery = new Gallery();
            gallery.setTitle(title);
            gallery.setUrl("/images/" + uniqueFilename);
            gallery.setCategory(category);
            gallery.setIsFeatured(isFeatured);
            
            Gallery savedGallery = galleryService.createGalleryItem(gallery);
            
            response.put("success", true);
            response.put("message", "Image uploaded successfully!");
            response.put("data", savedGallery);
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            System.err.println("File upload error: " + e.getMessage());
            response.put("success", false);
            response.put("message", "Error uploading file: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            System.err.println("Gallery creation error: " + e.getMessage());
            response.put("success", false);
            response.put("message", "Error creating gallery item: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // Gallery cleanup endpoint to remove duplicates and orphaned entries
    @PostMapping("/gallery/cleanup")
    @CrossOrigin(origins = {"http://localhost:8081", "http://localhost:3000", "http://localhost:3001", "https://ppt-app-y42f.onrender.com"}, allowCredentials = "true")
    public ResponseEntity<Map<String, Object>> cleanupGallery() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            List<Gallery> allItems = galleryService.getAllGalleryItems();
            long beforeCount = allItems.size();
            
            // Check which files actually exist
            String imagesDir = "target/classes/static/images";
            File imagesDirFile = new File(imagesDir);
            if (!imagesDirFile.isAbsolute()) {
                imagesDirFile = new File(System.getProperty("user.dir"), imagesDir);
            }
            
            int removedCount = 0;
            for (Gallery item : allItems) {
                String url = item.getUrl();
                if (url.startsWith("/images/")) {
                    String filename = url.substring("/images/".length());
                    File file = new File(imagesDirFile, filename);
                    if (!file.exists()) {
                        System.out.println("Removing orphaned gallery entry: " + item.getTitle() + " (file not found: " + filename + ")");
                        galleryService.deleteGalleryItem(item.getId());
                        removedCount++;
                    }
                }
            }
            
            long afterCount = galleryService.getAllGalleryItems().size();
            
            response.put("success", true);
            response.put("message", String.format("Gallery cleanup completed. Removed %d orphaned entries. Before: %d, After: %d", removedCount, beforeCount, afterCount));
            response.put("removedCount", removedCount);
            response.put("beforeCount", beforeCount);
            response.put("afterCount", afterCount);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error during cleanup: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // Team Management Endpoints
    @GetMapping("/team")
    public ResponseEntity<List<Team>> getTeamMembers() {
        List<Team> teamMembers = teamService.getAllTeamMembers();
        return ResponseEntity.ok(teamMembers);
    }

    @GetMapping("/team/featured")
    public ResponseEntity<List<Team>> getFeaturedTeamMembers() {
        List<Team> featuredMembers = teamService.getFeaturedTeamMembers();
        return ResponseEntity.ok(featuredMembers);
    }

    @GetMapping("/team/{id}")
    public ResponseEntity<Map<String, Object>> getTeamMember(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            var teamMember = teamService.getTeamMemberById(id);
            if (teamMember.isPresent()) {
                response.put("success", true);
                response.put("data", teamMember.get());
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Team member not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error retrieving team member: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/team")
    public ResponseEntity<Map<String, Object>> createTeamMember(@RequestBody Map<String, Object> teamData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Team team = new Team();
            team.setName((String) teamData.get("name"));
            team.setTitle((String) teamData.get("title"));
            team.setDescription((String) teamData.get("description"));
            team.setImageUrl((String) teamData.get("imageUrl"));
            team.setCredentials((String) teamData.get("credentials"));
            team.setIsFeatured((Boolean) teamData.getOrDefault("isFeatured", false));
            team.setDisplayOrder((Integer) teamData.getOrDefault("displayOrder", 0));
            
            Team savedTeam = teamService.createTeamMember(team);
            
            response.put("success", true);
            response.put("message", "Team member created successfully!");
            response.put("data", savedTeam);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error creating team member: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/team/{id}")
    public ResponseEntity<Map<String, Object>> updateTeamMember(@PathVariable Long id, @RequestBody Map<String, Object> teamData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Team team = new Team();
            team.setName((String) teamData.get("name"));
            team.setTitle((String) teamData.get("title"));
            team.setDescription((String) teamData.get("description"));
            team.setImageUrl((String) teamData.get("imageUrl"));
            team.setCredentials((String) teamData.get("credentials"));
            team.setIsFeatured((Boolean) teamData.getOrDefault("isFeatured", false));
            team.setDisplayOrder((Integer) teamData.getOrDefault("displayOrder", 0));
            
            Team updatedTeam = teamService.updateTeamMember(id, team);
            
            if (updatedTeam != null) {
                response.put("success", true);
                response.put("message", "Team member updated successfully!");
                response.put("data", updatedTeam);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Team member not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error updating team member: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/team/{id}")
    public ResponseEntity<Map<String, Object>> deleteTeamMember(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            boolean deleted = teamService.deleteTeamMember(id);
            
            if (deleted) {
                response.put("success", true);
                response.put("message", "Team member deleted successfully!");
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Team member not found");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error deleting team member: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/team/count")
    public ResponseEntity<Map<String, Object>> getTeamMemberCount() {
        Map<String, Object> response = new HashMap<>();
        try {
            Long count = teamService.getTeamMemberCount();
            response.put("success", true);
            response.put("count", count);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error getting team count: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/team/{id}/sync-to-gallery")
    public ResponseEntity<Map<String, Object>> syncTeamMemberToGallery(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            var teamMember = teamService.getTeamMemberById(id);
            if (teamMember.isPresent()) {
                Team member = teamMember.get();
                
                // Check if team member already exists in gallery
                List<Gallery> existingGalleryItems = galleryService.getAllGalleryItems();
                boolean exists = existingGalleryItems.stream()
                    .anyMatch(item -> item.getTitle() != null && 
                              item.getTitle().contains(member.getName()) && 
                              "Team".equals(item.getCategory()));
                
                if (!exists) {
                    // Create gallery item for team member
                    Gallery galleryItem = new Gallery();
                    galleryItem.setTitle(member.getName() + " - " + member.getTitle());
                    galleryItem.setUrl(member.getImageUrl());
                    galleryItem.setCategory("Team");
                    galleryItem.setIsFeatured(member.getIsFeatured());
                    
                    Gallery savedGalleryItem = galleryService.createGalleryItem(galleryItem);
                    
                    response.put("success", true);
                    response.put("message", "Team member synced to gallery successfully!");
                    response.put("data", savedGalleryItem);
                } else {
                    response.put("success", false);
                    response.put("message", "Team member already exists in gallery");
                }
            } else {
                response.put("success", false);
                response.put("message", "Team member not found");
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error syncing team member to gallery: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
