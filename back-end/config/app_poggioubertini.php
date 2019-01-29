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
