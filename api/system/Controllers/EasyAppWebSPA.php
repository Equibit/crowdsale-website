<?php
namespace PHP_REST_API\Controllers;

use PHP_REST_API\Helpers\BaseAPIController;

class EasyAppWebSPA extends BaseAPIController {
    function get() {
        echo '<!DOCTYPE html>' .
            '<html>' .
            '<head>' .
                '<meta charset="utf-8">' .
                '<meta http-equiv="X-UA-Compatible" content="IE=edge">' .
                '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, maximum-scale=1.0">' .

                '<title>Coming Soon</title>' .

                '<!--link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" /-->' .
                '<!--link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png"-->' .
                '<!--link rel="manifest" href="/assets/favicons/manifest.json"-->' .
                '<!--link rel="mask-icon" href="/assets/favicons/safari-pinned-tab.svg" color="#5bbad5"-->' .
                '<meta name="theme-color" content="#ffffff">' .

                '<meta property="fb:app_id" content="1188163631300990" />' .
                '<meta property="og:url" content="http://' . _DOMAIN_NAME_ . '/" />' .
                '<meta property="og:type" content="website" />' .
                '<meta property="og:title" content="" />' .
                '<meta property="og:description" content="" />' .
                '<meta property="og:image" content="" />' .

                '<meta name="twitter:card" content="summary_large_image">' .
                '<meta name="twitter:site" content="">' .
                '<meta name="twitter:title" content="">' .
                '<meta name="twitter:description" content="">' .
                '<meta name="twitter:image" content="">' .

                '<script>' .
                    '(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){' .
                    '(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),' .
                    'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)' .
                    '})(window,document,\'script\',\'https://www.google-analytics.com/analytics.js\',\'ga\');' .
                    'ga(\'create\', \'' . _GOOGLE_ANALYTICS_ . '\', \'auto\');' .
                    'ga(\'send\', \'pageview\');' .
                '</script>' .
            '</head>' .
            '<body>' .
               '<script src="/steal.production.js" main="easy-app/index.stache!done-autorender"></script>' .
            '</body>' .
            '</html>';
    }
}