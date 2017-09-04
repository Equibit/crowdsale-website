<?php
namespace WebSockets;

use \PHP_REST_API\Data\AuthUserData;

class WsPayload {
    private $isValid;
    private $messageObj;
    private $userName;
    private $userID;

    public function __construct($message, $route, $authCheck = true) {
        $this->messageObj = json_decode($message, true);
        if (AuthUserData::userExist($this->messageObj['user'])) {
            $this->userName = $this->messageObj['user'];
            $this->userID = AuthUserData::getUserIDByUserEmail($this->messageObj['user']);

            if (!$authCheck && json_last_error() === JSON_ERROR_NONE) {
                $this->isValid = true;
            } else if (json_last_error() !== JSON_ERROR_NONE) {
                $this->isValid = false;
            } else if ($authCheck) {
                $this->isValid = WsAuthCheck::checkAuth($route, $this->messageObj['user'], $this->messageObj['timestamp'], $this->messageObj['signature'], $this->messageObj['payload']);
            }
        } else {
            $this->isValid = false;
        }
    }

    public function isValid() {
        return $this->isValid;
    }
    
    public function getSubscription() {
        return $this->messageObj['payload']['action'] == 'sub';
    }
    
    public function getUserName() {
        return $this->userName;
    }
    
    public function getUserID() {
        return $this->userID;
    }

    public function getPayload() {
        return $this->messageObj['payload'];
    }
}