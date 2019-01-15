<?php
use Cake\Core\Plugin;
use Cake\Routing\Router;
use Cake\Core\Configure;

Router::defaultRouteClass('Route');

Router::extensions(Configure::read('Extensions'));

// Imposta: 
// - via bash: export APP_WEB_SERVER="apache" oppure ="nginx"
// - oppure nel .conf apache con SetEnv APP_WEB_SERVER apache
// Se hai problemi con la path /api controlla di aver impostato
// - Alias nel .conf di apache
// - La gestione dell'header HTTP_AUTHENTICATION nel webroot/.htaccess

Router::scope('/', function ($routes) {
    $routes->connect('/', ['controller' => 'Pages', 'action' => 'display', 'home']);

    $routes->connect('/getConfig', ['controller' => 'App', 'action' => 'getConfig']);

    $routes->fallbacks('InflectedRoute');
});