package com.mpt.mpt.service;

import com.mpt.mpt.entity.Package;
import com.mpt.mpt.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PackageService {
    
    @Autowired
    private PackageRepository packageRepository;
    
    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }
    
    public List<Package> getActivePackages() {
        return packageRepository.findByIsActiveTrue();
    }
    
    public Optional<Package> getPackageById(Long id) {
        return packageRepository.findById(id);
    }
    
    public Package createPackage(Package packageEntity) {
        return packageRepository.save(packageEntity);
    }
    
    public Package updatePackage(Long id, Package packageDetails) {
        Optional<Package> optionalPackage = packageRepository.findById(id);
        if (optionalPackage.isPresent()) {
            Package existingPackage = optionalPackage.get();
            existingPackage.setName(packageDetails.getName());
            existingPackage.setDescription(packageDetails.getDescription());
            existingPackage.setPrice(packageDetails.getPrice());
            existingPackage.setDuration(packageDetails.getDuration());
            existingPackage.setIsActive(packageDetails.getIsActive());
            return packageRepository.save(existingPackage);
        }
        return null;
    }
    
    public boolean deletePackage(Long id) {
        if (packageRepository.existsById(id)) {
            packageRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
