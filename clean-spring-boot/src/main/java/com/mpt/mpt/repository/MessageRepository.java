package com.mpt.mpt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mpt.mpt.entity.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByStatus(String status);
    List<Message> findByEmail(String email);
}
