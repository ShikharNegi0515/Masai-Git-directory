function multiply(a, b) {
    return a *b;
}

function multiplyNumbers(a,b) {
    obj = {
        a1 : a,
        b2 : b
    }
    
    return multiply.apply(obj,[a,b])
}

console.log(multiplyNumbers(4,5))