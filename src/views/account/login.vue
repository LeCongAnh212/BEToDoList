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

                <div class="flex items-center justify-between">
                    <button @click="login()" class="bg-blue-600 hover:bg-black text-white 
                        font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Login
                    </button>
                    <router-link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" :to="{ name: 'register' }">
                        Register
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
        }
    },
    mounted() {
        //
    },
    methods: {
        login() {
            axios
                .post('login', {
                    email: this.email,
                    password: this.password
                })
                .then(res => {
                    if (res.data.status == 200) {
                        localStorage.setItem('token', res.data.token);

                        this.$router.push({ name: 'all-task' })
                    }
                })
        }
    },
}
</script>