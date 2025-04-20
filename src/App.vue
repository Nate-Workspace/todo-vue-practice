<script setup>
import { ref, reactive, computed } from "vue";
import Task from "./components/Task.vue";
import Filters from "./components/Filters.vue";
import ModalWindow from "./components/modal/ModalWindow.vue";
import AddTaskModal from "./components/modal/AddTaskModal.vue";

//Place for variables---------
const newTask = { completed: false };

const tasks = reactive([
  {
    id: 1,
    name: "Website design",
    description:
      "Define the style guide, branding and create the webdesign on Figma.",
    completed: true,
  },
  {
    id: 2,
    name: "Website development",
    description: "Develop the portfolio website using Vue JS.",
    completed: false,
  },
  {
    id: 3,
    name: "Hosting and infrastructure",
    description:
      "Define hosting, domain and infrastructure for the portfolio website.",
    completed: false,
  },
  {
    id: 4,
    name: "Composition API",
    description:
      "Learn how to use the composition API and how it compares to the options API.",
    completed: true,
  },
  {
    id: 5,
    name: "Pinia",
    description: "Learn how to setup a store using Pinia.",
    completed: true,
  },
  {
    id: 6,
    name: "Groceries",
    description: "Buy rice, apples and potatos.",
    completed: false,
  },
  {
    id: 7,
    name: "Bank account",
    description: "Open a bank account for my freelance business.",
    completed: false,
  },
]);

const filterBy = ref("");
const modalIsActive = ref(false);
// Place fro the functions-----------

const filteredTasks = computed(() => {
  switch (filterBy.value) {
    case "todo":
      return tasks.filter((task) => !task.completed);
      break;
    case "done":
      return tasks.filter((task) => task.completed);
      break;
    default:
      return tasks;
  }
});

function addTask() {
  if (newTask.name && newTask.description) {
    tasks.push({ ...newTask, id: tasks.length + 1 });
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

const filterClicked = (value) => {
  filterBy.value = value;
  console.log(filterBy.value);
};
</script>

<template>
  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>Tasks Manager</h1>
      </div>

      <div class="header-side">
        <button @click="modalIsActive = true" class="btn secondary">
          + Add Task
        </button>
      </div>
    </div>

    <Filters :filterBy="filterBy" @filterClicked="filterClicked" />

    <div class="tasks">
      <Task
        @toggleCompleted="toggleCompleted"
        v-for="(task, index) in filteredTasks"
        :key="index"
        :task="task"
      />
    </div>

    <ModalWindow v-if="modalIsActive" @closeModal="modalIsActive = false">
      <AddTaskModal/>
    </ModalWindow>
  </main>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-side {
    display: flex;
    align-items: center;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }

    .secondary {
      margin-left: 12px;
    }
  }
}

.tasks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.add-task {
  margin-top: 60px;

  input,
  textarea {
    width: 360px;
    max-width: 100%;
    margin-top: 12px;
    padding: 5px;
  }

  button {
    width: 360px;
    margin-top: 12px;
  }
}
</style>
