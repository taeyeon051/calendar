<div class="con w-75 mx-auto position-relative">
    <h1 class="text-white m-3">회원가입</h1>
    <div class="form w-75 mx-auto mt-5">
        <div class="row mb-5">
            <label for="id" class="col-sm-3 col-form-label text-white">아이디</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="id" autocomplete="off">
                <div class="valid-feedback"></div>
                <div class="invalid-feedback"></div>
            </div>
        </div>
        <div class="row mb-5">
            <label for="name" class="col-sm-3 col-form-label text-white">이름</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="name" autocomplete="off">
                <div class="valid-feedback"></div>
                <div class="invalid-feedback"></div>
            </div>
        </div>
        <div class="row mb-5">
            <label for="password" class="col-sm-3 col-form-label text-white">비밀번호</label>
            <div class="col-sm-9">
                <input type="password" class="form-control" id="password" autocomplete="off">
                <div class="valid-feedback"></div>
                <div class="invalid-feedback"></div>
            </div>
        </div>
        <div class="row mb-5">
            <label for="password-check" class="col-sm-3 col-form-label text-white">비밀번호 확인</label>
            <div class="col-sm-9">
                <input type="password" class="form-control" id="password-check" autocomplete="off">
                <div class="valid-feedback"></div>
                <div class="invalid-feedback"></div>
            </div>
        </div>
        <button id="registerBtn" class="btn btn-blue float-end">회원가입</button>
    </div>
    <div id="alert" class="p-3 rounded-3 position-absolute bgc-red text-white"></div>
</div>

<script src="/js/register.js"></script>