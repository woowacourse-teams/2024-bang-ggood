INSERT INTO users(id, name, created_at, modified_at)
VALUES (1, '방방이', '2024-07-22 07:56:42', '2024-07-22 07:56:42');

INSERT INTO room (address, created_at, floor, modified_at, name, station, walking_time, id)
VALUES ('인천광역시 부평구', NOW(), 3, NOW(), '살기 좋은 방', '잠실', 10, DEFAULT);

INSERT INTO checklist (contract_term, created_at, deposit, modified_at, real_estate, rent, room_id, user_id, id)
VALUES (12, NOW(), 2000, NOW(), '방끗공인중개사', 50, 1, 1, DEFAULT);

INSERT INTO checklist_question (answer, checklist_id, created_at, modified_at, question_id, id)
VALUES ('BAD', 1, NOW(), NOW(), 1, DEFAULT),
       (NULL, 1, NOW(), NOW(), 2, DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 3, DEFAULT),
       ('SOSO', 1, NOW(), NOW(), 4, DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 5, DEFAULT),
       ('BAD', 1, NOW(), NOW(), 6, DEFAULT),
       (NULL, 1, NOW(), NOW(), 7, DEFAULT),
       ('SOSO', 1, NOW(), NOW(), 8, DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 9, DEFAULT),
       ('BAD', 1, NOW(), NOW(), 10, DEFAULT),
       ('SOSO', 1, NOW(), NOW(), 11, DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 12, DEFAULT),
       (NULL, 1, NOW(), NOW(), 13, DEFAULT),
       ('BAD', 1, NOW(), NOW(), 14, DEFAULT),
       ('SOSO', 1, NOW(), NOW(), 15, DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 16, DEFAULT),
       (NULL, 1, NOW(), NOW(), 17, DEFAULT),
       ('BAD', 1, NOW(), NOW(), 18, DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 19, DEFAULT),
       ('SOSO', 1, NOW(), NOW(), 20, DEFAULT),
       ('BAD', 1, NOW(), NOW(), 21, DEFAULT),
       (NULL, 1, NOW(), NOW(), 22, DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 23, DEFAULT),
       ('BAD', 1, NOW(), NOW(), 24, DEFAULT),
       ('SOSO', 1, NOW(), NOW(), 25, DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 26, DEFAULT),
       ('BAD', 1, NOW(), NOW(), 27, DEFAULT),
       ('SOSO', 1, NOW(), NOW(), 28, DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 29, DEFAULT),
       (NULL, 1, NOW(), NOW(), 30, DEFAULT);

INSERT INTO checklist_option (checklist_id, created_at, modified_at, option_id, id)
VALUES (1, NOW(), NOW(), 1, DEFAULT),
       (1, NOW(), NOW(), 5, DEFAULT),
       (1, NOW(), NOW(), 6, DEFAULT),
       (1, NOW(), NOW(), 7, DEFAULT),
       (1, NOW(), NOW(), 10, DEFAULT);
