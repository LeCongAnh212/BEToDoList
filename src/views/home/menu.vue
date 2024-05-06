<template>
    <div class="w-full h-full bg-gray-100 p-4 gap-5 flex flex-col relative">
        <p class="text-2xl font-semibold">
            Menu
        </p>
        <div class="relative">
            <input @keyup="searchTask" v-model="keyword" type="text" placeholder="Search ... "
                class="w-full p-2 ps-10 border-2 border-gray-300 rounded-md bg-transparent ::placeholder:text-white">
            <i class="fas fa-search absolute top-1/2 -translate-y-1/2 left-3 "></i>
        </div>
        <div class="font-medium capitalize">
            <p class="font-semibold text-xl mb-2">Tasks</p>
            <ul>
                <li @click="$router.push({ name: 'all-task' })"
                    class="flex justify-between items-center hover:bg-gray-200 hover:text-blue-300 cursor-pointer  p-2">
                    <div class="w-4">
                        <i class="fas fa-border-all me-2 "></i>
                    </div>
                    <p class="flex-1 ps-3">All</p>
                    <p>{{ getListAllTask.length }}</p>
                </li>
                <li @click="$router.push({ name: 'finished' })"
                    class="flex justify-between items-center hover:bg-gray-200 hover:text-blue-300 cursor-pointer  p-2">
                    <div class="w-4">
                        <i class="fas fa-clipboard-check me-2 "></i>
                    </div>
                    <p class="flex-1 ps-3">Finished</p>
                    <p>{{ getListTaskFinished.length }}</p>
                </li>
                <li @click="$router.push({ name: 'unfinished' })"
                    class="flex justify-between items-center hover:bg-gray-200 hover:text-blue-300 cursor-pointer  p-2">
                    <div class="w-4">
                        <i class="fas fa-undo-alt me-2 "></i>
                    </div>
                    <p class="flex-1 ps-3">Unfinished</p>
                    <p>{{ getListTaskUnFinished.length }}</p>
                </li>
                <li @click="$router.push({ name: 'out-date' })"
                    class="flex justify-between items-center hover:bg-gray-200 hover:text-blue-300 cursor-pointer  p-2">
                    <div class="w-4">
                        <i class="fas fa-calendar-day me-2 "></i>
                    </div>
                    <p class="flex-1 ps-3">Out date</p>
                    <p>{{ getListTaskOutDate.length }}</p>
                </li>
            </ul>
        </div>

        <div class="font-medium">
            <p class="font-semibold text-xl mb-2">Types</p>
            <ul class=" max-h-64 overflow-scroll">
                <li @click="$router.push({ name: 'type-view', params: { typeName: value.name } })"
                    v-for="(value, index) in getListTypeTask"
                    class="flex justify-between items-center hover:bg-gray-200 hover:text-blue-300 cursor-pointer  p-2">
                    <span class="w-5 aspect-square text-center me-2" :class="value.id == 1 ? 'bg-red-500'
                        : value.id == 2 ? 'bg-green-500' : 'bg-blue-500'">
                    </span>
                    <p class="flex-1 ps-3">{{ value.name }}</p>
                    <p v-if="value.tasks">{{ value.tasks.length }}</p>
                </li>
            </ul>
            <li @click="toggleViewCreateType()"
                class="flex justify-between items-center hover:bg-gray-200 hover:text-blue-300 cursor-pointer  p-2">
                <div class="w-4">
                    <i class="fas fa-plus me-2"></i>
                </div>
                <p class="flex-1 ps-3 select-none">Add New type</p>
            </li>
        </div>
        <div v-show="viewCreateType">
            <p class="font-semibold text-xl mb-2">Add type</p>
            <input @keyup.enter="createType()" v-model="typeName" type="text" placeholder="Add type" class="w-full mt-2 p-2 border-2 
            border-gray-300 rounded-md focus:">
        </div>


        <div @click="logout()" class="absolute bottom-10 bg-blue-300 w-10 h-10 flex justify-center 
            items-center rounded-full cursor-pointer shadow-md">
            <i class="fas fa-sign-out-alt"></i>
        </div>
    </div>
</template>
<script>

import coreFunction from '@/core/CoreFunction.js'
import { mapGetters } from "vuex";

import _ from 'lodash'
import axios from '@/core/BaseRequest'

export default {
    data() {
        return {
            keyword: '',
            typeName: '',
            viewCreateType: false,
        }
    },
    mounted() {

    },
    computed: {
        ...mapGetters([
            "getListTaskFinished",
            "getListTaskUnFinished",
            "getListAllTask",
            "getListTypeTask",
            "getListTaskOutDate",
        ]),
    },
    async created() {
        this.$store.dispatch("fetchFinishedTasks");
        this.$store.dispatch('fetchUnFinishedTasks');
        this.$store.dispatch('fetchAllTasks')
        this.$store.dispatch('fetchListTypeTasks')
        this.$store.dispatch('fetchTaskOutDate')
    },
    methods: {
        logout() {
            try {
                axios.get("logout").then((res) => {
                    if (res.data.status == 200) {
                        localStorage.removeItem("token");
                        this.$router.push({ name: "login" });
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
        searchTask: _.debounce(function () {
            let payload = {
                keyword: this.keyword,
            };
            this.$store.dispatch("searchTask", payload);
        }, 400),
        toggleViewCreateType() {
            this.viewCreateType = !this.viewCreateType
        },
        createType() {
            if (this.typeName == '') return
            const check = this.$store.dispatch('createType', { name: this.typeName })
            if (check) {
                this.typeName = ''
            }
        }
    },
}
</script>
<style></style>