package com.mpt.mpt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mpt.mpt.entity.Gallery;

@Repository
public interface GalleryRepository extends JpaRepository<Gallery, Long> {
    List<Gallery> findByIsFeaturedTrue();
    List<Gallery> findByCategory(String category);
}
