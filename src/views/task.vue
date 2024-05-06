<template>
    <div @click="$store.commit('setCurrentTask', task)" v-if="task"
        class="w-full p-4 border-b-2 border-gray-200 cursor-pointer hover:bg-blue-100 rounded-lg">
        <div class="flex items-center">
            <input type="checkbox" class="accent-pink-500 w-6 h-6 cursor-pointer">
            <div class="flex-1 ps-3 font-semibold">
                <p>{{ task.title }}</p>
            </div>
            <i class="fas fa-chevron-right"></i>
        </div>

        <div class="ps-9 flex font-semibold">
            <div v-if="task.deadline" class="flex items-center">
                <i class="fas fa-calendar-alt me-2 text-gray-500"></i>
                {{ dateFormat(task.deadline) }}
            </div>

            <div v-if="task.deadline && task.subtasks.length > 0 " class="border-[1px] border-gray-500 mx-2"></div>

            <div v-if="task.subtasks.length > 0" class="flex items-center ">
                <span class="w-6 bg-gray-200 rounded-full aspect-square text-center me-2">
                    {{ task.subtasks.length }}
                </span>
                Subtasks
            </div>

            <div v-if="(task.subtasks.length > 0 || task.deadline) && task.type_tasks.id"
                class="border-[1px] border-gray-500 mx-2"></div>

            <div v-if="task.type_tasks.name" class="flex items-center ">
                <span class="w-5 aspect-square text-center me-2" :class="task.type_tasks.id == 1 ? 'bg-red-500'
                    : task.type_tasks.id == 2 ? 'bg-green-500' : 'bg-blue-500'">
                </span>
                {{ task.type_tasks.name }}
            </div>
        </div>
    </div>
</template>
<script>

import coreFunction from '../core/CoreFunction.js'

export default {
    props: {
        task: Object
    },
    methods: {
        dateFormat(date) {
            return coreFunction.dateFormat(date)
        }
    },

}
</script>
<style></style>