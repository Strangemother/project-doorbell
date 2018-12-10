#!/bin/bash

MNT_PATH=$(findmnt -n -o SOURCE --target /media/pi/PYBFLASH)
MNT_DIR="/mcu/"

mount_source(){
    echo "Mounting $MNT_PATH to $MNT_DIR"
    sudo mkdir -p $MNT_DIR
    sudo mount $MNT_PATH $MNT_DIR
    # Standard user management
    sudo chown -R $(id -u):$(id -g) $MNT_DIR
}

mount_source
ls $MNT_DIR
#sudo umount $MNT_DIR
