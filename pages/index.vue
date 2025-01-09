<template>
  <div class="bg-cover bg-center h-screen flex items-center justify-center"
    style="background-image: url('https://img5.pic.in.th/file/secure-sv1/desk-concept-cyber-monday-Large.png')">
    <div class="bg-white bg-opacity-85 rounded-xl shadow-lg w-[400px]">


      <div class="p-5">
        <div class="flex justify-center">
          <img src="https://img5.pic.in.th/file/secure-sv1/iconMypos.png" alt="logo-mypos" class="w-48 h-48">
        </div>

        <div class="divider"></div>

        <h1 class="font-bold text-3xl mb-5 text-center text-[#2b7b64]">เข้าสู่ระบบ</h1>
        <div class="flex-col flex gap-y-4">

          <div class="flex justify-center">
            <div class="flex flex-col w-full">
              <p>อีเมล</p>
              <input v-model="email" type="text" class="input input-bordered">
            </div>
          </div>

          <div class="flex justify-center">
            <div class="flex flex-col w-full">
              <p>รหัสผ่าน</p>
              <input v-model="password" type="password" class="input input-bordered">
            </div>
          </div>


          <div class="flex justify-center mt-2">
            <div class="w-full">
              <button @click="login" class="p-3 bg-green-500 w-full text-lg font-medium text-white rounded-full hover:bg-green-600">
                เข้าสู่ระบบ
              </button>
              <RouterLink to="/register" class="flex mt-3 gap-2 justify-center">
                <p>ไม่มีบัญชีผู้ใช้? </p>
                <p class="text-center text-green-600 underline">สมัครสมาชิก</p>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '#build/imports';
import axios from 'axios';

const email = ref('');
const password = ref('');
const authStore = useAuthStore()

const login = async () => {
  try {
    const response = await axios.post('api/auth/login', {
      email: email.value,
      password: password.value
    })
    console.log(response);
    if (response.status === 200) {
      authStore.login(response.data);
    }
  } catch (error) {
    console.log('Login failed', error);
  }
};
</script>