import time
import sys

EMULATE_HX711=False

referenceUnit = 1

if not EMULATE_HX711:
    import RPi.GPIO as GPIO
    from hx711 import HX711
else:
    from emulated_hx711 import HX711

def cleanAndExit():
    

    if not EMULATE_HX711:
        GPIO.cleanup()
        
   
    sys.exit()

hx = HX711(20, 16)


hx.set_reading_format("MSB", "MSB")


hx.set_reference_unit(referenceUnit) #보정 필요

hx.reset()

hx.tare()

def loadshell():
    
    val = hx.get_weight(5) #보정 필요
    print(val)

   
    hx.power_down()
    hx.power_up()
    time.sleep(0.1)



if __name__ == '__main__':
    loadshell()
       