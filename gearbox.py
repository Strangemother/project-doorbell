print('Booting...')
from gpiozero import PWMOutputDevice
from time import sleep

print('Initializing device')
e1 = PWMOutputDevice(27, True, 0, 1000)
e2 = PWMOutputDevice(17, True, 0, 1000)

print('running...')
sleep(1)
e1.value = .3
sleep(2)
e1.value = .6
sleep(2)
e1.value = .9
sleep(1)
print('Reverse')
e1.value = 0
sleep(.2)
e2.value = .4
sleep(1)
e2.value = .8
sleep(1)
e2.value = 0
print('Done')

