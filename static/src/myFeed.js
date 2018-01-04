let postBtn = document.getElementById('postBtn')
let postContainer = document.getElementById('allPosts')
let logoutBtn = document.getElementById('signout')

const createLinkField = (element, container) => {
  let link = document.createElement('div')
  let linkVal = document.createElement('a')
  linkVal.setAttribute('href', element.link)
  linkVal.setAttribute('target', '_blank')
  linkVal.innerHTML = element.link
  link.appendChild(linkVal)
  container.appendChild(link)
}

const createTextDiv = (element, fieldName, container) => {
  let field = document.createElement('div')
  field.textContent = element[fieldName]
  container.appendChild(field)
}

const createPostDiv = (post, postObj) => {
  createTextDiv(postObj, 'author', post)
  createTextDiv(postObj, 'title', post)
  if (postObj.text !== null) createTextDiv(postObj, 'text', post)
  if (postObj.link !== null) createLinkField(postObj, post)
  post.setAttribute('id', postObj._id)
  post.addEventListener('click', (event) => {
    event.stopPropagation()
    window.location.href = 'post.html?id=' + postObj._id
  })
  return post
}

const addPostContents = () => {
  let postContents = {}
  postContents['author'] = sessionStorage.name
  postContents['author_id'] = sessionStorage.id
  postContents['title'] = document.getElementById('title').value
  postContents['text'] = document.getElementById('description').value
  postContents['link'] = document.getElementById('link').value
  return postContents
}

const createPost = (postContents) => {
  document.querySelectorAll('input').forEach(element => {
    element.value = ''
    element.blur()
  })
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:5000/api/post/create', true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(postContents))
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') loadPosts()
      else window.location.href = 'index.html'
    }
  }
}

const listPosts = (list, container) => {
  while (container.lastChild) container.removeChild(container.lastChild)
  list.forEach((element) => {
    let post = document.createElement('div')
    post = createPostDiv(post, element)
    container.appendChild(post)
  })
}

const loadPosts = () => {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:5000/api/post', true)
  xhr.send()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') listPosts(JSON.parse(xhr.responseText).data, postContainer)
      else window.location.href = 'index.html'
    }
  }
}

const signout = () => {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:5000/api/user/signout', true)
  xhr.send()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') window.location.href = 'index.html'
    }
  }
}

logoutBtn.addEventListener('click', signout)
postBtn.addEventListener('click', (event) => {
  event.stopPropagation()
  createPost(addPostContents)
})
window.addEventListener('load', loadPosts)
