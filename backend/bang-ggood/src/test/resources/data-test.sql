INSERT INTO users(id, name, created_at, modified_at)
VALUES (1, '방방이', '2024-07-22 07:56:42', '2024-07-22 07:56:42');

INSERT INTO room (address, created_at, floor, modified_at, name, station, walking_time, id)
VALUES ('인천광역시 부평구', NOW(), 3, NOW(), '살기 좋은 방', '잠실', 10, DEFAULT);

INSERT INTO checklist (contract_term, created_at, deposit, modified_at, real_estate, rent, room_id, user_id, id)
VALUES (12, NOW(), 2000, NOW(), '방끗공인중개사', 50, 1, 1, DEFAULT);

INSERT INTO checklist_question (grade, checklist_id, created_at, modified_at, question, id)
VALUES ('BAD', 1, NOW(), NOW(), 'CLEAN_1', DEFAULT),
       ('NONE', 1, NOW(), NOW(), 'CLEAN_2', DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 'CLEAN_3', DEFAULT),
       ('SOSO', 1, NOW(), NOW(), 'CLEAN_4', DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 'CLEAN_5', DEFAULT),
       ('BAD', 1, NOW(), NOW(), 'ROOM_CONDITION_6', DEFAULT),
       ('NONE', 1, NOW(), NOW(), 'ROOM_CONDITION_7', DEFAULT),
       ('SOSO', 1, NOW(), NOW(), 'ROOM_CONDITION_8', DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 'ROOM_CONDITION_9', DEFAULT),
       ('BAD', 1, NOW(), NOW(), 'ROOM_CONDITION_10', DEFAULT),
       ('SOSO', 1, NOW(), NOW(), 'ROOM_CONDITION_11', DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 'AMENITY_12', DEFAULT),
       ('NONE', 1, NOW(), NOW(), 'AMENITY_13', DEFAULT),
       ('BAD', 1, NOW(), NOW(), 'AMENITY_14', DEFAULT),
       ('SOSO', 1, NOW(), NOW(), 'OPTION_15', DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 'OPTION_16', DEFAULT),
       ('NONE', 1, NOW(), NOW(), 'ENVIRONMENT_17', DEFAULT),
       ('BAD', 1, NOW(), NOW(), 'ENVIRONMENT_18', DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 'ENVIRONMENT_19', DEFAULT),
       ('SOSO', 1, NOW(), NOW(), 'ENVIRONMENT_20', DEFAULT),
       ('BAD', 1, NOW(), NOW(), 'ENVIRONMENT_21', DEFAULT),
       ('NONE', 1, NOW(), NOW(), 'ENVIRONMENT_22', DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 'SECURITY_23', DEFAULT),
       ('BAD', 1, NOW(), NOW(), 'SECURITY_24', DEFAULT),
       ('SOSO', 1, NOW(), NOW(), 'SECURITY_25', DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 'SECURITY_26', DEFAULT),
       ('BAD', 1, NOW(), NOW(), 'SECURITY_27', DEFAULT),
       ('SOSO', 1, NOW(), NOW(), 'SECURITY_28', DEFAULT),
       ('GOOD', 1, NOW(), NOW(), 'SECURITY_29', DEFAULT),
       ('NONE', 1, NOW(), NOW(), 'SECURITY_30', DEFAULT);

INSERT INTO checklist_option (checklist_id, created_at, modified_at, option_id, id)
VALUES (1, NOW(), NOW(), 1, DEFAULT),
       (1, NOW(), NOW(), 5, DEFAULT),
       (1, NOW(), NOW(), 6, DEFAULT),
       (1, NOW(), NOW(), 7, DEFAULT),
       (1, NOW(), NOW(), 10, DEFAULT);
