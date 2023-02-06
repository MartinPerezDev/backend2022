import axios from 'axios'

(async () => {
    try {
        //Products

        //get products
        console.log("\nMethod: GET , return products")
        const responseGet = await axios.request({
            baseURL: 'http://localhost:8080',
            url: '/productos',
            method: 'GET'
        })
        console.log(responseGet.data)

        //add product & return products
        console.log("\nMethod: POST , add & return products")
        const product = {
            name: "producto de prueba",
            price: 1200,
            thumbnail: "https://cdn-icons-png.flaticon.com/512/2696/2696513.png"
        }
        const responsePost = await axios.request({
            baseURL: 'http://localhost:8080',
            url: '/productos',
            method: 'POST',
            data: product
        })
        console.log(responsePost.data)

    } catch (err) {
        console.log(err.message)
    }

})()