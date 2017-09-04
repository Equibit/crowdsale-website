<?php
namespace PHP_REST_API\Controllers;

use PHP_REST_API\Data\EasyAppUserData;
use PHP_REST_API\Helpers\StatusReturn;
use PHP_REST_API\Helpers\BaseAPIController;
use PHP_REST_API\Helpers\BearerToken;

class EasyAppUserKYC extends BaseAPIController {
    function get_xhr($userId) {
        if ($this->checkAuth()) {
            $bearer = new BearerToken();
            $bearerAdmin = (bool) $bearer->getAdmin();

            if ($bearerAdmin) {
                echo json_encode(StatusReturn::S200(EasyAppUserData::getKYC($userId)), JSON_NUMERIC_CHECK);
            } else {
                echo json_encode(StatusReturn::E401('401 Not Authorized!'));
            }
        }
    }
    function post_xhr() {
        if ($this->checkAuth()) {
            $bearer = new BearerToken();
            $bearerUserId = $bearer->getUserId();

            $json = file_get_contents('php://input');
            $obj = json_decode($json);

            if (!empty($obj->firstName) && !empty($obj->gender) && !empty($obj->dayOfBirth) && !empty($obj->monthOfBirth) && !empty($obj->yearOfBirth) && !empty($obj->buildingNumber) && !empty($obj->streetName) && !empty($obj->city) && !empty($obj->stateProvinceCode) && !empty($obj->postalCode) && !empty($obj->countryCode)) {

                $firstName = trim($obj->firstName);
                $middleName = trim($obj->middleName);
                $lastName = trim($obj->lastName);
                $gender = trim($obj->gender);
                $dayOfBirth = trim($obj->dayOfBirth);
                $monthOfBirth = trim($obj->monthOfBirth);
                $yearOfBirth = trim($obj->yearOfBirth);
                $buildingNumber = trim($obj->buildingNumber);
                $unitNumber = trim($obj->unitNumber);
                $streetName = trim($obj->streetName);
                $streetType = trim($obj->streetType);
                $addressLine = trim($obj->addressLine);
                $city = trim($obj->city);
                $stateProvinceCode = trim($obj->stateProvinceCode);
                $postalCode = trim($obj->postalCode);
                $countryCode = trim($obj->countryCode);

                EasyAppUserData::storeUserKYC($bearerUserId, $firstName, $middleName, $lastName, $gender, $dayOfBirth, $monthOfBirth, $yearOfBirth, $buildingNumber, $unitNumber, $streetName, $streetType, $addressLine, $city, $stateProvinceCode, $postalCode, $countryCode);
                EasyAppUserData::updateKYCComplete($bearerUserId, true);
                echo json_encode(StatusReturn::S200(Array("id" => $bearerUserId)), JSON_NUMERIC_CHECK);
            } else {
                echo json_encode(StatusReturn::E400(Array("msg" => 'Missing field(s)!', "code" => "EAUKYC22")));
            }
        }
    }
}