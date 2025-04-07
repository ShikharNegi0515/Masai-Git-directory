let str = "aabcccccaaa"

function stringfreq(str) {
    let res = ""
    let count=1
    for(let i=0;i<str.length;i++) {
        if(str[i]==str[i+1]) {
            count+=1
        }
        else {
            res += `${str[i]}${count}`
            count =1
        }
        
    }
    return res
}

console.log(stringfreq(str))