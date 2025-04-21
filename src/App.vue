<script setup>
import { ref, reactive, computed } from "vue";
import Task from "./components/Task.vue";
import Filters from "./components/Filters.vue";
import ModalWindow from "./components/modal/ModalWindow.vue";
import AddTaskModal from "./components/modal/AddTaskModal.vue";
import { useTasksStore } from "./stores/tasksStore";

//Store---------
const store= useTasksStore();

//State subscription
store.$subscribe((mutation, state) => {
  localStorage.setItem('tasks', JSON.stringify(state.tasks))
})

</script>

<template>
  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>Tasks Manager</h1>
      </div>

      <div class="header-side">
        <button @click="store.modalIsActive = true" class="btn secondary">
          + Add Task
        </button>
      </div>
    </div>

    <Filters />

    <div class="tasks">
      <Task
        v-for="(task, index) in store.filteredTasks"
        :key="index"
        :task="task"
      />
    </div>

    <ModalWindow v-if="store.modalIsActive">
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


<!-- <script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
    email: yup.string().email().required()
  })
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')

const onSubmit = handleSubmit(values => {
  console.log('Submitted:', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="name" placeholder="Name" />
    <span>{{ nameError }}</span>

    <input v-model="email" placeholder="Email" />
    <span>{{ emailError }}</span>

    <button type="submit">Submit</button>
  </form>
</template> -->

