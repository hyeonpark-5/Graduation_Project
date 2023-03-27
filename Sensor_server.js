const express = require('express')
const spawn = require('child_process').spawn;
const Gpio = require('onoff').Gpio;
const fs = require('fs') 

const reset_button = new Gpio(17, 'in', 'both');
const bottle_button = new Gpio(25,'in','both');
const app = express()
const date = new Date();

const year = date.getFullYear();
const month = ('0' + (date.getMonth() + 1)).slice(-2);
const day = ('0' + date.getDate()).slice(-2);
const dateStr = year + '-' + month + '-' + day;
const hours = ('0' + date.getHours()).slice(-2);
const minutes = ('0' + date.getMinutes()).slice(-2);
const seconds = ('0' + date.getSeconds()).slice(-2);
const timeStr = hours + ':' + minutes + ':' + seconds;
const date_time = 'date: ' + dateStr + ' time: ' + timeStr;




app.get('/', (req, res) => {
    res.json({
        success: true,
    })
})

let reset_value = 0;  //리셋용 전역변수

//리셋 버튼
reset_button.watch(function(err,state){
    if (state == 1){
        console.log('reset_button_on');
        const result = spawn('python3',['/home/pi/hx711py/loadshell.py'])
        result.stdout.on('data',function(data) {
            reset_value = (data.toString());
            var Float_reset_value = parseFloat(reset_value);
            console.log("reset_loadshell: " + reset_value);
            console.log("Float_loadshell: " + Float_reset_value);
            console.log(typeof(reset_value));
            console.log(typeof(Float_reset_value));
            var fs_bottle_reset = date_time + ' reset: ' + reset_value;
            fs.writeFile('/home/pi/test.txt', fs_bottle_reset ,{flag: 'a+'}, err => {
                if (err) {
                    console.error(err);
                    return
                }      
            });    
           
        });
    }
});

console.log("reset: " + reset_value);

// 물통 버튼
bottle_button.watch(function(err,state){
    if (state == 1){
        console.log('bottle_button_on');
        const bottle_result = spawn('python3',['/home/pi/hx711py/loadshell.py'])
        bottle_result.stdout.on('data',function(data) {
            bottle_value = (data.toString());
            console.log("bottle_loadshell: " + bottle_value);
            water_value = parseFloat(reset_value) - parseFloat(bottle_value);
            console.log("water: " + water_value);
            var fs_bottle_water = date_time + ' water: ' + water_value;
            fs.writeFile('/home/pi/test.txt', fs_bottle_water ,{flag: 'a+'}, err => {
                if (err) {
                    console.error(err);
                    return
                }      
            });   
             
           
        });
    }
});

//약통
setInterval(function(){

    const dht11_result = spawn('python3',['/home/pi/temp.py']) // 온습도 센서
    dht11_result.stdout.on('data',function(data) {
        dht11_value = (data.toString());
        console.log("dht11: " + dht11_value);
    });

    const ultra_result = spawn('python3',['/home/pi/ultra_1.py']) // 초음파 센서
    ultra_result.stdout.on('data',function(data) {
        ultra1_distance = parseFloat(data.toString());
        console.log("ultra1: " + ultra_distance);
    });

}, 3000);

//배출구

app.listen(8811,function(){
    console.log('sever started at 8811')
})
