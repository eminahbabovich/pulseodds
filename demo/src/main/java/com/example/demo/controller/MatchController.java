package com.example.demo.controller;

import com.example.demo.dto.*;
import com.example.demo.service.SportsAnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequestMapping("/api/matches")
@RequiredArgsConstructor
@Tag(name = "Matches", description = "Live fixtures and odds analytics")
public class MatchController {
    private final SportsAnalyticsService service;
    @GetMapping
    @Operation(summary = "List fixtures with current odds")
    public List<MatchDto> all() { return service.getMatches(); }
    @GetMapping("/{id}")
    @Operation(summary = "Get a fixture and its odds history")
    public MatchDetailsDto one(@PathVariable @Positive(message = "Match id must be positive") Long id) {
        return service.getMatch(id);
    }
}
