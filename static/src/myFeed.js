let postBtn = document.getElementById('postBtn')
let postContainer = document.getElementById('allPosts')
let logoutBtn = document.getElementById('signout')
let myPosts = document.getElementById('myPosts')
let homeBtn = document.getElementById('home')

const upvote = (postID, voteCount) => {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:7000/api/post/upvote', true)
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
  xhr.open('POST', 'http://localhost:7000/api/post/downvote', true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify({id: postID}))
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') voteCount.textContent = parseInt(voteCount.textContent) + 1
      else window.location.href = 'index.html'
    }
  }
}

const deletePost = (postObj) => {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:7000/api/post/remove', true)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify({id: postObj._id}))
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') loadPosts()
      else window.location.href = 'index.html'
    }
  }
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

const createVoteDiv = (element, vote, container) => {
  let voteDiv = document.createElement('div')
  let voteBtn = document.createElement('button')
  voteBtn.style.background = (vote === 'upVote') ? 'url(../images/upvote.png) no-repeat' : 'url(../images/downvote.png) no-repeat'
  voteBtn.style.backgroundSize = 'contain'
  let voteCount = document.createElement('div')
  voteCount.textContent = element[vote]
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
  voteDiv.appendChild(voteBtn)
  voteDiv.appendChild(voteCount)
  voteDiv.style.display = 'flex'
  voteDiv.style.flexDirection = 'row'
  voteDiv.style.flex = '1'
  container.appendChild(voteDiv)
}

const createTextDiv = (element, fieldName, container) => {
  let field = document.createElement('div')
  field.textContent = element[fieldName]
  container.appendChild(field)
}

const createTextContainer = (postObj, container) => {
  let textContainer = document.createElement('div')
  createTextDiv(postObj, 'author', textContainer)
  createTextDiv(postObj, 'title', textContainer)
  if (postObj.text !== null) createTextDiv(postObj, 'text', textContainer)
  if (postObj.link !== null) createLinkField(postObj, textContainer)
  textContainer.className = 'col-sm-8'
  textContainer.style.flex = '5'
  container.appendChild(textContainer)
}

const createVoteContainer = (postObj, container) => {
  let voteContainer = document.createElement('div')
  createVoteDiv(postObj, 'upVote', voteContainer)
  createVoteDiv(postObj, 'downVote', voteContainer)
  voteContainer.className = 'col-sm-2'
  voteContainer.style.flex = '1'
  container.appendChild(voteContainer)
}

const createDeleteDiv = (container, postObj) => {
  let deleteBtn = document.createElement('button')
  deleteBtn.style.background = 'url(../images/delete.png) no-repeat'
  deleteBtn.style.backgroundSize = 'contain'
  deleteBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    deletePost(postObj)
  })
  deleteBtn.style.flex = '1'
  container.appendChild(deleteBtn)
}

const createOpsDiv = (postObj, container) => {
  let opsDiv = document.createElement('div')
  createDeleteDiv(opsDiv, postObj)
  opsDiv.className = 'col-sm-1'
  opsDiv.style.flexDirection = 'column'
  opsDiv.style.flex = '1'
  opsDiv.style.display = (postObj.author_id === sessionStorage.id) ? 'flex' : 'none'
  container.appendChild(opsDiv)
}

const createPostDiv = (mainContainer, postObj) => {
  let container = document.createElement('div')
  container.className = 'cardBody'
  createTextContainer(postObj, container)
  createVoteContainer(postObj, container)
  createOpsDiv(postObj, container)
  container.style.display = 'flex'
  container.style.flexDirection = 'row'
  container.setAttribute('id', postObj._id)
  container.addEventListener('click', (event) => {
    event.stopPropagation()
    window.location.href = 'post.html?id=' + postObj._id
  })
  mainContainer.appendChild(container)
  return mainContainer
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
  document.querySelectorAll('textarea').forEach(element => {
    element.value = ''
    element.blur()
  })
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:7000/api/post/create', true)
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
    post.className = 'card'
    post = createPostDiv(post, element)
    container.appendChild(post)
  })
}

const loadPosts = () => {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:7000/api/post', true)
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
  xhr.open('GET', 'http://localhost:7000/api/user/signout', true)
  xhr.send()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') window.location.href = 'index.html'
    }
  }
}

const getMyPosts = () => {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:7000/api/post/mine', true)
  xhr.send()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      if (JSON.parse(xhr.responseText).status === 'success') listPosts(JSON.parse(xhr.responseText).data, postContainer)
      else window.location.href = 'index.html'
    }
  }
}

homeBtn.addEventListener('click', loadPosts)
myPosts.addEventListener('click', getMyPosts)
logoutBtn.addEventListener('click', signout)
postBtn.addEventListener('click', (event) => {
  event.stopPropagation()
  createPost(addPostContents())
})
window.addEventListener('load', loadPosts)
