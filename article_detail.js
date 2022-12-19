console.log("디테일 js 로드")
let articleId

async function loadComments(articleId) {
    const response = await getComments(articleId);
    console.log(response)

    const commentList = document.getElementById("comment-list")
    commentList.innerHTML = ""
    response.forEach(comment => {

        commentList.innerHTML += `
        <li class="media d-flex mb-3">
        <img class="mr-3" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="프로필 이미지" width="50" height="50">
        <div class="media-body">
          <h5 class="mt-0 mb-1">${comment.user}</h5>
          ${comment.content}
        </div>
      </li>
        `

    });


}

async function submitComment() {
    const commentElement = document.getElementById("new-comment")
    const newComment = commentElement.value
    const response = await postComment(articleId, newComment)
    console.log(response)
    commentElement.value = ""

    loadComments(articleId)


}


async function loadArticles(articleId) {
    const response = await getArticle(articleId);

    const articleTitle = document.getElementById("article-title")
    const articleImage = document.getElementById("article-image")
    const articleContent = document.getElementById("article-content")


    articleTitle.innerText = response.title
    articleContent.innerText = response.content
    const newImage = document.createElement("img")


    if (response.image) {
        newImage.setAttribute("src", `${backend_base_url}${response.image}`)
    } else {
        newImage.setAttribute("src", "https://media.istockphoto.com/id/464629385/photo/seoul-skyline.jpg?s=612x612&w=0&k=20&c=Wo9LYxk6L9z0VORPkMxjubMcAZfWAJtRJWVfiJR8jmw=")
    }

    newImage.setAttribute("class", "img-fluid")

    articleImage.appendChild(newImage)


}




window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    articleId = urlParams.get('article_id');
    console.log(articleId)
    await loadArticles(articleId);
    await loadComments(articleId);

}