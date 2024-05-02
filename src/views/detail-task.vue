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
            <select class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg font-semibold
                focus:ring-blue-500 focus:border-blue-300 block w-fit p-2.5 focus:outline-none px-2">
                <option v-for="value in typeTasks" :value="value.id">{{ value.name }}</option>
            </select>
        </div>

        <div class="flex items-center">
            <div class="w-24">Deadline:</div>
            <input type="date" class="p-2 rounded-lg font-semibold
                focus:ring-blue-500 focus:border-blue-300 block w-fit focus:outline-none">
        </div>

        <div class="flex items-center">
            <div class="w-24">Subtasks:</div>
            <div class="flex gap-2 flex-wrap">
                <div class="p-2 bg-gray-200 rounded-md">Subtask 1</div>
                <button @click="isAdd = !isAdd" class="p-2 bg-gray-200 rounded-md hover:bg-blue-300">
                    <i class="fas fa-plus"></i>
                    Add subtask
                </button>
            </div>
        </div>
        <div v-if="isAdd">
            <strong class="text-3xl ">Subtasks</strong>
            <textarea id="message" rows="4" class="block mt-5 p-2.5 w-full text-sm bg-transparent 
            rounded-lg border border-gray-300 focus:ring-blue-300 focus:border-blue-500
            placeholder-gray-400 focus:outline-none" placeholder="Subtask ..." />
        </div>

        <footer class="absolute bottom-10 flex w-full gap-5">
            <button class="flex-1 border-2 p-3 rounded-lg hover:bg-red-600 hover:text-white">Delete Task</button>
            <button class="flex-1 border-2 p-3 rounded-lg hover:bg-blue-600 bg-blue-500 text-white">Save
                changes</button>
        </footer>
    </div>
</template>
<script>
export default {
    props: {
        currentTask: Object,
        typeTasks: Array
    },
    data() {
        return {
            isAdd: false,
            task: {
                'title': null
            }
        }
    },
    watch: {
        currentTask(newV, OldV) {
            this.task = newV
        }
    },
    mounted() {
        //
    },
    methods: {
        //
    },
}
</script>
<style></style>