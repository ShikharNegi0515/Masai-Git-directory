arr = [
    { name: "Alice", grade: 10, scores: [78, 82, 91] },
    { name: "Bob", grade: 10, scores: [45, 39, 42] },
    { name: "Charlie", grade: 10, scores: [32, 28, 30] },
    { name: "David", grade: 10, scores: [88, 90, 94] },
    { name: "Eva", grade: 10, scores: [60, 65, 62] }
  ]

let max_avg =0
let top_student =""
let class_total = 0
count = 0
arr1 =[]
for(let i=0; i<arr.length;i++) {
    let sum =0
    for(j=0;j<arr[i].scores.length;j++) {
        sum += arr[i].scores[j]
        class_total += arr[i].scores[j]
        count +=1
    }
    let avg = (sum/arr[i].scores.length).toFixed(2)
    if(avg<40) {
        arr1.push(arr[i].name)
    }
    // class_total +=parseFloat(avg)
    if (avg>max_avg) {
        max_avg = avg
        top_student = arr[i].name
    }
}
// console.log((class_total/ arr.length).toFixed(2))
console.log(`Top performer: ${top_student} (avg: ${max_avg})`)
console.log(`Class average: ${(class_total/count).toFixed(2)}`)
console.log(`Failing students: ${arr1}`)
