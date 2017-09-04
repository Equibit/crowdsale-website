<?php

namespace PHP_REST_API\Data;

use PHP_REST_API\Helpers\MySQL;
use PDO;


class EasyAppRoles {

    public static function addUserRole($userId, $roleId) {
        $query = MySQL::getInstance()->prepare("INSERT INTO EasyAppAuthUserRoles (userId, roleId) VALUES (:userId, :roleId) ON DUPLICATE KEY UPDATE roleId=:roleId");
        $query->bindValue(':userId', $userId);
        $query->bindValue(':roleId', $roleId);
        return $query->execute();
    }

    public static function getUserRoles($userId) {
        $query = MySQL::getInstance()->prepare("SELECT roleId FROM EasyAppAuthUserRoles WHERE userId=:userId");
        $query->bindValue(':userId', $userId);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

}