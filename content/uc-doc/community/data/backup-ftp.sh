#!/bin/sh

# Definition des variables.
CLIENT="client-defaut"
HOST_FTP="serveur_ftp"
USER_FTP="utilisateur"
PASSWD_FTP="mot_de_passe"
date=$(date '+%d-%m-%Y')
backups="/home/backups"
data="/home/backups/data.tgz"
db="/home/backups/db.tgz"

# affiche la date
echo $date

# Creation du repertoire de backup si ils n'existent pas
if [ ! -d $backups ]
then
echo "le repertoire de sauvegarde n'existe pas"
echo "creation du repertoire $backups"
/bin/mkdir $backups
/bin/chmod 777 $backups
else
echo "le repertoire de sauvegarde existe"
fi

# Compression des fichiers de sauvegarde
echo "debut de la sauvegarde manuelle"
xivo-backup db /home/backups/db
xivo-backup data /home/backups/data
echo "fin de la sauvegarde manuelle"

# Copie du fichier de sauvegarde vers le serveur Cloud
echo "connexion au serveur FTP Cloud"
ftp -n $HOST_FTP <<END_SCRIPT
quote USER $USER_FTP
quote PASS $PASSWD_FTP
mkdir $CLIENT/$date
cd $CLIENT/$date
put $data data.tgz
put $db db.tgz
bye
END_SCRIPT
echo "fin du transfert"
exit 0
