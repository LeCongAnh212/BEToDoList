<template>
    <div class="w-full h-full p-4 flex">
        <div class="flex flex-col  w-[55%] p-4">
            <div class="flex">
                <legend class="text-5xl font-bold me-10 capitalize ">{{ typeView }}</legend>
                <div class="border-[1px] border-blue-300 rounded-xl w-14 h-14 flex justify-center items-center">
                    <span v-if="listTask" class="text-4xl font-semibold">
                        {{ listTask.length }}
                    </span>
                </div>
            </div>
            <div class="relative font-medium text-gray-500 mt-10 mb-2">
                <i class="fas fa-plus absolute top-1/2 -translate-y-1/2 left-3 cursor-pointer"></i>
                <button @click="viewCreate = !viewCreate"
                    class="border-[1px] border-blue-300 rounded-xl w-full p-3 text-start ps-10">Add New
                    Task</button>
            </div>
            <div v-if="listTask" class="overflow-y-auto">
                <template v-for="task in listTask" :key="task">
                    {{ task.name }}
                    <task-component :task="task" @transmitTaskToParent="handleReceiveTask" />
                </template>
            </div>
        </div>
        <div class="flex-1 bg-gray-100 h-full p-4 rounded-xl">
            <detail-task-component v-if="!viewCreate" />
            <create-task v-else @changeView="viewCreate = !viewCreate" />
        </div>
    </div>

</template>
<script>

import DetailTaskComponent from '../detail-task.vue'
import TaskComponent from '../task.vue'
import CreateTask from '../create-task/create-task.vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        DetailTaskComponent,
        TaskComponent,
        CreateTask,
    },
    data() {
        return {
            viewCreate: false,
            typeView: this.$route.params.typeName,
            listTask: null,
        }
    },
    watch: {
        '$route.params.typeName'(newV, onlV) {
            this.typeView = newV
            this.listTask = this.getListTypeTask.find(item => item.name == newV).tasks
        },
        getListTypeTask(newV, oldV) {
            this.check = false
            this.listTask = newV[0].tasks
        }
    },
    computed: {
        ...mapGetters([
            'getListTypeTask',
        ]),
    },
    mounted() {
        if (this.getListTypeTask) {
            this.listTask = this.getListTypeTask[0].tasks
        }

    },
    methods: {
        loadListTask() {
            console.log('this.listTask: ', this.listTask);
        }
    },
}
</script>
<style></style>