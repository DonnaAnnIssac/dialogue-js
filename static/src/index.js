const logIn = () => {
  let name = document.getElementById('name').value
  let pwd = document.getElementById('pwd').value
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:5000/api/user/signin', true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify({'userName': name, 'password': pwd}))
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') {
        sessionStorage.name = JSON.parse(xhr.responseText).data['userName']
        sessionStorage.id = JSON.parse(xhr.responseText).data['id']
        window.location.replace('myFeed.html')
      } else {
        document.getElementById('loginFail').innerText = JSON.parse(xhr.responseText).data
      }
    }
  }
}

document.querySelector('button').addEventListener('click', logIn)
