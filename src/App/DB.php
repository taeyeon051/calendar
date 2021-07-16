<?php

namespace Calendar\App;

class DB
{
    private $con = null;

    public function __construct()
    {
        $host = "localhost";
        $dbname = "calendar";
        $charset = "utf8mb4";
        $user = "root";
        $pass = "";
        $conStr = "mysql:host={$host}; dbname={$dbname}; charset={$charset}";
        $this->con = new \PDO($conStr, $user, $pass);
    }

    public function fetchAll($sql, $data = [])
    {
        $q = $this->con->prepare($sql);
        $q->execute($data);
        return $q->fetchAll(\PDO::FETCH_OBJ);
    }

    public function fetch($sql, $data = [])
    {
        $q = $this->con->prepare($sql);
        $q->execute($data);
        return $q->fetch(\PDO::FETCH_OBJ);
    }

    public function execute($sql, $data = [])
    {
        $q = $this->con->prepare($sql);
        return $q->execute($data);
    }
}
