import RPi.GPIO as GPIO
import time
import atexit

#GPIO.setmode(GPIO.BOARD)
GPIO.setmode(GPIO.BCM)
atexit.register(lambda: GPIO.cleanup())

red = 11
GPIO.setup(red, GPIO.OUT)

r = GPIO.PWM(red, 100)
GPIO.output(red, True)
r.start(20)


green = 18
GPIO.setup(green, GPIO.OUT)

g = GPIO.PWM(green, 100)
GPIO.output(green, True)
g.start(50)

blue = 25
GPIO.setup(blue, GPIO.OUT)

b = GPIO.PWM(blue, 100)
GPIO.output(blue, True)
b.start(20)
