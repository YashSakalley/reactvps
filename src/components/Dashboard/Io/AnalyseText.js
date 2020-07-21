import tesseract from 'tesseract.js'

export default async (src) => {

    let res
    let image = new Image()
    image.src = `http://localhost:5000/getFile/${src}`
    // image.src = 'https://tesseract.projectnaptha.com/img/eng_bw.png'

    await tesseract.recognize(image)
        .then(function (result) {
            console.log('Returning', result);
            res = {
                status: 'success',
                text: result.data.lines
            }
        })
        .catch((err) => {
            console.log(err)
            res = {
                status: 'error'
            }
        })

    return res
}