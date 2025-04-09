function part1(n) {
    for(let i=1;i<=n-1;i++) {
      let str = ""
      for(let j=1; j<=i;j++)
        str +="* "
      for(let j=1; j<=2*(n-i)-1;j++)
        str +="  "
      for(let j=1; j<=i;j++)
        str +="* "
      console.log(str)
    }  
  }
  
  function part2(n) {
    for(let i=1;i<=n-1;i++) {
      let str = ""
      for(let j=1; j<=n-i;j++)
        str +="* "
      for(let j=1; j<=2*i-1;j++)
        str +="  "
      for(let j=1; j<=n-i;j++)
        str +="* "
      console.log(str)
    }
  }
  
  function butterfly(n) {
    
    part1(n)
    str = ""
    for(let i=1;i<=(2*n)-1;i++) {
      str +="* "
    }
    console.log(str)
    part2(n)
  }
  
  butterfly(5)