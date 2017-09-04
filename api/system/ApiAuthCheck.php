<?php
namespace PHP_REST_API;

use PHP_REST_API\Data\EasyAppRoles;
use PHP_REST_API\Data\EasyAppUserData;
use PHP_REST_API\Helpers\BearerToken;

/*
 * Authentication Check
 */
class ApiAuthCheck {
    public static function checkAuth($roles, $initialize = false, $whenLocked = false) {
        if (_USE_HTTPS_ONLY_ && empty($_SERVER['HTTPS'])) return false;
        if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") return true;

        if (!$initialize) {
            $bearer = new BearerToken();
            $bearer->getHeaders();
            $userId = $bearer->getUserId();
            $newRolesArr = Array();
            $userRoles = EasyAppRoles::getUserRoles($userId);
            foreach ($userRoles AS $value) $newRolesArr[] = $value['roleId'];

            if (empty($userRoles) || empty(array_intersect($newRolesArr, $roles))) return false;
            if (EasyAppUserData::getAccountLocked($userId) && !$whenLocked) return false;

            return $bearer->validateToken();
        }

        return false;
    }

}
