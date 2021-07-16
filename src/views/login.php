<div class="con w-75 mx-auto position-relative">
    <h1 class="text text-white m-3">로그인</h1>
    <div class="form w-75 mx-auto mt-5">
        <div class="row mb-5">
            <label for="id" class="col-sm-3 col-form-label text text-white">아이디</label>
            <div class="col-sm-9">
                <input type="text" class="form-control" id="id">
            </div>
        </div>
        <div class="row mb-5">
            <label for="password" class="col-sm-3 col-form-label text text-white">비밀번호</label>
            <div class="col-sm-9">
                <input type="password" class="form-control" id="password">
            </div>
        </div>
        <button id="loginBtn" class="btn btn-green float-end">로그인</button>
    </div>
    <div id="alert" class="p-3 rounded-3 position-absolute bgc-red text text-white"></div>
</div>

<script src="/js/login.js"></script>