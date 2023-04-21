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
