//funcionamiento del botón
document.addEventListener('DOMContentLoaded', function() {
    const title = document.getElementById ('title');
    const table = document.getElementById ('table');
    const description = document.getElementById ('description');
    const alert = document.getElementById ('alert');
    const btn =document.getElementById('add');
    let id = 1;

    function removeTodo(id) {
        console.log (id);
    }


    btn.onclick = function() {
        console.log('Title:', title.value);
        console.log('Description: ', description.value);
    }


    function addTodo(){
        if(title.value==='' || description.value===''){
            alert.classList.remove('d-none');
            alert.innerText= 'Title and description are required!!';
            return;
        }
        alert.classList.add('d-none');
        const row= table.insertRow();
        row.setAttribute('id', id++);

        const td1=document.createElement('td');
        row.innerHTML=`
        <td>${title.value}</td>
        <td>${description.value}</td>
        <td class="text-center">
        <input type="checkbox">
        </td>
        <td class="text-right">
            <button class="btn btn-primary mb-1">
            <i class="fa fa-pencil"></i>
            </button>
        </td>
        `;

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = function(e) {

            removeTodo(row.getAttribute('id'));
        };
        row.children[3].appendChild(removeBtn);
    }

    //se declara la funcion 
    btn.onclick= addTodo;

});