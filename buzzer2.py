import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

# Output pin declaration for the Buzzer.
Buzzer_PIN = 9
GPIO.setup(Buzzer_PIN, GPIO.OUT, initial=GPIO.LOW)
# Main program loop
try:
    while 1:
       # print("Buzzer will be on for 4 seconds")
        GPIO.output(Buzzer_PIN,GPIO.HIGH) #Buzzer will be switched on
        #time.sleep(sl) #Waitmode for 4 seconds
        #print("Buzzer wil be off for 4 seconds")
        GPIO.output(Buzzer_PIN,GPIO.LOW) #Buzzer will be switched off
        time.sleep(.002) #Waitmode for another 2 seconds in which the buzzer will be off

# Scavenging work after the end of the program
except KeyboardInterrupt:
    GPIO.cleanup()
