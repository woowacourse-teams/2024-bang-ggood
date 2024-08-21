package com.bang_ggood.room.repository;

import com.bang_ggood.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Room r "
            + "SET r.deleted = true "
            + "WHERE r.id = :id")
    void deleteById(@Param("id") Long id);
}
