const form = document.querySelector('#new-task-form');
const input = document.querySelector('#new-task-input');
const list_el = document.querySelector('#tasks');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = input.value;

    // Validation Input Task Can't Be Empty
    if (task.length != 0) {
        let letters = /^[a-zA-Z\s]*$/g;
        // Validation Letters Only
        if (task.match(letters)) {
            const task_el = document.createElement('div');
            task_el.classList.add('task');

            const task_content_el = document.createElement('div');
            task_content_el.classList.add('content');

            task_el.appendChild(task_content_el);

            const task_input_el = document.createElement('input');
            task_input_el.classList.add('text');
            task_input_el.type = 'text';
            task_input_el.value = task;
            task_input_el.setAttribute('readonly', 'readonly');

            task_content_el.appendChild(task_input_el);

            const task_actions_el = document.createElement('div');
            task_actions_el.classList.add('actions');

            const task_edit_el = document.createElement('button');
            task_edit_el.classList.add('edit');
            task_edit_el.innerText = 'Edit';

            const task_delete_el = document.createElement('button');
            task_delete_el.classList.add('delete');
            task_delete_el.innerText = 'Delete';

            task_actions_el.appendChild(task_edit_el);
            task_actions_el.appendChild(task_delete_el);

            task_el.appendChild(task_actions_el);

            list_el.appendChild(task_el);

            input.value = '';

            // Edit
            task_edit_el.addEventListener('click', (e) => {
                if (task_edit_el.innerText.toLowerCase() == "edit") {
                    task_edit_el.innerText = "Save";
                    task_input_el.removeAttribute("readonly");
                    task_input_el.focus();
                } else {
                    // Validatian for Edit Field Can't Empty
                    if (task_input_el.value.length != 0) {
                        // Validation for Edit Field Letters Only
                        if (task_input_el.value.match(letters)) {
                            task_edit_el.innerText = "Edit";
                            task_input_el.setAttribute("readonly", "readonly");
                        } else {
                            let data = 'Only letter allowed!';
                            modalShow(data);
                        }
                        // End of Validation for Edit Field Letters Only
                    } else {
                        let data = 'can\'t empty';
                        modalShow(data);
                    }
                    // End of Validatian for Edit Field Can't Empty
                }
            });

            // Delete
            task_delete_el.addEventListener('click', (e) => {
                list_el.removeChild(task_el);
            });
        } else {
            // Validation Letters Only
            let data = 'Only letters allowed!';
            modalShow(data);
        }
        // Validation Input Task Can't Be Empty
    } else {
        let data = 'can\'t empty';
        modalShow(data);
    }
});

// Toggle Dark Mode
if ($('#toggleBtn').on('click', () => {
    let bg = document.querySelector('body');

    if (bg.style.background == 'white') {
        bg.style.background = 'black';
        $('#headerText').css('color', 'white');
        $('#new-task-submit').css('color', 'white');
        $('.form-check-label').css('color', 'white');
        $('h2').css('color', 'white');
    } else {
        bg.style.background = 'white';
        $('#headerText').css('color', 'black');
        $('#new-task-submit').css('color', 'black');
        $('.form-check-label').css('color', 'black');
        $('h2').css('color', 'black');
    }
}));

// Modal
function modalShow(data) {
    $('#exampleModal').modal('show');
    $('.modal-body p').text(data);
}
function modalClose() {
    $('#exampleModal').modal('hide');
}