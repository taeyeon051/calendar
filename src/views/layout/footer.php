<!-- 푸터 -->
<footer class="d-flex justify-content-center align-items-center text text-white position-relative">
    <p>Copyright ⓒ 2020</p>
</footer>
</div>

<!-- 일정 등록 팝업 -->
<div class="popup" id="regPopup">
    <div class="inner">
        <div class="closeBtn btn btn-red">&times;</div>
        <h3 class="text-center mb-4"><b>일정 등록</b></h3>
        <div class="form">
            <div class="input-group mb-3">
                <span class="input-group-text">날짜</span>
                <input type="date" id="date" class="form-control">
                <span class="input-group-text">시간</span>
                <input type="time" id="startTime" class="form-control">
                <span class="input-group-text"> ~ </span>
                <input type="time" id="endTime" class="form-control">
            </div>
            <div class="input-group mb-3">
                <textarea id="content" class="form-control" rows="7"></textarea>
            </div>
            <div class="input-group shares">
                <span class="input-group-text">일정 공유</span>
                <input type="text" class="form-control">
                <input type="text" class="form-control">
                <input type="text" class="form-control">
            </div>
            <span class="exp-share text-bold text-gray">다른 사람과 일정을 공유하려면 아이디를 입력해주세요. (최대 3명)</span>
            <button id="schedule-register-btn" class="btn btn-blue">일정 등록</button>
        </div>
    </div>
</div>

<!-- 일정 자세히 보기 팝업 -->
<div class="popup" id="scheduleViewPopup">
<div class="inner">
        <div class="closeBtn btn btn-red">&times;</div>
        <h3 id="popupDay" class="text-center mb-4"><b>일정 수정</b></h3>
        <div class="form">
            <input type="hidden" id="scheduleId">
            <div class="input-group mb-3">
                <span class="input-group-text">날짜</span>
                <input type="date" id="view-date" class="form-control">
                <span class="input-group-text">시간</span>
                <input type="time" id="view-startTime" class="form-control">
                <span class="input-group-text"> ~ </span>
                <input type="time" id="view-endTime" class="form-control">
            </div>
            <div class="input-group mb-3">
                <textarea id="view-content" class="form-control" rows="7"></textarea>
            </div>
            <div class="input-group modifyShare">
                <span class="input-group-text">일정 공유</span>
                <input type="text" class="form-control" id="share1">
                <input type="text" class="form-control" id="share2">
                <input type="text" class="form-control" id="share3">
            </div>
            <span class="exp-share text-bold text-gray">다른 사람과 일정을 공유하려면 아이디를 입력해주세요. (최대 3명)</span>
            <button id="schedule-modify-btn" class="btn btn-yellow">일정 수정</button>
            <button id="schedule-delete-btn" class="btn btn-red">일정 삭제</button>
        </div>
    </div>
</div>
</body>

</html>