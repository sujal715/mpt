package com.mpt.mpt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mpt.mpt.entity.Gallery;
import com.mpt.mpt.repository.GalleryRepository;

@Service
public class GalleryService {
    
    @Autowired
    private GalleryRepository galleryRepository;
    
    public List<Gallery> getAllGalleryItems() {
        return galleryRepository.findAll();
    }
    
    public Optional<Gallery> getGalleryItemById(Long id) {
        return galleryRepository.findById(id);
    }
    
    public Gallery createGalleryItem(Gallery gallery) {
        return galleryRepository.save(gallery);
    }
    
    public Gallery updateGalleryItem(Long id, Gallery galleryDetails) {
        Optional<Gallery> optionalGallery = galleryRepository.findById(id);
        if (optionalGallery.isPresent()) {
            Gallery gallery = optionalGallery.get();
            gallery.setTitle(galleryDetails.getTitle());
            gallery.setUrl(galleryDetails.getUrl());
            gallery.setCategory(galleryDetails.getCategory());
            gallery.setIsFeatured(galleryDetails.getIsFeatured());
            return galleryRepository.save(gallery);
        }
        return null;
    }
    
    public boolean deleteGalleryItem(Long id) {
        if (galleryRepository.existsById(id)) {
            galleryRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Gallery> getFeaturedGalleryItems() {
        return galleryRepository.findByIsFeaturedTrue();
    }
    
    public List<Gallery> getGalleryItemsByCategory(String category) {
        return galleryRepository.findByCategory(category);
    }
}
