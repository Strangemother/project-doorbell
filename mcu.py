
from pyb import Pin, Timer, ExtInt

# LED brightness
p = Pin('X1') # X1 has TIM2, CH1
tim = Timer(2, freq=1000)
ch = tim.channel(1, Timer.PWM, pin=p)
ch.pulse_width_percent(5)

from pyb import Pin, ADC

# button press.
adc = ADC(Pin('X19'))
led = pyb.LED(1)
led2 = pyb.LED(2)

# pi input reset pin
pi_reset = Pin('X4', pyb.Pin.OUT_PP)
pi_reset.high()

def push_button_press(e):
    led2.toggle()
    pi_reset.low()
    pyb.delay(1)
    pi_reset.high()
    led2.toggle()

ext = ExtInt(Pin('X2'), ExtInt.IRQ_RISING, Pin.PULL_UP, push_button_press)


# internel led
import pyb
while True:
    led.toggle()
    pyb.delay(1000)
