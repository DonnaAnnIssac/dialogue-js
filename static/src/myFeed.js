let postBtn = document.getElementById('postBtn')
let postContainer = document.getElementById('allPosts')
let inputList = document.querySelectorAll('input')

inputList.forEach((element) => {
  element.addEventListener('click', () => {
    element.value = ''
  })
})

const createLinkField = (element, container) => {
  let link = document.createElement('div')
  let linkVal = document.createElement('a')
  linkVal.setAttribute('href', element.link)
  linkVal.setAttribute('target', '_blank')
  linkVal.innerHTML = 'click here'
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
  post.addEventListener('click', () => {
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

const createPost = () => {
  document.querySelectorAll('input').forEach(element => {
    element.value = ''
    element.blur()
  })
  let postContents = addPostContents()
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:5000/api/post/create', true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(postContents))
  let post = document.createElement('div')
  postContainer.appendChild(createPostDiv(post, postContents))
}

const listPosts = (list, container) => {
  list.forEach((element) => {
    let post = document.createElement('div')
    post = createPostDiv(post, element)
    container.appendChild(post)
  })
}

const loadPosts = () => {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:5000/api/post/?id=' + sessionStorage.id + '&userName=' + sessionStorage.name, true)
  xhr.send()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') listPosts(JSON.parse(xhr.responseText).data, postContainer)
      else window.location.href = 'index.html'
    }
  }
}

postBtn.addEventListener('click', createPost)
window.addEventListener('load', loadPosts)
