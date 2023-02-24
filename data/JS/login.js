
  let storedUsername = "Donald"
  let storedPassword = "Duck"

console.log('*****')

function checkInput(){
  let username = document.getElementById('username').value
  let password = document.getElementById('password').value
console.log('username = ' + username )
console.log('password = '+ password)
  if (username == storedUsername && password == storedPassword) {
    console.log(username + "is logged in !!")
    document.location.href= "data/Pages/settings.html"
    console.log(username + "is logged in !!")
  }
  else {
    alert("Either Username or Password is incorrect");
  }

}
// 