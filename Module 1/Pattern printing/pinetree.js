function pineTree(n) {
  for(let i=1;i<=n-1;i++) {
    let temp = ""
    for(let j=1;j<=n-i;j++)
      temp += "  "
    for(let j=1;j<=(2*i)-1;j++)
      temp +="* "
    console.log(temp)
  }
  let str =""
  for(let i=1;i<n;i++) {
    str +="  "
  }
  str+="|"
  console.log(str)
}

pineTree(6)