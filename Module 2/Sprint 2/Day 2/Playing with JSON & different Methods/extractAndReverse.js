let arr = [15, 30, 45, 60, 75, 90]

function extractAndReverse(arr) {
    let r_arr = arr.slice(3,5).reverse()
    return r_arr
}

console.log(extractAndReverse(arr))