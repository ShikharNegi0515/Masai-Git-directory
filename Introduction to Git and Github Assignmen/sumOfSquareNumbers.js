function sumOfSquareNumbers(k) {
    let left = 0;
    let right = Math.floor(Math.sqrt(k));

    while (left <= right) {
        let sum = left * left + right * right;

        if (sum === k) {
            return true; 
        } else if (sum < k) {
            left++; 
        } else {
            right--; 
        }
    }

    return false;
}

console.log(sumOfSquareNumbers(25)); 
console.log(sumOfSquareNumbers(7)); 
console.log(sumOfSquareNumbers(5));  
