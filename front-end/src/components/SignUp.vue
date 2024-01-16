<template>
  <v-app class="bg_image">
    <v-card class="mx-auto mt-5" outlined>
      <div class="d-flex flex-column align-center justify-center">
        <v-img
          data-cy="logo_pr"
          src="@/assets/logo_libro.png"
          :width="300"
          contain
          class="logo_pr"
        ></v-img>

        <p>R&W</p>
      </div>
      <v-card-title class="text-h5">Sign up</v-card-title>
      <p class="mx-auto ml-5">Hi there! Nice to meet you.</p>

      <v-card-text>
        <form @submit.prevent="submit">
          <p class="mx-auto text-red">Full Name</p>
          <v-text-field
            data-cy="full_name"
            v-model="full_name.value.value"
            :counter="10"
            :error-messages="full_name.errorMessage.value"
          ></v-text-field>
          <p class="mx-auto text-red">User Name</p>
          <v-text-field
            data-cy="username"
            v-model="id.value.value"
            :counter="10"
            :error-messages="id.errorMessage.value"
          ></v-text-field>
          <p class="mx-auto text-red">Password</p>
          <v-text-field
            data-cy="password"
            v-model="password.value.value"
            type="password"
            :error-messages="password.errorMessage.value"
          ></v-text-field>
          <p class="mx-auto text-red">E-mail</p>
          <v-text-field
            data-cy="mail"
            v-model="mail.value.value"
            :error-messages="mail.errorMessage.value"
            type="mail"
          ></v-text-field>
          <p class="mx-auto text-red">Birth Date</p>
          <v-text-field
            data-cy="date"
            v-model="birth_date.value.value"
            type="date"
            :error-messages="birth_date.errorMessage.value"
          ></v-text-field>

          <v-btn
            data-cy="singup-btn"
            color="red"
            class="signup_btn"
            type="submit"
          >
            Sing up
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import axios from "axios";
import { useField, useForm } from "vee-validate";
import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    full_name(value: string) {
      if (value?.length >= 2) return true;

      return "Name needs to be at least 2 characters.";
    },
    id(value: string) {
      if (value?.length >= 2) return true;

      return "User Name needs to be at least 2 characters.";
    },

    mail(value: string) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Must be a valid e-mail.";
    },

    birth_date(value: Date) {
      return true;
    },
    password(value: string) {
      return true;
    },
  },
});
const full_name = useField("full_name");

const id = useField("id");

const mail = useField("mail");

const password = useField("password");

const router = useRouter();

const birth_date = useField("birth_date");

const submit = handleSubmit(async (values) => {
  const user_info = JSON.stringify(values, null, 2);
  await registerUser(user_info);
});

async function registerUser(user: string) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/signup`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status == 201) {
      alert("Sign up succesfull");
      const userInfo = JSON.parse(user);
      const token = response.data.token;

      userStore.setUserInfo(userInfo, token);

      location.reload();
      router.push("/home");
    } else {
      console.log(response.data.message);
    }
  } catch (error: any) {
    alert(error.response.data.message);
    console.error("Error on login:", error.response.data.message);
  }
}
</script>

<style scoped>
.logo_pr {
  max-width: 25%;
  max-height: 25%;
}

.signup_btn {
  width: 100%;
}

.bg_image {
  background: url("@/assets/fondo_rojo.avif");
  background-size: cover;
}
</style>
