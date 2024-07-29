package com.bang_ggood.checklist.domain;

import java.util.Arrays;
import java.util.List;
import com.bang_ggood.category.domain.Category;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;

public enum Question {

        CLEAN_1(1, Category.CLEAN, "방 안에 물이 새거나 곰팡이가 핀 곳은 없나요?", "천장, 벽면, 가구 뒤, 장판을 확인하세요."),
        CLEAN_2(2, Category.CLEAN, "방에서 불쾌한 냄새가 나지는 않나요?", "싱크대, 화장실 배수구를 확인하세요."),
        CLEAN_3(3, Category.CLEAN, "에어컨 내부는 깨끗한가요?", null),
        CLEAN_4(4, Category.CLEAN, "벌레가 나온 흔적은 없나요?", "벌레 퇴치약이 부착되어있는지, 싱크대 하부장 경첩에 배설물이 있는지 확인하세요."),
        CLEAN_5(5, Category.CLEAN, "창문 밖에서 불쾌한 냄새가 들어오진 않나요?", "하천, 배수구, 음식물 쓰레기통이 있지 않은지 확인하세요."),
        ROOM_CONDITION_6(6, Category.ROOM_CONDITION, "수압 및 배수가 괜찮은가요?", "싱크대와 화장실에서 동시에 물을 틀어보세요."),
        ROOM_CONDITION_7(7, Category.ROOM_CONDITION, "온수가 잘 나오나요?", null),
        ROOM_CONDITION_8(8, Category.ROOM_CONDITION, "파손된 시설 (창문 / 방충망 / 벽)이 있지 않나요?", null),
        ROOM_CONDITION_9(9, Category.ROOM_CONDITION, "보일러가 잘 동작하나요?", null),
        ROOM_CONDITION_10(10, Category.ROOM_CONDITION, "콘센트 위치와 갯수가 적절한가요?", null),
        ROOM_CONDITION_11(11, Category.ROOM_CONDITION, "벽지 상태가 양호한가요?", null),
        AMENITY_12(12, Category.AMENITY, "지하철역과 버스 정류장이 가까운 곳에 있나요?", null),
        AMENITY_13(13, Category.AMENITY, "편의점, 마트, 세탁소, 공원이 가까운 곳에 있나요?", null),
        AMENITY_14(14, Category.AMENITY, "병원이나 약국이 가까운 곳에 있나요?", null),
        OPTION_15(15, Category.OPTION, "옵션 가구들의 상태는 양호하나요?", "정상 작동 여부를 확인하세요."),
        OPTION_16(16, Category.OPTION, "필요한 물품들을 충분히 수납할 수 있는 공간이 있나요?", null),
        ENVIRONMENT_17(17, Category.ENVIRONMENT, "햇빛이 잘 들어오나요?", null),
        ENVIRONMENT_18(18, Category.ENVIRONMENT, "환기가 잘 되는 구조인가요?", "창문의 크기와 방향을 확인하세요."),
        ENVIRONMENT_19(19, Category.ENVIRONMENT, "방음이 잘 되나요?", "벽을 두드려서 가벽이 아닌지 확인하세요."),
        ENVIRONMENT_20(20, Category.ENVIRONMENT, "주변에 소음 시설이 있나요?", "유흥시설, 놀이터, 공사장이 있는지 확인하세요."),
        ENVIRONMENT_21(21, Category.ENVIRONMENT, "1층에 음식점이 있지는 않나요?", null),
        ENVIRONMENT_22(22, Category.ENVIRONMENT, "집가는 길이 언덕이진 않나요?", null),
        SECURITY_23(23, Category.SECURITY, "출입구와 복도에 CCTV가 설치되어 있나요?", null),
        SECURITY_24(24, Category.SECURITY, "집에 방범창이나 이중 잠금장치가 설치되어 있나요?", null),
        SECURITY_25(25, Category.SECURITY, "자취방의 보안 시설이 잘 갖추어져 있나요? (도어락, 창문 잠금장치 등)", null),
        SECURITY_26(26, Category.SECURITY, "화재 경보기나 소화기 등의 안전 시설이 설치되어 있나요?", null),
        SECURITY_27(27, Category.SECURITY, "주변 도로가 밤에도 충분히 밝은가요?", null),
        SECURITY_28(28, Category.SECURITY, "화면이 달린 인터폰이 제공되나요?", null),
        SECURITY_29(29, Category.SECURITY, "옆 건물에서 잘 보이는 구조는 아닌가요?", null),
        SECURITY_30(30, Category.SECURITY, "관리자분이 함께 상주하시나요?", null),
        ECONOMIC_31(31, Category.ECONOMIC, "보증금/전월세 비용이 합리적인가요?", "관리비도 포함하여 고려하세요."),
        ECONOMIC_32(32, Category.ECONOMIC, "교통 비용(지하철, 버스, 자가용)이 추가적으로 들지 않나요?", "주차 비용을 확인하세요.");

    private final Integer id;
    private final Category category;
    private final String title;
    private final String subtitle;

    Question(Integer id, Category category, String title, String subtitle) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.subtitle = subtitle;
    }

    public static List<Question> findByCategory(Category category) {
        return Arrays.stream(values())
                .filter(question -> question.category == category)
                .toList();
    }

    public static boolean contains(Integer id) {
        return Arrays.stream(values())
                .anyMatch(question -> question.id.equals(id));
    }

    public static Question findById(Integer id) {
        return Arrays.stream(values())
                .filter(question -> question.id.equals(id))
                .findAny()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.INVALID_QUESTION));
    }

    public boolean isCategory(Category category) {
        return this.category.equals(category);
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }
}
