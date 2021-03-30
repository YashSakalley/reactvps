import tesseract from 'tesseract.js'

export default async (src) => {
    let res
    let image = new Image()
    image.src = `http://localhost:5000/getFile/${src}`
    try {
        const result = await tesseract.recognize(image)
        console.log('Returning', result);
        res = {
            status: 'success',
            text: result.data.lines
        }
    } catch (err) {
        console.log(err)
        res = {
            status: 'error'
        }
    } finally {
        return res
    }
}