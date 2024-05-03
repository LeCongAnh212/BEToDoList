<template>
    <div class="flex flex-col gap-5 font-medium relative h-full">
        <b class="text-3xl">Task:</b>
        <input v-model="task.title" type="text" class="w-full border border-gray-300 p-2 bg-transparent
        rounded-md focus:outline-none focus:border-blue-300" placeholder="title">

        <textarea v-model="task.description" rows="4" class="block p-2.5 w-full text-sm bg-transparent 
            rounded-lg border border-gray-300 focus:ring-blue-300 focus:border-blue-500
            placeholder-gray-400 focus:outline-none" placeholder="Description..." />

        <div class="flex items-center">
            <div class="w-24">Type:</div>
            <select v-model="task.type_id" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg font-semibold
                focus:ring-blue-500 focus:border-blue-300 block w-fit p-2.5 focus:outline-none px-2">
                <option v-for="value in typeTasks" :value="value.id">{{ value.name }}</option>
            </select>
        </div>

        <div class="flex items-center">
            <div class="w-24">Deadline:</div>
            <input v-model="deadline" type="date" class="p-2 rounded-lg font-semibold
                focus:ring-blue-500 focus:border-blue-300 block w-fit focus:outline-none">
        </div>

        <div class="flex items-center">
            <div class="w-24">Subtasks:</div>
            <div class="flex gap-2 flex-wrap">
                <div @click="showModalDeleteSubtask(value, index)" v-for="(value, index) in subtasks"
                    class="p-2 bg-gray-200 rounded-md cursor-pointer">{{ value.title }}</div>
                <button @click="isAdd = !isAdd" class="p-2 bg-gray-200 rounded-md hover:bg-blue-300">
                    <i class="fas fa-plus"></i>
                    Add subtask
                </button>
            </div>
        </div>
        <div v-if="isAdd">
            <strong class="text-3xl ">Subtasks</strong>
            <input v-model="subtask" @keyup.enter="addSubtask()" type="text" class="w-full border border-gray-300 p-2 bg-transparent
                    rounded-md focus:outline-none focus:border-blue-300 mt-3" placeholder="subtask">
        </div>

        <footer class="absolute bottom-10 flex w-full gap-5">
            <button @click="deleteTask()" class="flex-1 border-2 p-3 rounded-lg hover:bg-red-600 hover:text-white">
                Delete Task
            </button>
            <button @click="updateTask()" class="flex-1 border-2 p-3 
                rounded-lg hover:bg-blue-600 bg-blue-500 text-white">
                Save changes
            </button>
        </footer>
    </div>

    <!-- Modal -->
    <div id="modelDeleteSubtask" class="hidden absolute bg-gray-400 rounded-lg flex-col items-center
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-fit p-2 px-5">
        <i @click="hiddenModalDeleteSubtask()" class="fas fa-times absolute right-5 cursor-pointer"></i>
        <p class="text-xl">Are you sure you want to delete this subtask?</p>
        <div class="flex gap-5 mt-4">
            <button @click="handleDeleteSubtask()" class="bg-red-500 p-2 py-1 rounded-md hover:bg-red-600">Yes</button>
            <button @click="hiddenModalDeleteSubtask()"
                class="bg-gray-600 p-2 py-1 rounded-md text-white hover:bg-gray-700">Cancel</button>
        </div>
    </div>

</template>
<script>

import CoreFunction from '@/core/CoreFunction';
import axios from '@/core/BaseRequest'

export default {
    props: {
        currentTask: Object,
        typeTasks: Array
    },
    data() {
        return {
            isAdd: false,
            task: {
                type_id: 1,
            },
            deadline: '',
            idDeleteSubtask: [],
            subtasks: [],
            subtask: '',
            deleteSubtask: {},
        }
    },
    watch: {
        currentTask(newV, OldV) {
            this.task = Object.assign({}, newV)
            this.deadline = this.reverseDate(this.task.deadline)
            this.subtasks = [...this.task.subtasks]
            this.idDeleteSubtask = []
        }
    },
    mounted() {

    },
    methods: {
        reverseDate(date) {
            return CoreFunction.reverseDate(date)
        },
        deleteTask() {
            axios
                .post('tasks/delete', this.task)
                .then((res) => {
                    if (res.data.status == 200) {
                        this.$emit('deleteTask', this.task)
                        this.task = {}
                    }
                })
        },
        showModalDeleteSubtask(value, index) {
            document.getElementById('modelDeleteSubtask').classList.add('flex')
            document.getElementById('modelDeleteSubtask').classList.remove('hidden')
            this.deleteSubtask.value = value
            this.deleteSubtask.index = index
        },
        hiddenModalDeleteSubtask() {
            document.getElementById('modelDeleteSubtask').classList.add('hidden')
            document.getElementById('modelDeleteSubtask').classList.remove('flex')
        },
        handleDeleteSubtask() {
            this.subtasks.splice(this.deleteSubtask.index, 1)
            this.idDeleteSubtask.push(this.deleteSubtask.value.id)
            this.hiddenModalDeleteSubtask()
        },
        addSubtask() {
            this.subtasks.push({ title: this.subtask })
            this.subtask = ''
        },
        updateTask() {
            axios
                .post('tasks/update', {
                    ...this.task,
                    'deadline': this.deadline,
                    idDeleteSubtask: this.idDeleteSubtask,
                    subtasks: this.subtasks,
                })
                .then((res) => {
                    this.$emit('updateTask', res.data.task)
                    CoreFunction.displayNotification(res.data.message, 200)
                })
                .catch((res) => {
                    for (const [key, value] of Object.entries(res.response.data.errors)) {
                        CoreFunction.displayNotification(value)
                    }
                });
        },
    },
}
</script>
<style></style>