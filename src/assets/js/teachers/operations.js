// Encargado de la interacción de javascript con html.
import { formElements, getFormData } from './form'
import {createTeacher, readTeachers  } from './repository';
export function listeners() {
    window.addEventListener('load', () => {
        listenFormSubmitEvent();
        listTeachers();
    })
}

function listenFormSubmitEvent() {
    formElements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        createTeacher(getFormData());
        listTeachers();
    });
}

function listTeachers() {
    const arrayTeachers = readTeachers();
    const tbody = document.querySelector('#tblTeachers tbody');
    tbody.innerHTML = '';
// La función forEach retorna el objeto y su posición.
    arrayTeachers.forEach( (teacher, index) => {
// creo la fila de la tabla
        const row = document.createElement('tr');
// creo las columnas
        const colId = document.createElement('td');
        colId.textContent = index

        const colName = document.createElement('td');
        colName.textContent = teacher.name;

        const colDescription = document.createElement('td');
        colDescription.textContent = teacher.description;

        const colEmail = document.createElement('td');
        colEmail.textContent = teacher.email;

        const colBirthday = document.createElement('td');
        colBirthday.textContent = teacher.birthday

        const colButtons = document.createElement('td');
// Agrego las columnas.
        row.appendChild(colId);
        row.appendChild(colName);
        row.appendChild(colDescription);
        row.appendChild(colEmail);
        row.appendChild(colBirthday);
        row.appendChild(colButtons);
// Agrego la fila a el tbody.
        tbody.appendChild(row);    
    });
}
