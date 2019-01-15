<?php
namespace App\Controller\Component;

use Cake\Controller\Component;

class PdfComponent extends Component
{
    /**
     * Default configuration.
     *
     * @var array
     */
    protected $_defaultConfig = [

    ];

    /**
     * The controller.
     *
     * @var \Cake\Controller\Controller
     */
    private $Controller = null;

    /**
     * setController
     *
     * Setter for the Controller property.
     *
     * @param \Cake\Controller\Controller $controller Controller.
     * @return void
     */
    public function setController($controller)
    {
        $this->Controller = $controller;
    }

    /**
     * startup
     *
     * Startup callback for Components.
     *
     * @param \Cake\Event\Event $event Event.
     * @return void
     */
    public function startup($event)
    {
        $this->setController($event->getSubject());
    }

    /**
     * Initialize
     *
     * @param array $config Options.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);
    }

    public function loadLib($options = [], $companyId = 1)
    {
        \Cake\Core\Configure::write('CakePdf', \Cake\Utility\Hash::merge([
            'engine' => [
                'className' => 'CakePdf.WkHtmlToPdf',
                'binary' => '/usr/bin/wkhtmltopdf',
                'options' => [
                    'footer-html' => \Cake\Routing\Router::fullBaseUrl().'/api/companies/pdfFooter/'.$companyId.'.html',
                ],
            ],
            'margin' => [
                'bottom' => 15,
                'left' => 15,
                'right' => 15,
                'top' => 15
            ],
            'download' => false
        ], $options));
    }

}
