const frontend_base_url = "http://127.0.0.1:5500"
const backend_base_url = "http://127.0.0.1:8000"

window.onload = () => {
    console.log("로딩되었음")
}

async function handleSignin() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password)


    const response = await fetch(`${backend_base_url}/users/signup/`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })

    return response


}

async function handleLogin() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })


    if (response.status == 200) {

        const response_json = await response.json()
        console.log(response)
        console.log(response_json)

        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);



        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);
        alert("환영합니다!")
        window.location.replace(`${frontend_base_url}/`)

    } else {
        alert("회원정보가 일치하지 않습니다!")
    }




}




async function handleMock() {
    const response = await fetch(`${backend_base_url}/users/mock/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })

    console.log(response)
}


function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.reload()

}

function checkLogin() {
    const payload = localStorage.getItem("payload");
    if (payload) {
        window.location.replace(`${frontend_base_url}/`)
    }
}

async function getArticles() {
    const response = await fetch(`${backend_base_url}/articles/`)


    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는데 실패했습니다")
    }
}


async function postArticle() {
    const title = document.getElementById("title").value
    const content = document.getElementById("content").value
    const image = document.getElementById("image").files[0]

    const formdata = new FormData();

    formdata.append('title', title)
    formdata.append('content', content)
    formdata.append('image', image)

    let token = localStorage.getItem("access")


    const response = await fetch(`${backend_base_url}/articles/`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formdata
    }
    )



    if (response.status == 200) {
        alert("글작성 완료!")
        window.location.replace(`${frontend_base_url}/`);
    } else {
        alert(response.status)
    }


}


async function getArticle(articleId) {
    const response = await fetch(`${backend_base_url}/articles/${articleId}/`,
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}




async function getComments(articleId) {
    const response = await fetch(`${backend_base_url}/articles/${articleId}/comment/`,
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}


async function postComment(articleId, newComment) {

    let token = localStorage.getItem("access")


    const response = await fetch(`${backend_base_url}/articles/${articleId}/comment/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "content": newComment,
        })
    }
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }
}