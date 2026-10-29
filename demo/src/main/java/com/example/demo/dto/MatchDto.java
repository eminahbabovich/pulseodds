package com.example.demo.dto;
import java.math.BigDecimal;
import java.time.LocalDateTime;
public record MatchDto(Long id, TeamDto homeTeam, TeamDto awayTeam, LocalDateTime kickoffAt,
                       String status, String venue, String homeForm, String awayForm,
                       BigDecimal homeWin, BigDecimal draw, BigDecimal awayWin,
                       BigDecimal homeChange, BigDecimal drawChange, BigDecimal awayChange) {}
