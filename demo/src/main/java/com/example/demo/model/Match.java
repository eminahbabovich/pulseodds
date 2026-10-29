package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Match {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER, optional = false) @JoinColumn(name = "home_team_id")
    private Team homeTeam;
    @ManyToOne(fetch = FetchType.EAGER, optional = false) @JoinColumn(name = "away_team_id")
    private Team awayTeam;
    @Column(name = "kickoff_at", nullable = false) private LocalDateTime kickoffAt;
    @Enumerated(EnumType.STRING) @Column(nullable = false) private MatchStatus status;
    private String venue;
    @Column(name = "home_form", nullable = false) private String homeForm;
    @Column(name = "away_form", nullable = false) private String awayForm;
    public enum MatchStatus { UPCOMING, LIVE, FINISHED }
}
