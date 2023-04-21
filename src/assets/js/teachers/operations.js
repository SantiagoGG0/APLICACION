// Encargado de la interacción de javascript con html.
import { formElements, getFormData } from './form'
import { createTeacher, readTeachers } from './repository';
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
    if (arrayTeachers.length > 0) {

        // La función forEach retorna el objeto y su posición.
        arrayTeachers.forEach((teacher) => {
            // Vamos a realizar una destructuración.
            const { id, name, description, email, birthday } = teacher;
            console.log(name)
            // creo la fila de la tabla
            const row = document.createElement('tr');
            row.classList.add('align-middle');
            // creo las columnas
            const colId = document.createElement('td');
            colId.textContent = id;
            colId.classList.add('text-center');

            const colName = document.createElement('td');
            colName.textContent = name;

            const colDescription = document.createElement('td');
            colDescription.textContent = description;

            const colEmail = document.createElement('td');
            colEmail.textContent = email;

            const colBirthday = document.createElement('td');
            colBirthday.textContent = birthday;

            const colButtons = document.createElement('td');
            colButtons.classList.add('text-center');
            const editButton = document.createElement('button');
            editButton.classList.add('btn', 'btn-primary', 'btn-edit', 'm-1');
            editButton.dataset.id = id;
            editButton.setAttribute('title', 'Editar');

            const editIcon = document.createElement('em');
            editIcon.classList.add('fa', 'fa-pencil');
            editButton.appendChild(editIcon);
            colButtons.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'btn-deleted', 'm-1');
            deleteButton.dataset.id = id;
            deleteButton.setAttribute('title', 'Eliminar')

            const deleteIcon = document.createElement('em');
            deleteButton.classList.add('fa', 'fa-trash');
            deleteButton.appendChild(deleteIcon);
            colButtons.appendChild(deleteButton);

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
    } else {
        const rowEmpty = document.createElement('tr');
        const colEmpty = document.createElement('td');
        colEmpty.setAttribute('colspan', '6');
        colEmpty.textContent = 'No se encuentran registros disponibles.';
        colEmpty.classList.add('text-center');
        rowEmpty.appendChild(colEmpty);
        tbody.appendChild(rowEmpty);
    }}
