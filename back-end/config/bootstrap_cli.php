<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @since         3.0.0
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
use App\Application;
use Cake\Core\Plugin;
use Cake\Core\Configure;
use Cake\Core\Exception\MissingPluginException;

/**
 * Additional bootstrapping and configuration for CLI environments should
 * be put here.
 */

// Set the fullBaseUrl to allow URLs to be generated in shell tasks.
// This is useful when sending email from shells.
//Configure::write('App.fullBaseUrl', php_uname('n'));

// Set logs to different files so they don't have permission conflicts.
Configure::write('Log.debug.file', 'cli-debug');
Configure::write('Log.error.file', 'cli-error');

try {
    Application::addPlugin('Bake');
} catch (MissingPluginException $e) {
    // Do not halt if the plugin is missing
}
