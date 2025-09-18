package com.mpt.mpt.repository;

import com.mpt.mpt.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    
    List<Team> findByIsFeaturedTrue();
    
    List<Team> findAllByOrderByDisplayOrderAsc();
    
    @Query("SELECT COUNT(t) FROM Team t")
    Long countAllMembers();
}
