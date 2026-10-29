package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class SportsAnalyticsService {
    private final MatchRepository matchRepository;
    private final OddsHistoryRepository oddsRepository;

    @Transactional(readOnly = true)
    public List<MatchDto> getMatches() {
        return matchRepository.findByOrderByKickoffAtAsc().stream().map(this::toDto).toList();
    }

    @Transactional(readOnly = true)
    public MatchDetailsDto getMatch(Long id) {
        Match match = matchRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Match with id " + id + " was not found"));
        return new MatchDetailsDto(toDto(match), oddsRepository.findTop24ByMatch_IdOrderByRecordedAtAsc(id)
                .stream().map(o -> new OddsPointDto(o.getRecordedAt(), o.getHomeWin(), o.getDraw(), o.getAwayWin())).toList());
    }

    @Scheduled(fixedRate = 5000)
    @Transactional
    public void simulateOdds() {
        matchRepository.findAll().forEach(match -> {
            OddsHistory previous = oddsRepository.findTopByMatch_IdOrderByRecordedAtDesc(match.getId());
            if (previous == null) return;
            oddsRepository.save(OddsHistory.builder().match(match)
                    .homeWin(jitter(previous.getHomeWin())).draw(jitter(previous.getDraw()))
                    .awayWin(jitter(previous.getAwayWin())).recordedAt(LocalDateTime.now()).build());
        });
    }

    private BigDecimal jitter(BigDecimal value) {
        double result = value.doubleValue() + ThreadLocalRandom.current().nextDouble(-0.08, 0.081);
        return BigDecimal.valueOf(Math.max(1.05, result)).setScale(3, RoundingMode.HALF_UP);
    }

    private MatchDto toDto(Match m) {
        OddsHistory o = oddsRepository.findTopByMatch_IdOrderByRecordedAtDesc(m.getId());
        List<OddsHistory> recent = oddsRepository.findTop2ByMatch_IdOrderByRecordedAtDesc(m.getId());
        OddsHistory previous = recent.size() > 1 ? recent.get(1) : null;
        return new MatchDto(m.getId(), team(m.getHomeTeam()), team(m.getAwayTeam()), m.getKickoffAt(),
                m.getStatus().name(), m.getVenue(), m.getHomeForm(), m.getAwayForm(),
                o == null ? null : o.getHomeWin(), o == null ? null : o.getDraw(), o == null ? null : o.getAwayWin(),
                change(o == null ? null : o.getHomeWin(), previous == null ? null : previous.getHomeWin()),
                change(o == null ? null : o.getDraw(), previous == null ? null : previous.getDraw()),
                change(o == null ? null : o.getAwayWin(), previous == null ? null : previous.getAwayWin()));
    }
    private BigDecimal change(BigDecimal current, BigDecimal previous) {
        if (current == null || previous == null || previous.signum() == 0) return BigDecimal.ZERO;
        return current.subtract(previous).divide(previous, 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100)).setScale(2, RoundingMode.HALF_UP);
    }
    private TeamDto team(Team t) { return new TeamDto(t.getId(), t.getName(), t.getShortName(), t.getLeague()); }
}
