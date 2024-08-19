INSERT INTO users(name, email, created_at, modified_at, deleted)
VALUES ('방방이', 'bang-ggood@gmail.com', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false);

INSERT INTO custom_checklist_question(user_id, question, created_at, modified_at, deleted)
VALUES
       (1, 'ROOM_CONDITION_1', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false),
       (1, 'ROOM_CONDITION_2', '2024-07-22 07:56:43', '2024-07-22 07:56:43', false),
       (1, 'ROOM_CONDITION_3', '2024-07-22 07:56:44', '2024-07-22 07:56:44', false),
       (1, 'ROOM_CONDITION_4', '2024-07-22 07:56:45', '2024-07-22 07:56:45', false),
       (1, 'ROOM_CONDITION_5', '2024-07-22 07:56:46', '2024-07-22 07:56:46', false),
       (1, 'WINDOW_1', '2024-07-22 07:56:47', '2024-07-22 07:56:47', false),
       (1, 'WINDOW_2', '2024-07-22 07:56:48', '2024-07-22 07:56:48', false),
       (1, 'WINDOW_3', '2024-07-22 07:56:49', '2024-07-22 07:56:49', false),
       (1, 'WINDOW_4', '2024-07-22 07:56:50', '2024-07-22 07:56:50', false),
       (1, 'BATHROOM_1', '2024-07-22 07:56:51', '2024-07-22 07:56:51', false),
       (1, 'BATHROOM_2', '2024-07-22 07:56:52', '2024-07-22 07:56:52', false),
       (1, 'BATHROOM_3', '2024-07-22 07:56:53', '2024-07-22 07:56:53', false),
       (1, 'SECURITY_1', '2024-07-22 07:56:54', '2024-07-22 07:56:54', false),
       (1, 'SECURITY_2', '2024-07-22 07:56:55', '2024-07-22 07:56:55', false),
       (1, 'SECURITY_3', '2024-07-22 07:56:56', '2024-07-22 07:56:56', false);

INSERT INTO article(title, content, created_at, keyword, summary, modified_at, deleted)
VALUES ('집을 구하는 꿀팁: 성공적인 집 찾기를 위한 가이드',
        '1. **예산 설정하기**<br>집을 구하기 전, 가장 먼저 해야 할 일은 예산을 설정하는 것입니다. 월세와 관리비, 보증금까지 포함해 자신이 감당할 수 있는 범위를 확실히 정해두세요.',
        '2024-07-22 07:56:42', '꿀팁', '요약입니다', '2024-07-22 07:56:42', false);
