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

const createContainerDiv = (container, element) => {
  let author = createTextDiv(element, 'author')
  container.appendChild(author)
  let title = createTextDiv(element, 'title')
  container.appendChild(title)
  if (element.text !== null) {
    let text = createTextDiv(element, 'text')
    container.appendChild(text)
  }
  if (element.link !== null) {
    let link = createLinkField(element)
    container.appendChild(link)
  }
  return container
}

const showPost = (postObj) => {
  console.log(postObj)
  let postContainer = document.getElementById('postContainer')
  postContainer = createContainerDiv(postContainer, postObj)
}

const showComments = (commentsList) => {
  let commentsContainer = document.getElementById('commentContainer')
  commentsList.forEach((comment) => {
    commentsContainer = createContainerDiv(commentsList)
  })
}

const getPost = () => {
  let xhr = new XMLHttpRequest()
  let url = window.location.href
  let queryString = url.slice(url.indexOf('?') + 1)
  console.log(queryString)
  xhr.open('GET', 'http://localhost:5000/api/post/show?' + queryString, true)
  xhr.send()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let postDetails = JSON.parse(xhr.responseText)
      console.log(postDetails)
      showPost(postDetails.post)
      showComments(postDetails.comments)
    }
  }
}

window.addEventListener('load', getPost)
