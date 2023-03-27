import RPi.GPIO as GPIO
import dht11  
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(True)
instance = dht11.DHT11(pin=22)

def dht11_test():
    result = instance.read()
    if result.is_valid():
        temp = "%.1f" % result.temperature
        humi = "%.1f" % result.humidity
        message = temp, humi
        print(temp, humi)
    time.sleep(1)

if __name__ == '__main__':
    dht11_test()
       
