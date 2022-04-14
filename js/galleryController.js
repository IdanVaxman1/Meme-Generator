'use strict'


function renderGallery() {
    let elGallery = document.querySelector('.gallery')  
    const strHTMLs = gImgs.map(img => {
       return `<img onclick="onImgSelect(${img.id})" src="${img.url}">`
    })    
    elGallery.innerHTML = strHTMLs.join('')
}



function onImgSelect(id) {
    document.querySelector('.gallery').hidden = true
    document.querySelector('.editor').style.display = 'grid'

    setImg(id)
    RenderMeme()
}