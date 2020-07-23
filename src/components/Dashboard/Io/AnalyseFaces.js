import Axios from "axios"

export default async (src) => {

    let res = {
        status: '',
    }

    await Axios.get(`/analyse/faces/${src}`)
        .then((response) => {
            console.log(response)
            if (response.data.status === 'success') {

                res = {
                    status: 'success',
                    path: response.data.path,
                    total: response.data.total
                }
            }
        })
        .catch((err) => {
            console.log('Faces err', err);

            res = {
                status: 'error',
                msg: 'Unexpected error. Please try again'
            }
        })

    return res

}