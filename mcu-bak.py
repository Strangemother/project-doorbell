import pyb

from pyb import Pin, Timer, ExtInt

# LED brightness
p = Pin('X1') # X1 has TIM2, CH1
tim = Timer(2, freq=1000)
ch = tim.channel(1, Timer.PWM, pin=p)
ch.pulse_width_percent(5)

from pyb import Pin, ADC

adc = ADC(Pin('X19'))

pi_reset = Pin('X4', pyb.Pin.OUT_PP)
from pyb import Pin, ExtInt
callback = lambda e: print("intr")
ext = ExtInt(Pin('X2'), ExtInt.IRQ_RISING, Pin.PULL_UP, callback)


# internel led
led = pyb.LED(1)
while True:
    val = adc.read() # read value, 0-4095
    print(val)
    if val> 2:
        led.on()
    else:
        led.off()

        # Button iinterppt
    pyb.delay(400)

# internel led
led = pyb.LED(1)
while True:
    val = adc.read() # read value, 0-4095
    print(val)
    if val> 2:
        led.on()
    else:
        led.off()

        # Button iinterppt
    pyb.delay(400)

