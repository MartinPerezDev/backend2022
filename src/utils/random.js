process.on('message', msg => {
    let contador = {}
    const loop = msg
    for (let i = 1; i <= 1000; i++) {
        contador[i] = 0
    }
    for (let i = 1; i <= loop; i++) {
        let random = Math.floor((Math.random() * (1000 - 1 + 1)) + 1);
        for (const key in contador) {
            if (key == random) {
                contador[key]++
            }
        }
    }
    process.send(contador)
})