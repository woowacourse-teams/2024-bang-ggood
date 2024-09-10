INSERT INTO users(name, email, created_at, modified_at, deleted)
VALUES ('방방이', 'bang-ggood@gmail.com', '2024-07-22 07:56:42', '2024-07-22 07:56:42', false);

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

INSERT INTO article(title, content, keyword, summary, created_at, modified_at, deleted)
VALUES ('자취방 이사만 5번 피셜! 원룸 구할 때 체크리스트 1탄',
        '학교 주변 자취방을 구하는 **대학생 분들,** 회사 주변 방을 구하는 **직장인 분들!** 그리고 그외 전국의 예비 자취생 여러분 모두 잘 오셨습니다.<br><br>원래 **자취방 구하기는 대학생 종강 시즌이 제철**이신 거, 다들 아시죠? 👀 그래서 오늘은 자취방 이사만 5번 해본 **자취방 구하기 만렙 에디터**가 찐 노하우가 담겨 있는 <span style=”color:blue”> **원룸 구할 때 확인해야 할 체크리스트**</span>를 가져왔습니다.<br><br>한 번도 생각해 보지 못했지만 **보자마자 납득 100%인 꿀팁들**을 고르고 골라 왔으니, 모두 집중하고 따라오시지요!<br><br><br><br> <h2>🪟 창문</h2> **✅ 옆 건물에서 잘 보이는 구조인지**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/160436720332165459.jpg)<br>많은 분들이 잘 생각하지 못하시는 부분 중 하나죠! **옆 건물과 사생활 보호가 되는지 여부**입니다. 물론 블라인드를 쳐서 가릴 수는 있지만, **매번 블라인드를 쳐둬야 하는 건** 은근 불편한 일이거든요! (=자취방 3호 경험담)<br><br>그리고 자취의 특권은 **샤워 후 자연의 상태로 나와서** 옷을 갈아입을 수 있다는 것 아니겠습니까? 🛀 그러니 자취의 장점을 누리기 위해 꼭 한번 체크해 보시는 게 좋겠습니다.<br><br> **✅ 환기하기에 적합한 크기인지**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/159505656294119930.jpg)<br>자취방의 경우 그 특성상 창문이 하나만 있는 경우가 많은데요. 하지만 창문 전체가 시원하게 열리는 형태가 아니라, 위 사진처럼 **틈새만 열리는 경우라면 피하시는 게 좋습니다.**<br><br>좁은 평수일수록 환기가 매우 중요한데, 요런 창문의 경우에는 **환기 능력**이 떨어질 수밖에 없기 때문이죠! 결정 요인은 아니지만 **의외로 삶의 질과 연결**되는 부분이기 때문에 체크해 보시길 권장합니다.<br><br> **✅ 방충망/방범창 이상 없는지**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/164397041095518794.jpg)<br>창문 확인의 기본 of 기본! 바로 **방충망과 방범창 여부**입니다.<br><br>방충망은 구멍이 뚫려 **보수할 부분이 있는지**까지 체크해 주시는 게 좋고, 방범창은 **저층일수록 꼭** **확인**해 주시는 것이 좋습니다.<br><br> **✅ 햇빛 잘 들어오는지**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/166038643972068590.jpeg)<br>물론 집을 보러 가기 전에 남향인지 북향인지 중개인 분께서 설명을 해주실 텐데요. 하지만 남향이어도 앞 건물에 가려져 빛이 잘 안 들어올 수 있으니, 꼭 확인하기로 합시다.<br><br> **🍯 여기서 작은 꿀팁!**<br>Q. 앞 건물에 막힌 남향과 일반 북향/서향이 고민이라면?<br>A. 그래도 남향을 추천해요! 빛이 들어오지 않는 남향이라도 북향이나 서향보다는 훨씬 쾌적하답니다.<br><br> <h2> 🔐 보안<br></h2> **✅ 관리자 분 상주하시는지**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/167971937444371683.jpg)자취방 특성상 상시로 관리자 분이 계시는 경우가 많지는 않죠! 하지만 오피스텔의 경우에는 종종 관**리자분이 상주하고 계시는 경우**가 있는데요 👀<br><br>자취를 하다 보면 갑자기 불이 나가는 등 **전문가의 도움이 필요한 순간**들이 찾아오기 마련이죠. (그것의 자취의 맛..) 따라서 상주 관리자분이 계신 집이라면 **+15점** 해주시는 것이 좋겠습니다.<br><br> **✅ 현관문 잠금장치 있는지**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/167894935043362031.jpeg)<br>요것도 쉽게 지나칠 수 있는 포인트! 하지만 잠금장치 여부는 꼭 확인해 주시는 게 좋습니다. 자취를 하다 보면 정말 가끔 **모르는 사람이 초인종을 누르는 경우**도 있거든요 🤔<br><br> **🙋‍♀️ 추가로 이것도 확인해 보세요!**<br>&emsp;✅ 출입구와 복도에 CCTV 있는지<br>&emsp;✅ 공동 현관 비밀번호 있는지<br><br> <h2> 🏡 주변 환경</h2> **✅ 무인 택배 보관함 있는지**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/166618977771822482.jpeg)<br>처음엔 굳이 필요한가 싶지만, **여기저기 활용도 좋은 무인 택배함!** 상세 주소 노출 없이 택배를 보관하기 좋은 것은 물론, 물건을 집에 두고 와야 하는데 **올라가기 귀찮을 때나 중고거래할 때** 등 유용하게 사용할 수 있어요.<br><br>만약 무인 택배함이 있는 집이라면 **보너스 점수**를 주기로 합시다 🕵️‍♀️<br><br> **✅ 대중교통 이용 편리한지**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/168740647444591385.jpeg)<br>자취방을 구하는 목적은 바로 **학교나 직장 등에 편리하게 가기 위함**이 1번 아니겠습니까? 따라서 대중교통이 이용이 불편한 위치에 집이 있다면 **삶이 질이 수직 하락**할 수밖에 없죠!<br><br>지도상 시간도 체크하고, 실제로 자취방에서 대중교통 타는 곳까지 가보며 **경사나 주변 환경**도 체크해 보세요 🏃<br><br> **✅ 주변에 소음 시설 있는지**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/164194588552065716.jpeg)<br>아무래도 자취방 중에는 소음에 약한 곳이 많은데요! 따라서 **주변에 소음을 유발하는 시설이 있는지** 꼭 확인하셔야 합니다. 대표적으로는 **큰 도로와 술집** 정도가 있어요.<br><br>거기에 더해 꼭 확인하셔야 할 것은 바로 **24시 해장국집**입니다. 대개 **새벽까지 시끌시끌한 경우**가 많으므로 꼭 한번 확인해 보시길 바랍니다. (저도 알고 싶지 않았습니다) <br><br> **🙋‍♀️ 추가로 이것도 확인해 보세요!**<br>&emsp;✅ 편의점, 은행 등 편의시설 있는지<br>&emsp;✅ 집 가는 길이 언덕인지<br>&emsp;✅ 골목이라면 가로등 있는지 <br><br> <h2> 🛌 기본 옵션</h2> **✅ 옵션 가구 치워줄 수 있는지 확인하기**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/165794935274391835.jpeg)<br>멀쩡한 옵션 가구를 왜 치우느냐! 하실 수 있지만, 자취를 하다 보면 의외로 **옵션 가구가 짐이 되는 경우**들이 많더라고요 🤔<br><br>에디터 또한 어느 날부터 옵션 책상이 불필요하고 너무 거슬려서 결국 집주인 분께 양해를 구하고 수거해 주시길 부탁드린 경우가 있답니다. 경우에 따라 집 주인분께서 거절하실 수도 있을 수 있으니 **꼭 사전에 확인**해 보세요!<br><br> **✅ 화구 종류 체크하기**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/167471560364252808.jpg) 집에서 요리를 종종 해 드시는 분이라면 꼭 **화구 종류를 확인**해 주세요! 요리를 즐겨 하시는 분일수록 가스레인지가 더 편리해요.<br><br>특히 하이라이트로 되어 있는 경우에는 **화력이 매우 약한 곳들**이 꽤나 있으니 ^^; 꼭 사전에 확인하시길 권합니다.<br><br>✅ **에어컨/냉장고 작동 점검하기** <br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/168620136263807016.jpeg) <br>옵션 가구 중 **가장 고가인 에어컨과 냉장고**는 사전에 점검을 해두면 좋아요! <br><br>만약 집 구하는 날 체크하지 못했다면, 혹시라도 문제가 생길 경우를 대비하여 **이사 후 일주일 내로 확인**해 보시길 바랍니다.<br><br> **🙋‍♀️ 추가로 이것도 확인해 보세요!**<br> &emsp; ✅ 옵션 가구 필요 없다면 치워줄 수 있는지 확인하기<br> &emsp; ✅ 옵션 가구 종류 확인하기 (신발장, 블라인드 등)<br><br> 지면 관계상 1탄은 여기까지~ <br>2탄에서 이어서 만나요💟 <br><br> 출처 : 오늘의집',
        '자취방 꿀팁',
        '원룸 체크리스트',
        '2024-07-22 07:56:42',
        '2024-07-22 07:56:42',
        false),
       ('자취방 이사만 5번 피셜! 원룸 구할 때 체크리스트 2탄',
        '안녕하세요~ **자취방 구하기 만렙 에디터**가 찐 노하우가 담겨 있는 <span style=”color:blue”> **원룸 구할 때 확인해야 할 체크리스트 2탄**</span>으로 돌아왔습니다! <br><br>1탄을 아직 못보신 분들은 먼저 확인하고 돌아와주세요. 다들 집중하시고 가봅시다!!<br><br><h2>🕵️ 디테일</h2> **✅ 인터폰 영상 지원되는지** <br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/168217562696278839.jpeg) <br>이것도 앞서 이야기해 드린 **현관문 잠금장치와 비슷한 맥락**인데요! **배달 음식이나 등기 수령** 같은 경우에도 음성 인터폰만 듣는 것보다는 영상을 통해 방문자를 확인하는 것이 안전하죠.<br><br>잘 모르는 상대가 찾아왔을 때, **상대방의 모습을 확인**할 수 있다는 것만으로도 **마음의 안정에 큰 도움**이 되니 확인해 보시는 걸 추천드립니다. (방문 기록을 증거로 남길 수 있는 건 덤!)<br><br><br> **✅ 바퀴벌레 약 설치되어 있는지**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/159404181119534587.jpeg)<br>만약 집을 보러 갔는데 가구 뒤, 신발장 옆, 화장실 변기 뒤쪽 등등 **바퀴벌레 약을 설치한 흔적**이 있다? **웬만하면 런하시기를 추천합니다** 🏃‍♂️<br><br>물론 현재 거주자분이 꼼꼼한 성격으로 사전 예방하신 경우일 수도 있지만, 대부분 높은 확률로 한차례 발견했기 때문에 설치하는 경우가 많기 때문이죠...😱 가능한 도망치시기를!<br><br><br> **✅ 벽지에 곰팡이 흔적 있는지** <br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/168645987277346900.jpeg) <br> 곰팡이가 잘 생기는 **창문 주변 벽지와 침대 뒤쪽** 등, **시커먼 곰팡이 흔적**이 있는지 확인해 주세요. <br><br>곰팡이 흔적이 심하게 남아 있다면 높은 확률로 **습도 관리가 어려운 집**이거나 **집 구조적으로 곰팡이가 생길 수밖에 없는 곳**이랍니다. 따라서 이 경우에도 빠르게 런하시길! 🏃‍♂️<br><br> **🙋‍♀️ 추가로 이것도 확인해 보세요!**<br> &emsp; ✅ 콘센트 개수는 충분한지<br> &emsp; ✅ 옆집 방음 잘 되는지<br><br><br><h2> ✍🏻 기타 사항 </h2> **✅ 건물에 집주인분 사시는지 확인하기** <br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/156680003862457833.jpg) <br>사소하지만 은근 중요한 디테일! 바로 **집주인 분과 같은 건물에서 살게 되는지**를 체크해 주시면 좋습니다.<br><br>대학가 인근 빌라의 경우 집주인 분도 같은 건물에 거주하시는 경우가 종종 있는데요. **이게 은근 불편하고 머쓱하다는 사실..!** 물론 개인차는 있겠지만 본인이 에디터의 경우에 해당된다면? 은밀하게 체크해 주세요.<br><br><br> **✅ 분리수거 시스템 확인하기**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/165413921573933477.jpeg) <br> **분리 수거 시스템이 체계적으로 운영**되고 있는지, **쓰레기 버리기에는 수월한지**도 확인해 주시면 좋습니다.<br><br>자취방 중에 간혹 굉장히 불편하고 비효율적인 분리수거 시스템을 가진 곳들이 있거든요! **배출 일자나 주기적으로 쓰레기 관리해 주시는 분이 계시는지 여부** 등등 면밀하게 체크하시는 게 좋겠습니다.<br><br> **🙋‍♀️ 추가로 이것도 확인해 보세요!**<br> &emsp; ✅ 관리비 포함 항목 확인하기<br> &emsp; ✅ 인테리어 가능 여부 체크하기<br><br> <h2> 🚽 화장실</h2> **✅ 배수구 냄새 올라오는지**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/163777210096433394.jpg) <br> **화장실 숙적!** 바로 **배수구 냄새**죠.특히 더워지는 여름철엔 모두가 고민하는 부분이긴 하지만, **유달리 배수구 냄새가 지독하게 나는 집**이 있다는 사실!<br><br>이 부분은 정말 삶의 질과 직결되기 때문에, **화장실에 들어가 문을 닫고** 꼭 한번 확인해 주세요 😉<br><br><br> **✅ 화장실 내부에 창문 있는지**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/161331910819056750.jpg) <br>흔한 조건은 아니지만 **있다면 무조건 플러스 오십 점인 화장실 창문!** <br><br>창문이 없다면 환풍기는 잘 되는지, 방문 당시 화장실 습도는 어느 정도인지 확인해 주시는 편이 좋습니다 🌬️<br><br> **🙋‍♀️ 추가로 이것도 확인해 보세요!** <br> &emsp; ✅ 샤워 여유 공간 충분한지<br> &emsp; ✅ 곰팡이 흔적 있는지<br><br><br><h2>🚿 수도와 배수</h2> **✅ 싱크대/화장실 배수구 잘 내려가는지**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/167694880830634529.jpeg)<br> 곳곳의 수전에서 물이 잘 나오는지를 확인하는 것과 더불어, 꼭 챙겨야 할 것은 **배수구로 물이 내려가는 속도**입니다. **특히 세면대의 경우**가 각종 이물질이 축적되어 물이 매우 늦게 내려가는 경우가 있어요! (= 2호 자취방)<br><br>빠르게 설거지나 빨래를 해야 하는데  물이 잘 안 내려가면 정말 성격 안 좋아지기 때문에 🤯 화장실과 싱크대 모두 꼼꼼히 체크하시길 권합니다.<br><br><br> **✅ 변기 물 잘 내려가는지**<br> ![img](https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166970947851460229.jpg)<br>여기서 포인트는 **시원하고 우렁차게!** 입니다. 종종 변기 내려가는 힘이 매우 약한 곳들이 있는데요.<br><br>이 경우 삶의 질이 급격히 저하되므로, **변기 내릴 때 소리와 시원함**을 꼭! 체크하시길 바랍니다.<br><br> **🙋‍♀️ 추가로 이것도 확인해 보세요!**<br> &emsp;✅ 싱크대/세면대/샤워기 물 잘 나오는지<br> &emsp;✅ 싱크대/화장실 온수 잘 나오는지<br><br><br>오늘은 자취 이사만 5번 경력을 살려 고인물이 아니면 알 수 없는 원룸 구할 때 체크할 것들에 대해 소개해 드렸는데요!<br>자취방 구할 때 꼭 요긴하게 사용하시길 바랍니다 💟<br><br>출처 : 오늘의집',
        '자취방 꿀팁',
        '원룸 체크리스트',
        '2024-07-22 07:56:42',
        '2024-07-22 07:56:42',
        false),
       ('초보 세입자들에게 전하는 부동산 계약 팁',
        '마음에 쏙 드는 방을 찾았다면 이젠 집을 계약할 단계겠죠?  이번 포스트에서는 초보 세입자분들을 위해서 방을 계약할 때 참고해야 할 사항들을 말씀드리도록 하겠습니다. <br><br> <h2>등기부등본, 건축물대장 열람은 필수!</h2>등기부등본과 건축물대장은 해당 부동산, 건물에 대해서 소유권자에 대한 사항과 위치·면적·구조·용도·층수 등에 대한 사항을 알 수 있는 문서인데요. 등기부등본과 건축물대장을 통해서 **계약하려는 방, 건물의 소유주가 실제 계약을 진행하는 임대인과 동일한지, 건물 또한 등록된 내용과 다른 부분이 없는지** 확인해야 합니다.<br><br>특히, 등기부등본에는 부동산에 대해 설정된 융자, 경매, 저당권에 대해서도 확인할 수 있으니 반드시 확인하고 계약을 진행해야 합니다. 혹시나 등기부등본과 건축물대장에 표시된 내용이 다를 수 있는데 권리관계는 등기부등본을 기준으로 하며 부동산의 표시는 건축물대장을 기준으로 하게 되기 때문에 이를 참고하시고, 혹시 표시가 달라 걱정이 된다면 인터넷 등기소를 통해 수정을 하시면 됩니다.<br><h2>계약은 집주인과 하는 것이다!</h2>계약은 집주인이 임대인이고 방을 구하는 여러분이 임차인이 되어 진행되는 것입니다. **계약의 당사자는 반드시 본인과 집주인이 되어야 한다는 것**인데요. 보통은 방을 구하는 당사자와 집주인, 중개인 이렇게 계약을 진행하겠지만 가끔 특별한 사유로 집주인(임대인)이 직접 자리하여 계약을 진행하지 못하는 경우가 발생할 수 있습니다. 이때, 임대인은 대리인에게 본인의 직인과 대리인 임명장을 통해서 실제로 권한을 부여한 대리인임을 증명할 수 있고 대리인은 부여된 권한 안에서 대리계약을 진행할 수 있습니다.<br><br>주의할 것은, 대리인은 계약에서 집주인으로부터 권한을 부여받은 대리인일 뿐, 계약 당사자가 아니기 때문에 계약서상의 성명 직인은 모두 집주인인 임대인의 것이 들어가야 하며 계약금도 집주인이 별도로 말한 내용이 없다면 집주인 명의의 계좌로 입금해야 합니다.<br><h2>협의된 내용은 특약사항에 명시할 것!</h2>집을 계약할 때 집주인과 얘기하여 협의한 내용들(옵션사항, 월세 및 관리비 관련 사항, 기타 생활규칙, 내부 개조 등)은 계약서상에 명시가 안된 경우가 많기 때문에 이러한 내용들은 특약사항으로 따로 적어주는 것이 좋습니다.<br><br>집주인과 얘기가 다 되었다고 생각하여 이를 계약서 상에 기재하지 않았을 경우 문제가 발생했을 때, 이전에 집주인과 협의된 사항임을 본인이 직접 밝혀야 하기 때문에 **임차인이 적극적으로 특약사항을 확인하고 내용을 명시**해야 합니다.<br><h2>전입신고 및 확정일자를 받을 것!</h2>전입신고와 확정일자는 임차인이 임대차계약에서 법적으로 권리를 보호받을 수 있는 절차입니다. 전입신고는 새로운 거주지에 전입하여 주소지 변경 사항을 알리는 절차이며 이를 통해 주택임대차보호법의 보호를 받을 수 있고, 확정일자는 임대차계약을 맺은 날짜를 확인하는 것으로 경매 등의 상황에서 우선적으로 보증금을 변제받을 수 있게 됩니다.<br><br>전입신고와 확정일자는 주민센터에서 바로 민원이 가능하며 전입신고와 동시에 확정일자를 받는 것이 가장 편리한 방법이며 **신고는 전입한 날로부터 14일 이내로 완료**하면 됩니다.<br><br> 출처:https://brunch.co.kr/@dprnrn234/124',
        '등기부등본',
        '방 계약 시 주의할 점',
        '2024-07-22 07:56:42',
        '2024-07-22 07:56:42',
        false),
       ('전세 사기 피하는 법…계약 전 꼭 확인해야 할 8가지',
        '![img](https://mediahub.seoul.go.kr/uploads/mediahub/2023/05/whHWpgBBQsZMIKotGenBwFIKcPERqYKu.png)<br> ![img](https://mediahub.seoul.go.kr/uploads/mediahub/2023/05/yyxhNCPoGKUFhtSmnxCNAxFHovdrREfW.png)<br><h3>전세사기 예방, 꼭! 확인해야 할 8가지!</h3><br>압류 및 세금체납 등 권리제한사항이 있거나 매매가격보다 과도하게 높은 전세가격 등으로 <span style=”color:orange”> **보증금을 돌려받지 못하는 전세사기!**</span><br><br>깡통전세·전세사기 피해자가 더 늘어나지 않도록 하기 위해 예방 대책 및 지원 방안을 마련하고 총력을 기울이고 있는데요. **전세사기 예방을 위해 꼭 확인해야 할 8가지, 함께 살펴보아요!** ![img](https://mediahub.seoul.go.kr/uploads/mediahub/2023/05/ZrgaSqFihDwrSiXzxxUVzIgjcohGoGCe.png) <br> ![img](https://mediahub.seoul.go.kr/uploads/mediahub/2023/05/GYuqUxJtzxeFpHrWtBObYmzYPIqySThn.png) <br> ![img](https://mediahub.seoul.go.kr/uploads/mediahub/2023/05/TFWMcSjDHnkEDiBGBmMcRVxpRhDPRkbP.png) <br> ![img](https://mediahub.seoul.go.kr/uploads/mediahub/2023/05/cYHtopKhdHyBhbFWpNodygWStpjCVmUZ.png) <br><br> 출처:https://mediahub.seoul.go.kr/archives/2007948',
        '전세',
        '전세 사기 피하는 법',
        '2024-07-22 07:56:42',
        '2024-07-22 07:56:42',
        false);
