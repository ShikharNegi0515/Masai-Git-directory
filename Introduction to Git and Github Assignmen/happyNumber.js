function sumOfSquares(num) {
    let sum = 0;
    while (num > 0) {
        let digit = num % 10;
        sum += digit * digit;
        num = Math.floor(num / 10);
    }
    return sum;
}
    
function happyNumber(num) {
    let seen = new Set();

    while (num !== 1 && !seen.has(num)) {
        seen.add(num);
        num = sumOfSquares(num);
    }

    return num === 1; 
}
console.log(happyNumber(19));
console.log(happyNumber(2));