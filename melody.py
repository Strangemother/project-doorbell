import RPi.GPIO as GPIO
import time

import atexit
from time import sleep


buzzer_pin = 9

notes = {
    'B0' : 31,
    'C1' : 33, 'CS1' : 35,
    'D1' : 37, 'DS1' : 39,
    'EB1' : 39,
    'E1' : 41,
    'F1' : 44, 'FS1' : 46,
    'G1' : 49, 'GS1' : 52,
    'A1' : 55, 'AS1' : 58,
    'BB1' : 58,
    'B1' : 62,
    'C2' : 65, 'CS2' : 69,
    'D2' : 73, 'DS2' : 78,
    'EB2' : 78,
    'E2' : 82,
    'F2' : 87, 'FS2' : 93,
    'G2' : 98, 'GS2' : 104,
    'A2' : 110, 'AS2' : 117,
    'BB2' : 123,
    'B2' : 123,
    'C3' : 131, 'CS3' : 139,
    'D3' : 147, 'DS3' : 156,
    'EB3' : 156,
    'E3' : 165,
    'F3' : 175, 'FS3' : 185,
    'G3' : 196, 'GS3' : 208,
    'A3' : 220, 'AS3' : 233,
    'BB3' : 233,
    'B3' : 247,
    'C4' : 262, 'CS4' : 277,
    'D4' : 294, 'DS4' : 311,
    'EB4' : 311,
    'E4' : 330,
    'F4' : 349, 'FS4' : 370,
    'G4' : 392, 'GS4' : 415,
    'A4' : 440, 'AS4' : 466,
    'BB4' : 466,
    'B4' : 494,
    'C5' : 523, 'CS5' : 554,
    'D5' : 587, 'DS5' : 622,
    'EB5' : 622,
    'E5' : 659,
    'F5' : 698, 'FS5' : 740,
    'G5' : 784, 'GS5' : 831,
    'A5' : 880, 'AS5' : 932,
    'BB5' : 932,
    'B5' : 988,
    'C6' : 1047, 'CS6' : 1109,
    'D6' : 1175, 'DS6' : 1245,
    'EB6' : 1245,
    'E6' : 1319,
    'F6' : 1397, 'FS6' : 1480,
    'G6' : 1568, 'GS6' : 1661,
    'A6' : 1760, 'AS6' : 1865,
    'BB6' : 1865,
    'B6' : 1976,
    'C7' : 2093, 'CS7' : 2217,
    'D7' : 2349, 'DS7' : 2489,
    'EB7' : 2489,
    'E7' : 2637,
    'F7' : 2794, 'FS7' : 2960,
    'G7' : 3136, 'GS7' : 3322,
    'A7' : 3520, 'AS7' : 3729,
    'BB7' : 3729,
    'B7' : 3951,
    'C8' : 4186, 'CS8' : 4435,
    'D8' : 4699, 'DS8' : 4978
}



melody = [
  notes['E7'], notes['E7'], 0, notes['E7'],
  0, notes['C7'], notes['E7'], 0,
  notes['G7'], 0, 0,  0,
  notes['G6'], 0, 0, 0,

  notes['C7'], 0, 0, notes['G6'],
  0, 0, notes['E6'], 0,
  0, notes['A6'], 0, notes['B6'],
  0, notes['AS6'], notes['A6'], 0,

  notes['G6'], notes['E7'], notes['G7'],
  notes['A7'], 0, notes['F7'], notes['G7'],
  0, notes['E7'], 0, notes['C7'],
  notes['D7'], notes['B6'], 0, 0,

  notes['C7'], 0, 0, notes['G6'],
  0, 0, notes['E6'], 0,
  0, notes['A6'], 0, notes['B6'],
  0, notes['AS6'], notes['A6'], 0,

  notes['G6'], notes['E7'], notes['G7'],
  notes['A7'], 0, notes['F7'], notes['G7'],
  0, notes['E7'], 0, notes['C7'],
  notes['D7'], notes['B6'], 0, 0
]
tempo = [
  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,

  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,

  9, 9, 9,
  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,

  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,

  9, 9, 9,
  12, 12, 12, 12,
  12, 12, 12, 12,
  12, 12, 12, 12,
]


underworld_melody = [
  notes['C4'], notes['C5'], notes['A3'], notes['A4'],
  notes['AS3'], notes['AS4'], 0,
  0,
  notes['C4'], notes['C5'], notes['A3'], notes['A4'],
  notes['AS3'], notes['AS4'], 0,
  0,
  notes['F3'], notes['F4'], notes['D3'], notes['D4'],
  notes['DS3'], notes['DS4'], 0,
  0,
  notes['F3'], notes['F4'], notes['D3'], notes['D4'],
  notes['DS3'], notes['DS4'], 0,
  0, notes['DS4'], notes['CS4'], notes['D4'],
  notes['CS4'], notes['DS4'],
  notes['DS4'], notes['GS3'],
  notes['G3'], notes['CS4'],
  notes['C4'], notes['FS4'], notes['F4'], notes['E3'], notes['AS4'], notes['A4'],
  notes['GS4'], notes['DS4'], notes['B3'],
  notes['AS3'], notes['A3'], notes['GS3'],
  0, 0, 0
]

underworld_tempo = [
  12, 12, 12, 12,
  12, 12, 6,
  3,
  12, 12, 12, 12,
  12, 12, 6,
  3,
  12, 12, 12, 12,
  12, 12, 6,
  3,
  12, 12, 12, 12,
  12, 12, 6,
  6, 18, 18, 18,
  6, 6,
  6, 6,
  6, 6,
  18, 18, 18, 18, 18, 18,
  10, 10, 10,
  10, 10, 10,
  3, 3, 3
]

adventure_time_melody = [
    notes['D5'],
    notes['G5'], notes['G5'], notes['G5'], notes['G5'], notes['FS5'],
    notes['FS5'], notes['E5'], notes['D5'], notes['E5'], notes['D5'], notes['D5'],
    notes['C5'], notes['B5'], notes['A5'], notes['G4'],
    0, notes['C5'], notes['B5'], notes['A5'], notes['G4'], 0,
    notes['G5'], 0, notes['G5'], notes['G5'], 0, notes['G5'],
    notes['FS5'], 0, notes['E5'], notes['E5'], notes['D5'], notes['D5'],
    notes['C5'], notes['C5'], notes['C5'], notes['D5'],
    notes['D5'], notes['A5'], notes['B5'], notes['A5'], notes['G4'],
    notes['G5']
  ]
adventure_time_tempo = [
    24,
    24, 12, 12, 12, 24,
    12, 24, 24, 24, 12, 24,
    12, 12, 12, 12,
    24, 12, 24, 24, 12, 24,
    24, 24, 24, 12, 24, 12,
    24, 24, 24, 12, 12, 24,
    8, 24, 24, 8,
    8, 24, 12, 24, 24,
    12
  ]


star_wars_melody = [
                    notes['G4'], notes['G4'], notes['G4'],
                    notes['EB4'], 0, notes['BB4'], notes['G4'],
                    notes['EB4'], 0, notes['BB4'], notes['G4'], 0,

                    notes['D4'], notes['D4'], notes['D4'],
                    notes['EB4'], 0, notes['BB3'], notes['FS3'],
                    notes['EB3'], 0, notes['BB3'], notes['G3'], 0,

                    notes['G4'], 0, notes['G3'], notes['G3'], 0,
                    notes['G4'], 0, notes['FS4'], notes['F4'],
                    notes['E4'], notes['EB4'], notes['E4'], 0,
                    notes['GS3'], notes['CS3'], 0,

                    notes['C3'], notes['B3'], notes['BB3'], notes['A3'], notes['BB3'], 0,
                    notes['EB3'], notes['FS3'], notes['EB3'], notes['FS3'],
                    notes['BB3'], 0, notes['G3'], notes['BB3'], notes['D4'], 0,


                    notes['G4'], 0, notes['G3'], notes['G3'], 0,
                    notes['G4'], 0, notes['FS4'], notes['F4'],
                    notes['E4'], notes['EB4'], notes['E4'], 0,
                    notes['GS3'], notes['CS3'], 0,

                    notes['C3'], notes['B3'], notes['BB3'], notes['A3'], notes['BB3'], 0,

                    notes['EB3'], notes['FS3'], notes['EB3'],
                    notes['BB3'], notes['G3'], notes['EB3'], 0, notes['BB3'], notes['G3'],
                    ]


star_wars_tempo = [
                    2, 2, 2,
                    4, 8, 6, 2,
                    4, 8, 6, 2, 8,

                    2, 2, 2,
                    4, 8, 6, 2,
                    4, 8, 6, 2, 8,

                    2, 16, 4, 4, 8,
                    2, 8, 4, 6,
                    6, 4, 4, 8,
                    4, 2, 8,
                    4, 4, 6, 4, 2, 8,
                    4, 2, 4, 4,
                    2, 8, 4, 6, 2, 8,

                    2, 16, 4, 4, 8,
                    2, 8, 4, 6,
                    6, 4, 4, 8,
                    4, 2, 8,
                    4, 4, 6, 4, 2, 8,
                    4, 2, 2,
                    4, 2, 4, 8, 4, 2,
                    ]

popcorn_melody = [

    notes['A4'], notes['G4'], notes['A4'], notes['E4'], notes['C4'], notes['E4'], notes['A2'],
    notes['A4'], notes['G4'], notes['A4'], notes['E4'], notes['C4'], notes['E4'], notes['A2'],

    notes['A4'], notes['B4'], notes['C5'], notes['B4'], notes['C5'], notes['A4'], notes['B4'], notes['A4'], notes['B4'], notes['G4'],
    notes['A4'], notes['G4'],notes['A4'], notes['F4'], notes['A4'],


    notes['A4'], notes['G4'], notes['A4'], notes['E4'], notes['C4'], notes['E4'], notes['A2'],
    notes['A4'], notes['G4'], notes['A4'], notes['E4'], notes['C4'], notes['E4'], notes['A2'],

    notes['A4'], notes['B4'], notes['C5'], notes['B4'], notes['C5'], notes['A4'], notes['B4'], notes['A4'], notes['B4'], notes['G4'],
    notes['A4'], notes['G4'],notes['A4'], notes['B4'], notes['C5'],

    notes['E5'], notes['D5'], notes['E5'], notes['C5'], notes['G4'], notes['C5'], notes['E4'],
    notes['E5'], notes['D5'], notes['E5'], notes['C5'], notes['G4'], notes['C5'], notes['E4'],

    notes['E5'], notes['FS5'], notes['G5'], notes['FS5'], notes['G5'], notes['E5'], notes['FS5'], notes['E5'], notes['FS5'], notes['D5'],
    notes['E5'], notes['D5'],notes['E5'], notes['C5'], notes['E5'],

    ###

    notes['E5'], notes['D5'], notes['E5'], notes['C5'], notes['G4'], notes['C5'], notes['E4'],
    notes['E5'], notes['D5'], notes['E5'], notes['C5'], notes['G4'], notes['C5'], notes['E4'],

    notes['E5'], notes['FS5'], notes['G5'], notes['FS5'], notes['G5'], notes['E5'], notes['FS5'], notes['E5'], notes['FS5'], notes['D5'],
    notes['E5'], notes['D5'],notes['B4'], notes['D5'], notes['E5'],
]
popcorn_tempo = [
    8,8,8,8,8,8,4,
    8,8,8,8,8,8,4,

    8,8,8,8,8,8,8,8,8,8,
    8,8,8,8,4,

    8,8,8,8,8,8,4,
    8,8,8,8,8,8,4,

    8,8,8,8,8,8,8,8,8,8,
    8,8,8,8,4,

    8,8,8,8,8,8,4,
    8,8,8,8,8,8,4,

    8,8,8,8,8,8,8,8,8,8,
    8,8,8,8,4,

    8,8,8,8,8,8,4,
    8,8,8,8,8,8,4,

    8,8,8,8,8,8,8,8,8,8,
    8,8,8,8,4,
]

twinkle_twinkle_melody = [
    notes['C4'], notes['C4'], notes['G4'], notes['G4'], notes['A4'], notes['A4'], notes['G4'],
    notes['F4'], notes['F4'], notes['E4'], notes['E4'], notes['D4'], notes['D4'], notes['C4'],

    notes['G4'], notes['G4'], notes['F4'], notes['F4'], notes['E4'], notes['E4'], notes['D4'],
    notes['G4'], notes['G4'], notes['F4'], notes['F4'], notes['E4'], notes['E4'], notes['D4'],

    notes['C4'], notes['C4'], notes['G4'], notes['G4'], notes['A4'], notes['A4'], notes['G4'],
    notes['F4'], notes['F4'], notes['E4'], notes['E4'], notes['D4'], notes['D4'], notes['C4'],
]

twinkle_twinkle_tempo = [
    4,4,4,4,4,4,2,
    4,4,4,4,4,4,2,

    4,4,4,4,4,4,2,
    4,4,4,4,4,4,2,

    4,4,4,4,4,4,2,
    4,4,4,4,4,4,2,
]

crazy_frog_melody = [
    notes['A4'], notes['C5'], notes['A4'], notes['A4'], notes['D5'], notes['A4'], notes['G4'],
    notes['A4'], notes['E5'], notes['A4'], notes['A4'], notes['F5'], notes['E5'], notes['C5'],
    notes['A4'], notes['E5'], notes['A5'], notes['A4'], notes['G4'], notes['G4'], notes['E4'], notes['B4'],
    notes['A4'],0,

    notes['A4'], notes['C5'], notes['A4'], notes['A4'], notes['D5'], notes['A4'], notes['G4'],
    notes['A4'], notes['E5'], notes['A4'], notes['A4'], notes['F5'], notes['E5'], notes['C5'],
    notes['A4'], notes['E5'], notes['A5'], notes['A4'], notes['G4'], notes['G4'], notes['E4'], notes['B4'],
    notes['A4'],0,


    notes['A3'], notes['G3'], notes['E3'], notes['D3'],

    notes['A4'], notes['C5'], notes['A4'], notes['A4'], notes['D5'], notes['A4'], notes['G4'],
    notes['A4'], notes['E5'], notes['A4'], notes['A4'], notes['F5'], notes['E5'], notes['C5'],
    notes['A4'], notes['E5'], notes['A5'], notes['A4'], notes['G4'], notes['G4'], notes['E4'], notes['B4'],
    notes['A4'],
]

crazy_frog_tempo = [
    2,4,4,8,4,4,4,
    2,4,4,8,4,4,4,
    4,4,4,8,4,8,4,4,
    1,4,

    2,4,4,8,4,4,4,
    2,4,4,8,4,4,4,
    4,4,4,8,4,8,4,4,
    1,4,

    8,4,4,4,

    2,4,4,8,4,4,4,
    2,4,4,8,4,4,4,
    4,4,4,8,4,8,4,4,
    1,
]

deck_the_halls_melody = [
    notes['G5'], notes['F5'], notes['E5'], notes['D5'],
    notes['C5'], notes['D5'], notes['E5'], notes['C5'],
    notes['D5'], notes['E5'], notes['F5'], notes['D5'], notes['E5'], notes['D5'],
    notes['C5'], notes['B4'], notes['C5'], 0,

    notes['G5'], notes['F5'], notes['E5'], notes['D5'],
    notes['C5'], notes['D5'], notes['E5'], notes['C5'],
    notes['D5'], notes['E5'], notes['F5'], notes['D5'], notes['E5'], notes['D5'],
    notes['C5'], notes['B4'], notes['C5'], 0,

    notes['D5'], notes['E5'], notes['F5'], notes['D5'],
    notes['E5'], notes['F5'], notes['G5'], notes['D5'],
    notes['E5'], notes['F5'], notes['G5'], notes['A5'], notes['B5'], notes['C6'],
    notes['B5'], notes['A5'], notes['G5'], 0,

    notes['G5'], notes['F5'], notes['E5'], notes['D5'],
    notes['C5'], notes['D5'], notes['E5'], notes['C5'],
    notes['D5'], notes['E5'], notes['F5'], notes['D5'], notes['E5'], notes['D5'],
    notes['C5'], notes['B4'], notes['C5'], 0,
]

deck_the_halls_tempo = [
    2, 4, 2, 2,
    2, 2, 2, 2,
    4, 4, 4, 4, 2, 4,
    2, 2, 2, 2,

    2, 4, 2, 2,
    2, 2, 2, 2,
    4, 4, 4, 4, 2, 4,
    2, 2, 2, 2,

    2,4,2,2,
    2,4,2,2,
    4,4,2,4,4,2,
    2,2,2,2,

    2, 4, 2, 2,
    2, 2, 2, 2,
    4, 4, 4, 4, 2, 4,
    2, 2, 2, 2,
]

manaderna_melody = [
    notes['E4'],notes['E4'],notes['F4'],notes['G4'],
    notes['G4'],notes['F4'],notes['E4'],notes['D4'],
    notes['C4'],notes['C4'],notes['D4'],notes['E4'],
    notes['E4'],0,notes['D4'],notes['D4'],0,

    notes['E4'],notes['E4'],notes['F4'],notes['G4'],
    notes['G4'],notes['F4'],notes['E4'],notes['D4'],
    notes['C4'],notes['C4'],notes['D4'],notes['E4'],
    notes['D4'],0,notes['C4'],notes['C4'],0,

    notes['D4'],notes['D4'],notes['E4'],notes['C4'],
    notes['D4'],notes['E4'],notes['F4'],notes['E4'],notes['C4'],
    notes['D4'],notes['E4'],notes['F4'],notes['E4'],notes['D4'],
    notes['C4'],notes['D4'],notes['G3'],0,

    notes['E4'],notes['E4'],notes['F4'],notes['G4'],
    notes['G4'],notes['F4'],notes['E4'],notes['D4'],
    notes['C4'],notes['C4'],notes['D4'],notes['E4'],
    notes['D4'],0,notes['C4'],notes['C4'],
]

manaderna_tempo = [
    2,2,2,2,
    2,2,2,2,
    2,2,2,2,
    2,4,4,2,4,

    2,2,2,2,
    2,2,2,2,
    2,2,2,2,
    2,4,4,2,4,

    2,2,2,2,
    2,4,4,2,2,
    2,4,4,2,2,
    2,2,1,4,

    2,2,2,2,
    2,2,2,2,
    2,2,2,2,
    2,4,4,2,
]

bonnagard_melody = [
    notes['C5'],notes['C5'],notes['C5'],notes['G4'],
    notes['A4'],notes['A4'],notes['G4'],
    notes['E5'],notes['E5'],notes['D5'],notes['D5'],
    notes['C5'],0,notes['G4'],

    notes['C5'],notes['C5'],notes['C5'],notes['G4'],
    notes['A4'],notes['A4'],notes['G4'],
    notes['E5'],notes['E5'],notes['D5'],notes['D5'],
    notes['C5'],0,notes['G4'],notes['G4'],

    notes['C5'],notes['C5'],notes['C5'],notes['G4'],notes['G4'],
    notes['C5'],notes['C5'],notes['G4'],
    notes['C5'],notes['C5'],notes['C5'],notes['C5'],notes['C5'],notes['C5'],
    notes['C5'],notes['C5'],notes['C5'],notes['C5'],notes['C5'],notes['C5'],0,

    notes['C5'],notes['C5'],notes['C5'],notes['G4'],
    notes['A4'],notes['A4'],notes['G4'],
    notes['E5'],notes['E5'],notes['D5'],notes['D5'],
    notes['C5'],0,
]

bonnagard_tempo = [
    2,2,2,2,
    2,2,1,
    2,2,2,2,
    1,2,2,

    2,2,2,2,
    2,2,1,
    2,2,2,2,
    1,2,4,4,

    2,2,2,4,4,
    2,2,1,
    4,4,2,4,4,2,
    4,4,4,4,2,2,4,

    2,2,2,2,
    2,2,1,
    2,2,2,2,
    1,1,
]

final_countdown_melody = [
    notes['A3'],notes['E5'],notes['D5'],notes['E5'],notes['A4'],
    notes['F3'],notes['F5'],notes['E5'],notes['F5'],notes['E5'],notes['D5'],
    notes['D3'],notes['F5'],notes['E5'],notes['F5'],notes['A4'],
    notes['G3'],0,notes['D5'],notes['C5'],notes['D5'],notes['C5'],notes['B4'],notes['D5'],
    notes['C5'],notes['A3'],notes['E5'],notes['D5'],notes['E5'],notes['A4'],
    notes['F3'],notes['F5'],notes['E5'],notes['F5'],notes['E5'],notes['D5'],
    notes['D3'],notes['F5'],notes['E5'],notes['F5'],notes['A4'],
    notes['G3'],0,notes['D5'],notes['C5'],notes['D5'],notes['C5'],notes['B4'],notes['D5'],
    notes['C5'],notes['B4'],notes['C5'],notes['D5'],notes['C5'],notes['D5'],
    notes['E5'],notes['D5'],notes['C5'],notes['B4'],notes['A4'],notes['F5'],
    notes['E5'],notes['E5'],notes['F5'],notes['E5'],notes['D5'],
    notes['E5'],
]

final_countdown_tempo = [
    1,16,16,4,4,
    1,16,16,8,8,4,
    1,16,16,4,4,
    2,4,16,16,8,8,8,8,
    4,4,16,16,4,4,
    1,16,16,8,8,4,
    1,16,16,4,4,
    2,4,16,16,8,8,8,8,
    4,16,16,4,16,16,
    8,8,8,8,4,4,
    2,8,4,16,16,
    1,
]

def buzz(frequency, length):     #create the function "buzz" and feed it the pitch and duration)

    if(frequency==0):
        time.sleep(length)
        return

    period = 1.0 / frequency         #in physics, the period (sec/cyc) is the inverse of the frequency (cyc/sec)
    delayValue = period / 2      #calcuate the time for half of the wave
    numCycles = int(length * frequency)  #the number of waves to produce is the duration times the frequency

    for i in range(numCycles):      #start a loop from 0 to the variable "cycles" calculated above
        GPIO.output(buzzer_pin, True)    #set pin 27 to high
        time.sleep(delayValue)      #wait with pin 27 high
        GPIO.output(buzzer_pin, False)      #set pin 27 to low
        time.sleep(delayValue)      #wait with pin 27 low



def setup():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(buzzer_pin, GPIO.IN)
    GPIO.setup(buzzer_pin, GPIO.OUT)

def destroy():
    GPIO.cleanup()              # Release resource


def play(melody, tempo, pause, pace=0.800):

    for i in range(0, len(melody)):     # Play song

        noteDuration = pace/tempo[i]
        buzz(notes[melody[i]], noteDuration)    # Change the frequency along the song note

        pauseBetweenNotes = noteDuration * pause
        time.sleep(pauseBetweenNotes)


def play_note(*_notes, **kwargs):

    tempo = kwargs.get('tempo', [1.0] * len(_notes) )
    pause = kwargs.get('pause', 1.0) or 1.0
    pace = kwargs.get('pace', 0.800)

    melody = _notes
    for i in range(0, len(melody)):     # Play song
        noteDuration = kwargs.get('duration', pace/tempo[i])
        pauseBetweenNotes = noteDuration * pause
        buzz(notes[melody[i]], noteDuration)    # Change the frequency along the song note
        if len(melody) < i:
            time.sleep(pauseBetweenNotes)

def wolf_whistle():
    duration = .0057

    i = 1000
    while i < 5000:
        i *= 1.07
        buzz(i, duration)

    sleep(.1)

    i = 1000
    while i < 3000:
        i *= 1.04
        buzz(i, duration)

    i = 3000
    while i > 1000:
        i *= .957
        buzz(i, duration)


def ohhh(offset=600):

    i = 1000 - offset
    while i < 2000 - offset:
        i=i*1.04
        buzz(i, .01)

    i = 2000 - offset
    while i > 1000 - offset:
        i=i*.96
        buzz(i, .01)

def uhoh():


    i = 900
    while i < 1144:
        i=i*1.01
        buzz(i, .0047)

    sleep(.1)

    i = 1244
    while i > 1108:
        i=i*.991
        buzz(i, .02)

def laugh():
    duration = .003
    pause = 0.05
    i = 1000
    while i < 2000:
        i=i*1.10
        buzz(i, duration)

    sleep(pause)

    i = 1000
    while i > 500:
        i=i*.90
        buzz(i, duration)

    sleep(pause)

    i = 1000
    while i < 2000:
        i=i*1.10
        buzz(i, duration)

    sleep(pause)

    i = 1000
    while i > 500:
        i=i*.90
        buzz(i, duration)

    sleep(pause)

    i = 1000
    while i < 2000:
        i=i*1.10
        buzz(i, duration)
    sleep(pause)

    i = 1000
    while i > 500:
        i=i*.90
        buzz(i, duration)

    sleep(pause)

    i = 1000
    while i < 2000:
        i=i*1.10
        buzz(i, duration)
    sleep(pause)

    i = 1000
    while i > 500:
        i=i*.90
        buzz(i, duration)

    sleep(.5)

def r2d2():
    buzz(notes['A6'],.07) # A
    buzz(notes['G6'],.07) # G
    buzz(notes['E6'],.07) # E
    buzz(notes['C6'],.07) # C
    buzz(notes['D6'],.07) # D
    buzz(notes['B6'],.07) # B
    buzz(notes['F6'],.07) # F
    buzz(notes['C7'],.07) # C
    buzz(notes['A6'],.07) # A
    buzz(notes['G6'],.07) # G
    buzz(notes['E6'],.07) # E
    buzz(notes['C6'],.07) # C
    buzz(notes['D6'],.07) # D
    buzz(notes['B6'],.07) # B
    buzz(notes['F6'],.07) # F
    buzz(notes['C7'],.07) # C

def play_r2():
    chat.playful
    sleep(.4)
    wolf_whistle()
    sleep(.8)
    laugh()
    sleep(.7)
    uhoh()
    sleep(.3)
    r2d2()
    sleep(.8)
    ohhh()
    sleep(.4)
    boo()
    sleep(.8)
    ohhh()
    chat.busy
    sleep(.8)
    chat.discovery
    sleep(.4)
    chat.find
    sleep(.3)
    laugh()


def laugh2():
    buzz(notes['C6'], .002) # //C
    buzz(notes['E6'], .002) # //E
    buzz(notes['G6'], .002) # //G
    buzz(notes['C7'], .002) # //C
    buzz(notes['C6'], .002) # //C
    sleep(.005);
    buzz(notes['C6'], .002) # //C
    buzz(notes['E6'], .002) # //E
    buzz(notes['G6'], .002) # //G
    buzz(notes['C7'], .002) # //C
    buzz(notes['C6'], .002) # //C
    sleep(.005);
    buzz(notes['C6'], .05) # //C
    sleep(.005);
    buzz(notes['C6'], .05) # //C
    sleep(.005);
    buzz(notes['C6'], .05) # //C
    sleep(.005);
    buzz(notes['C6'], .05) # //C
    sleep(.005);
    buzz(notes['C6'], .05) # //C
    sleep(.005);
    buzz(notes['C6'], .05) # //C
    sleep(.005);
    buzz(notes['C6'], .05) # //C


def waka():
    # for (int i=1000; i<3000; i=i*1.05) {
    i=1000
    while i < 3000:
        i=i*1.05
        buzz(i,.003)
    sleep(.005)
    # for (int i=2000; i>1000; i=i*.95) {
    i=2000
    while i > 1000:
        i=i*.95
        buzz(i,.01)
    # for (int i=1000; i<3000; i=i*1.05) {
    i=1000
    while i < 3000:
        i=i*1.05
        buzz(i,.003)
    sleep(.005)
    # for (int i=2000; i>1000; i=i*.95) {
    i=2000
    while i > 1000:
        i=i*.95
        buzz(i,.01)
    # for (int i=1000; i<3000; i=i*1.05) {
    i=1000
    while i < 3000:
        i=i*1.05
        buzz(i,.003)
    sleep(.005)
    # for (int i=2000; i>1000; i=i*.95) {
    i=2000
    while i > 1000:
        i=i*.95
        buzz(i,.01)
    # for (int i=1000; i<3000; i=i*1.05) {
    i=1000
    while i < 3000:
        i=i*1.05
        buzz(i,.003)
    sleep(.005)
    # for (int i=2000; i>1000; i=i*.95) {
    i=2000
    while i > 1000:
        i=i*.95
        buzz(i,.001)



class Play(object):

    duration = 1

    def __init__(self):
        self._pause = None
        self.duration = 1

    def __getattr__(self, name):
        if len(name) == 1:
            name = '{}1'.format(name)
        note = notes.get(name.upper(), None)
        if note is not None:
            play_note(name.upper(), duration=self.duration, pause=self._pause)
            return self
        return None

    def __getitem__(self, name):
        return self.__getattr__(name)

    def dur(self, count):
        self.duration = count
        return self

    def pause(self, count):
        self._pause = count
        return self

play = Play()
atexit.register(lambda: GPIO.cleanup())

def play_mario():
    step = .045
    play.dur(.10).e4
    sleep(step)
    play.e4
    sleep(step)
    play.e4
    sleep(step)
    play.e4
    sleep(step)
    sleep(step)
    sleep(step)
    play.c4
    sleep(step)
    sleep(step)
    sleep(step)
    sleep(step)
    play.e4
    sleep(step)
    sleep(step)
    play.g4
    sleep(step)
    sleep(step)
    sleep(step)
    sleep(step)
    sleep(step)
    play.g3
    sleep(step)


from smpq import ProcessQueue

def handler(item):
    item()

pq = ProcessQueue(handler)

def error_beeps(count=3):
    for i in range(count):
        play.dur(.06).a1
        sleep(.1)

def happy_beeps(count=5):
    play.dur(.03).c5
    sleep(.04)
    play.dur(.03).g6
    sleep(.04)
    for i in range(count):
        play.dur(.03).g5
        sleep(.04)
    play.dur(.03).g6
    sleep(.01)
    play.dur(.03).g6

def trill(key='e4', count=10, pause=.016):
    for i in range(count):
        play.dur(.03)[key]
        sleep(pause)


def random_beeps(count=7):

    for i in range(count):
        play.dur(.06).g3
        sleep(.1)

def no():
    trill('c2', random.randint(2, 6), .03)
    play_random(2, scale='c', octaves='223', pause=.02)
    sleep(.04)
    chat.flat
    sleep(.2)
    play_random(2, scale='c', octaves='1', pause=.02, duration=.06)


def thread_play(*functions):
    pq.start([x for x in functions])

import random;

def play_random(count=12, pause=0.0, duration=.05, scale='ABCDEFG', octaves='1234567'):
    play.dur(duration)
    for i in range(count):
        k =''.join([random.choice(scale),random.choice(octaves)])
        play.dur(duration + (random.random() / 100))[k]
        sleep(pause + (random.random() / 100))

def thread_play_all():
  thread_play(play_mario, play_starwars)

def play_starwars(step=.26):

    play.dur(.35).G4
    sleep(step)
    play.G4
    sleep(step)
    play.G4
    sleep(step)

    play.dur(step * 1.2).EB4
    sleep(step * .5)

    play.dur(step * .4).BB4
    sleep(step *.4)

    play.dur(.35).G4
    sleep(step)
    play.dur(step).EB4
    sleep(step *.5)
    play.dur(step * .4).BB4
    sleep(step * .5)
    play.dur(.35).G4


chatters = dict(
    chatty=dict(count=30, duration=.02, octaves='2345',),
    chitter=dict(count=10, duration=.03, octaves='124', pause=.03,),
    small_chat=dict(count=15, duration=.02, octaves='2345',),
    query=dict(count=5, duration=.038, scale='bda',octaves='2534', pause=.05,),
    grumpy_reply=dict(count=4, duration=.1, pause=.03, octaves='4322',),
    flat=dict(count=3, duration=.07, octaves='123',),
    okay=dict(count=4, duration=.07, octaves='2344', pause=.02),
    natter=dict(count=27, duration=.08, octaves='234514243243236', pause=.04,),
    playful=dict(count=9, duration=.05, pause=.056,),
    bother=dict(count=5, duration=.2, octaves='12312212', pause=.01,),
    reading=dict(count=70, duration=.01, octaves='567', pause=.04,),
    shouting=dict(count=70, duration=.01, octaves='5767', pause=.003,),
    discovery=dict(count=6, duration=.02, octaves='5566666', pause=.03),
    find=dict(count=3, duration=.02, octaves='556', pause=.03),
    counting=dict(count=10, duration=.01, octaves='5566666', pause=.3),
    busy=dict(count=8, duration=.02, octaves='5262312366', pause=.2),
)


class Chat(object):

    duration = 1

    def __init__(self):
        self.duration = 1

    def __getattr__(self, name):
        chatter = chatters.get(name, None)
        if chatter is not None:
            if hasattr(self, '_pause'):
                chatters['pause'] = self._pause

            play_random(**chatters[name])
            return self
        return None

    def __getitem__(self, name):
        return self.__getattr__(name)

    def dur(self, count):
        self.duration = count
        return self

    def pause(self, count):
        self._pause = count
        return self

chat = Chat()

def boo():
    chat.query
    sleep(.1 + random.random())
    chat.playful
    sleep(.4)
    chat.flat
    sleep(1 + random.random())
    chat.discovery
    sleep(.4)
    chat.flat



if __name__ == '__main__':
    setup()

    #boo()

    # for item in chatters:
    #     print(item)
    #     play_random(**chatters[item])
    #     sleep(.5)
    #     play_random(**chatters[item])
    #     sleep(1)


    # thread_play_all()
    # while 1:
    #   print('tick')
    #   sleep(1)
    # play_starwars(.25)
    #play_note('A4')

# if __name__ == '__main__':      # Program start from here
#     try:
#         setup()
#         # print "The Final Countdown"
#         # play(final_countdown_melody, final_countdown_tempo, 0.30, 1.2000)
#         # time.sleep(2)
#         # print "Per Olssons Bonnagard (Old MacDonald Had A Farm) Melody"
#         # play(bonnagard_melody, bonnagard_tempo, 0.30, 0.800)
#         # time.sleep(2)
#         # print "Manaderna (Symphony No. 9) Melody"
#         # play(manaderna_melody, manaderna_tempo, 0.30, 0.800)
#         # time.sleep(2)
#         # print "Deck The Halls Melody"
#         # play(deck_the_halls_melody, deck_the_halls_tempo, 0.30, 0.800)
#         # time.sleep(2)
#         # print "Crazy Frog (Axel F) Theme"
#         # play(crazy_frog_melody, crazy_frog_tempo, 0.30, 0.900)
#         # time.sleep(2)
#         # print "Twinkle, Twinkle, Little Star Melody"
#         # play(twinkle_twinkle_melody, twinkle_twinkle_tempo, 0.50, 1.000)
#         # time.sleep(2)
#         # print "Popcorn Melody"
#         # play(popcorn_melody, popcorn_tempo, 0.80, 1.000)
#         # time.sleep(2)
#         # print "Star Wars Theme"
#         # play(star_wars_melody, star_wars_tempo, 0.30, .600)
#         # time.sleep(2)
#         print "Super Mario Theme"
#         play(melody, tempo, 1.3, 0.800)
#         time.sleep(2)
#         print "Super Mario Underworld Theme"
#         play(underworld_melody, underworld_tempo, 1.3, 0.800)
#         time.sleep(2)
#         print "Adventure Time Theme"
#         play(adventure_time_melody, adventure_time_tempo, 1.3, 1.500)

#         destroy()
#     except KeyboardInterrupt:   # When 'Ctrl+C' is pressed, the child program destroy() will be  executed.
#         destroy()
