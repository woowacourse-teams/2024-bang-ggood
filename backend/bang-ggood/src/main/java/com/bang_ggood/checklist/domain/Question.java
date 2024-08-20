package com.bang_ggood.checklist.domain;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.Arrays;
import java.util.List;

public enum Question {

    ROOM_CONDITION_1(1, Category.ROOM_CONDITION, "방 안에 물이 새거나 곰팡이가 핀 곳은 없나요?", "천장, 벽면, 가구 뒤, 장판을 확인하세요.", List.of("곰팡이"), true),
    ROOM_CONDITION_2(2, Category.ROOM_CONDITION, "방에서 불쾌한 냄새가 나지는 않나요?", "싱크대, 화장실 배수구를 확인하세요.", List.of("불쾌한 냄새"), true),
    ROOM_CONDITION_3(3, Category.ROOM_CONDITION, "벌레가 나온 흔적은 없나요?", "벌레 퇴치약이 부착되어 있는지 확인하세요.", List.of("벌레"), true),
    ROOM_CONDITION_4(4, Category.ROOM_CONDITION, "방 인테리어가 마음에 드나요?", null, List.of("방 인테리어"), true),
    ROOM_CONDITION_5(5, Category.ROOM_CONDITION, "물건을 충분히 수납할 수 있는 공간이 있나요?", null, List.of("수납할 수 있는 공간"), true),
    ROOM_CONDITION_6(6, Category.ROOM_CONDITION, "에어컨은 깨끗한가요?", "에어컨을 틀어서 불쾌한 냄새가 나진 않는지 확인하세요.", List.of("에어컨"),false),
    ROOM_CONDITION_7(7, Category.ROOM_CONDITION, "보일러가 잘 동작하나요?", null, List.of("보일러"), false),
    ROOM_CONDITION_8(8, Category.ROOM_CONDITION, "콘센트 위치와 개수가 적절한가요?", null, List.of("콘센트"), false),
    ROOM_CONDITION_9(9, Category.ROOM_CONDITION, "벽지 상태가 양호한가요?", null, List.of("벽지 상태"), false),

    WINDOW_1(10, Category.WINDOW, "창 밖의 뷰가 가로 막혀 있지는 않나요?", null, List.of("창 밖의 뷰"), true),
    WINDOW_2(11, Category.WINDOW, "창문 상태가 괜찮나요?", null, List.of("창문 상태"), true),
    WINDOW_3(12, Category.WINDOW, "환기가 잘 되는 구조인가요?", "창문 크기와 방향을 확인하세요.", List.of("환기"), true),
    WINDOW_4(13, Category.WINDOW, "햇빛이 잘 들어오나요?", null, List.of("햇빛"), true),
    WINDOW_5(14, Category.WINDOW, "창문이 이중창인가요?", null, List.of("이중창"), false),
    WINDOW_6(15, Category.WINDOW, "창문 밖에서 불쾌한 냄새가 들어오진 않나요?", "하천, 배수구, 음식물 쓰레기통이 있지 않은지 확인하세요.", List.of("불쾌한 냄새"), false),

    BATHROOM_1(16, Category.BATHROOM, "화장실이 깨끗한가요?", "청소 가능한 얼룩인지 확인하세요.", List.of("깨끗"), true),
    BATHROOM_2(17, Category.BATHROOM, "수압 및 물 빠짐이 괜찮은가요?", "화장실에서 수도와 변기를 동시에 사용해보세요.", List.of("수압 및 물 빠짐"), true),
    BATHROOM_3(18, Category.BATHROOM, "화장실 내부에 환기 시설이 있나요?", null, List.of("환기 시설"), true),
    BATHROOM_4(19, Category.BATHROOM, "화장실 내부에 창문이 있나요?", null, List.of("창문"), false),
    BATHROOM_5(20, Category.BATHROOM, "온수가 잘 나오나요?", null, List.of("온수"), false),

    SECURITY_1(21, Category.SECURITY, "잠금장치가 있는 공동 현관문이 있나요?", null, List.of("잠금장치", "공동 현관문"), true),
    SECURITY_2(22, Category.SECURITY, "출입구와 복도에 CCTV가 설치되어 있나요?", null, List.of("CCTV"), true),
    SECURITY_3(23, Category.SECURITY, "관리자분이 함께 상주하시나요?", "관리자분이 24시간 상주하시는지 확인하세요.", List.of("관리자분"), true),
    SECURITY_4(24, Category.SECURITY, "보안 시설이 잘 갖추어져 있나요?", "도어락, 창문 잠금장치 등이 있는지 확인하세요.", List.of("보안 시설"), false),
    SECURITY_5(25, Category.SECURITY, "화면이 달린 인터폰이 제공되나요?", null, List.of("인터폰"), false),
    SECURITY_6(26, Category.SECURITY, "현관문에 걸쇠가 있나요?", null, List.of("걸쇠"), false),

    OUTSIDE_1(27, Category.OUTSIDE, "주변 도로가 밤에도 충분히 밝은가요?", null, List.of("주변 도로", "밝은가요"), false),
    OUTSIDE_2(28, Category.OUTSIDE, "주변에 소음 시설이 있나요?", "유흥시설, 놀이터, 공사장이 있는지 확인하세요.", List.of("소음 시설"), false),
    OUTSIDE_3(29, Category.OUTSIDE, "1층에 음식점이 있지는 않나요?", null, List.of("음식점"), false),
    OUTSIDE_4(30, Category.OUTSIDE, "집 가는 길이 언덕이진 않나요?", null, List.of("언덕"), false),
    OUTSIDE_5(31, Category.OUTSIDE, "옆 건물에서 보이는 구조는 아닌가요?", null, List.of("보이는 구조"), false);

    private final int id;
    private final Category category;
    private final String title;
    private final String subtitle;
    private final List<String> highlights;
    private final boolean isDefault;

    Question(int id, Category category, String title, String subtitle, List<String> highlights, boolean isDefault) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.subtitle = subtitle;
        this.highlights = highlights;
        this.isDefault = isDefault;
    }

    public static Question fromId(int id) {
        return Arrays.stream(values())
                .filter(question -> question.id == id)
                .findFirst()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.QUESTION_INVALID));
    }

    public static List<ChecklistQuestion> filter(Category category, List<ChecklistQuestion> questions) {
        return questions.stream()
                .filter(question -> question.getQuestion().isCategory(category) && question.getAnswer() != null)
                .toList();
    }

    public static List<ChecklistQuestion> filterWithUnselectedGrade(Category category,
                                                                    List<ChecklistQuestion> questions) {
        return questions.stream()
                .filter(question -> question.getQuestion().isCategory(category))
                .toList();
    }

    public static List<Question> findQuestionsByCategory(Category category) {
        return Arrays.stream(values())
                .filter(question -> question.getCategory().equals(category))
                .toList();
    }

    public static List<Question> findDefaultQuestions() {
        return Arrays.stream(values())
                .filter(question -> question.isDefault)
                .toList();
    }

    public static boolean contains(int id) {
        return Arrays.stream(values())
                .anyMatch(question -> question.getId() == id);
    }

    public boolean isSelected(List<CustomChecklistQuestion> questions) {
        return questions.stream()
                .anyMatch(question -> question.getQuestion().id == this.id);
    }

    private boolean isCategory(Category category) {
        return this.category == category;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public Category getCategory() {
        return category;
    }

    public List<String> getHighlights() {
        return highlights;
    }
}
