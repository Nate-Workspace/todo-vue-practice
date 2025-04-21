import { defineStore } from 'pinia'
import { reactive,ref, computed } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
    // Task States
    const tasks = reactive(JSON.parse(localStorage.getItem('tasks')) || []);
      const modalIsActive = ref(false);

      //Filter states
      const filterBy = ref("");
      const setFilter = (value) => {
        filterBy.value = value;
        console.log(filterBy.value);
      };

    //   Computed props
    const filteredTasks = computed(() => {
        switch (filterBy.value) {
          case "todo":
            return tasks.filter((task) => !task.completed);
          case "done":
            return tasks.filter((task) => task.completed);
          default:
            return tasks;
        }
      });

      function addTask(newTask) {
        if (newTask.name && newTask.description) {
          tasks.push({ ...newTask, id: tasks.length? tasks.length+1 :1 });
          newTask.name = "";
          newTask.description = "";
          console.log(tasks);
        } else {
          alert("Please fill all fields");
        }
      }
      
      const toggleCompleted = (id) => {
        console.log(id);
        tasks.forEach((task) => {
          if (task.id === id) {
            task.completed = !task.completed;
          }
        });
      };
  
    return { tasks, filterBy, modalIsActive, setFilter, filteredTasks, toggleCompleted, addTask}
  })