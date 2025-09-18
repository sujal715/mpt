package com.mpt.mpt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.mpt.mpt.repository.GalleryRepository;
import com.mpt.mpt.entity.Gallery;
import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@CrossOrigin(origins = "*")
public class GalleryCleanupController {

    @Autowired
    private GalleryRepository galleryRepository;

    @DeleteMapping("/cleanup")
    public String cleanupGallery() {
        try {
            // Count before cleanup
            long beforeCount = galleryRepository.count();
            
            // Get all items and delete duplicates manually
            List<Gallery> allItems = galleryRepository.findAll();
            
            // Delete items with ID > 35
            for (Gallery item : allItems) {
                if (item.getId() > 35) {
                    galleryRepository.delete(item);
                }
            }
            
            // Count after cleanup
            long afterCount = galleryRepository.count();
            
            return String.format("Gallery cleaned! Before: %d items, After: %d items", beforeCount, afterCount);
        } catch (Exception e) {
            return "Error cleaning gallery: " + e.getMessage();
        }
    }
}
