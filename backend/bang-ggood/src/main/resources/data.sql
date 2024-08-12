INSERT INTO users(name, email, created_at, modified_at, deleted)
VALUES ('방방이', 'bang-ggood@gmail.com', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false);

INSERT INTO custom_checklist_question(user_id, question, created_at, modified_at, deleted)
VALUES (1, 'CLEAN_1', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false),
       (1, 'CLEAN_4', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false),
       (1, 'ROOM_CONDITION_6', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false),
       (1, 'ROOM_CONDITION_7', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false),
       (1, 'ROOM_CONDITION_8', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false),
       (1, 'AMENITY_12', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false),
       (1, 'ENVIRONMENT_18', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false),
       (1, 'ENVIRONMENT_19', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false),
       (1, 'SECURITY_23', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false),
       (1, 'SECURITY_25', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false),
       (1, 'ECONOMIC_31', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false);

INSERT INTO article(title, content, created_at, modified_at, deleted)
VALUES ('집을 구하는 꿀팁: 성공적인 집 찾기를 위한 가이드',
        '1. **예산 설정하기**<br>집을 구하기 전, 가장 먼저 해야 할 일은 예산을 설정하는 것입니다. 월세와 관리비, 보증금까지 포함해 자신이 감당할 수 있는 범위를 확실히 정해두세요.',
        '2024-07-22 07:56:42', '2024-07-22 07:56:42', false);
