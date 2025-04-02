num = 197

function reverseNumber(num) {
  let reversed = 0;
  
  while (num > 0) {
    let digit = num % 10;
    reversed = reversed * 10 + digit; 
    num = Math.floor(num / 10);
  }
  console.log(reversed)
}
reverseNumber(num)