<template>
  <div class="bg-cover bg-center h-screen flex items-center justify-center" style="
      background-image: url('https://img5.pic.in.th/file/secure-sv1/desk-concept-cyber-monday-Large.png');
    ">
    <div class="bg-white bg-opacity-85 rounded-xl shadow-lg w-[400px]">
      <div class="p-5">
        <div>
          <h1 class="font-bold text-3xl text-center text-[#2b7b64]">สมัครสมาชิก</h1>
          <p class="text-red-500 mb-5 text-sm text-center">รอการยืนยันใช้งานจากแอดมิน</p>
        </div>
        <div class="flex-col flex gap-y-4">
          <div class="flex justify-center">
            <div class="flex flex-col w-full">
              <p>ชื่อ</p>
              <input v-model="firstname" type="text" class="input input-bordered" />
            </div>
          </div>

          <div class="flex justify-center">
            <div class="flex flex-col w-full">
              <p>นามสกุล</p>
              <input v-model="lastname" type="text" class="input input-bordered" />
            </div>
          </div>

          <div class="flex justify-center">
            <div class="flex flex-col w-full">
              <p>อีเมล</p>
              <input v-model="email" type="email" class="input input-bordered" />
            </div>
          </div>

          <div class="flex justify-center">
            <div class="flex flex-col w-full">
              <p>รหัสผ่าน</p>
              <div class="relative">
                <input v-model="password" :type="showPassword ? 'text' : 'password'"
                  class="input input-bordered w-full" />
                <button type="button" @click="togglePasswordVisibility"
                  class="absolute inset-y-0 right-3 flex items-center text-gray-600">
                  <span v-if="showPassword">👁️</span>
                  <span v-else>🙈</span>
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-center">
            <div class="flex flex-col w-full">
              <p>ยืนยันรหัสผ่าน</p>
              <div class="relative">
                <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                  class="input input-bordered w-full" />
                <button type="button" @click="toggleConfirmPasswordVisibility"
                  class="absolute inset-y-0 right-3 flex items-center text-gray-600">
                  <span v-if="showConfirmPassword">👁️</span>
                  <span v-else>🙈</span>
                </button>
              </div>
            </div>
          </div>

          <div class="flex justify-center">
            <div class="w-full">
              <button @click="submitForm"
                class="p-3 bg-green-500 w-full text-lg font-medium text-white rounded-full hover:bg-green-600">
                สมัครสมาชิก
              </button>
              <RouterLink to="/">
                <p class="text-center mt-2 text-green-600 underline">เข้าสู่ระบบ</p>
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
import axios from 'axios';
import { useRouter } from 'vue-router';

const firstname = ref('');
const lastname = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const router = useRouter();

const showConfirmPassword = ref(false);
const showPassword = ref(false);

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const submitForm = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'รหัสผ่านไม่ตรงกัน';
    return;
  }

  try {
    await axios.post('/api/auth/register', {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
    });

    alert('สมัครสมาชิกสำเร็จ กรุณารอการยืนยันจากแอดมิน');
    router.push('/');
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'เกิดข้อผิดพลาด';
  }
};
</script>


<style></style>
