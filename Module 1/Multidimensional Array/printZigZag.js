function printZigZag(matrix,n,m) {
    let sum = ""
    for(let i=0;i<n;i++) {
      if(i%2!==0) {
        for(let j=0;j<m;j++) {
        sum += matrix[i][j]+" "
      }
      }
      else {
        for(let j=matrix.length;j>=0;j--) {
        sum += matrix[i][j]+" "
      }
      }
      
    }
    console.log(sum)
  }
  
  let matrix = [[1,2,3,4,5],
                [6,7,8,9,1],
                [3,2,5,4,6],
                [7,8,9,1,2]]
  let n = 4 
  let m=5
  
  printZigZag(matrix,n,m)
  