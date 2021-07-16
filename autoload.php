<?php

function myLoader($className) {
    $prefix = "Calendar\\";
    $preLen = strlen($prefix);

    if (strncmp($className, $prefix, $preLen) === 0) {
        $realName = substr($className, $preLen);
        $realName = str_replace("\\", "/", $realName);
        require_once __SRC . "/{$realName}.php";
    } 
}

spl_autoload_register("myLoader");