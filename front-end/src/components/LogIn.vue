<template>
  <v-app class="bg_image">
    <v-card class="mx-auto mt-5" outlined>
      <div class="d-flex flex-column align-center justify-center">
        <v-img
          src="@/assets/logo_libro.png"
          :width="300"
          contain
          class="logo_pr"
        ></v-img>

        <p>R&W</p>
      </div>

      <v-card-title class="text-h5">Log In</v-card-title>
      <p class="mx-auto ml-5">Hi there! Nice to see you again.</p>

      <v-card-text>
        <v-form @submit.prevent="submit">
          <p class="mx-auto text-red">Username</p>
          <v-text-field
            data-cy="username"
            v-model="id.value.value"
            :error-messages="id.errorMessage.value"
          ></v-text-field>
          <p class="mx-auto text-red">Password</p>
          <v-text-field
            data-cy="password"
            v-model="password.value.value"
            type="password"
            :error-messages="password.errorMessage.value"
          ></v-text-field>

          <div class="d-flex justify-center">
            <v-btn
              data-cy="login-btn"
              color="red"
              class="login_btn"
              type="submit"
            >
              <v-progress-circular
                v-if="isLoading"
                indeterminate
                color="white"
              ></v-progress-circular>
              <span v-else>Log in</span>
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();

const { handleSubmit } = useForm({
  validationSchema: {
    id(value: string) {
      if (value?.length >= 2) return true;

      return "User Name needs to be at least 2 characters.";
    },

    password(value: string) {
      if (value?.length >= 4) return true;

      return "Password needs to be at least 4 characters.";
    },
  },
});

const id = useField("id");
const password = useField("password");

const router = useRouter();

const isLoading = ref(false);

const submit = handleSubmit(async (values) => {
  const { id, password } = values;
  isLoading.value = true;

  if (await loginUser(id, password)) {
    alert("Logged In");
    router.push("/");
    location.reload();
  } else {
    alert("Invalid credentials");
  }
});

async function loginUser(id: string, password: string): Promise<Boolean> {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      {
        id,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      const token = response.data.token;
      const user = response.data.user;

      userStore.setUserInfo(user, token);
      return true;
    } else {
      console.log(response.data.message);
      return false;
    }
  } catch (error: any) {
    console.error("Error on login:", error);
    return false;
  }
}
</script>

<style scoped>
.logo_pr {
  max-width: 25%;
  max-height: 25%;
}

.login_btn {
  width: 100%;
}

.bg_image {
  background: url("@/assets/fondo_rojo.avif");
  background-size: cover;
}
</style>
