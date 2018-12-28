# Door

project name 'retrolock', the door project maintains an active door lock designed to retrofit a standard lock.

The processing unit is broken into two seperate units, for security mostly.

The main unit maintains the general operating sysem, hosting an always-on application to open and close the locking system. It hosts all the input/output for user feedback and area monitoring.

The MCU unit will monitor the main unit upstate, checking through GPIO and UART communication. It mains an ON/OFF soft power for the main unit and lower power-state maangement.

The main unit hardware:

+ multicolor SMD LED
+ passive buzzer
+ soft push-button
+ soft dial and integrated soft button
+ main lock servo
+ secondary passive feedback motor
+ hall switch

The MCU hardware:

+ onboard on LED + 3 coloured LEDS
+ piezio disc
+ LED


## MCU

The MCU monitors the on/off state of the main system by testing an expected GPIO ping. If the GPIO does not ping at a consistent rate, the mcu performs a deeper test through UART

### Connection

Connecting and update the MCU

http://docs.micropython.org/en/v1.9.2/pyboard/pyboard/tutorial/repl.html

1. Plug into USB
2. Find the relative COM[x] within the Device Manager such as COM7.
3. Connect putty or your chosen. SERIAL: COM7 Baud 9600

You'll boot into the REPL of the currently loop. Cancel it with CTRL+C if required.

### Update

Write the scripts to the memory mount. Windows it's a mounted USB drive to the files.

    putty -serial COM7

https://dietpi.com/#gettingstarted
# Pi

get version:
    cat /etc/os-release

+ Speed up boot:
    https://himeshp.blogspot.com/2018/08/fast-boot-with-raspberry-pi.html
https://raw.githubusercontent.com/abock/image-usb-stick/master/image-usb-stick
https://randomnerdtutorials.com/raspberry-pi-zero-usb-keyboard-hid/
https://learn.adafruit.com/turning-your-raspberry-pi-zero-into-a-usb-gadget?view=all#other-modules

remove bloat:
    sudo apt purge libreoffice*
    sudo apt clean
    sudo apt autoremove


Boot script automatically on system start
Add to `/etc/rc.local`

    python /path/to/script.py

turn off on hdmi display.

    vcgencmd display_power 0 # 1

turn off/on sleep current sleep state

    export DISPLAY=:0.0
    xset dpms force on
    xset dpms force off
