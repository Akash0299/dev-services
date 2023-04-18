function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

const deviceName = "MQ_DEVICE"
var number = "1010"

// 1-1. Publish template sensor data every 3 seconds
schedule('*/3 * * * * *', ()=>{
    let body = {
        "temp": getRandomFloat(-40,85).toFixed(1),
    }
    publish( deviceName+'/room', JSON.stringify(body));
});
// 1-2. Publish humidity sensor data every 3 seconds
schedule('*/3 * * * * *', ()=>{
    let body = {
        "humidity": {"value": getRandomInt(60,80) },
    }
    publish( deviceName+'/room', JSON.stringify(body));
});
// 1-3. Publish room data every 3 seconds
schedule('*/3 * * * * *', ()=>{
    let body = {
        "switch": true,
        "temp": getRandomFloat(-40,85).toFixed(1),
        "humidity": {"value": getRandomInt(60,80) },
    }
    publish( deviceName+'/room', JSON.stringify(body));
});

// 2. Receive the reading request and then return the room number
// reqTemp: "{ \"cmd\":\"number\",\"reqId\":\"${uuid}\" }", jsonPath: "number"
const roomNumberReqTopic = deviceName+'/room/number/req'
const roomNumberResTopic = deviceName+'/room/number/res'
subscribe( roomNumberReqTopic , (topic, val) => {
    var data = val;
    var reqId = data.reqId;
    let body = {
        "number": number,
        "reqId": reqId
    }
    publish( roomNumberResTopic, JSON.stringify(body));
});

// 3. Receive put request and change the room number
const roomNumberTopic = deviceName+'/room/number'
subscribe( roomNumberTopic , (topic, val) => {
    number = val;
});
