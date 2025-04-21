<script setup>
import { useTasksStore } from '../../stores/tasksStore';
const newTask = { completed: false };

const store= useTasksStore()
const onAddTask=()=>{store.addTask(newTask); store.modalIsActive=false}
</script>

<template>
    <div class="form">
        <h3>Add a new task</h3>
        <label for="title">Title *</label>
        <input
        v-model="newTask.name"
          type="text"
          name="title"
          placeholder="Enter a title..."
        /><br />
        <label for="title">Description *</label>
        <textarea
        v-model="newTask.description"
          name="description"
          rows="4"
          placeholder="Enter a description..."
        /><br />
        <button @click="onAddTask" class="btn gray">Add Task</button>
      </div>
</template>