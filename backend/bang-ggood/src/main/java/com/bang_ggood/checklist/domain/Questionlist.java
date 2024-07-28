package com.bang_ggood.checklist.domain;

import com.bang_ggood.category.domain.Category;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.bang_ggood.category.domain.Category.AMENITY;
import static com.bang_ggood.category.domain.Category.CLEAN;
import static com.bang_ggood.category.domain.Category.ECONOMIC;
import static com.bang_ggood.category.domain.Category.ENVIRONMENT;
import static com.bang_ggood.category.domain.Category.OPTION;
import static com.bang_ggood.category.domain.Category.ROOM_CONDITION;
import static com.bang_ggood.category.domain.Category.SECURITY;

@Component
public class Questionlist {

    private Map<Integer, Question> questions;

    public Questionlist() {
        questions = new HashMap<>();
        initClean();
        initRoomCondition();
        initAmenity();
        initOption();
        initEnvironment();
        initSecurity();
        initEconomic();
    }

    public boolean contains(int questionId) {
        return questions.containsKey(questionId);
    }

    public Question findById(int questionId) { return questions.get(questionId); }

    public boolean isCategory(int questionId, Category category) {
        return questions.get(questionId).isCategory(category);
    }

    public List<ChecklistQuestion> filterQuestions(Category category, List<ChecklistQuestion> questions) {
        return questions.stream()
                .filter(question -> this.isCategory(question.getQuestionId(), category))
                .toList();
    }

    private void initClean() {
        questions.put(1, new Question(CLEAN, "방 안에 물이 새거나 곰팡이가 핀 곳은 없나요?", "천장, 벽면, 가구 뒤, 장판을 확인하세요."));
        questions.put(2, new Question(CLEAN, "방에서 불쾌한 냄새가 나지는 않나요?", "싱크대, 화장실 배수구를 확인하세요."));
        questions.put(3, new Question(CLEAN,"에어컨 내부는 깨끗한가요?", null));
        questions.put(4, new Question(CLEAN,"벌레가 나온 흔적은 없나요?", "벌레 퇴치약이 부착되어있는지, 싱크대 하부장 경첩에 배설물이 있는지 확인하세요."));
        questions.put(5, new Question(CLEAN, "창문 밖에서 불쾌한 냄새가 들어오진 않나요?", "하천, 배수구, 음식물 쓰레기통이 있지 않은지 확인하세요."));
    }

    private void initRoomCondition() {
        questions.put(6, new Question(ROOM_CONDITION, "수압 및 배수가 괜찮은가요?", "싱크대와 화장실에서 동시에 물을 틀어보세요."));
        questions.put(7, new Question(ROOM_CONDITION, "온수가 잘 나오나요?", null));
        questions.put(8, new Question(ROOM_CONDITION, "파손된 시설 (창문 / 방충망 / 벽)이 있지 않나요?", null));
        questions.put(9, new Question(ROOM_CONDITION, "보일러가 잘 동작하나요?", null));
        questions.put(10, new Question(ROOM_CONDITION, "콘센트 위치와 갯수가 적절한가요?", null));
        questions.put(11, new Question(ROOM_CONDITION, "벽지 상태가 양호한가요?", null));
    }

    private void initAmenity() {
        questions.put(12, new Question(AMENITY, "지하철역과 버스 정류장이 가까운 곳에 있나요?", null));
        questions.put(13, new Question(AMENITY, "편의점, 마트, 세탁소, 공원이 가까운 곳에 있나요?", null));
        questions.put(14, new Question(AMENITY, "병원이나 약국이 가까운 곳에 있나요?", null));
    }

    private void initOption() {
        questions.put(15, new Question(OPTION, "옵션 가구들의 상태는 양호하나요?", "정상 작동 여부를 확인하세요."));
        questions.put(16, new Question(OPTION, "필요한 물품들을 충분히 수납할 수 있는 공간이 있나요?", null));
    }

    private void initEnvironment() {
        questions.put(17, new Question(ENVIRONMENT, "햇빛이 잘 들어오나요?", null));
        questions.put(18, new Question(ENVIRONMENT, "환기가 잘 되는 구조인가요?", "창문의 크기와 방향을 확인하세요."));
        questions.put(19, new Question(ENVIRONMENT, "방음이 잘 되나요?", "벽을 두드려서 가벽이 아닌지 확인하세요."));
        questions.put(20, new Question(ENVIRONMENT, "주변에 소음 시설이 있나요?", "유흥시설, 놀이터, 공사장이 있는지 확인하세요."));
        questions.put(21, new Question(ENVIRONMENT, "1층에 음식점이 있지는 않나요?", null));
        questions.put(22, new Question(ENVIRONMENT, "집가는 길이 언덕이진 않나요?", null));
    }

    private void initSecurity() {
        questions.put(23, new Question(SECURITY, "출입구와 복도에 CCTV가 설치되어 있나요?", null));
        questions.put(24, new Question(SECURITY, "집에 방범창이나 이중 잠금장치가 설치되어 있나요?", null));
        questions.put(25, new Question(SECURITY, "자취방의 보안 시설이 잘 갖추어져 있나요? (도어락, 창문 잠금장치 등)", null));
        questions.put(26, new Question(SECURITY, "화재 경보기나 소화기 등의 안전 시설이 설치되어 있나요?", null));
        questions.put(27, new Question(SECURITY, "주변 도로가 밤에도 충분히 밝은가요?", null));
        questions.put(28, new Question(SECURITY, "화면이 달린 인터폰이 제공되나요?", null));
        questions.put(29, new Question(SECURITY, "옆 건물에서 잘 보이는 구조는 아닌가요?", null));
        questions.put(30, new Question(SECURITY, "관리자분이 함께 상주하시나요?", null));
    }

    private void initEconomic() {
        questions.put(31, new Question(ECONOMIC, "보증금/전월세 비용이 합리적인가요?", "관리비도 포함하여 고려하세요."));
        questions.put(32, new Question(ECONOMIC, "교통 비용(지하철, 버스, 자가용)이 추가적으로 들지 않나요?", "주차 비용을 확인하세요."));
    }

    public String getTitleByQuestionId(int questionId) {
        return questions.get(questionId).getTitle();
    }

    public String getSubtitleByQuestionId(int questionId) {
        return questions.get(questionId).getSubtitle();
    }
}
