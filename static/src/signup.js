let name = document.getElementById('name')
let pass = document.getElementById('pwd')
let confirm = document.getElementById('confPwd')

const createUser = () => {
  if (pass.value === confirm.value) {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:5000/api/user/signup', true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(JSON.stringify({'userName': name.value, 'password': pass.value}))
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (JSON.parse(xhr.responseText).status === 'success') window.location.replace('index.html')
        else document.getElementById('signupError').innerText = JSON.parse(xhr.responseText).data
      }
    }
  } else {
    pass.value = ''
    confirm.value = ''
    document.getElementById('signupError').innerText = 'Conflict in confirming passwords. Enter password again'
  }
}

document.querySelector('button').addEventListener('click', createUser)
