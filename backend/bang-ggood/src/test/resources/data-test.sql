-- 비밀번호 : password1234
INSERT INTO users(name, email, password, user_type, login_type, created_at, modified_at, deleted)
VALUES ('방방이', 'bang-ggood@gmail.com', 'xDNYKEJqE/36U0Dt3nXRMFPNEMEgjCYM7R/A4B29baOsv4KYQ9MGgcO3HUa11sNKCFb9ZXyYBqJqxNglvBzFvg==:7yejAszEpxBb7AyZNKvAqpmMEJiKFXIa8JKwAx3n4loB2DRcAC2pfwkgo/dzKzRvBX4RbrATWaIlPYrgAhbHZQ==',
        'USER', 'LOCAL', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false);

INSERT INTO custom_checklist_question(user_id, question, created_at, modified_at, deleted)
VALUES (1, 'ROOM_CONDITION_1', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false),
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
