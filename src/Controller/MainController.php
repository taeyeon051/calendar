<?php

namespace Calendar\Controller;

use Calendar\App\DB;
use Calendar\Library\Lib;

class MainController extends MasterController
{
    public function index()
    {
        $this->render("main");
    }

    public function setSchedule()
    {
        $userId = $_SESSION['user']->userId;
        $userName = $_SESSION['user']->userName;
        $date = $_POST['date'];
        $time = $_POST['time'];
        $content = $_POST['content'];
        $shareUser = $_POST['share'] ? $_POST['share'] : null;

        $db = new DB();
        $sql = "INSERT INTO schedules (userId, userName, date, time, content, shareUser) VALUES (?, ?, ?, ?, ?, ?)";
        $cnt = 0;
        if ($shareUser != null) {
            for ($i = 0; $i < count($shareUser); $i++) {
                $usql = "SELECT * FROM users WHERE userId = ?";
                $shareUserCheck = $db->fetch($usql, [$shareUser[$i]]);
                if ($shareUserCheck) $cnt++;
            }
        }
        if ($shareUser == null || ($shareUser != null && $cnt == count($shareUser))) {
            $shareUser = json_encode($shareUser);
            $result = $db->execute($sql, [$userId, $userName, $date, $time, $content, $shareUser]);
            
            if ($result) echo "성공";
            else echo "실패";
        } else echo "실패";
    }

    public function getSchedule()
    {
        $y = $_POST['y'];
        $m = $_POST['m'];
        $d = $_POST['d'];

        $date = $y . '-' . $m . '-' . $d;
        $db = new DB();
        $sql = "SELECT * FROM schedules WHERE date = ? ORDER BY time";
        $list = $db->fetchAll($sql, [$date]);
        if (count($list) > 0) {
            foreach ($list as $item) {
                if ($item->shareUser != null) $item->shareUser = json_decode($item->shareUser);
            }
        }

        echo json_encode($list, JSON_UNESCAPED_UNICODE);
    }

    public function scheduleModify()
    {
        $id = $_POST['id'];
        $date = $_POST['date'];
        $time = $_POST['time'];
        $content = $_POST['content'];
        $shareUser = $_POST['share'] ? $_POST['share'] : null;

        $db = new DB();
        $sql = "SELECT * FROM schedules WHERE id = ?";
        $schedule = $db->fetch($sql, [$id]);
        if ($schedule) {
            $cnt = 0;
            if ($shareUser != null) {
                for ($i = 0; $i < count($shareUser); $i++) {
                    $usql = "SELECT * FROM users WHERE userId = ?";
                    $shareUserCheck = $db->fetch($usql, [$shareUser[$i]]);
                    if ($shareUserCheck) $cnt++;
                }
            }
            if ($shareUser == null || ($shareUser != null && $cnt == count($shareUser))) {
                $shareUser = json_encode($shareUser);
                $usql = "UPDATE schedules SET date = ?, time = ?, content = ?, shareUser = ? WHERE id = ?";
                $result = $db->execute($usql, [$date, $time, $content, $shareUser, $id]);
                if ($result) echo "성공";
                else echo "실패";
            } else echo "실패";
        } else echo "실패";
    }

    public function scheduleDelete()
    {
        $id = $_POST['id'];

        $db = new DB();
        $sql = "DELETE FROM schedules WHERE id = ?";
        $result = $db->execute($sql, [$id]);
        if ($result) echo "성공";
        else echo "실패";
    }
}