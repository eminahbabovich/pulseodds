package com.example.demo.config;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Configuration
@RequiredArgsConstructor
public class DemoDataConfig {
    private final TeamRepository teams;
    private final MatchRepository matches;
    private final OddsHistoryRepository odds;

    @Bean
    CommandLineRunner seedDemoData() {
        return args -> {
            if (matches.count() > 0) return;
            Team city = teams.save(Team.builder().name("Manchester City").shortName("MCI").league("Premier League").build());
            Team madrid = teams.save(Team.builder().name("Real Madrid").shortName("RMA").league("Champions League").build());
            Team bayern = teams.save(Team.builder().name("Bayern Munich").shortName("BAY").league("Bundesliga").build());
            Team inter = teams.save(Team.builder().name("Inter Milan").shortName("INT").league("Serie A").build());
            Team liverpool = teams.save(Team.builder().name("Liverpool").shortName("LIV").league("Premier League").build());
            Team arsenal = teams.save(Team.builder().name("Arsenal").shortName("ARS").league("Premier League").build());
            Team barcelona = teams.save(Team.builder().name("Barcelona").shortName("BAR").league("La Liga").build());
            Team psg = teams.save(Team.builder().name("Paris Saint-Germain").shortName("PSG").league("Ligue 1").build());
            Match first = matches.save(match(city, madrid, "Etihad Stadium", 2, Match.MatchStatus.UPCOMING, "WWDWW", "DWLWW"));
            Match second = matches.save(match(bayern, inter, "Allianz Arena", 0, Match.MatchStatus.LIVE, "WDWWW", "LLDWD"));
            Match third = matches.save(match(liverpool, arsenal, "Anfield", -1, Match.MatchStatus.FINISHED, "WWWLW", "WLWDL"));
            Match fourth = matches.save(match(barcelona, psg, "Camp Nou", 9, Match.MatchStatus.UPCOMING, "DWWDW", "WWDWL"));
            seedOdds(first, 1.72, 3.55, 4.35);
            seedOdds(second, 2.08, 3.35, 3.12);
            seedOdds(third, 1.91, 3.65, 3.90);
            seedOdds(fourth, 2.24, 3.60, 2.86);
        };
    }
    private void seedOdds(Match match, double home, double draw, double away) {
        for (int i = 11; i >= 0; i--) {
            odds.save(OddsHistory.builder().match(match).homeWin(bd(home + i * .012))
                    .draw(bd(draw - i * .006)).awayWin(bd(away + i * .02))
                    .recordedAt(LocalDateTime.now().minusMinutes(i * 5L)).build());
        }
    }
    private Match match(Team home, Team away, String venue, int days, Match.MatchStatus status,
                        String homeForm, String awayForm) {
        return Match.builder().homeTeam(home).awayTeam(away).venue(venue)
                .kickoffAt(LocalDateTime.now().plusDays(days)).status(status)
                .homeForm(homeForm).awayForm(awayForm).build();
    }
    private BigDecimal bd(double n) {
        return BigDecimal.valueOf(n).setScale(3, RoundingMode.HALF_UP);
    }
}
