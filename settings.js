// Generate a random client ID
clientID = "clientID-" + parseInt(Math.random() * 100);
// Initialize new Paho client connection
client = new Paho.MQTT.Client("test.mosquitto.org", Number(8080), clientID);
let message;
let connected = false;
const d = new Date();
let hour = d.getHours();
let TargetTemp = 0;
console.log("hour = " + hour);

startConnect();
function startConnect() {
  console.log("startConnect()");
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
  // heater = client.subscribe("heater");
  // coolSide = client.subscribe("coolSide");
  // outSide = client.subscribe("outSide");
  // TargetTemp = client.subscribe("dayTargetTemp");
  main();
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
  console.log("onConnectionLost: Connection Lost");
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost: "); //+ responseObject.errorMessage
  }
  startConnect();
}

// Called when a message arrives
function onMessageArrived(message) {
  let message1 = message.payloadString;
}

//call when you need to publish
function publishSliderValues(destinatioN, slider_value) {
  client.subscribe(destinatioN);
  message = new Paho.MQTT.Message(message);
  message.destinationName = destinatioN;
  message.retain = true;
  message.qos = 1;
  client.send(message); // or publish
  console.log(" pub" + "TargetTemp" + TargetTemp);
}

var checkbox = document.getElementById("checkbox");
var change = false;
function checkCheckbox() {
  var output = document.getElementById("myCheckBox");
  if (output.checked == true) {
    value.innerHTML = "ON";
    change = true;
    client.subscribe("Temp_Control/reset");
    message = new Paho.MQTT.Message("N");
    message.destinationName = "Temp_Control/reset";
    client.send(message);
  } else {
    value.innerHTML = "OFF";
    change = false;
    client.subscribe("Temp_Control/reset");
    message = new Paho.MQTT.Message("F");
    message.destinationName = "Temp_Control/reset";
    client.send(message);
  }
}

function main() {
  const container = document.querySelectorAll(".range-slider");
  for (let i = 0; i < container.length; i++) {
    const slider = container[i].querySelector(".slider");
    const thumb = container[i].querySelector(".slider-thumb");
    const tooltip = container[i].querySelector(".tooltip");
    const progress = container[i].querySelector(".progress");
    console.log("initialise slider");
    if (i == 0) {
      slider.value = localStorage.getItem("day_h");
      tooltip.innerHTML = slider.value;
      //change = true;
      customSlider();
      //change = false;
    }
    if (i == 1) {
      slider.value = localStorage.getItem("day_m");
      tooltip.innerHTML = slider.value;
      //change = true;
      customSlider();
      //change = false;
    }
    if (i == 2) {
      slider.value = localStorage.getItem("day_temp");
      tooltip.innerHTML = slider.value;
      if (hour <= 12) {
        TargetTemp = slider.value;
      }
      //change = true;
      customSlider();
      //change = false;
    }
    if (i == 3) {
      slider.value = localStorage.getItem("night_h");
      tooltip.innerHTML = slider.value;
      //change = true;
      customSlider();
      //change = false;
    }
    if (i == 4) {
      slider.value = localStorage.getItem("night_m");
      tooltip.innerHTML = slider.value;
      //change = true;
      customSlider();
      //change = false;
    }
    if (i == 5) {
      slider.value = localStorage.getItem("night_temp");
      tooltip.innerHTML = slider.value;
      if (hour >= 12) {
        TargetTemp = slider.value;
      }
      //change = true;
      customSlider();
      //change = false;
    }

    function customSlider() {
      if (change == true) {
        //get the percentage
        const maxVal = slider.getAttribute("max");
        const val = (slider.value / maxVal) * 100 + "%";
        progress.style.width = val;
        thumb.style.left = val;

        //load all tooltip's with slider value for each value

        if (i == 0) {
          localStorage.setItem("day_h", slider.value);
          let a = localStorage.getItem("day_h");
          tooltip.innerHTML = slider.value;
          if (connected === true) {
            message = slider.value;
            destinatioN = "day_h";
            publishSliderValues(destinatioN, message, true);
          }
        }
        if (i == 1) {
          localStorage.setItem("day_m", slider.value);
          tooltip.innerHTML = slider.value;
          if (connected === true) {
            message = slider.value;
            destinatioN = "day_m";
            publishSliderValues(destinatioN, message, true);
          }
        }
        if (i == 2) {
          localStorage.setItem("day_temp", slider.value);
          tooltip.innerHTML = slider.value;
          if (connected === true) {
            message = slider.value;
            destinatioN = "day_temp";
            publishSliderValues(destinatioN, message, true);
          }
        }
        if (i == 3) {
          localStorage.setItem("night_h", slider.value);
          tooltip.innerHTML = slider.value;
          if (connected === true) {
            message = slider.value;
            destinatioN = "night_h";
            publishSliderValues(destinatioN, message, true);
          }
        }
        if (i == 4) {
          localStorage.setItem("night_m", slider.value);
          tooltip.innerHTML = slider.value;
          if (connected === true) {
            message = slider.value;
            destinatioN = "night_m";
            publishSliderValues(destinatioN, message, true);
          }
        }
        if (i == 5) {
          localStorage.setItem("night_temp", slider.value);
          tooltip.innerHTML = slider.value;
          if (connected === true) {
            message = slider.value;
            TargetTemp = slider.value;
            destinatioN = "night_temp";
            publishSliderValues(destinatioN, message, true);
          }
        }
      }
    }

    //repeat the function when the slider is selected
    slider.addEventListener("input", () => {
      customSlider();
    });
  }
  console.log("");
}
