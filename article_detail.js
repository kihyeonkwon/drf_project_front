console.log("디테일 js 로드")


window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('article_id');
    console.log(articleId)

    const response = await getArticle(articleId);
    console.log(response)





}