-- 비밀번호 : password1234
INSERT INTO users(name, email, password, user_type, login_type, created_at, modified_at, deleted)
VALUES ('방방이', 'bang-ggood@gmail.com',
        'xDNYKEJqE/36U0Dt3nXRMFPNEMEgjCYM7R/A4B29baOsv4KYQ9MGgcO3HUa11sNKCFb9ZXyYBqJqxNglvBzFvg==:7yejAszEpxBb7AyZNKvAqpmMEJiKFXIa8JKwAx3n4loB2DRcAC2pfwkgo/dzKzRvBX4RbrATWaIlPYrgAhbHZQ==',
        'USER', 'LOCAL', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false);

INSERT INTO category (name)
VALUES
    ('방 컨디션'),
    ('창문'),
    ('화장실'),
    ('보안'),
    ('외부');

INSERT INTO question (category_id, title, subtitle, is_default)
VALUES
    (1, '곰팡이가 핀 곳 없이 깨끗한가요?', '천장, 벽면, 가구 뒤, 장판을 확인하세요.', true),
    (1, '불쾌한 냄새 없이 쾌적한가요?', null, true),
    (1, '벌레가 나온 흔적 없이 깔끔한가요?', '벌레 퇴치약이 부착되어 있는지 확인하세요.', true),
    (1, '물건을 충분히 수납할 수 있는 공간이 있나요?', null, true),
    (1, '방 인테리어는 괜찮나요?', null, true),
    (1, '에어컨의 상태는 괜찮은가요?', '에어컨을 틀어서 불쾌한 냄새가 나진 않는지 확인하세요.', false),
    (1, '보일러가 잘 동작하나요?', null, false),
    (1, '콘센트 위치와 개수가 적절한가요?', null, false),
    (1, '벽지 상태가 양호한가요?', null, false),
    (2, '창 밖의 뷰가 가로막힘 없이 트여있나요?', null, true),
    (2, '창문 상태가 괜찮나요?', null, true),
    (2, '환기가 잘 되는 구조인가요?', '창문 크기와 방향을 확인하세요.', true),
    (2, '햇빛이 잘 들어오나요?', null, true),
    (2, '창문이 이중창인가요?', null, false),
    (2, '창문 밖에 쓰레기통 등 냄새가 나는 요소가 있나요?', null, false),
    (3, '화장실이 깨끗한가요?', '청소 가능한 얼룩인지 확인하세요.', true),
    (3, '수압 및 물 빠짐이 괜찮은가요?', '화장실에서 수도와 변기를 동시에 사용해보세요.', true),
    (3, '환기 시설이 있나요?', null, true),
    (3, '내부에 창문이 있나요?', null, false),
    (3, '온수가 잘 나오나요?', null, false),
    (4, '잠금장치가 있는 공동 현관문이 있나요?', null, true),
    (4, '출입구와 복도에 CCTV가 설치되어 있나요?', null, true),
    (4, '관리자분이 함께 상주하시나요?', '관리자분이 24시간 상주하시는지 확인하세요.', true),
    (4, '보안 시설이 잘 갖추어져 있나요?', '도어락, 창문 잠금장치 등이 있는지 확인하세요.', false),
    (4, '화면이 달린 인터폰이 제공되나요?', null, false),
    (4, '현관문에 걸쇠가 있나요?', null, false),
    (5, '주변 도로가 밤에도 충분히 밝은가요?', null, false),
    (5, '주변에 소음 시설이 있는지 확인했나요?', '유흥시설, 놀이터, 공사장이 있는지 확인하세요.', false),
    (5, '1층에 음식점이 있는지 확인했나요?', null, false),
    (5, '집 가는 길이 언덕 없이 완만한가요?', null, false),
    (5, '옆 건물에서 보이는 구조인지 확인했나요?', null, false),
    (5, '주차할 수 있는 시설이 있나요?', null, false)
;
INSERT INTO highlight (question_id, name)
VALUES
    (1, '곰팡이'),
    (2, '불쾌한 냄새'),
    (3, '벌레'),
    (4, '수납할 수 있는 공간'),
    (5, '방 인테리어'),
    (6, '에어컨'),
    (7, '보일러'),
    (8, '콘센트'),
    (9, '벽지 상태'),
    (10, '창 밖의 뷰'),
    (11, '창문 상태'),
    (12, '환기'),
    (13, '햇빛'),
    (14, '이중창'),
    (15, '냄새가 나는 요소'),
    (16, '깨끗'),
    (17, '수압 및 물 빠짐'),
    (18, '환기 시설'),
    (19, '창문'),
    (20, '온수'),
    (21, '잠금장치'),
    (21, '공동 현관문'),
    (22, 'CCTV'),
    (23, '관리자분'),
    (24, '보안 시설'),
    (25, '인터폰'),
    (26, '걸쇠'),
    (27, '주변 도로'),
    (27, '밝은가요'),
    (28, '소음 시설'),
    (29, '음식점'),
    (30, '언덕'),
    (31, '보이는 구조'),
    (32, '주차할 수 있는 시설')
;

INSERT INTO custom_checklist_question(user_id, question, question_id, created_at, modified_at, deleted)
VALUES (1, 'ROOM_CONDITION_1',1, '2024-07-22 07:56:42', '2024-07-22 07:56:42', false),
       (1, 'ROOM_CONDITION_2',2, '2024-07-22 07:56:43', '2024-07-22 07:56:43', false),
       (1, 'ROOM_CONDITION_3',3, '2024-07-22 07:56:44', '2024-07-22 07:56:44', false),
       (1, 'ROOM_CONDITION_4',4, '2024-07-22 07:56:45', '2024-07-22 07:56:45', false),
       (1, 'ROOM_CONDITION_5',5, '2024-07-22 07:56:46', '2024-07-22 07:56:46', false),
       (1, 'WINDOW_1',6, '2024-07-22 07:56:47', '2024-07-22 07:56:47', false),
       (1, 'WINDOW_2',7, '2024-07-22 07:56:48', '2024-07-22 07:56:48', false),
       (1, 'WINDOW_3',8, '2024-07-22 07:56:49', '2024-07-22 07:56:49', false),
       (1, 'WINDOW_4',9, '2024-07-22 07:56:50', '2024-07-22 07:56:50', false),
       (1, 'BATHROOM_1',10, '2024-07-22 07:56:51', '2024-07-22 07:56:51', false),
       (1, 'BATHROOM_2',11, '2024-07-22 07:56:52', '2024-07-22 07:56:52', false),
       (1, 'BATHROOM_3',12, '2024-07-22 07:56:53', '2024-07-22 07:56:53', false),
       (1, 'SECURITY_1',13, '2024-07-22 07:56:54', '2024-07-22 07:56:54', false),
       (1, 'SECURITY_2',14, '2024-07-22 07:56:55', '2024-07-22 07:56:55', false),
       (1, 'SECURITY_3',15, '2024-07-22 07:56:56', '2024-07-22 07:56:56', false);
