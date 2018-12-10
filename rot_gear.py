# https://maker.pro/raspberry-pi/tutorial/how-to-control-a-dc-motor-with-an-l298-controller-and-raspberry-pi
# https://www.sunfounder.com/learn/Super_Kit_V2_for_RaspberryPi/lesson-8-rotary-encoder-super-kit-for-raspberrypi.html
print('Booting...')
from RPi import GPIO
from time import sleep
import time


GPIO.setmode(GPIO.BCM)

clk = 23
dt = 22
switchPin = 24
hall = 10
stop = False
# Output pin declaration for the Buzzer.
buzzer_pin = 9


print('Installing voice')
import melody
GPIO.setup(buzzer_pin, GPIO.OUT, initial=GPIO.LOW)

def announce():
    melody.chat.query

def announce_start():
    melody.chat.discovery

def announce_found():
    melody.chat.find

def announce_pause():
    melody.chat.okay

def announce_play():
    melody.chat.okay


def announce_close():
    melody.no()


def announce_booting():
    melody.chat.busy

def announce_lib():
    melody.chat.counting

def play_beep():
    # Main program loop
    try:
        while 1:
           # print("Buzzer will be on for 4 seconds")
            GPIO.output(buzzer_pin,GPIO.HIGH) #Buzzer will be switched on
            #time.sleep(sl) #Waitmode for 4 seconds
            #print("Buzzer wil be off for 4 seconds")
            GPIO.output(buzzer_pin,GPIO.LOW) #Buzzer will be switched off
            time.sleep(.002) #Waitmode for another 2 seconds in which the buzzer will be off

    # Scavenging work after the end of the program
    except KeyboardInterrupt:
        print('Stop Beeping. ')


class DoorLock():

    def __init__(self):
        melody.thread_play(announce_booting)
        self.stop = False
        self.setup_pins()
        self.start_motor()
        self.loop()

    def start_motor(self):
        # gearbox
        melody.thread_play(announce_lib)
        from gpiozero import PWMOutputDevice
        print('Initializing device')
        self.e1 = PWMOutputDevice(27, True, 0, 1000)
        self.e2 = PWMOutputDevice(17, True, 0, 1000)
        print('running...')
        melody.thread_play(announce_found)
        sleep(1)
        self.e1.value = .3


    def setup_pins(self):
        # rotary encoder
        GPIO.setup(clk, GPIO.IN, pull_up_down=GPIO.PUD_UP)
        GPIO.setup(dt, GPIO.IN, pull_up_down=GPIO.PUD_UP)
        GPIO.setup(hall, GPIO.IN)

        GPIO.setup(switchPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

        GPIO.add_event_detect(switchPin, GPIO.FALLING, callback=self._switchCallback, bouncetime=300)
        GPIO.add_event_detect(hall, GPIO.FALLING, callback=self._hallCallback, bouncetime=300)

    def _switchCallback(self, pin):
        print('switched', pin, self, self.stop)
        self.stop = not self.stop

    def _hallCallback(self, pin):
        print('hall', pin, self.stop)
        melody.thread_play(announce_found)

    def perform_stop(self):
        print('Stop')
        melody.thread_play(announce_pause)
        self.e1.value = 0
        self.e2.value = 0

    def perform_play(self):
        melody.thread_play(announce_play)

    def loop(self):
        counter = 0
        add_val = .5

        print('Waiting...')
        announce_start()
        self.stop = False
        clkLastState = GPIO.input(clk)
        last_stop = False
        try:
            while 1:
                clkState = GPIO.input(clk)
                if self.stop is True:
                    if last_stop != self.stop:
                        print('Hit halt...')
                        last_stop = self.stop
                        if self.stop:
                            self.perform_stop()
                        else:
                            self.perform_play()
                    continue

                if clkState != clkLastState:
                    dtState = GPIO.input(dt)
                    if dtState != clkState:
                        counter += add_val
                    else:
                        counter -= add_val

                    if abs(counter) >= 10:
                        counter = 10 if counter > 0 else -10
                    speed = counter * .1

                    print(speed, clkState, dtState, self.stop)
                    #self.e1.value = 0 if speed < 0 else abs(speed)
                    if self.stop:
                        self.e1.value = 0
                        self.e2.value = 0
                    else:
                        self.e1.value = 0 if speed < 0 else abs(speed)
                        self.e2.value = 0 if speed > 0 else abs(speed)

                clkLastState = clkState
                sleep(0.01)
        except KeyboardInterrupt as (e):
            announce_close()

        #GPIO.cleanup()

def main():
    melody.thread_play(announce)
    print('Starting system')
    lock = DoorLock()

if __name__ == '__main__':
    main()
