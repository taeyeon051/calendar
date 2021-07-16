<?php

namespace Calendar\Controller;

class MasterController
{
    public function render($view_name, $data = [])
    {
        extract($data);

        require_once(__VIEWS . "/layout/header.php");
        require_once(__VIEWS . "/{$view_name}.php");
        require_once(__VIEWS . "/layout/footer.php");
    }
}