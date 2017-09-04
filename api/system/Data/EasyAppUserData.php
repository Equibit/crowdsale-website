<?php
namespace PHP_REST_API\Data;

use PHP_REST_API\Helpers\MySQL;
use PDO;

class EasyAppUserData {

    public static function getUserData($authEmail) {
        $query = MySQL::getInstance()->prepare("SELECT userId, email, password, salt, failedLoginCount, UNIX_TIMESTAMP(failedLoginTime) AS failedLoginTime, UNIX_TIMESTAMP(accountCreated) AS accountCreated, setPassword, kycComplete, kycApproved, newEmail, emailCode FROM EasyAppAuthUser WHERE email=:email ORDER BY userId");
        $query->bindValue(':email', $authEmail);
        $query->execute();
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    public static function changeNewEmailCode($userId, $newEmail, $emailCode) {
        $query = MySQL::getInstance()->prepare("UPDATE EasyAppAuthUser SET newEmail=:newEmail, emailCode=:emailCode WHERE userId=:userId");
        $query->bindValue(':userId', $userId);
        $query->bindValue(':newEmail', $newEmail);
        $query->bindValue(':emailCode', $emailCode);
        return $query->execute();
    }

    public static function updateEmailAddress($userId, $email) {
        $query = MySQL::getInstance()->prepare("UPDATE EasyAppAuthUser SET email=:email WHERE userId=:userId");
        $query->bindValue(':userId', $userId);
        $query->bindValue(':email', $email);
        return $query->execute();
    }

    public static function getUserDataById($authUserId) {
        $query = MySQL::getInstance()->prepare("SELECT userId AS id, setPassword, locked, kycComplete, kycApproved FROM EasyAppAuthUser WHERE userId=:userId");
        $query->bindValue(':userId', $authUserId);
        $query->execute();
        return $query->fetch(PDO::FETCH_ASSOC);
    }

    public static function getAllUserData($skip, $limit) {
        $query = MySQL::getInstance()->prepare("SELECT EasyAppAuthUser.userId AS id, setPassword, email, UNIX_TIMESTAMP(accountCreated) AS accountCreated, UNIX_TIMESTAMP(lastLogin) AS lastLogin, locked, kycComplete, kycApproved FROM EasyAppAuthUser LEFT JOIN (SELECT userId, MAX(lastUsed) AS lastLogin FROM EasyAppAuthUserIPs GROUP BY userId)EasyAppAuthUserIPs ON EasyAppAuthUser.userId = EasyAppAuthUserIPs.userId ORDER BY EasyAppAuthUser.userId LIMIT :skip,:limit");
        $query->bindValue(':limit', $limit, PDO::PARAM_INT);
        $query->bindValue(':skip', $skip, PDO::PARAM_INT);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function searchAllUserData($skip, $limit, $search) {
        $query = MySQL::getInstance()->prepare("SELECT EasyAppAuthUser.userId AS id, setPassword, email, UNIX_TIMESTAMP(accountCreated) AS accountCreated, UNIX_TIMESTAMP(lastLogin) AS lastLogin, locked, kycComplete, kycApproved FROM EasyAppAuthUser LEFT JOIN (SELECT userId, MAX(lastUsed) AS lastLogin FROM EasyAppAuthUserIPs GROUP BY userId)EasyAppAuthUserIPs ON EasyAppAuthUser.userId = EasyAppAuthUserIPs.userId WHERE email LIKE :search ORDER BY EasyAppAuthUser.userId LIMIT :skip,:limit");
        $query->bindValue(':limit', $limit, PDO::PARAM_INT);
        $query->bindValue(':skip', $skip, PDO::PARAM_INT);
        $query->bindValue(':search', '%' . $search . '%');
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function getAllUserDataCount() {
        $query = MySQL::getInstance()->prepare("SELECT COUNT(*) AS count FROM EasyAppAuthUser");
        $query->execute();
        $temp = $query->fetch(PDO::FETCH_ASSOC);
        return $temp['count'];
    }

    public static function searchAllUserDataCount($search) {
        $query = MySQL::getInstance()->prepare("SELECT COUNT(*) AS count FROM EasyAppAuthUser WHERE email LIKE :search");
        $query->bindValue(':search', '%' . $search . '%');
        $query->execute();
        $temp = $query->fetch(PDO::FETCH_ASSOC);
        return $temp['count'];
    }

    public static function userExist($authEmail) {
        $query = MySQL::getInstance()->prepare("SELECT COUNT(*) AS count FROM EasyAppAuthUser WHERE email=:email");
        $query->bindValue(':email', $authEmail);
        $query->execute();
        $temp = $query->fetch(PDO::FETCH_ASSOC);
        return ($temp['count'] == 1);
    }

    public static function getUserEmail($authUserId) {
        $query = MySQL::getInstance()->prepare("SELECT email FROM EasyAppAuthUser WHERE userId=:userId");
        $query->bindValue(':userId', $authUserId);
        $query->execute();
        $temp = $query->fetch(PDO::FETCH_ASSOC);
        return $temp['email'];
    }

    public static function getUserId($authEmail) {
        $query = MySQL::getInstance()->prepare("SELECT userId FROM EasyAppAuthUser WHERE email=:email");
        $query->bindValue(':email', $authEmail);
        $query->execute();
        $temp = $query->fetch(PDO::FETCH_ASSOC);
        return $temp['userId'];
    }

    public static function addNewUser($email, $password, $salt, $referralCode) {
        $dataInstance = MySQL::getInstance();
        $query = $dataInstance->prepare("INSERT INTO EasyAppAuthUser (email, password, salt, accountCreated, referralCode) VALUES (:email, :password, :salt, FROM_UNIXTIME(:accountCreated), :referralCode)");
        $query->bindValue(':email', $email);
        $query->bindValue(':password', $password);
        $query->bindValue(':salt', $salt);
        $query->bindValue(':referralCode', $referralCode);
        $query->bindValue(':accountCreated', time());
        $query->execute();
        return $dataInstance->lastInsertId();
    }

    public static function resetFailedLogin($userId) {
        $query = MySQL::getInstance()->prepare("UPDATE EasyAppAuthUser SET failedLoginCount=:failedLoginCount, failedLoginTime=:failedLoginTime WHERE userId=:userId");
        $query->bindValue(':userId', $userId);
        $query->bindValue(':failedLoginCount', null);
        $query->bindValue(':failedLoginTime', null);
        return $query->execute();
    }

    public static function updateFailedLogin($userId, $failedLoginCount, $failedLoginTime) {
        $query = MySQL::getInstance()->prepare("UPDATE EasyAppAuthUser SET failedLoginCount=:failedLoginCount, failedLoginTime=FROM_UNIXTIME(:failedLoginTime) WHERE userId=:userId");
        $query->bindValue(':userId', $userId);
        $query->bindValue(':failedLoginCount', $failedLoginCount);
        $query->bindValue(':failedLoginTime', $failedLoginTime);
        return $query->execute();
    }

    public static function addSuccessfulIP($userId, $ipAddress) {
        $query = MySQL::getInstance()->prepare("INSERT INTO EasyAppAuthUserSuccessfulIPs (userId, ipAddress, useCount, lastUsed) VALUES (:userId, :ipAddress, :useCount, FROM_UNIXTIME(:lastUsed)) ON DUPLICATE KEY UPDATE lastUsed=FROM_UNIXTIME(:lastUsed), useCount=useCount+1");
        $query->bindValue(':userId', $userId);
        $query->bindValue(':ipAddress', $ipAddress);
        $query->bindValue(':useCount', 1);
        $query->bindValue(':lastUsed', time());
        return $query->execute();
    }

    public static function getAccountLocked($userId) {
        $query = MySQL::getInstance()->prepare("SELECT locked FROM EasyAppAuthUser WHERE userId=:userId");
        $query->bindValue(':userId', $userId);
        $query->execute();
        $temp = $query->fetch(PDO::FETCH_ASSOC);
        return (bool) $temp['locked'];
    }

    public static function setAccountLocked($userId, $locked) {
        $query = MySQL::getInstance()->prepare("UPDATE EasyAppAuthUser SET locked=:locked WHERE userId=:userId");
        $query->bindValue(':userId', $userId);
        $query->bindValue(':locked', $locked);
        return $query->execute();
    }

    public static function updatePasswordAndSalt($userId, $password, $salt) {
        $query = MySQL::getInstance()->prepare("UPDATE EasyAppAuthUser SET password=:password, salt=:salt WHERE userId=:userId");
        $query->bindValue(':userId', $userId);
        $query->bindValue(':password', $password);
        $query->bindValue(':salt', $salt);
        return $query->execute();
    }

    public static function markPasswordSet($userId, $changeTo) {
        $query = MySQL::getInstance()->prepare("UPDATE EasyAppAuthUser SET setPassword=:changeTo WHERE userId=:userId");
        $query->bindValue(':userId', $userId);
        $query->bindValue(':changeTo', $changeTo);
        return $query->execute();
    }

    public static function deleteUser($userId) {
        $query = MySQL::getInstance()->prepare("DELETE FROM EasyAppAuthUser WHERE userId=:userId");
        $query->bindValue(':userId', $userId);
        return $query->execute();
    }

    /*
     *
     *          IP Addresses
     *
     *
     */

    public static function addIP($userId, $ipAddress) {
        $query = MySQL::getInstance()->prepare("INSERT INTO EasyAppAuthUserIPs (userId, ipAddress, useCount, lastUsed) VALUES (:userId, :ipAddress, :useCount, FROM_UNIXTIME(:lastUsed)) ON DUPLICATE KEY UPDATE lastUsed=FROM_UNIXTIME(:lastUsed), useCount=useCount+1");
        $query->bindValue(':userId', $userId);
        $query->bindValue(':ipAddress', $ipAddress);
        $query->bindValue(':useCount', 1);
        $query->bindValue(':lastUsed', time());
        return $query->execute();
    }

    /*
     *
     *          Roles
     *
     *
     */

    public static function deleteUserRoles($userId) {
        $query = MySQL::getInstance()->prepare("DELETE FROM EasyAppAuthUserRoles WHERE userId=:userId");
        $query->bindValue(':userId', $userId);
        return $query->execute();
    }

    /*
     *
     *          KYC
     *
     *
     */

    public static function storeUserKYC($userId, $firstName, $middleName, $lastName, $gender, $dayOfBirth, $monthOfBirth, $yearOfBirth, $buildingNumber, $unitNumber, $streetName, $streetType, $addressLine, $city, $stateProvince, $postalZip, $country) {
        $dataInstance = MySQL::getInstance();
        $query = $dataInstance->prepare("INSERT INTO EasyAppAuthUserKYC (userId, firstName, middleName, lastName, gender, dayOfBirth, monthOfBirth, yearOfBirth, buildingNumber, unitNumber, streetName, streetType, addressLine, city, stateProvince, postalZip, country) VALUES (:userId, :firstName, :middleName, :lastName, :gender, :dayOfBirth, :monthOfBirth, :yearOfBirth, :buildingNumber, :unitNumber, :streetName, :streetType, :addressLine, :city, :stateProvince, :postalZip, :country)");
        $query->bindValue(':userId', $userId);
        $query->bindValue(':firstName', $firstName);
        $query->bindValue(':middleName', $middleName);
        $query->bindValue(':lastName', $lastName);
        $query->bindValue(':gender', $gender);
        $query->bindValue(':dayOfBirth', $dayOfBirth);
        $query->bindValue(':monthOfBirth', $monthOfBirth);
        $query->bindValue(':yearOfBirth', $yearOfBirth);
        $query->bindValue(':buildingNumber', $buildingNumber);
        $query->bindValue(':unitNumber', $unitNumber);
        $query->bindValue(':streetName', $streetName);
        $query->bindValue(':streetType', $streetType);
        $query->bindValue(':addressLine', $addressLine);
        $query->bindValue(':city', $city);
        $query->bindValue(':stateProvince', $stateProvince);
        $query->bindValue(':postalZip', $postalZip);
        $query->bindValue(':country', $country);
        $query->execute();
        return $dataInstance->lastInsertId();
    }

    public static function updateKYCComplete($userId, $changeTo) {
        $query = MySQL::getInstance()->prepare("UPDATE EasyAppAuthUser SET kycComplete=:changeTo WHERE userId=:userId");
        $query->bindValue(':userId', $userId);
        $query->bindValue(':changeTo', $changeTo);
        return $query->execute();
    }

    public static function getKYC($userId) {
        $query = MySQL::getInstance()->prepare("SELECT userId, firstName, middleName, lastName, gender, dayOfBirth, monthOfBirth, yearOfBirth, buildingNumber, unitNumber, streetName, streetType, addressLine, city, stateProvince, postalZip, country, kycRawData FROM EasyAppAuthUserKYC WHERE userId=:userId ORDER BY insertDatetime");
        $query->bindValue(':userId', $userId);
        $query->execute();
        return $query->fetch(PDO::FETCH_ASSOC);
    }
}