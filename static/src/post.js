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
  linkVal.innerHTML = 'click here'
  link.appendChild(linkVal)
  container.appendChild(link)
}

const createContainerDiv = (container, element) => {
  createTextDiv(element, 'author', container)
  createTextDiv(element, 'title', container)
  if (element.text !== null) createTextDiv(element, 'text', container)
  if (element.link !== null) createLinkField(element, container)
  return container
}

const showPost = postObj => createContainerDiv(document.getElementById('postContainer'), postObj)

const showComments = commentsList => commentsList.forEach(comment => createContainerDiv(document.getElementById('commentContainer'), commentsList))

const getPost = () => {
  let xhr = new XMLHttpRequest()
  let url = window.location.href
  let queryString = url.slice(url.indexOf('?') + 1)
  xhr.open('GET', 'http://localhost:5000/api/post/show?userName=' + sessionStorage.name + '&userID=' + sessionStorage.id + '&' + queryString, true)
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

window.addEventListener('load', getPost)
