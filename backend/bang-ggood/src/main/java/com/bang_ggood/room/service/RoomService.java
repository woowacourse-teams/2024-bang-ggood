package com.bang_ggood.room.service;

import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class RoomService {

    private final RoomRepository roomRepository;

    @Transactional
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    @Transactional
    public void deleteById(Long id) {
        roomRepository.deleteById(id);
    }

    @Transactional
    public void updateRoom(Room room, Room updateRoom) {
        room.change(updateRoom);
    }
}
