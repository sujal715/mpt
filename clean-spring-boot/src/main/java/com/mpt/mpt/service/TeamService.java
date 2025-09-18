package com.mpt.mpt.service;

import com.mpt.mpt.entity.Team;
import com.mpt.mpt.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeamService {
    
    @Autowired
    private TeamRepository teamRepository;
    
    public List<Team> getAllTeamMembers() {
        return teamRepository.findAllByOrderByDisplayOrderAsc();
    }
    
    public List<Team> getFeaturedTeamMembers() {
        return teamRepository.findByIsFeaturedTrue();
    }
    
    public Optional<Team> getTeamMemberById(Long id) {
        return teamRepository.findById(id);
    }
    
    public Team createTeamMember(Team teamMember) {
        return teamRepository.save(teamMember);
    }
    
    public Team updateTeamMember(Long id, Team teamDetails) {
        Optional<Team> optionalTeam = teamRepository.findById(id);
        if (optionalTeam.isPresent()) {
            Team existingTeam = optionalTeam.get();
            existingTeam.setName(teamDetails.getName());
            existingTeam.setTitle(teamDetails.getTitle());
            existingTeam.setDescription(teamDetails.getDescription());
            existingTeam.setImageUrl(teamDetails.getImageUrl());
            existingTeam.setCredentials(teamDetails.getCredentials());
            existingTeam.setIsFeatured(teamDetails.getIsFeatured());
            existingTeam.setDisplayOrder(teamDetails.getDisplayOrder());
            return teamRepository.save(existingTeam);
        }
        return null;
    }
    
    public boolean deleteTeamMember(Long id) {
        if (teamRepository.existsById(id)) {
            teamRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public Long getTeamMemberCount() {
        return teamRepository.countAllMembers();
    }
}
