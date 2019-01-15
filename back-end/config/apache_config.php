<VirtualHost *:80>
    RewriteEngine On
    RewriteCond %{SERVER_NAME} =poggioubertini.entheosweb.it
    RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>

<IfModule mod_ssl.c>
<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html/poggioubertini/front-end
    ServerName poggioubertini.entheosweb.it

    Alias /api /var/www/html/poggioubertini/back-end/current/webroot

    <Directory /var/www/html/poggioubertini/>
        Options FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/poggioubertini_error.log
    CustomLog ${APACHE_LOG_DIR}/poggioubertini_access.log combined

    <IfModule mod_dir.c>
        DirectoryIndex index.php index.pl index.cgi index.html index.xhtml index.htm
    </IfModule>

    SSLCertificateFile      /etc/ssl/certs/ssl-cert-snakeoil.pem
    SSLCertificateKeyFile /etc/ssl/private/ssl-cert-snakeoil.key

    # SSLCertificateFile /etc/letsencrypt/live/poggioubertini.entheosweb.it/fullchain.pem
    # SSLCertificateKeyFile /etc/letsencrypt/live/poggioubertini.entheosweb.it/privkey.pem
    # Include /etc/letsencrypt/options-ssl-apache.conf
</VirtualHost>
</IfModule>

<filesMatch "\index.html$">
  FileETag None
  <ifModule mod_headers.c>
     Header unset ETag
     Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
     Header set Pragma "no-cache"
     Header set Expires "Wed, 11 Jan 1984 05:00:00 GMT"
  </ifModule>
</filesMatch>