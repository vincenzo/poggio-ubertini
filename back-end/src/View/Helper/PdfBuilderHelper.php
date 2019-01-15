<?php

namespace App\View\Helper;

use Cake\View\Helper;

class PdfBuilderHelper extends Helper
{

    public function __construct(\Cake\View\View $View, array $config = [])
    {
        parent::__construct($View, $config);
    }

    public $helpers = [
        'Html'
    ];

    protected $_defaultConfig = [
    ];

    public function wrapCol($class, $content)
    {
        return "<div class='$class'>$content</div>";
    }

    public function getLogo()
    {
        return '
<div class="logo">
    <img src ="'.WWW_ROOT.'/companies/1/logo.png">
</div>';
    }

    public function getTitoloConLogo($t)
    {
        return '
<h1 class="titolo-logo"><span>'.$t.'</span><img src ="'.WWW_ROOT.'/img/logo.png"></h1>
        ';
    }

    public function getSpace($height)
    {
        return "<div style='height: ".$height."px'></div>";
    }

    public function getIntestazioniDocumento($a, $b)
    {
        return '
<div class="row">
    <div class="col-xs-6">'.join('<br>', $a).'</div>
    <div class="col-xs-6">'.join('<br>', $b).'</div>
</div>';
    }

    public function getDoveQuando($d = 'Firenze')
    {
        return '
<div>
    '.$d.', '.date('d/m/Y').'
</div>
        ';
    }

    public function getDlCol($dt, $dd, $colClass = '')
    {
        return "
<div class='$colClass'>
    <dt>$dt</dt>
    <dd>$dd</dd>
</div>";
    }

}
