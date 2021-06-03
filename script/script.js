const ItemList = document.getElementById('item-list');
var empty_section = document.getElementById('empty-section')
const form = document.querySelector('#form');
const input = document.querySelector('.input-item');
localStorage.clear();

let toDoList = [];
empty_section.style.display = 'none';

function addToDO(text){
     const todo = {
        id : Date.now(),
        isChecked : false,
        text
        
     }

     toDoList.push(todo);
     //console.log(toDoList);
     renderTodo(todo);
}

form.addEventListener('submit', event=>{
    event.preventDefault();
    var text = input.value.trim();
    if(text!==''){
        addToDO(text);
        input.value = '';
        input.focus();
    }else{
        alert('Please Enter some text to add task');
    }
});

function renderTodo(todo){

    const item = document.querySelector(`[data-key='${todo.id}']`)
    const isCheck = (todo.isChecked) ? 'done':'';
    
    if(todo.deleted){
        item.remove();
        if (toDoList.length === 0)list.innerHTML = '';
        return;
    }
    
    const node = document.createElement("li");
    node.setAttribute('class', `item  ${isCheck}`);
    node.setAttribute('data-key', `${todo.id}`);
    

    node.innerHTML=`
      <input type="checkbox" id="${todo.id}" />
      <label for="${todo.id}" class="tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo">
      
      </button>   
     `
    //  <i class="fas fa-trash"></i>
     //console.log(node.classList);
    if(item){
        ItemList.replaceChild(node,item);
    }else{
        ItemList.append(node);
    }
}

ItemList.addEventListener('click', event=>{
   if(event.target.classList.contains('tick')){
      //alert('you clicked item');
       const itemKey = event.target.parentElement.dataset.key;
       toggleDone(itemKey);
   }
   if(event.target.classList.contains('delete-todo')){
    //alert('you deleted ');
    const deleteKey = event.target.parentElement.dataset.key;
    //console.log(deleteKey);
    deleteNode(deleteKey);
   }
});

function toggleDone(key){
    const index = toDoList.findIndex(item=>item.id === Number(key));
    toDoList[index].isChecked = !(toDoList[index].isChecked);
    renderTodo(toDoList[index]);
}

function deleteNode(key){
    const index = toDoList.findIndex(item => item.id === Number(key));
    const todo = {
          deleted : true,
               ...toDoList[index]    
    };
    toDoList.filter(item => item.id !== Number(key));
    renderTodo(toDoList[index]);
}


// document.addEventListener('DOMContentLoaded', () => {
//   const ref = localStorage.getItem('todoItems');
//   if (ref) {
//     todoItems = JSON.parse(ref);
//     todoItems.forEach(t => {
//       renderTodo(t);
//     });
//   }
// });