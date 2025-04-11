const mainForm = document.forms['userInfo'];
const inputElements = document.querySelectorAll('input');
const mandatoryFields = document.querySelectorAll('.required');

const regexRules = {
    username: /^[a-zA-Z]+$/,
    age: /^[0-9]+$/,
    aboutYou: /^[a-zA-Z]+$/,
    emailAddress: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    whatIsJavaScript: /^[a-zA-Z]+$/,
    html: /^[a-zA-Z]+$/,
    css: /^[a-zA-Z]+$/
};

const errorMessages = {
    username: 'Please enter a valid name',
    age: 'Please enter a valid age',
    aboutYou: 'Please describe yourself',
    emailAddress: 'Please enter a valid email address',
    whatIsJavaScript: 'Please explain what JavaScript is',
    html: 'Please explain what HTML is',
    css: 'Please explain what CSS is'
};

function updateStats() {
    const validFields = document.querySelectorAll('.required.passed');
    const invalidFields = document.querySelectorAll('.required.failed');

    document.getElementById('total').textContent = `All: ${inputElements.length}`;
    document.getElementById('required').textContent = `Need: ${mandatoryFields.length}`;
    document.getElementById('completed').textContent = `Success: ${validFields.length}/${mandatoryFields.length}`;
    document.getElementById('errors').textContent = `Error: ${invalidFields.length}/${mandatoryFields.length}`;
}

function checkInputs(fieldsToCheck) {
    let formIsValid = true;

    fieldsToCheck.forEach((input) => {
        if (!input.classList.contains('required')) return;

        const rule = regexRules[input.name];
        const value = input.value.trim();
        const errorIcon = input.nextElementSibling;  // картинка должна идти сразу после инпута

        input.classList.remove('passed', 'failed');
        input.nextElementSibling.nextElementSibling.textContent = '';

        if (value !== '' && rule && rule.test(value)) {
            input.style.border = 'none';
            input.previousElementSibling.style.color = 'initial';
            input.classList.add('passed');
            errorIcon.style.display = 'none';  // Скрываем картинку при правильном значении
        } else {
            input.style.border = '2px solid red';
            input.previousElementSibling.style.color = 'red';
            input.nextElementSibling.nextElementSibling.textContent = errorMessages[input.name] || '✘ Ошибка';
            input.nextElementSibling.nextElementSibling.style.color = 'red';
            input.classList.add('failed');
            errorIcon.style.display = 'inline';  // Показываем картинку при ошибке
            formIsValid = false;
        }
    });

    updateStats();
    return formIsValid;
}

inputElements.forEach((input) => {
    input.addEventListener('input', () => {
        checkInputs([input]);
    });
});

mainForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!checkInputs(mandatoryFields)) return;

    const collected = new FormData(mainForm);
    const result = {};

    for (let [key, value] of collected.entries()) {
        result[key] = value;
    }

    console.log(result);
});

updateStats();
