function PrintMatrix(matrix,n,m) {
    for(let i=0;i<n;i++) {
      let str = ""
      for(let j=0;j<m;j++) {
        str += matrix[i][j]+ " "
      }
      console.log(str)
    }
  }
  
  let matrix = [[1,2],[3,4],[5,6]]
  let n = 3 
  let m=2
  
PrintMatrix(matrix,n,m)
  