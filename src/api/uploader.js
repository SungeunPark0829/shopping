import axios from "axios";

export async function uploadImage(file) {
    const data = new FormData();

    data.append('file', file);
    data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    // return axios.post(import.meta.env.VITE_CLOUDINARY_URL, data, {headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },})
    // .then(response => {
    //     console.log(response.data);
    // })
    // .catch(error => {
    //     console.error(error);
    // });
    return fetch(import.meta.env.VITE_CLOUDINARY_URL, {
    method: 'POST',
    body: data,
    }).then(response => response.json())
    .then(data => data.url);
}