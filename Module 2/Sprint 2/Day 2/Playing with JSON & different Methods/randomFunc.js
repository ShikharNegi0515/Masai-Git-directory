
let arr1 = [1, 3, 6, 2, 8, 0, 4, 3]
let arr2 = [30, 15, 45, 10, 60, 90, 50]

function filterEvenNumbers(arr1) {
    let even = arr1.filter( n=> n%2==0)
    return even
}

function sumOfArray(arr2) {
    return arr2.reduce((acc,curr) => {
        return acc + curr
    },0)
}

function sortAndConcat(arr1, arr2) {
    arr1.sort((a,b) => a-b)
    arr2.sort((a,b) => a-b)
    return arr1.concat(arr2)
}






let res1 = filterEvenNumbers(arr1)
console.log(res1)

let res2 = sumOfArray(arr2)
console.log(res2)

let res3 = sortAndConcat(arr1, arr2)
console.log(res3)