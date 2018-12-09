const GPCLK = 'PIN_GPCLK'
//const DPI = 'PIN_DPI'
const JTAG = 'PIN_JTAG'
const PCM = 'PIN_PCM'
const SDIO = 'PIN_SDIO'


var pi3 = {
    width: 2
    , pins: [
        pin(SETUP, 40)
        , pin( POWER3 )
        , pin( POWER5 )
        , pin( GPIO._2 )
        , pin( POWER5)
        , pin( GPIO._3 )
        , pin( GROUND )
        , pin( GPIO._4 )
        , pin( GPIO._14 )
        , pin( GROUND )
        , pin( GPIO._15 )
        , pin( GPIO._17 )
        , pin( GPIO._18 )
        , pin( GPIO._27 )
        , pin( GROUND )
        , pin( GPIO._22 )
        , pin( GPIO._23 )
        , pin( POWER3 )
        , pin( GPIO._24 )
        , pin( GPIO._10 )
        , pin( GROUND )
        , pin( GPIO._9 )
        , pin( GPIO._25 )
        , pin( GPIO._11 )
        , pin( GPIO._8 )
        , pin( GROUND )
        , pin( GPIO._7 )
        , pin( GPIO._0 )
        , pin( GPIO._1 )
        , pin( GPIO._5 )
        , pin( GROUND )
        , pin( GPIO._6 )
        , pin( GPIO._12 )
        , pin( GPIO._13 )
        , pin( GROUND )
        , pin( GPIO._19 )
        , pin( GPIO._16 )
        , pin( GPIO._26 )
        , pin( GPIO._20 )
        , pin( GROUND )
        , pin( GPIO._21 )
    ]
    , config: {
        [POWER5]: {
            icon: 'flash_on'
            , label: '5V'
            , desc: "The 5v power pins are connected directly to the Pi's power input and will capably provide the full current of your mains adaptor, less that used by the Pi itself. \n With a decent power supply, such as the official Pi adaptor, you can expect to pull about 1.5A. \n Don't be disuaded by what sounds like a measly low voltage. You can do a lot with 5v. Power Arduinos, and even run a small electroluminescent wire inverter right off the 5v pin!"
            , show: true
        }
        , [POWER3]: {
            icon: 'flash_on'
            , label: '3.3V'
            , desc: "The 3v3 supply pin on the early Raspberry Pi had a maximum available current of about 50 mA. Enough to power a couple of LEDs or a microprocessor, but not much more. \n All Raspberry Pi since the Model B+ can provide quite a bit more, up to 500mA to remain on the safe side, thanks to a switching regulator. \n Still, you should generally use the 5v supply, coupled with a 3v3 regulator for 3.3v projects."
            , show: true
        }
        , [GROUND]:{
            icon:'filter_list'
            , label: 'Ground'
            , desc: "The Ground pins on the Raspberry Pi are all electrically connected, so it doesn't matter which one you use if you're wiring up a voltage supply. \n Generally the one that's most convenient or closest to the rest of your connections is tidier and easier, or alternatively the one closest to the supply pin that you use. \n For example, it's a good idea to use Physical Pin 17 for 3v3 and Physical Pin 25 for ground when using the SPI connections, as these are right next to the important pins for SPI0."
            , show: true
        }
        , [GPIO_PIN]: {
            label: 'BCM'
            , show: true
        }
        , [GPCLK]: {
            label: 'General Purpose CLock'
            , show: true
            , color: '#389497'
            , desc: 'General Purpose Clock pins can be set up to output a fixed frequency without any ongoing software control.'
            , pins: [
                altPin(PIN._7, 'GPCLK0')
                , altPin(PIN._29, 'GPCLK1')
                , altPin(PIN._31, 'GPCLK2')
            ]
        }
        , [JTAG]: {
            label: "Joint Test Action Group"
            , show: false
            , color: '#384697'
            , desc: "JTAG is a standardised interface for debugging integrated circuits which you can use to debug your Raspberry Pi."
            , pins: [
                // JTAG pin    “ALT4” mode “ALT5” mode
                // Alt 4
                , altPin(GPIO._26, 'TDI (Alt4)')
                , altPin(GPIO._24, 'TDO (Alt4)')
                , altPin(GPIO._27, 'TMS (Alt4)')
                , altPin(GPIO._25, 'TCK (Alt4)')
                , altPin(GPIO._23, 'RTCK (Alt4)')
                , altPin(GPIO._22, 'TRST (Alt4)')
                // alt 5
                , altPin(GPIO._4, 'TDI (Alt5)')
                , altPin(GPIO._5, 'TDO (Alt5)')
                , altPin(GPIO._12, 'TMS (Alt5)')
                , altPin(GPIO._13, 'TCK (Alt5)')
                , altPin(GPIO._6, 'RTCK (Alt5)')
                //TRST    N/A (Alt5)
            ]
        }
        , [PCM]: {
            label: "Pulse-code Modulation"
            , show: true
            , color: '#976f38'
            , desc: "PCM (Pulse-code Modulation) is a digital representation of sampled analog. On the Raspberry Pi it's a form of digital audio output which can be understood by a DAC for high quality sound."
            , pins: [
                altPin(GPIO._18, 'CLK')
                , altPin(GPIO._19, 'FS')
                , altPin(GPIO._20, 'DIN')
                , altPin(GPIO._21, 'DOUT')
            ]
        }
        , [SDIO]: {
            label:"SD Card Interface"
            , show: true
            , color: '#8bc34a'
            , desc: 'SDIO is the SD host/eMMC interface on the Raspberry Pi. SD host signals are normally used for the microSD slot.\nThese pins are "SD host" on Alt0 and "eMMC" on Alt3.'
             , pins: [
                altPin(GPIO._16, 'CMD')
                , altPin(GPIO._18, 'DAT0')
                , altPin(GPIO._22, 'CLK')
                , altPin(GPIO._25, 'DAT1')
                , altPin(GPIO._26, 'DAT2')
                , altPin(GPIO._27, 'DAT3')
            ]
        }
        , "I2C": {
            label: "Inter Integrated Circuit"
            , color: '#53c27d'
            , desc: "I2C pins in BCM mode are: 2, 3\nI2C pins in WiringPi are: 8, 9\nThe Raspberry Pi's I2C pins are an extremely useful way to talk to many different types of external peripheral; from the MCP23017 digital IO expander, to a connected ATmega. \nThe I2C pins include a fixed 1.8 kohms pull-up resistor to 3.3v. This means they are not suitable for use as general purpose IO where a pull-up is not required."
            , show: false
            , pins: [
                altPin(GPIO._2, 'Data')
                , altPin(GPIO._3, 'Clock')
                , altPin(GPIO._0, 'EEPROM data')
                , altPin(GPIO._1, 'EEPROM Clock')
            ]
        }

        , "SPI": {
            label: "Serial Peripheral Interface"
            , show: true
            , color: '#be3636'
            , desc: `SPI0 pins in BCM mode are: 9, 10, 11 + 7/8
                SPI0 pins in WiringPi are: 12, 13, 14 + 10/11
                Known as the four-wire serial bus, SPI lets you daisy-chain multiple compatible devices off a single set of pins by assigning them different chip-select pins.
                A useful example of an SPI peripheral is the MCP23S17 digital IO expander chip ( Note the S in place of the 0 found on the I2C version ). You can also use the SPI port to "Bit-Bang" an ATmega 328, loading Arduino sketches onto it with Gordon Hendersons' modified version of AVRDude.
                To talk to an SPI device, you assert its corresponding chip-select pin. By default the Pi has CE0 and CE1.`
            , pins: [
                altPin(GPIO._17, 'SPI1 CE1')
                , altPin(GPIO._12, 'SPI1 CE0')
                , altPin(GPIO._10, 'SPI0 MOSI')
                , altPin(GPIO._9, 'SPI0 MISO')
                , altPin(GPIO._11, 'SPI0 SCLK')
                , altPin(GPIO._8, 'SPI0 CE0')
                , altPin(GPIO._7, 'SPI0 CE1')
                , altPin(GPIO._19, 'SPI1 MISO')
                , altPin(GPIO._16, 'SPI1 CE2')
                , altPin(GPIO._20, 'SPI1 MOSI')
                , altPin(GPIO._21, 'SPI1 SCLK')
            ]
        }
        , "UART":{
            label: "Universal Asynchronous Receiver/Transmitter"
            , show: false
            , color: '#8d4797'
            , desc: `UART pins in BCM mode are: 14, 15
                UART pins in WiringPi are: 15, 16
                UART is an asynchronous serial communication protocol, meaning that it takes bytes of data and transmits the individual bits in a sequential fashion.
                Asynchronous transmission allows data to be transmitted without the sender having to send a clock signal to the receiver. Instead, the sender and receiver agree on timing parameters in advance and special bits called 'start bits' are added to each word and used to synchronize the sending and receiving units.
                UART is commonly used on the Pi as a convenient way to control it over the GPIO, or access the kernel boot messages from the serial console (enabled by default).
                It can also be used as a way to interface an Arduino, bootloaded ATmega, ESP8266, etc with your Pi. Be careful with logic-levels between the devices though, for example the Pi is 3.3v and the Arduino is 5v. Connect the two and you might conjure up some magic blue smoke.
                `
            , pins: [
                altPin(GPIO._14, 'TXD / Transmit')
                , altPin(GPIO._15, 'RXD / Receive')
            ]
        }
        , "WiringPi": {
            label: 'WiringPi'
            , color: '#524797'
            , show: false
            , desc: `WiringPi is an attempt to bring Arduino-wiring-like simplicity to the Raspberry Pi.
                The goal is to have a single common platform and set of functions for accessing the Raspberry Pi GPIO across multiple languages. WiringPi is a C library at heart, but it's available to both Ruby and Python users who can "gem install wiringpi" or "pip install wiringpi2" respectively.
                Python users note the 2 on the end, the WiringPi2-Python library finally brings a whole host of existing WiringPi functionality to Python including brand new features from WiringPi 2.
                WiringPi uses its own pin numbering scheme, here you'll learn how WiringPi numbers your GPIO pins, what those pins do and how to do shiny things with them from within Python or Ruby.`
            , pins: [
                altPin(GPIO._2, WPI._8)
                , altPin(GPIO._3, WPI._9)
                , altPin(GPIO._4, WPI._7)
                , altPin(GPIO._14, WPI._15)
                , altPin(GPIO._15, WPI._16)
                , altPin(GPIO._17, WPI._0)
                , altPin(GPIO._18, WPI._1)
                , altPin(GPIO._27, WPI._2)
                , altPin(GPIO._22, WPI._3)
                , altPin(GPIO._23, WPI._4)
                , altPin(GPIO._24, WPI._5)
                , altPin(GPIO._10, WPI._12)
                , altPin(GPIO._9, WPI._12)
                , altPin(GPIO._11, WPI._14)
                , altPin(GPIO._25, WPI._6)
                , altPin(GPIO._8, WPI._10)
                , altPin(GPIO._7, WPI._11)
                , altPin(GPIO._1, WPI._31)
                , altPin(GPIO._0, WPI._30)
                , altPin(GPIO._5, WPI._21)
                , altPin(GPIO._6, WPI._22)
                , altPin(GPIO._13, WPI._23)
                , altPin(GPIO._19, WPI._24)
                , altPin(GPIO._26, WPI._25)
                , altPin(GPIO._12, WPI._26)
                , altPin(GPIO._16, WPI._27)
                , altPin(GPIO._20, WPI._28)
                , altPin(GPIO._21, WPI._29)
            ]
        }

        , 'DPI': {
            label: 'Display Parallel Interface'
            , show: false
            , color: '#808080'
            , desc: "One of the alternate functions selectable on bank 0 of the Raspbery Pi GPIO is DPI. DPI (Display Parallel Interface) is a 24-bit parallel interface with 28 clock and synchronisation signals. \n This interface allows parallel RGB displays to be attached to the Raspberry Pi GPIO either in RGB24 (8 bits for red, green and blue) or RGB666 (6 bits per colour) or RGB565 (5 bits red, 6 green, and 5 blue). It is available as alternate function 2 (ALT2) on GPIO bank 0. \n The pinout presented here is for the RGB24 mode, see url below for documentation of the RGB666 and RGB565 modes."
            , pins: [
                altPin(GPIO._0, 'PCLK')
                , altPin(GPIO._1, 'DE')
                , altPin(GPIO._2, 'LCD_YSYNC')
                , altPin(GPIO._3, 'LCD_HSYNC')
                , altPin(GPIO._4, DPI._0)
                , altPin(GPIO._5, DPI._1)
                , altPin(GPIO._6, DPI._2)
                , altPin(GPIO._7, DPI._2)
                , altPin(GPIO._8, DPI._4)
                , altPin(GPIO._9, DPI._5)
                , altPin(GPIO._10, DPI._6)
                , altPin(GPIO._11, DPI._7)
                , altPin(GPIO._12, DPI._8)
                , altPin(GPIO._13, DPI._9)
                , altPin(GPIO._14, DPI._10)
                , altPin(GPIO._15, DPI._11)
                , altPin(GPIO._16, DPI._12)
                , altPin(GPIO._17, DPI._13)
                , altPin(GPIO._18, DPI._14)
                , altPin(GPIO._19, DPI._15)
                , altPin(GPIO._20, DPI._16)
                , altPin(GPIO._21, DPI._17)
                , altPin(GPIO._22, DPI._18)
                , altPin(GPIO._23, DPI._19)
                , altPin(GPIO._24, DPI._20)
                , altPin(GPIO._25, DPI._21)
                , altPin(GPIO._26, DPI._22)
                , altPin(GPIO._27, DPI._23)
            ]
        }
    }
}
