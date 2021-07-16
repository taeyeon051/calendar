<?php

namespace Calendar\Controller;

use Calendar\App\DB;

class FormCheckController extends MasterController
{
    public function loginCheck()
    {
        $id = $_POST['id'];
        $password = $_POST['password'];

        $sql = "SELECT * FROM users WHERE userId = ? AND userPwd = PASSWORD(?)";
        $db = new DB();
        $user = $db->fetch($sql, [$id, $password]);

        if ($user) {
            $_SESSION['user'] = $user;
            echo "성공";
        } else echo "실패";
    }

    public function registerIdCheck()
    {
        $id = $_POST['id'];
        $sql = "SELECT * FROM users WHERE userId = ?";
        $db = new DB();
        $user = $db->fetch($sql, [$id]);

        if (!$user) echo "성공";
        else if ($user) echo "이미 사용중인 아이디입니다.";
    }

    public function registerCheck()
    {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $pwd = $_POST['pwd'];

        $sql = "INSERT INTO users (userId, userName, userPwd) VALUES (?, ?, PASSWORD(?))";
        $db = new DB();
        $result = $db->execute($sql, [$id, $name, $pwd]);

        if ($result) echo "성공";
        else echo "실패";
    }
}