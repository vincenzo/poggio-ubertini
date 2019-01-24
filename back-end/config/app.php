<?php
// Definire env.php solo in ambiente dev, e tenerlo sotto gitignore
if(file_exists(stream_resolve_include_path('env.php')))  include ('env.php');
if(!defined('APP_ENV'))     define('APP_ENV', 'prod');

define('UPLOADS_DIR', 'uploads_dir');
define('PREVIEWS_DIR', 'Previews');

// DB locale
$db = [
    'className' => 'Cake\Database\Connection',
    'driver' => 'Cake\Database\Driver\Mysql',
    'persistent' => true,
    'host' => '192.168.99.100',
    'port' => '3110',
    'username' => 'root',
    'password' => 'secret',
    'database' => 'xpoggioubertini',
    'encoding' => 'utf8',
    'timezone' => 'Europe/Rome', // Lanciare prima ->  mysql_tzinfo_to_sql /usr/share/zoneinfo | mysql -u root mysql -p
    'cacheMetadata' => true,
    'quoteIdentifiers' => false,
    // 'log' => true,
];

$fullBaseUrl = 'http://192.168.99.100:8110/';
$testDB = $db; $testDB['database'] = 'test';
$error = E_ALL & ~E_DEPRECATED; // Mostra warning di deprecazione

// DB prod - aggiorno solo i valori che cambiano rispetto alla config dev
if(APP_ENV != 'dev')
{
    $db['persistent'] = false;
    $db['host'] = 'localhost';
    $db['database'] = 'xpoggioubertini';
    $db['username'] = 'poggioubertini-usr';
    $db['password'] = 'fixme';

    $fullBaseUrl = 'https://poggioubertini.entheosweb.it/';
    $error = E_ALL ^ E_USER_DEPRECATED; // Nasconde warning di deprecazione
}

ini_set('intl.default_locale', 'it_IT');

return [

    'debug' => APP_ENV == 'dev',

    'App' => [
        'namespace' => 'App',
        'encoding' => 'UTF-8',
        'base' => false,
        'dir' => 'src',
        'webroot' => 'webroot',
        'wwwRoot' => WWW_ROOT,
        // 'baseUrl' => env('SCRIPT_NAME'),
        'fullBaseUrl' => $fullBaseUrl,
        'imageBaseUrl' => 'img/',
        'cssBaseUrl' => 'css/',
        'jsBaseUrl' => 'js/',
        'paths' => [
            'plugins' => [ROOT . DS . 'plugins' . DS],
            'templates' => [APP . 'Template' . DS],
            'locales' => [APP . 'Locale' . DS],
        ],
    ],

    'Security' => [
        'salt' => '374d4de214d0c55cc4d6bfbe55017bb6375d2b9ab587fe53003f617a4721e5a138',
    ],

    'Asset' => [
        // 'timestamp' => true,
    ],

    'Extensions' => ['png', 'jpg', 'jpeg', 'pdf', 'zip', 'rar', 'html', 'htm'],

    'Cache' => [
        'default' => [
            'className' => 'File',
            'path' => CACHE,
        ],

        /**
         * Configure the cache used for general framework caching. Path information,
         * object listings, and translation cache files are stored with this
         * configuration.
         */
        '_cake_core_' => [
            'className' => 'File',
            'prefix' => 'cake_core_',
            'path' => CACHE . 'persistent/',
            'serialize' => true,
            'duration' => '+20 minutes',
        ],

        /**
         * Configure the cache for model and datasource caches. This cache
         * configuration is used to store schema descriptions, and table listings
         * in connections.
         */
        '_cake_model_' => [
            'className' => 'File',
            'prefix' => 'cake_model_',
            'path' => CACHE . 'models/',
            'serialize' => true,
            'duration' => '+20 minutes',
        ],
    ],

    'Error' => [
        'errorLevel' => $error, 
        'exceptionRenderer' => 'Entheos\Utils\Error\ApiExceptionRenderer',
        'skipLog' => [
            \Cake\Http\Exception\NotFoundException::class,
            \Cake\Http\Exception\MissingRouteException::class,
            \Cake\Http\Exception\MissingControllerException::class,
            \Cake\Http\Exception\UnauthorizedException::class,
            \Entheos\Utils\Exception\WarningException::class,
        ],
        'log' => true,
        'trace' => true,
    ],

    'EmailTransport' => [
        'default' => [
            'className' => 'Mail',
            // The following keys are used in SMTP transports
            'host' => 'localhost',
            'port' => 25,
            'timeout' => 30,
            'username' => 'user',
            'password' => 'secret',
            'client' => null,
            'tls' => null,
        ],
    ],

    'Email' => [
        'default' => [
            'transport' => 'default',
            'from' => 'you@localhost',
            //'charset' => 'utf-8',
            //'headerCharset' => 'utf-8',
        ],
    ],

    'Queue' => [
        'sleeptime' => 10,
        'gcprob' => 10,
        'defaultworkertimeout' => 60,
        'defaultworkerretries' => 4,
        'workermaxruntime' => 590, // 10 minuti - 10 secondi
        'cleanuptimeout' => 2000,
        'exitwhennothingtodo' => false,
        'pidfilepath' => TMP . 'queue' . DS,
        'log' => true,
        'notify' => 'tmp',
    ],

    'Datasources' => [

        'default' => $db,
        'test' => $testDB,
    ],

    'Sentry' => [
        'dsn' => 'https://defa8d02199a485791a291b72660be72@sentry.io/1371909',
    ],

    'Log' => [
        'debug' => [
            'className' => 'Cake\Log\Engine\FileLog',
            'path' => LOGS,
            'file' => 'debug',
            'levels' => ['notice', 'info', 'debug'],
        ],
        'error' => [
            'className' => 'Cake\Log\Engine\FileLog',
            'path' => LOGS,
            'file' => 'error',
            'levels' => ['warning', 'error', 'critical', 'alert', 'emergency'],
        ],
        'scheduled' => [
            'className' => 'Cake\Log\Engine\FileLog',
            'path' => LOGS,
            'file' => 'scheduled',
            'levels' => [],
            'scopes' => ['scheduled'],
        ],
    ],

    'Session' => [
        'defaults' => 'php',
    ],
];
