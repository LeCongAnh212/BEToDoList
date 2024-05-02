<template>
    <div class="flex justify-center items-center mt-52">
        <div class="w-full max-w-xs">
            <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="identity-input mb-4">
                    <label for="identity" class="block text-gray-700 text-sm font-bold mb-2">
                        Email</label>
                    <input v-model="email" class="shadow appearance-none borderrounded w-full py-2 px-3 
                        text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text"
                        placeholder="Email" aria-describedby="emailHelp" />
                    <span class="text-xs text-red-700" id="emailHelp"></span>
                </div>

                <div class="password-input mb-6">
                    <label for="identity" class="block text-gray-700 text-sm font-bold mb-2">Password</label>

                    <input v-model="password" class="shadow appearance-none borderrounded w-full py-2 px-3 
                        text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password"
                        type="password" placeholder="*******" />

                    <span class="text-xs text-red-700" id="passwordHelp"></span>
                </div>

                <div class="identity-input mb-4">
                    <label for="identity" class="block text-gray-700 text-sm font-bold mb-2">
                        Name</label>
                    <input v-model="name" class="shadow appearance-none borderrounded w-full py-2 px-3 
                        text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text"
                        placeholder="Email" aria-describedby="emailHelp" />
                    <span class="text-xs text-red-700" id="emailHelp"></span>
                </div>

                <div class="flex items-center justify-between">
                    <button @click="register()" class="bg-blue-600 hover:bg-black text-white 
                        font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Register
                    </button>
                    <router-link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" :to="{ name: 'login' }">
                        Login
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from '../../core/BaseRequest.js'

export default {
    data() {
        return {
            email: '',
            password: '',
            name: '',
        }
    },
    mounted() {
        //
    },
    methods: {
        register() {
            axios
                .post('register', {
                    email: this.email,
                    password: this.password,
                    name: this.name
                })
                .then((res) => {
                    if(res.data.status == 201) {
                        this.$router.push({ name: 'login' })
                    }
                })
        }
    },
}
</script>