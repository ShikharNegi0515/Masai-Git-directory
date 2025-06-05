let students = []
let editingIndex = null

const form = document.getElementById('student-form');
const tableBody = document.querySelector('#student-table tbody');
const searchInput = document.getElementById('search');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const batch = document.getElementById('batch').value
    const age = document.getElementById('age').value
    const score = document.getElementById('score').value

    if (!name || !batch || age <= 0 || score < 0 || score > 100) {
        alert("please enter valid data!")
        return
    }
    const student = { name, batch, age, score };

    if (editingIndex !== null) {
        students[editingIndex] = student;
        editingIndex = null;
    } else {
        students.push(student);
    }

    form.reset();
    renderTable();
})

function renderTable() {
    const filter = searchInput.value.toLowerCase()
    tableBody.innerHTML = ""

    students
        .filter(s => s.name.toLowerCase().includes(filter))
        .forEach((student, index) => {
            const row = document.createElement("tr")
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.batch}</td>
                <td>${student.age}</td>
                <td>${student.score}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `
            tableBody.appendChild(row);
        })
}

function editStudent(index) {
    const student = students[index]
    document.getElementById('name').value = student.name;
    document.getElementById('batch').value = student.batch;
    document.getElementById('age').value = student.age;
    document.getElementById('score').value = student.score;
    editingIndex = index
}

function deleteStudent(index) {
    students.splice(index, 1)
    renderTable()
}

searchInput.addEventListener('input', renderTable);

function sortByAge() {
    students.sort((a, b) => a.age - b.age);
    renderTable();
}

function sortByScore() {
    students.sort((a, b) => a.score - b.score);
    renderTable();
}