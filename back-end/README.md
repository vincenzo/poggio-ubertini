# Gestionale POGGIOUBERTINI

## Locale
Dato che il backend genera stringhe contenenti mese/ giorno in italiano, va configurato il locale sulla macchina

 -> add the locales you want (for example it):
sudo locale-gen it_IT.UTF-8

-> for date formatting use strftime

## Pdf
Per il setup della generazione pdf installare wkhtmltopdf in usr/bin (64bit) e le librerie XLIB
Scarica la lib dal sito (64bit), copia il file bin/wkhtmltopdf in back-end,
(per comodità copiatelo nel TUO COMPUTER in /usr/local/bin, vai in back-end e lanci cp /usr/local/bin/wkhtmltopdf ./) 
entra in ssh sulla macchina e mv back-end/wkhtmltopdf /usr/bin/wkhtmltopdf

Quindi complessivamente:

cd back-end
cp /usr/local/bin/wkhtmltopdf ./
dssh
mv back-end/wkhtmltopdf /usr/bin

sudo apt install libfontconfig1 libxrender1

