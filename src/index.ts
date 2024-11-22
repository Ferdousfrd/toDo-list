import { v4 as uuidV4 } from "uuid";

// creating my types
type Task = {
    id: string,
    title : string,
    completed : boolean,
    createdAt : Date
}



// making sure the html parsed first and DOM is ready then script executes
document.addEventListener('DOMContentLoaded', function(){
    const formEl = document.querySelector<HTMLFormElement>('#new-task-form')
    const inputEl = document.querySelector<HTMLInputElement>('#new-task-title')
    const containerEl = document.querySelector<HTMLDivElement>('.container')

    
    // getting the localstorage tiem and setting them to tasklist array
    const taskList: Task[] = getItemsLS()



    // function to add new item in the list
    function addListItem(task: Task){


        // create a div-card to show new task
        const newTaskDivCard = document.createElement('div')
        newTaskDivCard.innerHTML = `
            <h4>${task.title}</h4>
            <p>Status : ${task.completed? "Complete":"In Complete"}</p>
            <p>Created On: ${new Date(task.createdAt).toLocaleDateString()}</p>
        `
        // create a li el and div into it
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
            containerH1.textContent = "List Of Items"
            containerEl?.append(containerH1)

            const ulList = document.createElement('ul')
            containerEl?.appendChild(ulList)
            
            // Display the initial task list
            updateListDisplay();



    // Function to display tasks or show an empty list message
    function updateListDisplay() {
        ulList.innerHTML = ""; // Clear the list

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
        
        if(!inputEl?.value.trim()) return

        const newTask: Task = {
            id: uuidV4(),
            title: inputEl.value,
            completed: false,
            createdAt: new Date() 
        }

        addListItem(newTask)
        saveNewTask(newTask)

        inputEl.value = ""
        updateListDisplay();
        

    })

})