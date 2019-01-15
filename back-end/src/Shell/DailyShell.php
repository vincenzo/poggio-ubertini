<?php
namespace App\Shell;

use Cake\Console\Shell;
use Cake\ORM\TableRegistry;

class DailyShell extends Shell
{

	public function main()
	{
		$this->Items = TableRegistry::get('Items');
		$this->processaScadenze();
	}

	public function processaScadenze() 
	{
		return $this->Items->EmployeesCerts->updateAll(
			['is_scaduto' => true],
			['scadenza IS NOT' => null, 'scadenza <' => (new \Datetime)->format('Y-m-d'), 'is_scaduto' => false]
		);
	}
}