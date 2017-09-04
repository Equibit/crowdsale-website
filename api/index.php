<?php
/**
 * PHP-REST-API-JS - PHP Restful API using custom MVC style structure
 * PHP Version 5.6.18
 * @package PHP-REST-API
 * @author Marc Godard <godardm@gmail.com>
 * @copyright 2016 Marc Godard
 * @license http://www.gnu.org/copyleft/lesser.html GNU Lesser General Public License
 * @note This program is distributed in the hope that it will be useful - WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.
 */

use PHP_REST_API\ApiAuthRouter;
use PHP_REST_API\ApiAuthRouterHook;
use PHP_REST_API\Helpers\StatusReturn;
use PHP_REST_API\Helpers\UserRoles;

/* Web sockets */
use Ratchet\App;
use React\EventLoop\Factory;
use WebSockets\NotificationsWS;
use WebSockets\TransactionsWS;
use WebSockets\PricesWS;
use Ratchet\Server\EchoServer;

//error_reporting(0);
date_default_timezone_set('UTC');

require_once('system/Constants.php');

/* AutoLoaders */
require_once('system/Libraries/autoload.php');
require_once("system/AutoLoader.php");

if (!isset($argv[1])) {

    ApiAuthRouterHook::add("404", function() {
        echo json_encode(StatusReturn::E404('404 Not Found!'));
    });

    ApiAuthRouterHook::add("404Web", function() {
        StatusReturn::WEB404();
    });

    $controllersArray = Array(

        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        // * * * *              open to everyone
        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        '/'
        => Array('controller' => 'EasyAppWebSPA', 'auth' => false),

        '/api-tester/'
        => Array('controller' => 'EasyAppWebAPITester', 'auth' => false),

        '/api/sign-up'
        => Array('controller' => 'EasyAppSignUp', 'auth' => false),

        '/api/forgot-password'
        => Array('controller' => 'EasyAppForgotPassword', 'auth' => false),

        '/api/authentication'
        => Array('controller' => 'EasyAppAuthentication', 'auth' => false, 'initialize' => true),

        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        // * * * *              open to users logged in but account locked or not
        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        '/api/check-auth'
        => Array('controller' => 'EasyAppCheckAuth', 'roles' => Array(UserRoles::User), 'whenLocked' => true),

        '/api/change-password'
        => Array('controller' => 'EasyAppChangePassword', 'roles' => Array(UserRoles::Admin, UserRoles::User), 'whenLocked' => true),

        '/api/change-email'
        => Array('controller' => 'EasyAppChangeEmail', 'roles' => Array(UserRoles::User), 'whenLocked' => true),

        '/api/notifications/:num'
        => Array('controller' => 'Notifications', 'roles' => Array(UserRoles::Admin, UserRoles::User), 'whenLocked' => true),
        '/api/notifications'
        => Array('controller' => 'Notifications', 'roles' => Array(UserRoles::Admin, UserRoles::User), 'whenLocked' => true),

        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        // * * * *              the remaining calls
        // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

        '/api/user-kyc/:num'
        => Array('controller' => 'EasyAppUserKYC', 'roles' => Array(UserRoles::Admin)),
        '/api/user-kyc'
        => Array('controller' => 'EasyAppUserKYC', 'roles' => Array(UserRoles::User)),

        '/api/users/:alphaNumPlus'
        => Array('controller' => 'EasyAppUsers', 'roles' => Array(UserRoles::User, UserRoles::Admin), 'whenLocked' => true),
        '/api/users'
        => Array('controller' => 'EasyAppUsers', 'roles' => Array(UserRoles::Admin), 'whenLocked' => true),

        '/api/admin-send-email/:alphaNumPlus'
        => Array('controller' => 'AdminSendEmail', 'roles' => Array(UserRoles::Admin)),

    );

    ApiAuthRouter::serve($controllersArray);
} else if ($argv[1] == 'cron') {

    $cronClass = '\\PHP_REST_API\\CronJobs\\' . $argv[2];
    if (class_exists($cronClass)) {
        $handler_instance = new $cronClass;
    }

} else if ($argv[1] == 'sockets') {

    $loop = Factory::create();
    $app = new App('192.81.168.118', _WEB_SOCKET_PORT_, '0.0.0.0', $loop);
    $app->route('/notifications', new NotificationsWS($loop), array('*'));
    $app->route('/transactions', new TransactionsWS($loop), array('*'));
    $app->route('/prices', new PricesWS($loop), array('*'));
    $app->route('/echo', new EchoServer, array('*'));

    echo "Web socket server is running. Press ctrl-c to exit...\r\nfor: " . _DOMAIN_NAME_ . " port: " . _WEB_SOCKET_PORT_ . "\r\n";

    $app->run();
}