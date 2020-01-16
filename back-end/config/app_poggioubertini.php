<?php

return [

    'Lookup' => [
      'BooleanWithAll' => [
        ['name' => '-- TUTTI --', 'value' => ''],
        ['name' => 'SI', 'value' => '1'],
        ['name' => 'NO', 'value' => '0'],
      ],
      'BooleanWithEmpty' => [
        ['name' => '-', 'value' => ''],
        ['name' => 'SI', 'value' => '1'],
        ['name' => 'NO', 'value' => '0'],
      ],
      'Camps' => [
        'tipo' => [
          'GEN' => 'Generico',
          'MIN'   => 'Con minori',
          'EXT'  => 'Esterni (locali)',
        ],
        'tipo_documento_fiscale' => [
          'FAT' => 'Fattura',
          'RIC' => 'Ricevuta',
        ],
        'contatori' => [
          'ACQ' => 'ACQUA',
          'ACP' => 'ACQUA Pozzo',
          'ELS' => 'ENEL segreteria',
          'ELP' => 'ENEL parco',
          'ELL' => 'ENEL locali',
          'GAS' => 'GAS',
          'GAI' => 'GAS uso interno',
        ],
        'contatori_costo' => [
          'ACQ' => 1, // FIXME
          'ACP' => 1, // FIXME
          'ELS' => 0.3,
          'ELP' => 0.3,
          'ELL' => 0.3,
          'GAS' => 1,
          'GAI' => -1, // FIXME
          'fixed_EL' => 5,
        ]
      ],
      'Invoices' => [
        'ente' => [
          'PRI' => 'Privato',
          'ASC' => 'Associazione culturale',
          'ASR' => 'Associazione religiosa',
          'ENT' => 'Ente',
          'SOC' => 'Società',
          'ALT' => 'Altro',
        ],
      ],
      'Guests' => [
        'nazionalita' => [
          'ITA' => 'Italiano',
          'EST' => 'Estero',
        ],
        'documento_tipo' => [
          'CID' => 'Carta d\'identità',
          'PAS' => 'Passaporto',
          'PAT' => 'Patente di guida',
        ],
        'documento_rilasciato_ente' => [
          'COM' => 'Comune',
          'QUE' => 'Questura',
          'STA' => 'Stato',
        ]
      ],
      'Mesi' => [
        1	=> 'Gennaio',
        2	=> 'Febbraio',
        3	=> 'Marzo',
        4	=> 'Aprile',
        5	=> 'Maggio',
        6	=> 'Giugno',
        7	=> 'Luglio',
        8	=> 'Agosto',
        9	=> 'Settembre',
        10	=> 'Ottobre',
        11	=> 'Novembre',
        12	=> 'Dicembre',
      ],
      'Reservations' => [
        'trimestri' => [
          1 => '1° trimestre',
          2 => '2° trimestre',
          3 => '3° trimestre',
          4 => '4° trimestre',
        ],
      ],
      'Sesso' => [
        'list' => [
          'M' => 'Maschio',
          'F' => 'Femmina',
        ],
      ],
      'VatRates' => [
        'list' => [
            0  => 0,
            4  => 4,
            10 => 10,
            22 => 22,
        ],
        'default' => 22
      ],
      'Users' => [
        'roles' => [
          'admin' => 'admin',
        ],
      ]
    ]


];
