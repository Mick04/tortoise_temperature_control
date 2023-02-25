let storedUsername = "Donald";
let storedPassword = "Duck";
function checkInput() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (username == storedUsername && password == storedPassword) {
    document.location.href = "settings.html";
  } else {
    alert("Either Username or Password is incorrect");
  }
}
//
