import RPi.GPIO as GPIO
import time
import atexit

#GPIO.setmode(GPIO.BOARD)
GPIO.setmode(GPIO.BCM)
atexit.register(lambda: GPIO.cleanup())

class Color:
    red = 1, 0, 0
    green = 0, 1, 0
    blue = 0, 0, 1

def main():
    r = 11
    g = 18
    b = 25
    return setup_smd(r, g, b)


def setup_smd(r,g,b):
    val = 1
    freq = 50
    led = RGB(r,g,b, val, freq)
    return led

from time import sleep
class RGB(object):

    def __init__(self, pin_r=None, pin_g=None, pin_b=None, value=1, freq=100):

        self._r = None
        self._g = None
        self._b = None
        self._r_val = 0
        self._g_val = 0
        self._b_val = 0
        self._all = 0
        self._freq = 100
        self._max = 50

        self.setup(pin_r,pin_g,pin_b)
        self.start(value)

    def setup(self, pr, pg, pb):
        red = pr
        green = pg
        blue = pb
        freq = self.freq
        GPIO.setup(red, GPIO.OUT)
        GPIO.setup(green, GPIO.OUT)
        GPIO.setup(blue, GPIO.OUT)

        self._r = GPIO.PWM(red, freq)
        self._g = GPIO.PWM(green, freq)
        self._b = GPIO.PWM(blue, freq)

        #GPIO.output(red, True)
        #GPIO.output(green, True)
        #GPIO.output(blue, True)

    def start(self, r=.1, g=None, b=None):
        r = r or .1
        g = g or r
        b = b or g or r

        self._r.start(0)
        self._g.start(0)
        self._b.start(0)

        self.r = r
        self.g = g
        self.b = b

    def set(self, rgb):
        self.r, self.g, self.b = rgb

    def all_setter(self, v):
        self.r = v
        self.g = v
        self.b = v
        self._all =v

    def all_getter(self):
        return self._all

    value = property(all_getter, all_setter)

    def freq_setter(self, v):
        self._freq = v
        self._r.ChangeFrequency(v)
        self._g.ChangeFrequency(v)
        self._b.ChangeFrequency(v)

    def freq_getter(self):
        return self._freq

    freq = property(freq_getter, freq_setter)

    @property
    def r_value(self):
        return self._r_val

    @property
    def g_value(self):
        return self._g_val

    @property
    def b_value(self):
        return self._b_val

    @r_value.setter
    def r(self, v):
        self._r_val = (self._max / 100) * v
        return self._r.ChangeDutyCycle(v)


    @g_value.setter
    def g(self, v):
        self._g_val = (self._max / 100) * v
        return self._g.ChangeDutyCycle(v)


    @b_value.setter
    def b(self, v):
        self._b_val = (self._max / 100) * v
        return self._b.ChangeDutyCycle(v)


if __name__ == '__main__':
    led = main()
