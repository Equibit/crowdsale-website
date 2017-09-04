<?php
namespace PHP_REST_API\Controllers;

use PHP_REST_API\Models\EasyAppUserModel;
use PHP_REST_API\Helpers\StatusReturn;
use PHP_REST_API\Helpers\BaseAPIController;
use PHP_REST_API\Helpers\BearerToken;

class EasyAppChangePassword extends BaseAPIController {
    function post_xhr() {
        if ($this->checkAuth()) {
            $json = file_get_contents('php://input');
            $obj = json_decode($json);

            if (!empty($obj->newPassword)) {

                $bearer = new BearerToken();
                $userId = $bearer->getUserId();

                $newUser = new EasyAppUserModel(null, $userId);

                if ($newUser->setPassword($obj->newPassword, $obj->oldPassword)) {
                    echo json_encode(StatusReturn::S200());
                } else {
                    echo json_encode(StatusReturn::E400(Array("msg" => 'Unknown Error', "code" => "ECP18")));
                }
            } else {
                echo json_encode(StatusReturn::E400(Array("msg" => 'Unknown Error', "code" => "ECP21")));
            }
        }
    }
}