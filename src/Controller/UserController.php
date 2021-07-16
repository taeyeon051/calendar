<?php

namespace Calendar\Controller;

use Calendar\App\DB;
use Calendar\Library\Lib;

class UserController extends MasterController
{
    public function registerPage()
    {
        $this->render("register");
    }

    public function loginPage()
    {
        $this->render("login");
    }

    public function logout()
    {
        unset($_SESSION['user']);
        Lib::msgAndGo("로그아웃 되었습니다.", "/");
    }

    public function getUserData()
    {
        echo json_encode($_SESSION['user'], JSON_UNESCAPED_UNICODE);
    }
}
