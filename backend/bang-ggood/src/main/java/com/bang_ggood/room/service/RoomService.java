package com.bang_ggood.room.service;

import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Transactional
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    @Transactional
    public void deleteById(Long id) {
        roomRepository.deleteById(id);
    }
}
