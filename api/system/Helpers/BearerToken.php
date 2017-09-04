<?php
namespace PHP_REST_API\Helpers;

use Lcobucci\JWT\ValidationData;
use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use InvalidArgumentException;

class BearerToken {
    private $tokenString;
    private $tokenObj;
    private $signer;
    private $validated = false;
    private $headers;

    public function __construct($tokenString = null) {
        $this->signer = new Sha256();

        if (!is_null($tokenString)) {
            $this->tokenString = $tokenString;

            try {
                $this->tokenObj = (new Parser())->parse($this->tokenString);
            } catch (InvalidArgumentException $e) {
                $this->validated = false;
            }
        }
    }

    public function getUserId() {
        if (is_null($this->headers)) {
            $this->getHeaders();
        }
        $this->tokenObj->getClaims();
        return $this->tokenObj->getClaim('userId');
    }

    public function getAdmin() {
        if (is_null($this->headers)) {
            $this->getHeaders();
        }
        $this->tokenObj->getClaims();
        return $this->tokenObj->getClaim('admin');
    }

    public function buildToken($userId, $isAdmin = false) {
        return (new Builder())->setIssuer(_DOMAIN_API_HOST_)
            ->setAudience(_DOMAIN_API_HOST_)
            ->setIssuedAt(time())
            ->setExpiration((time() + _TOKEN_EXPIRE_SECONDS_))
            ->set('userId', $userId)
            ->set('admin', $isAdmin)
            ->sign($this->signer, _BEARER_TOKEN_SHA256_KEY_)
            ->getToken();
    }

    public function getHeaders() {
        $this->headers = apache_request_headers();
        $this->tokenString = (string) $this->headers['Authorization'];

        try {
            $this->tokenObj = (new Parser())->parse($this->tokenString);
        } catch (InvalidArgumentException $e) {
            $this->validated = false;
        }
    }

    public function validateToken($forced = false) {
        if (!$forced) {
            if (is_null($this->headers)) {
                $this->getHeaders();
            }

            if ((!isset($this->headers['Authorization']))) return false;
        }

        $validateData = new ValidationData();
        $validateData->setIssuer(_DOMAIN_API_HOST_);
        $validateData->setAudience(_DOMAIN_API_HOST_);

        $initialValidation = $this->tokenObj->validate($validateData);
        $signatureValidation = $this->tokenObj->verify($this->signer, _BEARER_TOKEN_SHA256_KEY_);

        $this->validated = $initialValidation && $signatureValidation;

        return $this->validated;
    }
}
