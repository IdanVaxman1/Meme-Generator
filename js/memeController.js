'use strict'


function RenderMeme() {
    let meme = getMeme()
    let image = new Image()
    let x, y

    image.src = `imgs/${meme.selectedImgId}.jpg`
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
    meme.lines.forEach((line , idx) => {
        gCtx.font = ` ${line.size}px ${line.font}`
        gCtx.textAlign = `${line.align}`
        gCtx.textBaseline = `${line.baseLine}`
        gCtx.fillStyle = getColor()

        switch (line.baseLine) {
            case 'top':
                y = line.y
                break

            case 'middle':
                y = line.y
                break

            case 'bottom':
                y = line.y
                break
        }
        switch (line.align) {
            case 'left':
                x = 50
                break

            case 'center':
                x = gElCanvas.width / 2
                break

            case 'right':
                x = gElCanvas.width - 50
                break

        }


        gCtx.strokeText(`${line.txt}`, x, y)
        gCtx.fillText(`${line.txt}`, x, y)

        if(idx === meme.selectedLineIdx) {
        let textMetrics = gCtx.measureText(`${meme.lines[meme.selectedLineIdx]}`)
        const {
            actualBoundingBoxLeft: aLeft,
            actualBoundingBoxAscent: aAscent,
            actualBoundingBoxDescent: aDescent,
            width: textWidth
        } = textMetrics
        const startX = x - aLeft - 5
        const startY = y - aAscent - 5
        const width = textWidth + 2 * 5
        const height = aDescent + aAscent + 2 * 5
        gCtx.strokeStyle = 'black'
        gCtx.strokeRect(startX, startY, width, height)
    }
    })


}



function changeFont() {
    let meme = getMeme()
    let Currfont = document.getElementById('font').value
    meme.lines[meme.selectedLineIdx].font = Currfont
    RenderMeme()
}

function OnIncrease() {
    let meme = getMeme()
    meme.lines[meme.selectedLineIdx].size += 5
    RenderMeme()
}

function OnDecrease() {
    let meme = getMeme()
    meme.lines[meme.selectedLineIdx].size -= 5
    RenderMeme()
}

function onSwitchLine() {
    let meme = getMeme()
    if (meme.lines.length <= 1) return
    meme.selectedLineIdx = (meme.selectedLineIdx + 1) % meme.lines.length
    RenderMeme()
}




function addLine() {
    let meme = getMeme()
    document.querySelector('input[name="memeText"]').value = ''
    meme.selectedLineIdx++
    if (meme.lines.length === 1) meme.lines.push({ txt: getText(), size: 20, align: 'center', baseLine: 'bottom', y: gElCanvas.height - 50 })
    if (meme.lines.length === 2) meme.lines.push({ txt: getText(), size: 20, align: 'center', baseLine: 'middle', y: gElCanvas.height / 2 })
    RenderMeme()
}



function removeLine() {
    let meme = getMeme()
    if (meme.selectedLineIdx > 0) meme.lines.splice(meme.selectedLineIdx, 1)
    if (meme.selectedLineIdx > 0) meme.selectedLineIdx--
    RenderMeme()
}


function onLeft() {
    let meme = getMeme()
    meme.lines[meme.selectedLineIdx].align = 'left'
    RenderMeme()
}

function onRight() {
    let meme = getMeme()
    meme.lines[meme.selectedLineIdx].align = 'right'
    RenderMeme()
}

function onCenter() {
    let meme = getMeme()
    meme.lines[meme.selectedLineIdx].align = 'center'
    RenderMeme()
}

function upText() {
    let meme = getMeme()
    meme.lines[meme.selectedLineIdx].y -= 10
    RenderMeme()
}

function downText() {
    let meme = getMeme()
    meme.lines[meme.selectedLineIdx].y += 10
    RenderMeme()
}


function getColor() {
    return document.querySelector('input[name="colorText"]').value
}

function getText() {
    return document.querySelector('input[name="memeText"]').value
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'My-Meme';
}

function setText() {
    let meme = getMeme()
    let text = getText()
    setLineTxt(text, meme.selectedLineIdx)
    RenderMeme()
}