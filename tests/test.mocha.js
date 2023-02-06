import supertest from "supertest"
import chai, { expect } from 'chai'

const request = supertest('http://localhost:8080')

describe('Test methods API, entity: Product', () => {
    describe('GET', () => {
        it('esta peticion retorna un status 200 puede traer un array vacio o con objetos', async () => {
            let res = await request.get('/productos')
            expect(res.status).to.equal(200)
        })
    })

    describe('POST', () => {
        it('esta peticion guarda un nuevo producto', async () => {
            const product = {
                name: "producto prueba con supertest",
                price: 1600,
                thumbnail: "https://cdn-icons-png.flaticon.com/512/2696/2696513.png"
            }
            let res = await request.post('/productos').send(product)
            expect(res.status).to.equal(200)
            //get last product add in array
            const newProduct = res.body[res.body.length-1];
            expect(newProduct).to.include.keys('name', 'price', 'picture', 'id')
        })
    })
})