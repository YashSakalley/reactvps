import Axios from "axios"

export default async (src) => {

    let res = {
        status: '',
    }

    try {
        const { data: { status, path, total } } = await Axios.get(`/analyse/faces/${src}`)
        if (status !== "success") throw new Error("Success not recieved")
        res = {
            status,
            path,
            total
        }
    } catch (err) {
        console.log('Faces err', err);
        res = {
            status: 'error',
            msg: 'Unexpected error. Please try again'
        }
    } finally {
        return res
    }

}