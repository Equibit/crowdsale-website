<?php
namespace PHP_REST_API\Controllers;

use PHP_REST_API\Models\EasyAppUserModel;
use PHP_REST_API\Helpers\StatusReturn;
use PHP_REST_API\Helpers\BaseAPIController;

class EasyAppSignUp extends BaseAPIController {
    function post_xhr() {
        if ($this->checkAuth()) {
            $json = file_get_contents('php://input');
            $obj = json_decode($json);

            if (!empty(trim($obj->email)) && filter_var(trim($obj->email), FILTER_VALIDATE_EMAIL)) {

                $newUser = new EasyAppUserModel();
                if ($newUser->createUser(mb_strtolower(trim($obj->email)), (!empty(trim($obj->referral)) ? trim($obj->referral) : null))) {
                    echo json_encode(StatusReturn::S200());
                } else {
                    echo json_encode(StatusReturn::E400(Array("msg" => 'Unknown Error!', "code" => "SU24")));
                }
            } else {
                echo json_encode(StatusReturn::E400(Array("msg" => 'Unknown Error!', "code" => "SU27")));
            }
        }
    }
}
