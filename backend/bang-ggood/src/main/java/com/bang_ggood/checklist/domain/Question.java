package com.bang_ggood.checklist.domain;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.Arrays;
import java.util.List;

public enum Question {

    ROOM_CONDITION_1(1, Category.ROOM_CONDITION, "방 안에 물이 새거나 곰팡이가 핀 곳은 없나요?", "천장, 벽면, 가구 뒤, 장판을 확인하세요.", true),
    ROOM_CONDITION_2(2, Category.ROOM_CONDITION, "방에서 불쾌한 냄새가 나지는 않나요?", "싱크대, 화장실 배수구를 확인하세요.", true),
    ROOM_CONDITION_3(3, Category.ROOM_CONDITION, "벌레가 나온 흔적은 없나요?", "벌레 퇴치약이 부착되어있는지, 싱크대 하부장 경첩에 배설물이 있는지 확인하세요.", true),
    ROOM_CONDITION_4(4, Category.ROOM_CONDITION, "방 인테리어가 마음에 드나요?", null, true),
    ROOM_CONDITION_5(5, Category.ROOM_CONDITION, "필요한 물품들을 충분히 수납할 수 있는 공간이 있나요?", null, true),

    WINDOW_6(6, Category.WINDOW, "창문의 상태나 위치가 괜찮나요?", null, true),
    WINDOW_7(7, Category.WINDOW, "환기가 잘 되는 구조인가요?", "창문의 크기와 방향을 확인하세요.", true),

    BATHROOM_8(8, Category.BATHROOM, "화장실이 깨끗한가요?", "청소 가능한 얼룩인지 확인하세요.", true),
    BATHROOM_9(9, Category.BATHROOM, "수압 및 물빠짐이 괜찮은가요?", "화장실에서 수도와 변기를 동시에 사용해보세요.", true),
    BATHROOM_10(10, Category.BATHROOM, "화장실 내부에 창문이 있나요?", null, true),

    SECURITY_11(11, Category.SECURITY, "출입구와 복도에 CCTV가 설치되어 있나요?", null, true),
    SECURITY_12(12, Category.SECURITY, "잠금장치가 된 공동 현관문이 있나요? ", null, true),
    SECURITY_13(25, Category.SECURITY, "자취방의 보안 시설이 잘 갖추어져 있나요? (도어락, 창문 잠금장치 등)", null, true);

    private final int id;
    private final Category category;
    private final String title;
    private final String subtitle;
    private final boolean isDefault;

    Question(int id, Category category, String title, String subtitle, boolean isDefault) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.subtitle = subtitle;
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
                .filter(question -> question.getQuestion().isCategory(category) && question.getGrade() != null)
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
}
