function fetchData(type) {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    const pageNumber = parseInt(page) || 0
    fetch(`/documents?type=${type}&skip=${pageNumber*4}`).then((response) => {
        response.json().then((data) => {
            const html = data.documents.map((doc) => {
                const date = new Date(doc.date)
                const fullDate = months[date.getMonth()]+" "+date.getFullYear()
                return `<article class="entry">

                            <h2 class="entry-title">
                                <a href="/document/file/${doc._id}">${doc.title}</a>
                            </h2>
                            <div class="entry-meta">
                                <ul>
                                <li class="d-flex align-items-center"><i class="bi bi-clock"></i><time>${fullDate}</time></li>
                                </ul>
                            </div>               
                            <div class="entry-content">
                                <p>
                                ${doc.abstract}
                                </p>
                                <div class="read-more">
                                    <a href="/document/file/${doc._id}">Read More</a>
                                </div>
                            </div>
            
                    </article>`
            })
            .join("")

            let pagination = []
            for (let i = 0; i < Math.round(data.count/4); i++) {
                pagination.push(`<li><a href="?page=${i}">${i+1}</a></li>`)
            }
            const paginationHTML = pagination.join("")
            document.querySelector('#pages').innerHTML = paginationHTML
            document.querySelector('#documents').insertAdjacentHTML("afterbegin",html)
        })
    })
}

function search(term, type) {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    const pageNumber = parseInt(page) || 0
    fetch(`/search?type=${type}&term=${term}&skip=${pageNumber*4}`).then((response) => {
        response.json().then((data) => {
            const html = data.documents.map((doc) => {
                return `<article class="entry">

                            <h2 class="entry-title">
                                <a href="/document/file/${doc._id}">${doc.title}</a>
                            </h2>    
                            <div class="entry-content">
                                <p>
                                ${doc.abstract}
                                </p>
                                <div class="read-more">
                                    <a href="/document/file/${doc._id}">Read More</a>
                                </div>
                            </div>
            
                    </article>`
            })
            .join("")

            let pagination = []
            for (let i = 0; i < Math.round(data.count/4); i++) {
                pagination.push(`<li><a href="?page=${i}">${i+1}</a></li>`)
            }
            const paginationHTML = pagination.join("")
            console.log(paginationHTML)
            document.querySelector('#pages').innerHTML = paginationHTML
            document.querySelector('#documents').insertAdjacentHTML("afterbegin",html)
        })
    })
}