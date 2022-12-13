console.log("index.js 로드")

function articleDetail(article_id) {
    window.location.href = `${frontend_base_url}/article_detail.html?article_id=${article_id}`
}


window.onload = async function loadArticles() {
    articles = await getArticles()
    console.log(articles)

    const article_list = document.getElementById("article-list")

    articles.forEach(article => {
        const newCol = document.createElement("div");
        newCol.setAttribute("class", "col")
        newCol.setAttribute("onclick", `articleDetail(${article.pk})`)

        const newCard = document.createElement("div")
        newCard.setAttribute("class", "card")
        newCard.setAttribute("id", article.pk)

        newCol.appendChild(newCard)

        const articleImage = document.createElement("img")
        articleImage.setAttribute("class", "card-img-top")

        if (article.image) {
            articleImage.setAttribute("src", `${backend_base_url}${article.image}`)
        } else {
            articleImage.setAttribute("src", "https://media.istockphoto.com/id/464629385/photo/seoul-skyline.jpg?s=612x612&w=0&k=20&c=Wo9LYxk6L9z0VORPkMxjubMcAZfWAJtRJWVfiJR8jmw=")
        }


        newCard.appendChild(articleImage)

        const newCardBody = document.createElement("div")
        newCardBody.setAttribute("class", "card-body")
        newCard.appendChild(newCardBody)


        const newCardTitle = document.createElement("h5")
        newCardTitle.setAttribute("class", "card-title")
        newCardTitle.innerText = article.title
        newCardBody.appendChild(newCardTitle)



        article_list.appendChild(newCol)


    }

    );

}