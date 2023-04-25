// Encargado de la interacción y la configuración del formulario.

/**
 * Este objeto contiene las referencias a los elementos clave del formulario
 */
export const formElements = {
    form: document.getElementById('teacherForm'),
    fields: {
        name: document.getElementById('txtName'),
        description: document.getElementById('txtDescription'),
        email: document.getElementById('txtEmail'),
        birthday: document.getElementById('txtBirthday'),

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
    }
];

export function getFormData() {

    /**
     * const formData = new FormData(formElements.form);
    return Object.fromEntries(formData.entries());
     */
    const teacher = {
        id: new Date().getTime(),
        name: formElements.fields.name.value,
        description: formElements.fields.description.value,
        email: formElements.fields.email.value,
        birthday: formElements.fields.birthday.value,
    };
    return teacher;
}

export function resetForm() {
    formElements.form.reset();
}