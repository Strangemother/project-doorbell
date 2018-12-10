import RPi.GPIO as GPIO
import time

#GPIO.setmode(GPIO.BOARD)
GPIO.setmode(GPIO.BCM)

sig = 37
GPIO.setup(sig, GPIO.OUT)

# 5v
GPIO.setup(2, GPIO.OUT)

c = 261
d = 294
e = 329
f = 349
g = 392
a = 440
b = 493
C = 423
r = 1

p = GPIO.PWM(sig, 100)

def Blink(numTimes, speed):
    for i in range(0,numTimes):
        print "Iteration " + str(i+1)
        GPIO.output(2, True)
        GPIO.output(sig, True)
        time.sleep(speed) ## Wait
        p.start(100)
