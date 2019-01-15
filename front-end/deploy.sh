## Script deploy frontend EntheosWeb ##
# 
# Comprime la cartella ./dist, la copia su server, decomprime e sostituisce i files, poi ripulisce tutto
# USER_AT_SERVER è quello che scriveresti per connetterti con ssh normalmente
# SERVER_FOLDER è quella che contiene le cartelle back-end e front-end
#
# 1) Assicurati che la tua public key sia sul server remoto
# cat ~/.ssh/id_rsa.pub | ssh user@123.45.56.78 "mkdir -p ~/.ssh && cat >>  ~/.ssh/authorized_keys"
# 
# 2) Fammi diventare eseguibile con
# chmod +x deploy.sh
# 
# 3) e lanciami con
# ./deploy.sh

USER_AT_SERVER=entheos@188.166.192.218
SERVER_FOLDER=/var/www/html/poggioubertini

echo "Compressing..."
tar -zcf build.tar.gz dist ||  { echo 'Deploy failed' ; exit 1; }

echo "Moving to server..."
scp build.tar.gz $USER_AT_SERVER:$SERVER_FOLDER/build.tar.gz ||  { echo 'Deploy failed' ; exit 1; }

echo "Decompressing and moving..."
ssh $USER_AT_SERVER "cd $SERVER_FOLDER/ && mkdir -p tmp && tar -zxf build.tar.gz -C tmp && rm -rf front-end/* && mv tmp/dist/* front-end && rm -rf tmp && rm build.tar.gz"

echo "Cleaning..."
rm build.tar.gz

echo "Done!"

