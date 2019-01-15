<?php
namespace Deployer;
require_once 'recipe/common.php';

$config = [
    'server_name' => '188.166.192.218',
    'deploy_path' => '/var/www/html/poggioubertini/back-end',
    'git_repo'    => 'git@bitbucket.org:entheosweb/poggioubertini.git',
];

/**
 *  Setup SSH Key
 *
 *  cat ~/.ssh/id_rsa.pub | ssh entheos@dominio.it -p 22 "mkdir -p ~/.ssh && cat >>  ~/.ssh/authorized_keys"
 *   
 *  Se ci sono ancora problemi con i file temporanei lancia
 *  cd releases/shared
 *  sudo chmod 775 -R tmp/
 *  sudo chown -R entheos:www-data *
 *
 *  Main task
 *  NB: Ogni comando cake che fa uso del file config deve essere preceduto da APP_ENV={{app_env}}
 */

host('prod')
    ->hostname($config['server_name'])
    ->user('entheos')
    ->set('deploy_path', $config['deploy_path'])
    ->set('app_env', 'prod')
    ->stage('production');

set('repository', $config['git_repo']);
set('copy_dirs', ['vendor']);
set('clear_paths', [ // FIXME
    'apache2-foreground',
    'apache-config.conf',
    'cakephp.dockerfile',
    'deploy.php',
    'docker-compose.yml',
    'run-unit-test.sh',
]);
set('shared_dirs', [
    'logs',
    'tmp',
]);

/**
 * Elimina la cartella di frontend
 */
task('deploy:move_folders', function () {
    $releases = get('releases_list');
    $release_path = "{{deploy_path}}/releases/{$releases[0]}";

    run("mv $release_path/back-end/* $release_path/");
    run("rm -r $release_path/back-end");
    run("rm -r $release_path/front-end");

})->desc('Moving backend folder and deleting frontend');

/**
 * Run migrations
 */
task('deploy:run_migrations', function () {
    run('APP_ENV={{app_env}} {{release_path}}/bin/cake migrations migrate');
    run('APP_ENV={{app_env}} {{release_path}}/bin/cake orm_cache clear');
    run('APP_ENV={{app_env}} {{release_path}}/bin/cake orm_cache build');
})->desc('Run migrations');

/**
 * Crea symlinks per cartelle condivise
 */
task('deploy:symlink_uploads', function () {
    run("ln -sfn {{deploy_path}}/shared/uploads {{release_path}}/webroot/uploads_dir");
})->desc('Symlink uploads');


task('deploy:permissions', function () {
    cd('{{release_path}}');
    run("composer dumpautoload -o");
    run("sudo chown -R entheos:www-data {{deploy_path}}/releases");
    run("sudo chown -R entheos:www-data {{deploy_path}}/shared/tmp");
    run("sudo chown -R entheos:www-data {{deploy_path}}/shared/uploads");
    run("sudo chmod -R 775 {{deploy_path}}/shared/logs"); // rende scrivibili logs e tmp
    run("sudo chmod -R 775 {{deploy_path}}/shared/tmp");
    run("sudo chmod -R 775 {{deploy_path}}/shared/uploads");
    // run("sudo chmod -R 775 {{deploy_path}}/shared/bk");
})->desc('Permissions');


task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:release',
    'deploy:update_code',
    'deploy:move_folders',
    'deploy:shared',
    'deploy:copy_dirs',
    'deploy:vendors',
    'deploy:run_migrations',
    'deploy:symlink',
    'deploy:symlink_uploads',
    'deploy:permissions',
    'cleanup'
])->desc('Deploy your project');

after('deploy', 'success');