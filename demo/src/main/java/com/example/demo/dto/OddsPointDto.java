package com.example.demo.dto;
import java.math.BigDecimal;
import java.time.LocalDateTime;
public record OddsPointDto(LocalDateTime recordedAt, BigDecimal homeWin, BigDecimal draw, BigDecimal awayWin) {}
