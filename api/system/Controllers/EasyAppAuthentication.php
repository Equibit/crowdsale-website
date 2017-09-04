<?php
namespace PHP_REST_API\Controllers;

use PHP_REST_API\Data\EasyAppRoles;
use PHP_REST_API\Data\EasyAppUserData;
use PHP_REST_API\Helpers\BearerToken;
use PHP_REST_API\Helpers\StatusReturn;
use PHP_REST_API\Helpers\BaseAPIController;
use PHP_REST_API\Helpers\UserRoles;
use PHP_REST_API\Models\EasyAppUserModel;

class EasyAppAuthentication extends BaseAPIController {
    function post_xhr() {
        if ($this->checkAuth()) {
            $json = file_get_contents('php://input');
            $obj = json_decode($json);

            if (!empty($obj->password)) {
                $userEmail = mb_strtolower(trim($obj->email));
                $userData = new EasyAppUserModel($userEmail);

                if ($userData->validate($obj->password)) {

                    $userId = EasyAppUserData::getUserId($userEmail);
                    $roles = EasyAppRoles::getUserRoles($userId);
                    EasyAppUserData::changeNewEmailCode($userId, null, null);
                    $isAdmin = false;

                    foreach ($roles AS $role) if ($role['roleId'] == UserRoles::Admin) $isAdmin = true;

                    $bearer = new BearerToken();
                    $token = $bearer->buildToken($userData->getUserId(), $isAdmin);

                    $userData->addIP();

                    echo json_encode(StatusReturn::S200(Array('accessToken' => '' . $token)));
                } else {
                    $userData->addFailedLogin();
                    echo json_encode(StatusReturn::E401('401 Not Authorized!'));
                }

            } else if (!empty($obj->strategy) && $obj->strategy == 'jwt' && !empty($obj->accessToken)) {

                $bearer = new BearerToken($obj->accessToken);
                $userData = new EasyAppUserModel(null, $bearer->getUserId());

                if ($bearer->validateToken(true)) {

                    $roles = EasyAppRoles::getUserRoles($userData->getUserId());
                    $isAdmin = false;

                    foreach ($roles AS $role) if ($role['roleId'] == UserRoles::Admin) $isAdmin = true;

                    $newBearer = new BearerToken();
                    $token = $newBearer->buildToken($userData->getUserId(), $isAdmin);

                    echo json_encode(StatusReturn::S200(Array('accessToken' => '' . $token)));

                } else {
                    $userData->addFailedLogin();
                    echo json_encode(StatusReturn::E401('401 Not Authorized!'));
                }

            } else {

                echo json_encode(StatusReturn::E401('401 Not Authorized!'));
            }
        }
    }
}