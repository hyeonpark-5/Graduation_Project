import RPi.GPIO as GPIO
import time


GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)


TRIG = 23
ECHO = 24


GPIO.setup(TRIG, GPIO.OUT)
GPIO.setup(ECHO, GPIO.IN)


GPIO.output(TRIG, False)


def ultra_sonic():    
    GPIO.output(TRIG, True)
    time.sleep(0.00001)    
    GPIO.output(TRIG, False)
       
    while GPIO.input(ECHO) == 0:
        start = time.time()
           
    while GPIO.input(ECHO) == 1:
        stop = time.time()
           
    check_time= stop - start
    distance = check_time*34300 / 2
    print("%.1f"%distance)
    time.sleep(0.4)
   
if __name__ == '__main__':
    ultra_sonic()
       


