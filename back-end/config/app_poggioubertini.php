<?php

return [

    'Lookup' => [
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
      ],
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
      'Guests' => [
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
