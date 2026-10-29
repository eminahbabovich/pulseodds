package com.example.demo.repository;
import com.example.demo.model.OddsHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface OddsHistoryRepository extends JpaRepository<OddsHistory, Long> {
    List<OddsHistory> findTop24ByMatch_IdOrderByRecordedAtAsc(Long matchId);
    OddsHistory findTopByMatch_IdOrderByRecordedAtDesc(Long matchId);
    List<OddsHistory> findTop2ByMatch_IdOrderByRecordedAtDesc(Long matchId);
}
