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
