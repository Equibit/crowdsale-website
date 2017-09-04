<?php
namespace PHP_REST_API\Controllers;

use PHP_REST_API\Models\EasyAppUserModel;
use PHP_REST_API\Helpers\StatusReturn;
use PHP_REST_API\Helpers\BaseAPIController;

class EasyAppForgotPassword extends BaseAPIController {
    function post_xhr() {
        if ($this->checkAuth()) {
            $json = file_get_contents('php://input');
            $obj = json_decode($json);

            $email = mb_strtolower(trim($obj->email));
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

                $userForgot = new EasyAppUserModel();
                echo json_encode(StatusReturn::S200($userForgot->forgotPassword($email)));

            } else {
                echo json_encode(StatusReturn::E400(Array("msg" => 'Unknown Error!', "code" => "FP38")));
            }
        }
    }
}