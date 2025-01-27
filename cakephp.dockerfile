FROM ubuntu:18.04

# Install base packages.
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get -yq install \
        curl \
        locales \
        apache2 \
        php \
        libapache2-mod-php \
        php-mysql \
        php7.2-mbstring \
        php7.2-intl \
        php7.2-xml \
        php-sqlite3 \
        libxrender1 \
        libfontconfig1 \
        fontconfig xfonts-75dpi xfonts-base \
        php-imagick \
        git \
        zip \
        php-zip \
        unzip && \
    rm -rf /var/lib/apt/lists/* && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the timezone.
RUN echo "Europe/Rome" | tee /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata

# Set environment variable APP_WEB_SERVER for using apache.
ENV APP_WEB_SERVER=apache

# Delete default apache index.html file.
RUN rm /var/www/html/index.html

# Put custom .htaccess in the root.
COPY ./.htaccess /var/www/html

# Update the default apache site with the config we created.
ADD apache-config.conf /etc/apache2/sites-available/000-default.conf

# Installa wkhtmltopdf
ADD https://downloads.wkhtmltopdf.org/0.12/0.12.5/wkhtmltox_0.12.5-1.bionic_amd64.deb ./
RUN dpkg -i wkhtmltox_0.12.5-1.bionic_amd64.deb
RUN apt install -f 

# Genera locale IT
RUN locale-gen it_IT.UTF-8

# Enable apache mods.
RUN a2enmod rewrite
RUN a2enmod headers

# Adds proper permission to www-data user
RUN usermod -u 1000 www-data

COPY apache2-foreground /usr/local/bin/
RUN chmod +x /usr/local/bin/apache2-foreground

WORKDIR /var/www/html

CMD ["/usr/local/bin/apache2-foreground"]