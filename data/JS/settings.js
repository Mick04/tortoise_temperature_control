// let mqtt = require('mqtt')
clientID = "clientID-" + parseInt(Math.random() * 100);
client = new Paho.MQTT.Client("test.mosquitto.org", Number(8080), clientID);
let message;
let connected = false;
const d = new Date();
let hour = d.getHours();
let TargetTemp = 0;
console.log('hour = ' + hour) 
 
startConnect();
function startConnect() {
  console.log('startConnect()')
    // Generate a random client ID
    
    // Initialize new Paho client connection
    
     //Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    // Connect the client, if successful, call onConnect function
    client.connect({ 
         onSuccess: onConnect,
    });
}


function onConnect() {
  console.log("connected");
  connected = true;


    // Subscribe to the requested topic
    heater = client.subscribe("heater");
    coolSide = client.subscribe("coolSide");
    outSide = client.subscribe("outSide");
  TargetTemp = client.subscribe("dayTargetTemp");
  main();
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
  let message1 = message.payloadString
  console.log("(message.destinationName************* " + (message.destinationName));
  console.log(message1);
  //publishSliderValues(destinatioN, slider_value)

}

//call when you need to publish
function publishSliderValues(destinatioN, slider_value) {
  client.subscribe(destinatioN);
  message = new Paho.MQTT.Message(message);
  message.destinationName = destinatioN;
  client.send(message)
  console.log(" pub" + "TargetTemp" + TargetTemp)
  
  //  message = new Paho.MQTT.Message(slider_value);
  // message.destinationName = 'day_h';
  // // client.publish('day_h', message)
  // //mqtt.send(slider_value);
  // console.log('destinatioN = '+ message.destinationName)
  // console.log('fffffffffslider_value = ' + slider_value)
  // let str = JSON.stringify(message);
  // console.log('kkkkkkkkk message = ' + str)
} 

var checkbox = document.getElementById('checkbox');
var change = false;
function checkCheckbox() {
  var output = document.getElementById('myCheckBox');
  if (output.checked == true) {
    value.innerHTML = 'ON';
    change = true;
    client.subscribe("Temp_Control/reset");
  message = new Paho.MQTT.Message("N");
  message.destinationName = "Temp_Control/reset";
  client.send(message)
  } else {
    value.innerHTML = 'OFF';
    change = false;
 client.subscribe("Temp_Control/reset");
  message = new Paho.MQTT.Message("F");
  message.destinationName = "Temp_Control/reset";
  client.send(message)

  }
 
}
function main() {
  const container = document.querySelectorAll('.range-slider');
  for (let i = 0; i < container.length; i++) {
    const slider = container[i].querySelector('.slider');
    const thumb = container[i].querySelector('.slider-thumb');
    const tooltip = container[i].querySelector('.tooltip');
    const progress = container[i].querySelector('.progress');
    console.log('initialise slider')
    if (i == 0) {
      slider.value = localStorage.getItem('day_h');
      console.log('slider.value  day_h  ' + slider.value + '  119');
      tooltip.innerHTML = slider.value;
      //client.publish('day_h',slider.value)
      change = true;
      customSlider();
      change = false;
    }
    if (i == 1) {
      slider.value = localStorage.getItem('day_m');
      console.log('slider.value  ' + slider.value + '  119');
      tooltip.innerHTML = slider.value;
      change = true;
      customSlider();
      change = false;
    }
    if (i == 2) {
      slider.value = localStorage.getItem('day_temp');
      console.log('slider.value  ' + slider.value + '  119');
      tooltip.innerHTML = slider.value;
      if (hour <= 12) {
        TargetTemp = slider.value;
      }
      console.log("**** 130 **** TargetTemp " + TargetTemp)
      change = true;
      customSlider();
      change = false;
    }
    if (i == 3) {
      slider.value = localStorage.getItem('night_h');
      console.log('slider.value  ' + slider.value + '  119');
      tooltip.innerHTML = slider.value;
      change = true;
      customSlider();
      change = false;
    }
    if (i == 4) {
      slider.value = localStorage.getItem('night_m');
      console.log('slider.value  ' + slider.value + '  119');
      tooltip.innerHTML = slider.value;
      change = true;
      customSlider();
      change = false;
    }
    if (i == 5) {
      slider.value = localStorage.getItem('night_temp');
      console.log('slider.value  ' + slider.value + '  119');
      tooltip.innerHTML = slider.value;
      if (hour >= 12) {
        TargetTemp = slider.value;
      }
      change = true;
      customSlider();
      change = false;
    }

    function customSlider() {
      if (change == true) {
        //get the percentage
        const maxVal = slider.getAttribute('max');
        const val = (slider.value / maxVal) * 100 + '%';
        console.log(slider.value + 'i = ' + i + ' ' + ' container.length ' + container.length);
        progress.style.width = val;
        thumb.style.left = val;

        //load all tooltip's with slider value for each value

        if (i == 0) {
          localStorage.setItem('day_h', slider.value);
          let a = localStorage.getItem('day_h');
          console.log('slider.value  ' + slider.value + ' a  = ' + a + '  157');
          tooltip.innerHTML = slider.value;
          if (connected === true) {
            message = slider.value;
            destinatioN = 'day_h'
            publishSliderValues(destinatioN, message)
          }
        }
        if (i == 1) {
          localStorage.setItem('day_m', slider.value);
          tooltip.innerHTML = slider.value;
          if (connected === true) {
            message = slider.value;
            destinatioN = 'day_m'
            publishSliderValues(destinatioN, message)
          }
        }
        if (i == 2) {
          localStorage.setItem('day_temp', slider.value);
          tooltip.innerHTML = slider.value;
          if (connected === true) {
            message = slider.value;
            destinatioN = 'day_temp'
            publishSliderValues(destinatioN, message)
          }
        }
        if (i == 3) {
          localStorage.setItem('night_h', slider.value);
          tooltip.innerHTML = slider.value;
          if (connected === true) {
            message = slider.value;
            destinatioN = 'night_h'
            publishSliderValues(destinatioN, message)
          }
        }
        if (i == 4) {
          localStorage.setItem('night_m', slider.value);
          tooltip.innerHTML = slider.value;
          if (connected === true) {
            message = slider.value;
            destinatioN = 'night_m'
            publishSliderValues(destinatioN, message)
          }
        }
        if (i == 5) {
          localStorage.setItem('night_temp', slider.value);
          tooltip.innerHTML = slider.value;
          if (connected === true) {
            message = slider.value;
            destinatioN = 'night_temp'
            publishSliderValues(destinatioN, message)
          }
        }
      }
    }

    //customSlider();
    //repeat the function when the slider is selected
    slider.addEventListener('input', () => {
      customSlider();
    });
  }
  console.log("")
}
