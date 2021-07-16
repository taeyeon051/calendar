<section id="cldSection" class="bgc-darkblue row d-flex">
    <!-- 일정 리스트 -->
    <div class="schedule col-4 d-flex flex-column align-items-center position-relative py-5">
        <h2 class="mb-5">일정</h2>
        <ol id="scheduleList"></ol>
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="switch">
            <label class="form-check-label" for="switch">공유된 일정 제외</label>
        </div>
    </div>
    <!-- 메인 -->
    <div class="cld col-8 position-relative">
        <!-- 달력 헤더 -->
        <div class="cld-header d-flex justify-content-center align-items-center">
            <button id="prev-month" class="btn text-white">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-left-fill font-28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
            </button>
            <div class="dateText d-flex flex-column align-items-center">
                <h2 id="headDate" class="text-white mx-4"></h2>
                <h6 id="today" class="text-white"></h6>
            </div>
            <button id="next-month" class="btn text-white">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-right-fill font-28" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
            </button>
        </div>
        <!-- 달력 -->
        <div class="cld_body">
            <div class="week">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
            </div>
            <div id="days" class="d-flex flex-wrap"></div>
        </div>
        <!-- 달력 푸터 -->
        <?php if (__SESSION) : ?>
            <div class="cld_footer d-flex justify-content-end align-items-center pe-5">
                <button id="schedulePopBtn" class="btn bgc-blue text-white">일정 등록</button>
            </div>
        <?php endif; ?>
    </div>
    <!-- alert 창 -->
    <div class="position-relative w-75 mx-auto">    
        <div id="alert" class="p-3 rounded-3 position-absolute bgc-red text-white"></div>
    </div>
</section>

<script src="/js/app.js"></script>