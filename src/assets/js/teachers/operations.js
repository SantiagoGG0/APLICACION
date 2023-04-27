// Encargado de la interacción de javascript con html.
// Third libraries.
import alertify from 'alertifyjs';
import Swal from 'sweetalert2'
// Own libraries.
import { validateForm, validateField, removeInputErrorMessage, removeErrorClassNameFields, removeErrorMessageElements } from './../utils/validations'
// Module libraries.
import { formElements, fieldConfigurations, getFormData, resetForm, setFormData } from './form'
import { createTeacher, readTeachers, findTeacherById } from './repository';

export function listeners() {
    window.addEventListener('load', () => {
        listenFormSubmitEvent();
        listTeachers();
        listenFormFieldsChangeEvent();
        listenFormResetEvent();
        listenTableClickEvent();
    })
}

function listenFormSubmitEvent() {
    formElements.form.addEventListener('submit', (event) => {
        event.preventDefault();
        alertify.dismissAll();
        if (validateForm(fieldConfigurations)) {
            createTeacher(getFormData());
            resetForm();
            removeErrorClassNameFields('is-valid');
            alertify.success('Profesor guardado correctamente.');
            listTeachers();
            listenFormFieldsChangeEvent();
        }
        else {
            alertify.error('Verificar los datos del formulario.')
        }
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
            editIcon.dataset.id = id;
            editButton.appendChild(editIcon);
            colButtons.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'btn-deleted', 'm-1');
            deleteButton.dataset.id = id;
            deleteButton.setAttribute('title', 'Eliminar')

            const deleteIcon = document.createElement('em');
            deleteButton.classList.add('fa', 'fa-trash');
            deleteIcon.dataset.id = id;
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
    }
}
function listenFormFieldsChangeEvent() {
    fieldConfigurations.forEach(({ input, validations}) => {
        input.addEventListener('change', () => {
            removeInputErrorMessage(input);
            
            validations.forEach((validationConfig)=>{
                validateField(input, validationConfig);
            })
        })
    });
}
function listenFormResetEvent() {
    formElements.form.addEventListener('reset', () => {
        removeErrorMessageElements();
        removeErrorClassNameFields('is-valid');
        resetForm();
        alertify.dismissAll();
    });
}
function listenTableClickEvent() {
    const table = document.getElementById('tblTeachers');
    table.addEventListener('click', ({target}) => {
        const idTeacher = target.getAttribute('data-id');
        
        if (target.classList.contains('btn-edit')||target.classList.contains('fa-pencil')) {
            editTeacher(idTeacher);

        }else if(target.classList.contains('btn-delete')||target.classList.contains('fa-trash')) {  
            
            Swal.fire({
                title: '¿Estas seguro de que quieres eliminar el profesor: ?',
                text: 'No podrás deshacer esta acción',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#b2b2b2',
                confirmButtonText: 'Si, eliminar.',
                cancelButtonText: 'Cerrar'

            }).then((resultConfirm) => {
                if(resultConfirm.isConfirmed) {
                    console.log('Confirmar el que elimina.')
                }else {
                    alertify.dismissAll();
                    alertify.message('Acción cancelada.')
                }                   
            })
        }
    });    

}
function editTeacher(idTeacher){
    const teacher = findTeacherById(idTeacher);
    if (teacher){
        setFormData(teacher);
        window.scrollTo({top: 0, behavior: 'smooth'})
    }else{
        alertify.error('El profesor que selecciono no ha sido encontrado, verifique la información.')
    }
    


}