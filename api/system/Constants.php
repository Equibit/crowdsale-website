<?php

define('_ALLOW_CORS_', true);
define('_IN_DEVELOPMENT_', true);
define('_FULL_DEBUG_', false);
define('_USE_HTTPS_ONLY_', true);
define('_USE_JWT_ONLY_', false);

/*
 * 	Business Variables
 */
define('_COMPANY_NAME_', 'Easy App Framework');
define('_PRIMARY_COLOR_', '#3ecfff');
define('_SECONDARY_COLOR_', '#00a0cd');
define('_COMPANY_ADDRESS_', 'Toronto, Ontario, Canada.');
define('_DEFAULT_LANGUAGE_', 'en');

/*
 * 	General Variables
 */
define('_DOMAIN_NAME_', 'easyappframework.com');
define('_DOMAIN_API_HOST_', ( _USE_HTTPS_ONLY_ ? 'https://' : 'http://' ) . _DOMAIN_NAME_);
define('_DOMAIN_WS_HOST_', ( _USE_HTTPS_ONLY_ ? 'wss://' : 'ws://' ) . _DOMAIN_NAME_ . ( _USE_HTTPS_ONLY_ ? '/wss' : '/ws' ));
define('_EMAIL_ADDRESS_', 'info@' . _DOMAIN_NAME_);
define('_WEB_SOCKET_PORT_', 8777);

/*
 * 	TTL Variables
 */
define('_TOKEN_EXPIRE_SECONDS_', 3600); // A session where a user is logged in should last this long in seconds (60 min)
define('_SECOND_FACTOR_EXPIRE_SECONDS_', 900); // A 2nd factor expires after this many seconds (15 min)
define('_CODE_VERIFY_EXPIRE_SECONDS_', 1800); // The sign up code expire time (30 min)

/*
 * 	Pin Lengths and Variables
 */
define('_PIN_LOWEST_NUMBER_OF_CHARS_', 4);
define('_PIN_HIGH_RANGE_NUMBER_OF_CHARS_', 6);
define('_PIN_SIGN_UP_PLUS_CHARS_', 6); // this number is added on the top two to make a larger base range
define('_PIN_FORGOT_PASSWORD_PLUS_CHARS_', 6); // this number is added on the top two to make a larger base range
define('_CHARS_FOR_SECOND_FACTOR_KEYS_', '5s3kzx2n7hmqd4w169tlgjpycbrfv8'); // 'bcdfghjklmnpqrstvwxyz123456789' randomized
define('_NUMBERS_FOR_SECOND_FACTOR_KEYS_', '1234567890');

/*
 * 	User name, Security Answer Lengths and Login Failed attempts
 */
define('_USERNAME_MIN_LENGTH_', 4);
define('_SECURITY_ANSWER_MIN_LENGTH_', 4);
define('_LOGIN_FAILED_COUNT_BEFORE_NOTIFICATION_', 3);
define('_LOGIN_FAILED_TIME_BEFORE_RESET_COUNT_SECONDS_', 3600);

/*
 *  Other variables
 */
define('_FOLDER_DIVIDER_', '/');
define('_PASSWORD_SALT_IV_SIZE_', 32); // changing this can impact client side code


require_once('ConstantsKeys.php');