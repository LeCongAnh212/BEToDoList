<template>
    <div class="w-full h-full p-4 flex">
        <div class="flex flex-col  w-[55%] p-4">
            <div class="flex">
                <legend class="text-5xl font-bold me-10">All Task</legend>
                <div class="border-[1px] border-blue-300 rounded-xl w-14 h-14 flex justify-center items-center">
                    <span v-if="listTask" class="text-4xl font-semibold">{{ listTask.length }}</span>
                </div>
            </div>
            <div class="relative font-medium text-gray-500 mt-10 mb-2">
                <i class="fas fa-plus absolute top-1/2 -translate-y-1/2 left-3 cursor-pointer"></i>
                <button @click="viewCreate = !viewCreate"
                    class="border-[1px] border-blue-300 rounded-xl w-full p-3 text-start ps-10">Add New
                    Task</button>
            </div>
            <div>
                <template v-for="task in listTask" :key="task">
                    <task-component :task="task" @transmitTaskToParent="handleReceiveTask" />
                </template>
            </div>
        </div>
        <div v-if="currentTask" class="flex-1 bg-gray-100 h-full p-4 rounded-xl">
            <detail-task-component v-if="!viewCreate" :currentTask="currentTask" :typeTasks="typeTasks"
                @deleteTask="handleDeleteTask" @updateTask="handleUpdateTask" />
            <create-task v-else :typeTasks="typeTasks" @addTaskToParent="handleCreatedTask" />
        </div>
    </div>

</template>
<script>

import DetailTaskComponent from '../detail-task.vue'
import TaskComponent from '../task.vue'
import CreateTask from '../create-task/create-task.vue'
import axios from '../../core/BaseRequest.js'
import { proxyRefs } from 'vue'

export default {
    components: {
        DetailTaskComponent,
        TaskComponent,
        CreateTask,
    },
    data() {
        return {
            listTask: null,
            currentTask: {},
            typeTasks: null,
            viewCreate: false,
        }
    },
    created() {
        this.getTask();
        this.getTypeTask();
    },
    methods: {
        getTask() {
            axios
                .get('tasks/data')
                .then(res => {
                    this.listTask = res.data.tasks
                })
        },
        getTypeTask() {
            axios
                .get('type-task')
                .then((res) => {
                    this.typeTasks = res.data.types
                    this.emitter.emit('transmitTypeTask', res.data.types)
                });
        },
        handleReceiveTask(task) {
            this.currentTask = task
        },
        handleCreatedTask(task) {
            this.listTask.unshift(task)
            this.viewCreate = false
        },
        handleDeleteTask(task) {
            this.listTask = this.listTask.filter(t => t.id != task.id)
        },
        handleUpdateTask(task) {
            this.getTask()
            // const a = this.listTask.map(t => t.id == task.id ? task : t) 
            // this.listTask = a
        }
    },
}
</script>
<style></style>