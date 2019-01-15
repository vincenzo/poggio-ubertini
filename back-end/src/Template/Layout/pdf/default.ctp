<!DOCTYPE html>
<html>
<head>
    <?= $this->Html->charset() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?= $this->Html->css('bootstrap.css', ['fullBase' => true]); ?>
    <?= $this->Html->css('pdf.css', ['fullBase' => true]); ?>
</head>
<body>
    <div class="container clearfix pdf">
        <?= $this->fetch('content') ?>
    </div>
</body>
</html>