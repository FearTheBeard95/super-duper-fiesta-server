function fetchPhotos() {
    let dataGallery = {}
    fetch('/gallery/60f5df38fdd0051d5c3d2371').then((response) => {
        response.json().then((data) => {
            const html = data.photos.map((photo) => {
                return `<div class="col-lg-4 col-md-6 portfolio-item filter-app">
                            <div class="portfolio-wrap">
                            <img src="/photos/${photo._id}" class="img-fluid" alt="">
                            <div class="portfolio-info">
                                <div class="portfolio-links">
                                <a href="/photos/${photo._id}" data-gallery="portfolioGallery" class="portfokio-lightbox" title="App 1"><i class="bi bi-zoom-in"></i></a>
                                </div>
                            </div>
                            </div>
                        </div>`
            })
            .join("")
            document.querySelector('#portfolio1').insertAdjacentHTML("beforeend",`<div class="row gy-4 portfolio-container" data-aos="fade-up" data-aos-delay="200">`+html+`</div>`)
        })
    })

    fetch('/gallery/60f5df4dfdd0051d5c3d2372').then((response) => {
        response.json().then((data) => {
            const html = data.photos.map((photo) => {
                return `<div class="col-lg-4 col-md-6 portfolio-item filter-app">
                            <div class="portfolio-wrap">
                            <img src="/photos/${photo._id}" class="img-fluid" alt="">
                            <div class="portfolio-info">
                                <div class="portfolio-links">
                                <a href="/photos/${photo._id}" data-gallery="portfolioGallery" class="portfokio-lightbox" title="App 1"><i class="bi bi-zoom-in"></i></a>
                                </div>
                            </div>
                            </div>
                        </div>`
            })
            .join("")
            document.querySelector('#portfolio2').insertAdjacentHTML("beforeend",`<div class="row gy-4 portfolio-container" data-aos="fade-up" data-aos-delay="200">`+html+`</div>`)
        })
    })

    fetch('/gallery/60f5df15fdd0051d5c3d2370').then((response) => {
        response.json().then((data) => {
            const html = data.photos.map((photo) => {
                return `<div class="col-lg-4 col-md-6 portfolio-item filter-app">
                            <div class="portfolio-wrap">
                            <img src="/photos/${photo._id}" class="img-fluid" alt="">
                            <div class="portfolio-info">
                                <div class="portfolio-links">
                                <a href="/photos/${photo._id}" data-gallery="portfolioGallery" class="portfokio-lightbox" title="App 1"><i class="bi bi-zoom-in"></i></a>
                                </div>
                            </div>
                            </div>
                        </div>`
            })
            .join("")
            document.querySelector('#portfolio3').insertAdjacentHTML("beforeend",`<div class="row gy-4 portfolio-container" data-aos="fade-up" data-aos-delay="200">`+html+`</div>`)
        })
    })
}

                
      
              