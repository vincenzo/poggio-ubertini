<?php
namespace App\Shell;

use Cake\Console\Shell;
use Cake\ORM\TableRegistry;

class TestShell extends Shell
{

	public function main()
	{
		$this->Camps = TableRegistry::get('Camps');
		$r = $this->Camps->get(1);
		$this->Camps->generaConsuntivo($r);
	}
}