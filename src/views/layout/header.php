<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="/app.css">
    <script src="/js/jquery-3.4.1.js"></script>
    <title>일정 관리</title>
</head>

<body>
    <!-- 컨테이너 -->
    <div class="container">
        <!-- 헤더 -->
        <header class="d-flex justify-content-center align-items-center position-relative">
            <!-- 제목 -->
            <h1><a href="/" class="text text-white">일정 관리</a></h1>
            <?php if (__SESSION) : ?>
                <div class="btn-box">
                    <span class="btn text text-white"><?= $_SESSION['user']->userName ?></span>
                    <a href="/user/logout" class="btn btn-red">로그아웃</a>
                </div>
            <?php else : ?>
                <div class="btn-box">
                    <a href="/user/register" class="btn btn-blue mx-2">회원가입</a>
                    <a href="/user/login" class="btn btn-green">로그인</a>
                </div>
            <?php endif; ?>
        </header>