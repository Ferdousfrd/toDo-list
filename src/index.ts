import { v4 as uuidV4 } from "uuid";

// creating my types
type Task = {
    id: string,
    title : string,
    description : string,
    createdAt : Date
}



// making sure the html parsed first and DOM is ready then script executes
document.addEventListener('DOMContentLoaded', function(){
    const formEl = document.querySelector<HTMLFormElement>('#new-task-form')
    const inputEl = document.querySelector<HTMLInputElement>('#new-task-title')
    const containerEl = document.querySelector<HTMLDivElement>('.container')
    const formTextAreaEl = document.querySelector<HTMLTextAreaElement>('.description')


    
    // getting the localstorage tiem and setting them to tasklist array
    let taskList: Task[] = getItemsLS()
  
    // task delete func
    function deleteTask(id: string){
        taskList = taskList.filter(task => task.id !== id)
        localStorage.setItem('taskLists', JSON.stringify(taskList))  // Save the updated list to localStorage
        updateListDisplay();                                         // Update the display to reflect the changes
    }


    // function to add new item in the list
    function addListItem(task: Task){

        // create a dlt btn
        const dltBtn = document.createElement('button')
        dltBtn.classList.add('dlt-btn')
        dltBtn.textContent = "Delete"

        
        dltBtn.addEventListener('click', function(){
            deleteTask(task.id)
        })
                
          

        // create a div-card to show new task
        const newTaskDivCard = document.createElement('div')
        // adding the card class to our created div
        newTaskDivCard.classList.add('card')

        newTaskDivCard.innerHTML = `
            <span> ${new Date(task.createdAt).toLocaleDateString()}</span>
            <h2>${task.title}</h2>
            <p> ${task.description}</p>    
            
        `
        newTaskDivCard.appendChild(dltBtn)

        // create a li el and add div into it
        const newTaskItem = document.createElement('li')
        newTaskItem.appendChild(newTaskDivCard)

        // add the li el in ulList
        ulList.appendChild(newTaskItem)

        
        
    }

    // saving newtasks to localStorage
    function saveNewTask(task: Task){
        taskList.push(task)
        localStorage.setItem('taskLists', JSON.stringify(taskList))
    }

    // getting items from localStorage
    function getItemsLS(): Task[]{
        const storageitems = localStorage.getItem('taskLists')
        if(storageitems == null){
            return []
        }
        else{
            return JSON.parse(storageitems)
        }
        
    }


    // creating h1 and ul list in the container div
    const containerH1 = document.createElement('h1')
            containerH1.textContent = "Tasks List"
            containerEl?.append(containerH1)

            const ulList = document.createElement('ul')
            containerEl?.appendChild(ulList)
            
            // Display the initial task list
            updateListDisplay();



    // to display tasks or show an empty list message
    function updateListDisplay() {
        ulList.innerHTML = ""; // first we clear the list

        if (taskList.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = "List Empty";
            ulList.appendChild(emptyMessage);
        } else {
            taskList.forEach(item => addListItem(item));
        }
    }

    // handling form submit
    formEl?.addEventListener('submit', function(event){
        event.preventDefault()
        
        if(!inputEl?.value.trim() || !formTextAreaEl?.value) {
            alert('title and description can not be blank')
            return
        }

        const newTask: Task = {
            id: uuidV4(),
            title: inputEl.value,
            description: formTextAreaEl.value,
            createdAt: new Date() 
        }

        addListItem(newTask)
        saveNewTask(newTask)

        inputEl.value = ""
        formTextAreaEl.validationMessage = ""
        updateListDisplay();
        

    })

})