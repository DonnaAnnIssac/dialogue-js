let postBtn = document.getElementById('postBtn')
let postContainer = document.getElementById('allPosts')
let inputList = document.querySelectorAll('input')

inputList.forEach((element) => {
  element.addEventListener('click', () => {
    element.value = ''
  })
})
const addPostContents = () => {
  let postContents = {}
  postContents['author'] = sessionStorage.name
  postContents['author_id'] = sessionStorage.id
  postContents['title'] = document.getElementById('title').value
  postContents['text'] = document.getElementById('description').value
  postContents['link'] = document.getElementById('link').value
}

const createPost = () => {
  let postContents = addPostContents()
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:5000/api/post/create', true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(postContents))
  let post = document.createElement('div')
  post = createPostDiv(post, postContents)
  postContainer.appendChild(post)
}

const showPost = (id) => {
}

const createTextDiv = (element, fieldName) => {
  let field = document.createElement('div')
  field.textContent = element[fieldName]
  return field
}

const createLinkField = (element) => {
  let link = document.createElement('div')
  let linkVal = document.createElement('a')
  linkVal.setAttribute('href', element.link)
  linkVal.setAttribute('target', '_blank')
  linkVal.innerHTML = 'click here'
  link.appendChild(linkVal)
  return link
}

const createPostDiv = (post, element) => {
  let author = createTextDiv(element, 'author')
  post.appendChild(author)
  let title = createTextDiv(element, 'title')
  post.appendChild(title)
  if (element.text !== null) {
    let text = createTextDiv(element, 'text')
    post.appendChild(text)
  }
  if (element.link !== null) {
    let link = createLinkField(element)
    post.appendChild(link)
  }
  post.setAttribute('id', element._id)
  post.addEventListener('click', (post.id) => {
    window.location.href = 'post.html?id=' + post.id})
  return post
}

const listPosts = (list, container) => {
  list.forEach((element) => {
    let post = document.createElement('div')
    post = createPostDiv(post, element)
    container.appendChild(post)
  })
  return container
}

const loadPosts = () => {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:5000/api/post/', true)
  xhr.send()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) postContainer = listPosts(JSON.parse(xhr.responseText).data, postContainer)
  }
}

postBtn.addEventListener('click', createPost)
window.addEventListener('load', loadPosts)
