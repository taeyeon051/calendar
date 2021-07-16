const log = console.log;

window.addEventListener("load", () => {
    const registerBtn = document.querySelector("#registerBtn");
    const userId = document.querySelector("#id");
    const userName = document.querySelector("#name");
    const userPwd = document.querySelector("#password");
    const userPwdc = document.querySelector("#password-check");
    let id = userId.value;
    let name = userName.value;
    let pwd = userPwd.value;
    let pwdc = userPwdc.value;
    let checkId;
    let checkName;
    let checkPwd;

    window.addEventListener("keydown", e => { if (e.keyCode == 13) registerCheck(); });
    registerBtn.addEventListener("click", e => registerCheck);

    userId.addEventListener("input", e => {
        id = replaceAll(userId.value, " ", "");
        const idRe = /(?=.*[a-z]{4,12})(?=.*[0-9]{1,12}).{4,12}/;
        checkId = id.match(idRe);

        $.ajax({
            url: '/user/reg/idCheck',
            type: "POST",
            data: { "id": id },
            success: e => {
                if (e == "성공" && checkId !== null && checkId[0] === id) inputMsg("", true, userId);
                else if (checkId == null || checkId[0] !== id) inputMsg("아이디는 영문과 숫자를 포함하여 4~12글자여야합니다.", false, userId);
                else if (e != "성공") inputMsg(e, false, userId);
            }
        });
    });

    userName.addEventListener("input", e => {
        name = userName.value;
        const nameRe = /[가-힣]{2,}|[a-zA-Z]{2,}\s[a-zA-Z]{2,}|[a-zA-Z]{2,}/g;
        checkName = name.match(nameRe);
        if (checkName == null) inputMsg("이름은 영문과 한글만 사용가능합니다.", false, userName);
        else if (name.trim() == "") inputMsg("이름을 입력하세요.", false, userName);
        else inputMsg("", true, userName);
    });

    userPwd.addEventListener("input", e => {
        pwd = replaceAll(userPwd.value, " ", "");
        const pwdRe = /(?=.*\d{2,50})(?=.*[~!@#$%^&*()]{1,50})(?=.*[A-Z]{1,50})(?=.*[a-z]{2,50}).{8,50}$/;
        checkPwd = pwd.match(pwdRe);
        if (checkPwd !== null && checkPwd[0] === pwd) inputMsg("", true, userPwd);
        else inputMsg("비밀번호는 영문 대·소문자, 숫자, 특수문자를 포함하여 8~50자 이하여야 합니다.", false, userPwd);

        pwdc = userPwdc.value;
        if (pwd !== pwdc) inputMsg("비밀번호와 확인이 일치하지 않습니다.", false, userPwdc);
        else inputMsg("", true, userPwdc);
    });

    userPwdc.addEventListener("input", e => {
        pwdc = userPwdc.value;
        if (pwd !== pwdc) inputMsg("비밀번호와 확인이 일치하지 않습니다.", false, userPwdc);
        else inputMsg("", true, userPwdc);
    });

    function registerCheck() {
        if (checkId == undefined || checkPwd == undefined) return;
        log(checkId, checkPwd, checkName, pwd, pwdc);
        if (checkId !== null && checkPwd !== null && checkName !== null && pwd === pwdc) {
            $.ajax({
                url: '/user/reg/check',
                type: "POST",
                data: { "id": id, "name": name, "pwd": pwd },
                success: e => {
                    log(e);
                    if (e == "성공") {
                        alert("성공적으로 회원가입 되었습니다.", true);
                        setTimeout(() => { location.href = '/user/login'; }, 700);
                    } else {
                        alert("DB오류로 인하여 가입에 실패하였습니다.");
                    }
                }
            })
        }
    }

    function inputMsg(msg, success, dom) {
        dom.classList.remove('is-invalid');
        dom.classList.remove('is-valid');
        if (success) dom.classList.add("is-valid");
        else dom.classList.add('is-invalid');

        let feedback;
        if (success) feedback = dom.parentElement.querySelector('.valid-feedback');
        else feedback = dom.parentElement.querySelector('.invalid-feedback');
        feedback.innerHTML = msg;
    }

    function alert(msg, success) {
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

    function replaceAll(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    }
});