panelBody = document.querySelector('form')
function start() {
    request()
    addUser()
}
start()

function request() {
    let xhttp = new XMLHttpRequest;
    xhttp.onload = function () {
        let x = JSON.parse(this.responseText)
            Render(x)
    }
    xhttp.open('GET', "https://60cc3ad771b73400171f742d.mockapi.io/api/v2/user")
    xhttp.send()
}
// render function
function Render(datas) {
  let renderData=datas.map(datax => {
                                return `<tr class="user user-${datax.id}">
                                    <td>${datax.id}</td>
                                    <td>${datax.createdAt}</td>
                                    <td>${datax.name}</td>
                                    <td>${datax.avatar}</td>
                                    <td>
                                    <button onclick = "delUser(${datax.id})" class="btn btn-info">DELETE</button>
                                     <button onclick = "editUser(${datax.id})" class="btn btn-danger">EDIT</button>
                                    </td>

                                </tr>`
    })
    document.querySelector('tbody').innerHTML = renderData.join('')
}
// addRequest function
function requestCreatUser(obj) {
    let xhttp = new XMLHttpRequest;
    xhttp.open('POST', "https://60cc3ad771b73400171f742d.mockapi.io/api/v2/user")
    xhttp.setRequestHeader('Content-Type', 'application/json')
    xhttp.send(JSON.stringify(obj))
    request()
}
function addUser() {
    buttonElement = document.querySelector('.btn-info');
   buttonElement.addEventListener('click', () => {
       createdAt= document.getElementById('create').value
       name = document.getElementById('name').value
       avatar = document.getElementById('avatar').value

        let objectUser = {
            createdAt: createdAt,
            name: name,
            avatar: avatar
        } 
        requestCreatUser(objectUser)
   })
}
// Delete User
function delUser(idDel) {
    let xhttp = new XMLHttpRequest;
    xhttp.open('DELETE', `https://60cc3ad771b73400171f742d.mockapi.io/api/v2/user/${idDel}`)
    xhttp.send()
    request()
    
}

// Edit user 
function editUser(idEdit) {
    let x = document.querySelector(`.user-${idEdit}`)
    let creat = x.children[1].textContent
    let name = x.children[2].textContent
    let avatar = x.children[3].textContent
    document.querySelector('.panel-body').innerHTML = `<label for="">CREAT</label>
                                                        <input type="tel" id="create" class="form-control" value="${creat}">
                                                        <label for="">NAME</label>
                                                        <input type="tel" id="name" class="form-control" value="${name}">
                                                        <label for="">AVATAR</label>
                                                        <input type="tel" id="avatar" class="form-control" value="${avatar}">
                                                        <div class="btn-sumit">
                                                            <button type="submit" onclick = "update(${idEdit})" type="button" class="btn btn-success mt-5">UPDATE</button>
                                                        </div>`
} 
// Update function
function isUpdate(obj, idUpdate) {
    let xhttp = new XMLHttpRequest;
    console.log(`https://60cc3ad771b73400171f742d.mockapi.io/api/v2/user/${idUpdate}`)
    xhttp.open('PUT', `https://60cc3ad771b73400171f742d.mockapi.io/api/v2/user/${idUpdate}`)
    xhttp.setRequestHeader('Content-Type', 'application/json')
    xhttp.send(JSON.stringify(obj))
        request()
}
function update(idUpdate) {
    console.log(idUpdate)
    createdAt = document.getElementById('create').value
    name = document.getElementById('name').value
    avatar = document.getElementById('avatar').value
    let objectUser = {
        createdAt: createdAt,
        name: name,
        avatar: avatar
    }
    isUpdate(objectUser, idUpdate)
    document.querySelector('.panel-body').innerHTML = `
                    <label for="">CREATEDAT</label>
                    <input type="tel" id="create" class="form-control" placeholder="">
                    <label for="">NAME</label>
                    <input type="tel" id="name" class="form-control">
                    <label for="">AVATAR</label>
                    <input type="tel" id="avatar" class="form-control">
                    <div class="btn-sumit">
                        <button type="button" class="btn btn-info mt-5">CREATUSER</button>
                    </div>
                    `
}
