// // Called after form input is processed
// let heater = 0;
// let coolSide;
// let outSide;
// startConnect();
// function startConnect() {
//   console.log("startConnect()");
//   // Generate a random client ID
//   clientID = "clientID-" + parseInt(Math.random() * 100);

//   // Initialize new Paho client connection
//   client = new Paho.MQTT.Client("test.mosquitto.org", Number(8080), clientID);

//   //Set callback handlers
//   client.onConnectionLost = onConnectionLost;
//   client.onMessageArrived = onMessageArrived;

//   // Connect the client, if successful, call onConnect function
//   client.connect({
//     onSuccess: onConnect,
//   });
// }

// // Called when the client connects
// function onConnect() {
//   console.log("connected");

//   // Subscribe to the requested topic
//   heater = client.subscribe("heater");
//   coolSide = client.subscribe("coolSide");
//   outSide = client.subscribe("outSide");
//   //console.log(outSide);
// }

// // Called when the client loses its connection
// function onConnectionLost(responseObject) {
//   console.log("onConnectionLost: Connection Lost");
//   if (responseObject.errorCode !== 0) {
//     console.log("onConnectionLost: "); //+ responseObject.errorMessage
//   }
//   startConnect();
// }

// // Called when a message arrives
// function onMessageArrived(message) {
//   if (message.destinationName === "heater") {
//     heater = message.payloadString;
//     value = heater;
//     setGaugeValue(gaugeElement, value);
//   } else if (message.destinationName === "coolSide") {
//     coolSide = message.payloadString;
//     value = coolSide;
//     setGauge1Value(gauge1Element, value);
//   } else if (message.destinationName === "outSide") {
//     outSide = message.payloadString;
//     value = outSide;
//     setGauge2Value(gauge2Element, value);
//   }
// }

// // Called when the disconnection button is pressed
// function startDisconnect() {
//   client.disconnect();
//   console.log("diconnected");
// }

// /*******************************
//  *       update guages         *
//  *           start             *
//  * *****************************/

// const gaugeElement = document.querySelector(".gauge");
// const gauge1Element = document.querySelector(".gauge1");
// const gauge2Element = document.querySelector(".gauge2");

// /*******************************
//  *       update guages          *
//  *             end              *
//  *******************************/

// function setGaugeValue(gauge, value) {
//   if (value < -5 || value > 50) {
//     return;
//   }
//   value = Math.floor(heater);
//   gauge.querySelector(".gauge__fill").style.transform = `rotate(${
//     value / 22
//   }turn)`;
//   gauge.querySelector(".gauge__cover").textContent = `${Math.round(value)}`;
// }
// function setGauge1Value(gauge1, value) {
//   if (value < 0 || value > 50) {
//     return;
//   }
//   gauge1.querySelector(".gauge__fill1").style.transform = `rotate(${
//     value / 80
//   }turn)`;
//   gauge1.querySelector(".gauge__cover1").textContent = `${Math.round(value)}`;
// }
// function setGauge2Value(gauge2, value) {
//   if (value < 0 || value > 50) {
//     return;
//   }
//   //   let night_temp = localStorage.getItem('night_temp');
//   // value = (Math.floor(night_temp));

//   gauge2.querySelector(".gauge__fill2").style.transform = `rotate(${
//     value / 80
//   }turn)`;
//   gauge2.querySelector(".gauge__cover2").textContent = `${Math.round(value)}`;
// }

// setGaugeValue(gaugeElement, 0.3);
// setGauge1Value(gauge1Element, 0.3);
// setGauge2Value(gauge2Element, 0.3);
