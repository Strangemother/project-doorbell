# Run to ensure setup of apps
sudo chmod +x mcu_mount.sh
./mcu_mount.sh
# create a space
mkdir -p ./backups/
echo "Making backup"
# backup existing
cp /mcu/main.py ./backups/main_$(date +"%Y_%m_%d_%I_%M_%p").py
# copy mcu script to chip
echo "copying new"
cp ./mcu.py /mcu/main.py
#echo "unmounting mcu"
#sudo umount /mcu/
