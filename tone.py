#!/usr/bin/env python3

import datetime
import json
import math
import sys
from time import sleep
import os

import numpy
import pyaudio
import pyttsx3


class ToneGenerator(object):
  def __init__(self, samplerate=44100, frames_per_buffer=4410):
    self.p = pyaudio.PyAudio()
    self.samplerate = samplerate
    self.frames_per_buffer = frames_per_buffer
    self.streamOpen = False
 
  def sinewave(self):
    if self.buffer_offset + self.frames_per_buffer - 1 > self.x_max:
      # We don't need a full buffer or audio so pad the end with 0's
      xs = numpy.arange(self.buffer_offset, self.x_max)
      tmp = self.amplitude * numpy.sin(xs * self.omega)
      out = numpy.append(tmp,
        numpy.zeros(self.frames_per_buffer - len(tmp)))
    else:
      xs = numpy.arange(self.buffer_offset, self.buffer_offset + self.frames_per_buffer)
      out = self.amplitude * numpy.sin(xs * self.omega)
    self.buffer_offset += self.frames_per_buffer
    return out
 
  def callback(self, in_data, frame_count, time_info, status):
    if self.buffer_offset < self.x_max:
      data = self.sinewave().astype(numpy.float32)
      return (data.tobytes(), pyaudio.paContinue)
    else:
      return (None, pyaudio.paComplete)
 
  def is_playing(self):
    if self.stream.is_active():
      return True
    else:
      if self.streamOpen:
        self.stream.stop_stream()
        self.stream.close()
        self.streamOpen = False
      return False
 
  def play(self, frequency, duration, amplitude):
    self.omega = float(frequency) * (math.pi * 2) / self.samplerate
    self.amplitude = amplitude
    self.buffer_offset = 0
    self.streamOpen = True
    self.x_max = math.ceil(self.samplerate * duration) - 1
    self.stream = self.p.open(format=pyaudio.paFloat32,
                  channels=1,
                  rate=self.samplerate,
                  output=True,
                  frames_per_buffer=self.frames_per_buffer,
                  stream_callback=self.callback)

generator = ToneGenerator()
engine = pyttsx3.init()

voices = engine.getProperty('voices')
engine.setProperty('voice', voices[0].id)

rate = engine.getProperty('rate')
engine.setProperty('rate', rate-25)

with open("config.json") as file:
  config = json.load(file)

def lookupTone(code):
  try:
    c = [i[1] for i in config["tones"] if i[0] == code][0]
    return c
  except Exception as e:
    print("Tone lookup execption occured")
    print(str(e))
    return False

def dropTone(item):
  if engine._inLoop:
    engine.endLoop()
  
  def playTone(freq, durSecs):
    generator.play(freq, durSecs, 0.50)
    while generator.is_playing():
      pass
  
  for i in item["tones"]:
    tone = lookupTone(i[0])
    duration = float(i[1])
    playTone(tone, duration)

  sleep(0.5)

  sayString = ""
  if item["message"] != None:
    sayString = sayString + item["message"]
  
  t = datetime.datetime.now().strftime("%H %M")
  sayString = sayString.rstrip()
  if sayString[:-1] != ".":
    sayString = sayString + "."
  sayString = sayString + " Time out " + t

  engine.say(sayString)
  engine.runAndWait()

if __name__ == "__main__":
  with open(sys.argv[1], "r") as file:
    data = json.load(file)
    os.remove(sys.argv[1])
  dropTone(data)



