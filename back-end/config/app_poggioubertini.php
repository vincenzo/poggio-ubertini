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
          'ELS' => 'ENEL segreteria',
          'ELP' => 'ENEL parco',
          'ELL' => 'ENEL locali',
          'GAS' => 'GAS',
        ]
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
      'Reservations' => [
        'trimestri' => [
          'tri1' => '1° trimestre',
          'tri2' => '2° trimestre',
          'tri3' => '3° trimestre',
          'tri4' => '4° trimestre',
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
