function createCounter() {
    let count = 0
    return function getCounter() {
        count++
        return count
    }
}

let increment = createCounter()
console.log(increment())
console.log(increment())
console.log(increment())