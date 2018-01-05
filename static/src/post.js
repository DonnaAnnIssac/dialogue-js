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

const createTextContainer = (element, container) => {
  let textContainer = document.createElement('div')
  createTextDiv(element, 'author', textContainer)
  createTextDiv(element, 'title', textContainer)
  if (element.text.length !== 0) createTextDiv(element, 'text', textContainer)
  if (element.link.length !== 0) createLinkField(element, textContainer)
  container.appendChild(textContainer)
}

const upvote = (postID, voteCount) => {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:7000/api/comment/upvote', true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify({'id': postID}))
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') voteCount.textContent = parseInt(voteCount.textContent) + 1
      else window.location.href = 'index.html'
    }
  }
}

const downvote = (postID, voteCount) => {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:7000/api/comment/downvote', true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify({id: postID}))
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') voteCount.textContent = parseInt(voteCount.textContent) + 1
      else window.location.href = 'index.html'
    }
  }
}

const createVoteDiv = (element, vote, container) => {
  let voteDiv = document.createElement('div')
  let voteBtn = document.createElement('button')
  voteBtn.style.background = (vote === 'upVote') ? 'url(../images/upvote.png) no-repeat' : 'url(../images/downvote.png) no-repeat'
  voteBtn.style.backgroundSize = 'contain'
  voteDiv.appendChild(voteBtn)
  let voteCount = document.createElement('div')
  voteCount.textContent = element[vote]
  voteDiv.appendChild(voteCount)
  if (vote === 'upVote') {
    voteBtn.addEventListener('click', (event) => {
      event.stopPropagation()
      upvote(element._id, voteCount)
    })
  } else {
    voteBtn.addEventListener('click', (event) => {
      event.stopPropagation()
      downvote(element._id, voteCount)
    })
  }
  voteDiv.style.display = 'flex'
  voteDiv.style.flexDirection = 'row'
  container.appendChild(voteDiv)
}

const createVoteContainer = (element, container) => {
  let voteContainer = document.createElement('div')
  createVoteDiv(element, 'upVote', voteContainer)
  createVoteDiv(element, 'downVote', voteContainer)
  container.appendChild(voteContainer)
}

const deleteElement = (element) => {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:7000/api/post/remove', true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify({id: element._id}))
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') getPost()
      else window.location.href = 'index.html'
    }
  }
}

const createOpsDiv = (element, container) => {
  let opsDiv = document.createElement('div')
  // let edit = document.createElement('button')
  // edit.style.background = 'url(../images/edit.png) no-repeat'
  // edit.style.backgroundSize = 'contain'
  // opsDiv.appendChild(edit)
  let deleteBtn = document.createElement('button')
  deleteBtn.style.background = 'url(../images/delete.png) no-repeat'
  deleteBtn.style.backgroundSize = 'contain'
  deleteBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    deleteElement(element)
  })
  opsDiv.appendChild(deleteBtn)
  opsDiv.className = 'col-sm-1'
  // opsDiv.style.flexDirection = 'column'
  opsDiv.style.flex = '1'
  opsDiv.style.display = (element.author_id === sessionStorage.id) ? 'flex' : 'none'
  container.appendChild(opsDiv)
}

const createContainerDiv = (type, mainContainer, element) => {
  let container = document.createElement('div')
  container.className = 'card'
  createTextContainer(element, container)
  createVoteContainer(element, container)
  if (type === 'comment') createOpsDiv(element, container)
  container.style.display = 'flex'
  container.style.flexDirection = 'row'
  mainContainer.appendChild(container)
  mainContainer.className = 'cardBody'
}

const showPost = postObj => createContainerDiv('post', document.getElementById('postContainer'), postObj)

const showComments = commentsList => commentsList.forEach(comment => createContainerDiv('comment', document.getElementById('commentContainer'), comment))

const getPost = () => {
  let xhr = new XMLHttpRequest()
  let url = window.location.href
  let queryString = url.slice(url.indexOf('?') + 1)
  xhr.open('GET', 'http://localhost:7000/api/post/show?' + queryString, true)
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
  console.log(sessionStorage.id)
  comment['author_id'] = sessionStorage.id
  let url = window.location.href
  comment['post_id'] = url.slice(url.indexOf('=') + 1)
  document.getElementById('commentText').value = ''
  document.getElementById('commentLink').value = ''
  return comment
}

const addComment = (comment, createCommentDiv) => {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:7000/api/comment/create', true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(comment))
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') createCommentDiv(document.getElementById('commentContainer'), comment)
    }
  }
}

document.getElementById('home').addEventListener('click', () => { window.location.href = './myFeed.html' })
document.getElementById('add').addEventListener('click', () => {
  addComment(createCommentObj(), createCommentDiv)
})

window.addEventListener('load', getPost)
