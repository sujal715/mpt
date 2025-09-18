package com.mpt.mpt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mpt.mpt.entity.Contact;
import com.mpt.mpt.repository.ContactRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {
    
    @Autowired
    private ContactRepository contactRepository;
    
    public Contact createContact(Contact contact) {
        return contactRepository.save(contact);
    }
    
    public List<Contact> getAllContacts() {
        return contactRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public Optional<Contact> getContactById(Long id) {
        return contactRepository.findById(id);
    }
    
    public List<Contact> getUnreadContacts() {
        return contactRepository.findByIsReadFalseOrderByCreatedAtDesc();
    }
    
    public List<Contact> getContactsByStatus(String status) {
        return contactRepository.findByStatusOrderByCreatedAtDesc(status);
    }
    
    public List<Contact> searchContacts(String searchTerm) {
        return contactRepository.searchContacts(searchTerm);
    }
    
    public Contact updateContactStatus(Long id, String status) {
        Optional<Contact> contactOpt = contactRepository.findById(id);
        if (contactOpt.isPresent()) {
            Contact contact = contactOpt.get();
            contact.setStatus(status);
            return contactRepository.save(contact);
        }
        return null;
    }
    
    public Contact markAsRead(Long id) {
        Optional<Contact> contactOpt = contactRepository.findById(id);
        if (contactOpt.isPresent()) {
            Contact contact = contactOpt.get();
            contact.setIsRead(true);
            return contactRepository.save(contact);
        }
        return null;
    }
    
    public Contact markAsUnread(Long id) {
        Optional<Contact> contactOpt = contactRepository.findById(id);
        if (contactOpt.isPresent()) {
            Contact contact = contactOpt.get();
            contact.setIsRead(false);
            return contactRepository.save(contact);
        }
        return null;
    }
    
    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }
    
    public long getUnreadCount() {
        return contactRepository.countByIsReadFalse();
    }
    
    public long getContactCountByStatus(String status) {
        return contactRepository.countByStatus(status);
    }
}
