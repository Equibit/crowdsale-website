<?php
namespace PHP_REST_API\Models;

use PHP_REST_API\Data\EasyAppUserData;
use PHP_REST_API\Data\EasyAppRoles;
use PHP_REST_API\Helpers\UserRoles;

class EasyAppUserModel {
    private $userDataLoaded = false;
    private $userData;
    private $userRoles;

    public function __construct($authEmail = null, $authUserId = null) {
        if (!is_null($authEmail)) {
            $this->loadUserForced($authEmail);
        }
        if (!is_null($authUserId)) {
            $this->loadUserForced(EasyAppUserData::getUserEmail($authUserId));
        }
    }

    public function setPassword($newPassword, $oldPassword = null) {
        if (is_null($oldPassword) && $this->userData['setPassword']) {
            EasyAppUserData::markPasswordSet($this->userData['userId'], false);
            return $this->createAndUpdatePassword($newPassword);
        } else if (!is_null($oldPassword) && !is_null($newPassword) && $this->validate($oldPassword)) {
            return $this->createAndUpdatePassword($newPassword);
        }

        return false;
    }

    public function changeEmail($password, $newEmail, $emailCode) {
        if (!empty($emailCode) && $this->validate($password) && $this->userData['newEmail'] === $newEmail && $this->userData['emailCode'] === $emailCode) {
            EasyAppUserData::updateEmailAddress($this->userData['userId'], $this->userData['newEmail']);
            EasyAppUserData::changeNewEmailCode($this->userData['userId'], null, null);
            return true;
        } else if (!is_null($newEmail) && $this->validate($password)) {
            $newExtraKey = $this->createPin(_PIN_SIGN_UP_PLUS_CHARS_);
            $emailTemplate = new EasyAppEmailTemplatesModel($newEmail, _POSTMARK_CHANGE_EMAIL_TEMPLATE_, Array('tempCode' => $newExtraKey));
            EasyAppUserData::changeNewEmailCode($this->userData['userId'], $newEmail, $newExtraKey);
            return $emailTemplate->send();
        }

        return false;
    }

    public function validate($password) {
        if ($this->userDataLoaded) {
            return $this->userData['password'] === hash_pbkdf2('sha512', $password, $this->userData['salt'], 1000);
        }

        return false;
    }

    public function loadUserForced($email) {
        if (EasyAppUserData::userExist($email)) {
            $this->userData = EasyAppUserData::getUserData($email);
            $this->userDataLoaded = true;
            $this->getUserRoles();
            return true;
        }
        return false;
    }

    public function getUserRoles() {
        if (is_null($this->userRoles)) {
            $roles = EasyAppRoles::getUserRoles($this->userData['userID']);
            foreach ($roles AS $value) {
                $this->userRoles[] = $value['roleName'];
            }
        }
        return $this->userRoles;
    }

    public function createUser($authEmail, $referralCode = null) {
        $userExists = EasyAppUserData::userExist($authEmail);

        if (!$userExists) {
            // create user
            $newExtraKey = $this->createPin(_PIN_SIGN_UP_PLUS_CHARS_);
            $newUserId = EasyAppUserData::addNewUser($authEmail, '', '', $referralCode);
            $this->loadUserForced($authEmail);
            $this->createAndUpdatePassword($newExtraKey);
            EasyAppRoles::addUserRole($newUserId, UserRoles::User);
            $emailTemplate = new EasyAppEmailTemplatesModel($this->userData['email'], _POSTMARK_SIGN_UP_TEMPLATE_, Array('tempPassword' => $newExtraKey));
            return $emailTemplate->send();
        } else {
            $emailTemplate = new EasyAppEmailTemplatesModel($authEmail, _POSTMARK_SIGN_UP_DUP_TEMPLATE_);
            return $emailTemplate->send();
        }
    }

    public static function createPin($baseLen = 0, $numbersOnly = false) {
        $useChars = _CHARS_FOR_SECOND_FACTOR_KEYS_;
        if ($numbersOnly) $useChars = _NUMBERS_FOR_SECOND_FACTOR_KEYS_;

        $characters = str_shuffle($useChars);
        $charLen = strlen($characters) - 1;
        $len = mt_rand($baseLen+_PIN_LOWEST_NUMBER_OF_CHARS_, $baseLen+_PIN_HIGH_RANGE_NUMBER_OF_CHARS_);

        $string = '';
        for ($i = 0; $i < $len; $i++) $string .= $characters[mt_rand(0, $charLen)];
        return mb_strtoupper($string);
    }

    public function createAndUpdatePassword($newPassword) {
        $this->userData['salt'] = bin2hex(mcrypt_create_iv(_PASSWORD_SALT_IV_SIZE_, MCRYPT_DEV_URANDOM));
        $this->userData['password'] = hash_pbkdf2('sha512', $newPassword, $this->userData['salt'], 1000);
        return EasyAppUserData::updatePasswordAndSalt($this->userData['userId'], $this->userData['password'], $this->userData['salt']);
    }

    public function forgotPassword($email) {
        if (EasyAppUserData::userExist($email)) {
            $this->loadUserForced($email);
            return $this->resetPassword();
        } else {
            $emailTemplate = new EasyAppEmailTemplatesModel($email, _POSTMARK_FORGOT_PASS_NO_ACCOUNT_TEMPLATE_);
            return $emailTemplate->send();
        }
    }

    public function resetPassword() {
        $newExtraKey = $this->createPin(_PIN_SIGN_UP_PLUS_CHARS_);
        $this->createAndUpdatePassword($newExtraKey);
        EasyAppUserData::markPasswordSet($this->userData['userId'], true);
        $emailTemplate = new EasyAppEmailTemplatesModel($this->userData['email'], _POSTMARK_FORGOT_PASS_TEMPLATE_, Array('tempPassword' => $newExtraKey));
        return $emailTemplate->send();
    }

    public function notifyOnFailedLogin() {
        if ($this->userData['failedLoginCount'] >= _LOGIN_FAILED_COUNT_BEFORE_NOTIFICATION_) {
            EasyAppUserData::resetFailedLogin($this->userData['userID']);
            if ($this->userData['failedLoginTime'] + _LOGIN_FAILED_TIME_BEFORE_RESET_COUNT_SECONDS_ > time()) {
                $emailTemplate = new EasyAppEmailTemplatesModel($this->userData['email'], _POSTMARK_TOO_MANY_FAILED_TEMPLATE_);
                return $emailTemplate->send();
            }
            return true;
        }
        return false;
    }

    public function addFailedLogin() {
        if (!$this->notifyOnFailedLogin()) {
            if ((is_null($this->userData['failedLoginCount']) && is_null($this->userData['failedLoginTime'])) || $this->userData['failedLoginTime'] + _LOGIN_FAILED_TIME_BEFORE_RESET_COUNT_SECONDS_ < time()) {
                EasyAppUserData::updateFailedLogin($this->userData['userID'], 1, time());
            } else {
                EasyAppUserData::updateFailedLogin($this->userData['userID'], ($this->userData['failedLoginCount'] + 1), $this->userData['failedLoginTime']);
            }
        }
    }

    public function makeSuccessfulLogin($initialize = false) {
        if ($initialize) $this->addSuccessfulIP();
        EasyAppUserData::resetFailedLogin($this->userData['userID']);
    }

    public function addSuccessfulIP() {
        EasyAppUserData::addSuccessfulIP($this->userData['userID'], $_SERVER['REMOTE_ADDR']);
    }

    public function isLocked() {
        return EasyAppUserData::getAccountLocked($this->userData['userID']);
    }

    public function isUserAdmin() {
        if (is_null($this->userRoles)) return false;

        foreach ($this->userRoles AS $role) {
            if ($role == 'i18nAdmin') return true;
        }
        return false;
    }

    public function getUserPassword() {
        return $this->userData['password'];
    }

    public function getSalt() {
        return $this->userData['salt'];
    }

    public function getUserId() {
        return $this->userData['userId'];
    }

    public function getUserEmail() {
        return $this->userData['email'];
    }

    public function addIP() {
        EasyAppUserData::addIP($this->userData['userId'], $_SERVER['REMOTE_ADDR']);
    }
}
