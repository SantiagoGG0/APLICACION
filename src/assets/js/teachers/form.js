// Encargado de la interacción y la configuración del formulario.

/**
 * Este objeto contiene las referencias a los elementos clave del formulario
 */
export const formElements = {
    form: document.getElementById('teacherForm'),
    containerId: document.getElementById('containerId'),
    fields: {
        id: document.getElementById('txtId'),
        name: document.getElementById('txtName'),
        description: document.getElementById('txtDescription'),
        email: document.getElementById('txtEmail'),
        birthday: document.getElementById('txtBirthday'),

    },
    buttons: {
        btnSubmit: document.getElementById('btnSubmit'),
        
    }
};

/**
 * Array de objetos que contiene información para las validaciones.
 * Cada objeto tiene una referencia en cada campo, un array de objetos
 * de validaciones que tendrá, el ID del error, el mensaje y la función de la validación.
 */

export const fieldConfigurations = [
    {
        input: formElements.fields.name,
        validations: [
            {

                errorId: `${formElements.fields.name.id}Required`,
                errorMessage: 'El nombre es obligatorio.',
                // Las validaciones retornaran un False cuando debe mostrar el mensaje de error
                // Y un True cuando no debe mostrar el mensaje de error.
                validationFunction: (value) => {
                    return value.trim() !== '';

                    
                }       
            }
        ]
    },
    {
        input: formElements.fields.description,
        validations: [
            {

                errorId: `${formElements.fields.description.id}Required`,
                errorMessage: 'La descripción es obligatoria.',
                validationFunction: (value) => {
                    return value.trim() !== '';

                    
                }       
            }
        ]
    },
    {
        input: formElements.fields.email,
        validations: [
            {

                errorId: `${formElements.fields.email.id}Required`,
                errorMessage: 'La correo electrónico es obligatorio.',
                validationFunction: (value) => {
                    return value.trim() !== '';

                    
                }       
            },
            {
                errorId:`${formElements.fields.email.id}Pattern`,
                errorMessage: "El correo electrónico no cumple con el formato correcto.",
                validationFunction: (value) => {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
                }
                
            }
        ]
    },
    {
        input: formElements.fields.birthday,
        validations: [
            {

                errorId: `${formElements.fields.birthday.id}Required`,
                errorMessage: 'La fecha de nacimiento es obligatoria.',
                validationFunction: (value) => {
                    return value.trim() !== '';

                    
                }       
            },
            
               
            
        ]
    }
];

export function getFormData() {

    /**
     * const formData = new FormData(formElements.form);
    return Object.fromEntries(formData.entries());
     */
    const teacher = {

        id: formElements.fields.id.value.trim() ? parseInt(formElements.fields.id.value.trim()) : new Date().getTime(),
        name: formElements.fields.name.value,
        description: formElements.fields.description.value,
        email: formElements.fields.email.value,
        birthday: formElements.fields.birthday.value,
    };
    return teacher;
}

export function resetForm() {
    formElements.form.reset();
    hideIdAndChangeElementForNew();
}

export function setFormData(teacher) {
    const {id, name, description, email, birthday} = teacher;
    formElements.fields.id.value = id;
    formElements.fields.name.value = name;
    formElements.fields.description.value = description;
    formElements.fields.email.value = email;
    formElements.fields.birthday.value = birthday;
    showIdAndChangeElementForEdit();
    
}

function showIdAndChangeElementForEdit() {

    formElements.containerId.classList.replace('d-none', 'd-block');
    formElements.buttons.btnSubmit.classList.replace('btn-success', 'btn-primary');
    formElements.buttons.btnSubmit.textContent = 'Modificar';

}

function hideIdAndChangeElementForNew() {

    formElements.containerId.classList.replace('d-block', 'd-none');
    formElements.buttons.btnSubmit.classList.replace('btn-primary', 'btn-success');
    formElements.buttons.btnSubmit.textContent = 'Enviar.';
    
}