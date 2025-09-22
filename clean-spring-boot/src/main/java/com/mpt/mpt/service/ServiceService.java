package com.mpt.mpt.service;

import com.mpt.mpt.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<com.mpt.mpt.entity.Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public List<com.mpt.mpt.entity.Service> getActiveServices() {
        return serviceRepository.findByIsActiveTrue();
    }

    public Optional<com.mpt.mpt.entity.Service> getServiceById(Long id) {
        return serviceRepository.findById(id);
    }

    public com.mpt.mpt.entity.Service createService(com.mpt.mpt.entity.Service service) {
        return serviceRepository.save(service);
    }

    public com.mpt.mpt.entity.Service updateService(Long id, com.mpt.mpt.entity.Service serviceDetails) {
        Optional<com.mpt.mpt.entity.Service> optionalService = serviceRepository.findById(id);
        if (optionalService.isPresent()) {
            com.mpt.mpt.entity.Service service = optionalService.get();
            service.setName(serviceDetails.getName());
            service.setDescription(serviceDetails.getDescription());
            service.setPrice(serviceDetails.getPrice());
            service.setCategory(serviceDetails.getCategory());
            service.setIsActive(serviceDetails.getIsActive());
            return serviceRepository.save(service);
        }
        return null;
    }

    public boolean deleteService(Long id) {
        if (serviceRepository.existsById(id)) {
            serviceRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
