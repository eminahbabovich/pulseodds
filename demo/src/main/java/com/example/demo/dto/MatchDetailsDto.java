package com.example.demo.dto;
import java.util.List;
public record MatchDetailsDto(MatchDto match, List<OddsPointDto> history) {}
