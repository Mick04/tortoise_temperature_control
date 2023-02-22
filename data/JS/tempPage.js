// Called after form input is processed
let heater = 0;
let coolSide;
let outSide;
startConnect();
function startConnect() {
  console.log('startConnect()')
    // Generate a random client ID
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Initialize new Paho client connection
    client = new Paho.MQTT.Client("test.mosquitto.org", Number(8080), clientID);

     //Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({ 
         onSuccess: onConnect,
    });
}

// Called when the client connects
function onConnect() {
  console.log("connected")
   
    // Subscribe to the requested topic
    heater = client.subscribe("heater");
    coolSide = client.subscribe("coolSide");
  outSide = client.subscribe("outSide");
  //console.log(outSide);
  

}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    console.log("onConnectionLost: Connection Lost");
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " );//+ responseObject.errorMessage
    }
  startConnect()
}

// Called when a message arrives
function onMessageArrived(message) {
  console.log("(message.destinationName************* " + (message.destinationName));

  if (message.destinationName === 'heater') {
    heater = message.payloadString;
    value = heater;
    setGaugeValue(gaugeElement, value);
    console.log("heater/////////////// = " + heater );
    console.log("heater arrived" );
  }
  else if (message.destinationName === 'coolSide') {
    coolSide = message.payloadString;
    value = coolSide;
    setGauge1Value(gauge1Element, value);
    console.log("coolSide arrived" );
    console.log("coolSide = "+ coolSide );
  }
  else if (message.destinationName === 'outSide') {
    outSide = message.payloadString;
    value = outSide;
     console.log("outSide arrived" );
     console.log("outSide = "+ outSide );
    setGauge2Value(gauge2Element, value);
   
  }


  console.log("heater///////////////// =  " + heater);
  console.log("coolSide = " + coolSide);
  
  console.log("outSide = " + outSide);
  // console.log("message,,,,,,,,,,,,,,, = ", (message));

}

// Called when the disconnection button is pressed
function startDisconnect() {
  client.disconnect();
  console.log("diconnected")
 }




        /*******************************
         *       update guages         *
         *           start             *
         * *****************************/
  
        const gaugeElement = document.querySelector('.gauge');
        const gauge1Element = document.querySelector('.gauge1');
        const gauge2Element = document.querySelector('.gauge2');

          /*******************************
          *       update guages          *
          *             end              *
          *******************************/
      
        function setGaugeValue(gauge, value) {
          if (value < -5 || value > 50) {
            return;
          }
          // let day_h = localStorage.getItem('day_h');
          //heater = parseFloat(heater);
          //let day_h = heater;
         
    
          value = (Math.floor(heater));
          
        console.log('298 gauge__fill  ' + value);
          console.log('value  ' + value + 'b');  
          gauge.querySelector('.gauge__fill').style.transform = `rotate(${value / 22}turn)`;
          gauge.querySelector('.gauge__cover').textContent = `${Math.round(value )}`;
        }
function setGauge1Value(gauge1, value) {
          console.log('+++++++++++setGauge1Value(gauge1, value)')
  if (value < 0 || value > 50) {
             console.log('+++++++++++value < 0 || value > 60')
            return;
          }
          // let day_temp = localStorage.getItem('day_temp');
          // value = (Math.floor(day_temp));
          console.log('+++++++++++Math.floor(day_temp')
        gauge1.querySelector('.gauge__fill1').style.transform = `rotate(${value / 80}turn)`;
          gauge1.querySelector('.gauge__cover1').textContent = `${Math.round(value)}`;
        }
        function setGauge2Value(gauge2, value) {
          if (value < 0 || value > 50) {
            return;
          }
        //   let night_temp = localStorage.getItem('night_temp');
        // value = (Math.floor(night_temp));
          
          gauge2.querySelector('.gauge__fill2').style.transform = `rotate(${value / 80}turn)`;
          gauge2.querySelector('.gauge__cover2').textContent = `${Math.round(value)}`;
        }
        
 
        setGaugeValue(gaugeElement, 0.3);
        setGauge1Value(gauge1Element, 0.3);
        setGauge2Value(gauge2Element, 0.3);
