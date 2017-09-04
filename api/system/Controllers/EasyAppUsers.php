<?php
namespace PHP_REST_API\Controllers;

use PHP_REST_API\Data\EasyAppUserData;
use PHP_REST_API\Helpers\StatusReturn;
use PHP_REST_API\Helpers\BaseAPIController;
use PHP_REST_API\Helpers\BearerToken;
use PHP_REST_API\Models\EasyAppUserModel;

class EasyAppUsers extends BaseAPIController {
    function get_xhr($userId = null) {
        if ($this->checkAuth()) {
            $bearer = new BearerToken();
            $bearerUserId = $bearer->getUserId();
            $bearerAdmin = (bool) $bearer->getAdmin();

            if (!is_null($userId) && $bearerUserId == $userId) {
                echo json_encode(StatusReturn::S200(EasyAppUserData::getUserDataById($bearerUserId)), JSON_NUMERIC_CHECK);
            } else if ($bearerAdmin) {

                $limit = (isset($_REQUEST['$limit']) ? intval($_REQUEST['$limit']) : 0 );
                $skip = (isset($_REQUEST['$skip']) ? intval($_REQUEST['$skip']) : 0 );

                if (!empty($_REQUEST['$search'])) {
                    echo json_encode(StatusReturn::S200(Array('data' => EasyAppUserData::searchAllUserData($skip, $limit, $_REQUEST['$search']), 'skip' => $skip, 'limit' => $limit, 'total' => EasyAppUserData::searchAllUserDataCount($_REQUEST['$search']))), JSON_NUMERIC_CHECK);
                } else {
                    echo json_encode(StatusReturn::S200(Array('data' => EasyAppUserData::getAllUserData($skip, $limit), 'skip' => $skip, 'limit' => $limit, 'total' => EasyAppUserData::getAllUserDataCount())), JSON_NUMERIC_CHECK);
                }
            } else {
                echo json_encode(StatusReturn::E401('401 Not Authorized!'));
            }
        }
    }
    function put_xhr($userId) {
        if ($this->checkAuth()) {
            $bearer = new BearerToken();
            $bearerUserId = $bearer->getUserId();
            $bearerAdmin = (bool) $bearer->getAdmin();

            if (($bearerAdmin && EasyAppUserData::userExist(EasyAppUserData::getUserEmail($userId))) || $bearerUserId == $userId) {

                $json = file_get_contents('php://input');
                $obj = json_decode($json);

                if ($obj->setPassword) {
                    $user = new EasyAppUserModel(null, $userId);
                    $user->resetPassword();
                }

                EasyAppUserData::setAccountLocked($userId, (bool) $obj->locked);

                echo json_encode(StatusReturn::S200(Array("id" => $userId)), JSON_NUMERIC_CHECK);
            } else {
                echo json_encode(StatusReturn::E401('401 Not Authorized!'));
            }
        }
    }
    function delete_xhr($userId) {
        if ($this->checkAuth()) {
            $bearer = new BearerToken();
            $bearerAdmin = (bool) $bearer->getAdmin();

            if ($bearerAdmin && EasyAppUserData::userExist(EasyAppUserData::getUserEmail($userId))) {

                EasyAppUserData::deleteUser($userId);
                EasyAppUserData::deleteUserRoles($userId);

                echo json_encode(StatusReturn::S200(Array("id" => $userId)), JSON_NUMERIC_CHECK);
            } else {
                echo json_encode(StatusReturn::E401('401 Not Authorized!'));
            }
        }
    }
}