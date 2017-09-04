<?php

class AutoLoader {
    static public function loader($className) {
        $filename = "./" . str_replace(Array('PHP_REST_API\\', '\\'), Array('system/', '/'), $className) . ".php";
        if (file_exists($filename)) {
            include($filename);
            if (class_exists($className)) {
                return TRUE;
            }
        }
        return FALSE;
    }
}

spl_autoload_register('AutoLoader::loader');