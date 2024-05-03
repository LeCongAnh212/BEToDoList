<template>
    <div class="w-full h-full bg-gray-100 p-4 gap-5 flex flex-col">
        <p class="text-2xl font-semibold">
            Menu
        </p>
        <div class="relative">
            <input type="text" placeholder="Search ... " class="w-full p-2 ps-10 border-2 border-gray-300 
            rounded-md bg-transparent  ::placeholder:text-white">
            <i class="fas fa-search absolute top-1/2 -translate-y-1/2 left-3 "></i>
        </div>
        <div class="font-medium">
            <p class="font-semibold text-xl mb-2">Tasks</p>
            <ul>
                <li class="flex justify-between items-center hover:bg-gray-200 hover:text-blue-300 cursor-pointer  p-2">
                    <div class="w-4">
                        <i class="fas fa-border-all me-2 "></i>
                    </div>
                    <p class="flex-1 ps-3">All</p>
                    <p>12</p>
                </li>
                <li class="flex justify-between items-center hover:bg-gray-200 hover:text-blue-300 cursor-pointer  p-2">
                    <div class="w-4">
                        <i class="fas fa-calendar-day me-2 "></i>
                    </div>
                    <p class="flex-1 ps-3">Today</p>
                    <p>12</p>
                </li>
                <li class="flex justify-between items-center hover:bg-gray-200 hover:text-blue-300 cursor-pointer  p-2">
                    <div class="w-4">
                        <i class="fas fa-clipboard-check me-2 "></i>
                    </div>
                    <p class="flex-1 ps-3">Finished</p>
                    <p>12</p>
                </li>
                <li class="flex justify-between items-center hover:bg-gray-200 hover:text-blue-300 cursor-pointer  p-2">
                    <div class="w-4">
                        <i class="fas fa-undo-alt me-2 "></i>
                    </div>
                    <p class="flex-1 ps-3">Unfinished</p>
                    <p>12</p>
                </li>
            </ul>
        </div>

        <div class="font-medium">
            <p class="font-semibold text-xl mb-2">Types</p>
            <ul>
                <li v-for="(value, index) in typeTask"
                    class="flex justify-between items-center hover:bg-gray-200 hover:text-blue-300 cursor-pointer  p-2">
                    <span class="w-5 aspect-square text-center me-2" :class="value.id == 1 ? 'bg-red-500'
                        : value.id == 2 ? 'bg-green-500' : 'bg-blue-500'">
                    </span>
                    <p class="flex-1 ps-3">{{ value.name }}</p>
                    <p>12</p>
                </li>
                <li class="flex justify-between items-center hover:bg-gray-200 hover:text-blue-300 cursor-pointer  p-2">
                    <div class="w-4">
                        <i class="fas fa-plus me-2"></i>
                    </div>
                    <p class="flex-1 ps-3">Add New type</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            typeTask: []
        }
    },
    mounted() {
        this.emitter.on('transmitTypeTask', (types) => {
            this.typeTask = types
        })
    },
    methods: {
        //
    },
}
</script>
<style></style>