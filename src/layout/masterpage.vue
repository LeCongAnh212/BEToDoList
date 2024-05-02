<template>
    <div class="flex">
        <div class="h-screen  w-1/4">
            <router-view></router-view>
        </div>
        <div class="h-screen  w-3/4">
            <router-view name="content"></router-view>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style></style>