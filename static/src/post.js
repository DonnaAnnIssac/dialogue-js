const createTextDiv = (element, fieldName, container) => {
  let field = document.createElement('div')
  field.textContent = element[fieldName]
  container.appendChild(field)
}

const createLinkField = (element, container) => {
  let link = document.createElement('div')
  let linkVal = document.createElement('a')
  linkVal.setAttribute('href', element.link)
  linkVal.setAttribute('target', '_blank')
  linkVal.innerHTML = element.link
  link.appendChild(linkVal)
  container.appendChild(link)
}

const createContainerDiv = (container, element) => {
  createTextDiv(element, 'author', container)
  createTextDiv(element, 'title', container)
  if (element.text.length !== 0) createTextDiv(element, 'text', container)
  if (element.link.length !== 0) createLinkField(element, container)
}

const showPost = postObj => createContainerDiv(document.getElementById('postContainer'), postObj)

const showComments = commentsList => commentsList.forEach(comment => createContainerDiv(document.getElementById('commentContainer'), comment))

const getPost = () => {
  let xhr = new XMLHttpRequest()
  let url = window.location.href
  let queryString = url.slice(url.indexOf('?') + 1)
  xhr.open('GET', 'http://localhost:5000/api/post/show?' + queryString, true)
  xhr.send()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') {
        let postDetails = JSON.parse(xhr.responseText).data
        showPost(postDetails.post)
        showComments(postDetails.comments)
      } else window.location.href = 'index.html'
    }
  }
}

const createCommentDiv = (container, element) => {
  createTextDiv(element, 'author', container)
  if (element.text !== null) createTextDiv(element, 'text', container)
  if (element.link !== null) createLinkField(element, container)
}

const createCommentObj = () => {
  let comment = {}
  comment['text'] = document.getElementById('commentText').value
  comment['link'] = document.getElementById('commentLink').value
  comment['author'] = sessionStorage.name
  comment['author_id'] = sessionStorage.id
  let url = window.location.href
  comment['post_id'] = url.slice(url.indexOf('=') + 1)
  document.getElementById('commentText').value = ''
  document.getElementById('commentLink').value = ''
  return comment
}

const addComment = (comment, createCommentDiv) => {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:5000/api/comment/create', true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(comment))
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') createCommentDiv(document.getElementById('commentContainer'), comment)
    }
  }
}

document.getElementById('add').addEventListener('click', () => {
  addComment(createCommentObj(), createCommentDiv)
})

window.addEventListener('load', getPost)
