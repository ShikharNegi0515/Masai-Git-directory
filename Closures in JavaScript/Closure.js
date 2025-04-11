function outer() {
    let message = "Hello from the closure!";
    return function inner() {
        console.log(message)
    }
}

let closure = outer()
closure()
closure()
