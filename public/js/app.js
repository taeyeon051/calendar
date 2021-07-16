const log = console.log;

class Main {
    constructor() {
        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth() + 1;
        this.day = this.date.getDate();
        this.selectDay;
        this.isSwitchChecked = false;

        this.week = [
            "일요일",
            "월요일",
            "화요일",
            "수요일",
            "목요일",
            "금요일",
            "토요일"
        ];

        this.setDateText(this.date);
        this.render();
        this.addEvent();
    }

    // 유저 정보 가져오는 함수
    async getUserData() {
        let user = [];
        await $.ajax({
            url: '/get/userData',
            type: "POST",
            success: e => {
                try {
                    user = JSON.parse(e);
                } catch (e) { }
            }
        });
        return user;
    }

    // 이벤트
    addEvent() {
        // 이전 달
        document.querySelector("#prev-month").addEventListener("click", () => {
            this.date.setMonth(this.date.getMonth() - 1);
            this.render();
        });

        // 다음 달
        document.querySelector("#next-month").addEventListener("click", () => {
            this.date.setMonth(this.date.getMonth() + 1);
            this.render();
        });

        // 팝업
        const closeBtn = document.querySelectorAll(".closeBtn");
        $(closeBtn).on("click", e => {
            this.closePopup();
        });

        const startTime = document.querySelector("#startTime");
        const endTime = document.querySelector("#endTime");
        endTime.addEventListener("change", e => {
            if (startTime.value > endTime.value) endTime.value = startTime.value;
        });

        try {
            const schedulePopBtn = document.querySelector("#schedulePopBtn");
            const regPopup = document.querySelector("#regPopup");
            const dateDom = document.querySelector("#date");
            schedulePopBtn.addEventListener("click", e => {
                $(regPopup).fadeIn('slow');
                $(regPopup).css('display', 'flex');
                dateDom.value = this.selectDay;
            });

            dateDom.addEventListener("change", e => {
                if (new Date(e.currentTarget.value) == "Invalid Date") e.currentTarget.value = this.selectDay;
            });

            // 일정 등록
            const scheduleRegBtn = document.querySelector("#schedule-register-btn");
            scheduleRegBtn.addEventListener("click", e => {
                const content = document.querySelector("#content").value;
                if (dateDom.value == "" || startTime == "" || endTime == "") return;
                if (content.trim() == "") return;

                let share = new Array();
                const shares = document.querySelectorAll(".shares>input");
                shares.forEach(x => { if (x.value.trim() !== "") share.push(x.value); });

                const data = {
                    "date": dateDom.value,
                    "time": startTime.value + "~" + endTime.value,
                    "content": content,
                    "share": share.length > 0 ? share : null
                };

                $.ajax({
                    url: '/set/schedule',
                    type: "POST",
                    data: data,
                    success: e => {
                        if (e == "성공") {
                            this.alert("일정이 등록되었습니다.", true);
                            setTimeout(() => { location.href = '/'; }, 700);
                        } else this.alert("잘못된 값이 있습니다.", false);
                    }
                });
            });
        } catch (e) { }

        // 스위치 버튼
        const switchBtn = document.querySelector("#switch");
        switchBtn.addEventListener("change", async e => {
            this.isSwitchChecked = e.target.checked;
            const date = new Date(this.selectDay);
            const y = date.getFullYear();
            const m = date.getMonth() + 1;
            const d = date.getDate();
            const list = await this.getSchedules(y, m, d);
            this.drawList(list);
        });

        // 수정, 삭제
        const scheduleModify = document.querySelector("#schedule-modify-btn");
        const scheduleDelete = document.querySelector("#schedule-delete-btn");
        scheduleModify.addEventListener("click", e => {
            this.modify();
        });

        scheduleDelete.addEventListener("click", e => {
            if (confirm("정말 삭제하시겠습니까?")) {
                const id = document.querySelector("#scheduleId");
                $.ajax({
                    url: '/schedule/delete',
                    type: "POST",
                    data: { "id": id.value },
                    success: e => {
                        if (e == "성공") {
                            this.alert("일정이 삭제되었습니다.", true);
                            setTimeout(() => { location.href = '/'; }, 700);
                        } else this.alert("존재하지 않는 글입니다.", false);
                    }
                });
            } else {
                this.closePopup();
            }
        });
    }

    modify() {
        const id = document.querySelector("#scheduleId");
        const dateDom = document.querySelector("#view-date");
        const startTime = document.querySelector("#view-startTime");
        const endTime = document.querySelector("#view-endTime");
        const content = document.querySelector("#view-content");
        let share = new Array();
        const shares = document.querySelectorAll(".modifyShare>input");
        shares.forEach(x => { if (x.value.trim() !== "") share.push(x.value); });
        const data = {
            "id": id.value,
            "date": dateDom.value,
            "time": startTime.value + "~" + endTime.value,
            "content": content.value,
            "share": share.length > 0 ? share : null
        };

        $.ajax({
            url: '/schedule/modify',
            type: "POST",
            data: data,
            success: e => {
                if (e == "성공") {
                    this.alert("일정이 수정되었습니다.", true);
                    setTimeout(() => { location.href = '/'; }, 700);
                } else this.alert("잘못된 값이 있습니다.", false);
            }
        });
    }

    closePopup() {
        const popup = document.querySelectorAll(".popup");
        $(popup).fadeOut('slow');
        $(".popup input").val("");
        $(".popup textarea").val("");
    }

    // 달력 그리는 함수
    async render() {
        let { date, year, month, day } = this;
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();

        let days = "";
        date.setDate(1);
        const monthDays = document.querySelector("#days");
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        const firstDayIdx = date.getDay();
        const lastDayIdx = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
        const nextDays = 7 - lastDayIdx - 1;

        document.querySelector(".dateText h2").innerHTML = year + "년 " + month + "월";

        for (let x = firstDayIdx; x > 0; x--) {
            days += `<div class="text-gray">${prevLastDay - x + 1}</div>`;
        }

        for (let i = 1; i <= lastDay; i++) {
            if (date.getMonth() + 1 == new Date().getMonth() + 1) {
                if (i == new Date().getDate()) {
                    days += `<div class="text-bold text-white" data-date="${year}-${month < 10 ? '0' + month : month}-${i < 10 ? '0' + i : i}">${i}</div>`;
                    this.selectDay = year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day);
                } else days += `<div class="text-bold text-white" data-date="${year}-${month < 10 ? '0' + month : month}-${i < 10 ? '0' + i : i}">${i}</div>`;
            } else {
                days += `<div class="text-bold text-white" data-date="${year}-${month < 10 ? '0' + month : month}-${i < 10 ? '0' + i : i}">${i}</div>`;
                if (i == 1) this.selectDay = year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day);
            }
            monthDays.innerHTML = days;
        }

        for (let y = 1; y <= nextDays; y++) {
            days += `<div class="text-gray">${y}</div>`;
            monthDays.innerHTML = days;
        }

        const list = await this.getSchedules(year, month, new Date(this.selectDay).getDate());
        const dayList = document.querySelectorAll("#days>div");
        let today;
        dayList.forEach(x => { if (x.dataset.date == this.selectDay) today = x; });
        this.setDateText(this.selectDay);
        this.drawList(list);
        this.dayColor(today, list);
        this.dayClick();
    }

    // 일정 가져오는 함수
    async getSchedules(y, m, d) {
        let list = [];
        await $.ajax({
            url: '/get/schedule',
            type: "POST",
            data: { "y": y, "m": m, "d": d },
            success: e => {
                try {
                    list = JSON.parse(e);
                } catch (e) { }
            }
        });
        return Promise.all(list);
    }

    // 리스트 그려주는 함수
    async drawList(list) {
        const user = await this.getUserData();
        const listPopup = document.querySelector("#scheduleViewPopup");
        const listDom = document.querySelector("#scheduleList");
        listDom.innerHTML = "";

        list.forEach(item => {
            let bool = false;
            let shareSd = false;
            if (item.shareUser != null && !this.isSwitchChecked) item.shareUser.forEach(share => { if (share == user.userId) { bool = true; shareSd = true; } });
            if (item.userId == user.userId) bool = true;

            if (bool) {
                const li = document.createElement("li");
                li.dataset.id = item.id;
                if (shareSd) {
                    li.innerHTML =
                        `<p class="mb-0">${item.content}(${item.userName})</p>
                        <p>${item.time}</p>`;
                } else {
                    li.innerHTML =
                        `<p class="mb-0">${item.content}</p>
                        <p>${item.time}</p>`;
                }
                listDom.appendChild(li);

                li.addEventListener("click", e => {
                    if (user.userId !== item.userId) return;
                    document.querySelector("#scheduleId").value = e.currentTarget.dataset.id;
                    $(listPopup).fadeIn('slow');
                    $(listPopup).css('display', 'flex');
                    this.drawListPopup(item);
                });
            }
        });

        if (!listDom.querySelector("li")) {
            const p = document.createElement("p");
            p.style.paddingLeft = '4rem';
            p.innerHTML = "일정이 없습니다.";
            listDom.appendChild(p);
        }
    }

    drawListPopup(item) {
        document.querySelector("#view-date").value = item.date;
        document.querySelector("#view-startTime").value = item.time.substr(0, 5);
        document.querySelector("#view-endTime").value = item.time.substr(-5, 5);
        document.querySelector("#view-content").value = item.content;
        const share = ["#share1", "#share2", "#share3"];
        for (let i = 0; i < item.shareUser.length; i++) {
            document.querySelector(share[i]).value = item.shareUser[i];
        }
    }

    // 날짜 써주는 함수
    setDateText(date) {
        const { week } = this;
        const setDate = new Date(date);
        const y = setDate.getFullYear();
        const m = setDate.getMonth() + 1;
        const d = setDate.getDate();
        const today = y + "-" + (m < 10 ? '0' + m : m) + "-" + (d < 10 ? '0' + d : d) + " " + week[setDate.getDay()];
        document.querySelector(".dateText h6").innerHTML = today;
    }

    // 날짜 클릭 이벤트
    dayClick() {
        const dayList = document.querySelectorAll("#days>div");
        dayList.forEach(x => {
            x.addEventListener("click", async e => {
                if (x.classList[1] == "text-white") {
                    $(dayList).removeClass('day-red day-yellow day-green');
                    this.selectDay = x.dataset.date;
                    this.setDateText(this.selectDay);
                    const dd = new Date(this.selectDay);
                    const list = await this.getSchedules(dd.getFullYear(), dd.getMonth() + 1, dd.getDate());
                    this.dayColor(x, list);
                    this.drawList(list);
                }
            });
        });
    }

    // 날짜 컬러 정하는 함수
    async dayColor(target, list) {
        const user = await this.getUserData();
        let len = 0;

        list.forEach(item => {
            if (item.userId == user.userId) len++;
            if (item.shareUser != null && !this.isSwitchChecked) {
                item.shareUser.forEach(share => { if (share == user.userId) len++; });
            }
        });

        const cl = target.classList;
        if (target.classList.contains("text-gray")) return;
        const dayList = document.querySelectorAll("#days>div");
        for (const day of dayList) {
            if (day.dataset.date == this.selectDay) continue;
            $(day).removeClass('day-red day-yellow day-green');
        }

        if (len > 12) cl.add("day-red");
        else if (len > 7) cl.add("day-yellow");
        else cl.add("day-green");
    }

    // alert창 띄워주는 함수
    alert(msg, success) {
        const alert = document.querySelector("#alert");

        if (success) {
            alert.classList.remove('bgc-red');
            alert.classList.add('bgc-green');
        } else {
            alert.classList.add('bgc-red');
            alert.classList.remove('bgc-green');
        }

        if (alert.innerHTML == "") {
            $("#alert").fadeIn(500);
            alert.innerHTML = msg;
            setTimeout(() => {
                $("#alert").fadeOut(500);
                setTimeout(() => {
                    alert.innerHTML = "";
                }, 700);
            }, 2500);
        }
    }
}

window.addEventListener("load", () => {
    const app = new Main();
});