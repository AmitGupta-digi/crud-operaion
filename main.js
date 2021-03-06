
var url = 'http://localhost:3000/posts';

function show() {
    let output = document.getElementById("table");
    output.innerHTML = "";
    fetch(url)
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => {
            let output = document.getElementById("table");
            data.map((item) => {
                console.log(item);
                output.innerHTML += `                  
                       <tr>
                        <td>${item.id}</td>
                        <td class="nam">${item.name} </td>
                        <td class="ema">${item.email}</td>
                        <td><button onClick=load('${item.id}','${item.name}','${item.email}')> EDIT</button></td>
                            <td><button onclick="delet(${item.id})"> DELETE</button></td>                                               
                        </tr>`
            })
        })
}

function addfun() {
    var data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        // contact: document.getElementById("contact").value,
    }
    params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
    }
    fetch(url, params)
        .then(response => response.json())
        .then(data => console.log(data));
    show();
}

function load(id, name, email) {
    var myname = prompt("Enter Name :", name);
    var myemail = prompt("Enter Name :", email);
    if (myname == null) {
        myname = name;
    }
    if (myemail == null) {
        myemail = email;
    }
    var data = {
        name: myname,
        email: myemail
        // contact: document.getElementById("contact").value,
    }
    params = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
    }
    fetch(`${url}/${id}`, params)
        .then(response => response.json())
        .then(data => console.log(data));
    show();
}

function delet(id) {
    console.log(id);
    fetch(`${url}/${id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(data => console.log(data))
}
show();
