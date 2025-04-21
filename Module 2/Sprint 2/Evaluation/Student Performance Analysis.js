function createStudentmanager() {
    let students = {}

    function calculateAverage(subjects) {
        let scores = Object.values(subjects)
        return scores.reduce((acc, curr) => {
            return acc + curr
        }, 0) / scores.length
    }

    return {
        addStudent: function (id, name) {
            if (!students[id]) {
                students[id] = {
                    name,
                    subjects: {}
                }
            }
            else {
                console.log(`Student with ID ${id} Already Exist.`)
            }
        },
        updateScore: function (id, subject, score) {
            if (students[id]) {
                if (students[id].subjects[subject] !== undefined) {
                    students[id].subjects[subject] = score
                } else {
                    console.log(`Subject: ${subject} not found for student id: ${id}`)
                }
            }
            else {
                console.log("student not found")
            }
        },
        getStudentDetails: function (id) {
            return students[id] || "Student Not Found"
        },
        addSubject: function (id, subject, score) {
            if (students[id]) {
                students[id].subjects[subject] = score
            }
            else {
                console.log("Student Not Found")
            }
        },
        calculateAverageScores: function () {
            return Object.entries(students).map(([id, student]) => {
                let avg = calculateAverage(student.subjects)
                return { id, name: student.name, averageScore: avg }
            })
        },
        getTopPerformers: function () {
            return this.calculateAverageScores().filter(elem => elem.averageScore > 85)
        },
        getDifficultySubjects: function () {
            let subjectMap = {}
            Object.values(students).forEach(student => {
                Object.entries(student.subjects).forEach(([subject, score]) => {
                    if (!subjectMap[subject]) {
                        subjectMap[subject] = []
                    }
                    subjectMap[subject].push(score)
                })
            })
            return Object.entries(subjectMap)
                .filter(([_, scores]) => scores.filter(score => score < 40).length / scores.length > 0.5)
                .map(([subject]) => subject)
        },
        getFailingStudents: function () {
            return Object.entries(students)
                .filter(([_, student]) =>
                    Object.values(student.subjects).some(score => score < 35)
                )
                .map(([id, student]) => ({ id, name: student.name }))
        },
        getSubjectFrequencyMap: function () {
            let freqMap = {}
            Object.values(students).forEach(student => {
                Object.keys(student.subjects).forEach(subject => {
                    freqMap[subject] = (freqMap[subject] || 0) + 1
                });
            });
            return freqMap
        },
        getSortedStudents: function(sortBy) {
            let studentsArr = Object.entries(students).map(([id,student]) => {
                let avg = calculateAverage(student.subjects)
                return { id, name:student.name, averageScore: avg}
            });
            if(sortBy == "averageScore") {
                return studentsArr.sort((a,b)=> b.averageScore - a.averageScore)
            } else if(sortBy == "name") {
                return studentsArr.sort((a,b)=> a.name.localeCompare(b.name))
            } else {
                return "Invalid Sort Key"
            }
        }

    }
}

const manager = createStudentmanager();
manager.addStudent("1","Bheem")
manager.addStudent("2","Raju")
manager.addStudent("1","Jaggu")

manager.addSubject("1","Math",90)
manager.addSubject("1","Science",88)
manager.addSubject("2","Math",32)
manager.addSubject("2","Science",33)
manager.addSubject("3","Math",45)
manager.addSubject("3","Science",30)

console.log("Studetn Details(Bheem)", manager.getStudentDetails("1"))
console.log("Average Scores:", manager.calculateAverageScores())
console.log("Top Performers:", manager.getTopPerformers())
console.log("Difficult Subjects:", manager.getDifficultySubjects())
console.log("Failing Students:",manager.getFailingStudents())
console.log("Subject Frequency Map:", manager.getSubjectFrequencyMap())
console.log("Sorted by Average Score", manager.getSortedStudents("averageScore"))
console.log("Sorted by Name", manager.getSortedStudents("name"))