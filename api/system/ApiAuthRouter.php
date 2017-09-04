<?php
namespace PHP_REST_API;

use PHP_REST_API\Controllers\EasyAppWebSPA;

/*
 *  Router for the API
 */
class ApiAuthRouter {
    public static function serve($routes) {
        ApiAuthRouterHook::fire('before_request', compact('routes'));

        $request_method = mb_strtolower($_SERVER['REQUEST_METHOD']);

        $queryString = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
        parse_str($queryString, $getArray);
        foreach ($getArray AS $element => $value) $_REQUEST[$element] = $value;

        // file_put_contents("file.txt", "\n\npath info: " . (isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '') . "\noriginal: " . (isset($_SERVER['ORIG_PATH_INFO']) ? $_SERVER['ORIG_PATH_INFO'] : '') . "\nuri: " . (isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : ''), FILE_APPEND);

        $path_info = '/';
        if (!empty($_SERVER['PATH_INFO'])) {
            $path_info = $_SERVER['PATH_INFO'];
        } else if (!empty($_SERVER['ORIG_PATH_INFO']) && $_SERVER['ORIG_PATH_INFO'] !== '/index.php') {
            $path_info = $_SERVER['ORIG_PATH_INFO'];
        } else {
            if (!empty($_SERVER['REQUEST_URI'])) {
                $path_info = (mb_strpos($_SERVER['REQUEST_URI'], '?') > 0) ? strstr($_SERVER['REQUEST_URI'], '?', true) : $_SERVER['REQUEST_URI'];
            }
        }


        $discovered_handler_arr = Array();
        $regex_matches = array();

        if (isset($routes[$path_info])) {
            $discovered_handler_arr = $routes[$path_info];
        } else if ($routes) {
            $tokens = array(
                ':str'          => '([a-zA-Z]+)',
                ':num'          => '([0-9]+)',
                ':alphaNum'     => '([a-zA-Z0-9]+)',
                ':alphaNumPlus' => '([a-zA-Z0-9._-]+)',
                ':email'        => '([a-zA-Z0-9@._-]+)',
                ':key'          => '([a-zA-Z0-9]{40})',
                ':bool'         => '(true|false)',
                ':locale'       => '([a-zA-Z]{2})',
                ':uuidV4'       => '([0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12})',
            );
            // todo: add a way that the tokens can be missing and the pattern will match
            foreach ($routes as $pattern => $handler_name) {
                $pattern = strtr($pattern, $tokens);
                if (preg_match('#^/?' . $pattern . '/?$#', $path_info, $matches)) {
                    $discovered_handler_arr = $handler_name;
                    $regex_matches = $matches;
                    break;
                }
            }
        }

        $result = null;
        $handler_instance = null;

        if (!empty($discovered_handler_arr)) {
            $authPassed = (
                ((isset($discovered_handler_arr['auth']) ? $discovered_handler_arr['auth'] : true)
                    && ApiAuthCheck::checkAuth(
                        $discovered_handler_arr['roles'],
                        (isset($discovered_handler_arr['initialize']) ? $discovered_handler_arr['initialize'] : false),
                        (isset($discovered_handler_arr['whenLocked']) ? $discovered_handler_arr['whenLocked'] : false)
                    )
                ) || !((isset($discovered_handler_arr['auth']) ? $discovered_handler_arr['auth'] : true)));

            if (!isset($discovered_handler_arr['namespace'])) {
                $discovered_handler_arr['controller'] = '\\PHP_REST_API\\Controllers\\' . $discovered_handler_arr['controller'];
            } else {
                $discovered_handler_arr['controller'] = $discovered_handler_arr['namespace'] . $discovered_handler_arr['controller'];
            }
            
            if (class_exists($discovered_handler_arr['controller'])) {
                $handler_instance = new $discovered_handler_arr['controller']($authPassed);
            } else if (is_callable($discovered_handler_arr['controller'])) {
                $handler_instance = $discovered_handler_arr['controller']($authPassed);
            }
        }

        if ($handler_instance) {

            unset($regex_matches[0]);

            if (method_exists($handler_instance, $request_method . '_xhr')) {
                header('Content-type: application/json');
                header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
                header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
                header('Cache-Control: no-store, no-cache, must-revalidate');
                header('Cache-Control: post-check=0, pre-check=0', false);
                header('Pragma: no-cache');
                $request_method .= '_xhr';
            }

            if (method_exists($handler_instance, $request_method)) {
                ApiAuthRouterHook::fire('before_handler', compact('routes', 'discovered_handler', 'request_method', 'regex_matches'));
                $result = call_user_func_array(array($handler_instance, $request_method), $regex_matches);
                ApiAuthRouterHook::fire('after_handler', compact('routes', 'discovered_handler', 'request_method', 'regex_matches', 'result'));
            } else {
                self::run_404($path_info);
            }
        } else {
            self::run_404($path_info);
        }

        ApiAuthRouterHook::fire('after_request', compact('routes', 'discovered_handler', 'request_method', 'regex_matches', 'result'));
    }

    private static function is_xhr_request() {
        return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest') || (array_key_exists('X-Requested-With', getallheaders()));
    }

    private static function run_404($path_info) {
        if (self::is_xhr_request()) {
            ApiAuthRouterHook::fire('404', compact('routes', 'discovered_handler', 'request_method', 'regex_matches'));
        } else {
            if (substr($path_info, 0, 5) === '/api/') {
                ApiAuthRouterHook::fire('404Web', compact('routes', 'discovered_handler', 'request_method', 'regex_matches'));
            } else {
                ApiAuthRouterHook::fire('before_handler', compact('routes', 'discovered_handler', 'request_method', 'regex_matches'));
                $handler_instance = new EasyAppWebSPA(true);
                $result = call_user_func_array(array($handler_instance, "get"), Array());
                ApiAuthRouterHook::fire('after_handler', compact('routes', 'discovered_handler', 'request_method', 'regex_matches', 'result'));
            }
        }
    }
}
