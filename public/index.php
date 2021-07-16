<?php
date_default_timezone_set("Asia/Seoul");
session_start();

define('__ROOT', dirname(__DIR__));
define('__SRC', __ROOT . "/src");
define('__VIEWS', __SRC . "/views");
define('__SESSION', isset($_SESSION['user']));

require_once __ROOT . "/autoload.php";
require_once __ROOT . "/web.php";

Calendar\App\Route::init();