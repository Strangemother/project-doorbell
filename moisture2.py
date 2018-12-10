import time
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)


def RCtime(RCpin):
    reading = 0
    GPIO.setup(18, GPIO.OUT)
    GPIO.output(18, GPIO.LOW)
    time.sleep(0.5)
    GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    while GPIO.input(18) == GPIO.LOW:
        reading += 1
        time.sleep(0.01)
        return reading


while 1:
    moisture = RCtime(18)
    print moisture
    time.sleep(1)
