const log = console.log;

window.addEventListener("load", () => {
    const userId = document.querySelector("#id");
    const userPwd = document.querySelector("#password");
    const loginBtn = document.querySelector("#loginBtn");

    window.addEventListener("keydown", e => {
        if (e.keyCode == 13) loginCheck();
    });

    loginBtn.addEventListener("click", e => {
        loginCheck();
    });

    function loginCheck() {
        const id = userId.value;
        const pwd = userPwd.value;

        $.ajax({
            url: '/user/login/check',
            type: "POST",
            data: { "id": id, "password": pwd },
            success: e => {
                if (e == "성공") {
                    alert('로그인 되었습니다.', true);
                    setTimeout(() => { location.href = '/'; }, 700);
                } else {
                    alert('아이디 혹은 비밀번호가 올바르지 않습니다.', false);
                }
            }
        });
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
});