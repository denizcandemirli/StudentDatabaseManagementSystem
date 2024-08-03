const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware for parsing JSON bodies

let students = [
    { 
        Id: 1,
        Name: 'Deniz',
        StudyProgram: 'ITBE',
        Attending: 'true'
    },
    {
        Id: 2,
        Name: 'Can',
        StudyProgram: 'Informatik',
        Attending: 'false'
    },
];

app.listen(port, () => {                                 
    console.log(`Server is running on ${port}`); 
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

app.get('/students', (req, res) => {
    res.json(students);
});

app.get('/students/program/:program', (req, res) => {
    const program = req.params.program;
    const filteredStudents = students.filter(student => student.StudyProgram === program);
    res.json(filteredStudents);
});

app.post('/students', (req, res) => {
    const newStudent = req.body;
    newStudent.Id = students.length ? students[students.length - 1].Id + 1 : 1;
    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(student => student.Id === id);
    if (student) {
        student.Attending = req.body.Attending;
        res.json(student);
    } else {
        res.status(404).send('Student not found');
    }
});

app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(student => student.Id === id);
    if (index !== -1) {
        students.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Student not found');
    }
});
