package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "odds_history")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OddsHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "match_id")
    private Match match;
    @Column(name = "home_win", nullable = false, precision = 8, scale = 3) private BigDecimal homeWin;
    @Column(nullable = false, precision = 8, scale = 3) private BigDecimal draw;
    @Column(name = "away_win", nullable = false, precision = 8, scale = 3) private BigDecimal awayWin;
    @Column(name = "recorded_at", nullable = false) private LocalDateTime recordedAt;
}
