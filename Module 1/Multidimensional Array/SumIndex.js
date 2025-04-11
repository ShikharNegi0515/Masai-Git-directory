function SumIndex(matrix,n,m) {
    for(let i=0;i<n;i++) {
      let sum = ""
      for(let j=0;j<m;j++) {
        sum += i+j+" "
      }
      console.log(sum)
    }
  }
  
  let matrix = [[1,2],[3,4],[5,6]]
  let n = 3 
  let m=2
  
  SumIndex(matrix,n,m)
  