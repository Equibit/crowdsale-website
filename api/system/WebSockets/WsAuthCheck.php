<?php
namespace WebSockets;

use \PHP_REST_API\Models\EasyAppUserModel;

class WsAuthCheck {
    public static function checkAuth($route, $authUser, $authTimestamp, $authSignature, $payload) {

        if (empty($authUser) || empty($authTimestamp) || empty($authSignature)) return false;
        if (!is_numeric($authTimestamp) || $authTimestamp < strtotime("-" . _CALL_TIME_TO_LIVE_IN_MINUTES_ . " minute", time())) return false;

        $userData = new EasyAppUserModel();
        if (!$userData->loadUser(mb_strtolower($authUser))) return false;

        $userSecret = $userData->getUserSecret();

        $signatureData = _DOMAIN_WS_HOST_ . $route . json_encode($payload) . $authTimestamp;

        $newAuthSignature = hash_hmac('sha512', $signatureData, $userSecret, true);
        $newAuthSignature = base64_encode($newAuthSignature);

        if (hash_equals($newAuthSignature, $authSignature)) {
            return true;
        }

        return false;
    }
}
