<template>
  <v-app>
    <v-card v-if="islogged" class="mx-auto mt-5" outlined>
      <div class="d-flex flex-column align-center justify-center">
        <v-img
          src="@/assets/logo_libro.png"
          :width="300"
          contain
          class="logo_pr"
        ></v-img>

        <p>R&W</p>
      </div>
      <br />
      <v-card-title class="text-h5">Inicio de sesión exitoso</v-card-title>
      <br />
      <div class="d-flex justify-center">
        <v-btn
          data-cy="continue"
          color="red"
          class="login_btn"
          @click="goHome()"
        >
          Volver al inicio
        </v-btn>
      </div>
      <br />
    </v-card>

    <v-card v-else class="mx-auto mt-5" outlined>
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
      <v-card-title class="text-h5">Formulario de registro</v-card-title>
      <p class="mx-auto ml-5">¡Hola! Encantado de conocerte.</p>

      <v-card-text>
        <form @submit.prevent="singUp">
          <p class="mx-auto text-red">Nombre completo</p>
          <v-text-field data-cy="full_name" v-model="full_name"></v-text-field>
          <p class="mx-auto text-red">Nombre de usuario</p>
          <v-text-field data-cy="username" v-model="id"></v-text-field>
          <p class="mx-auto text-red">Contraseña</p>
          <v-text-field
            data-cy="password"
            v-model="password"
            type="password"
          ></v-text-field>
          <p class="mx-auto text-red">E-mail</p>
          <v-text-field
            data-cy="mail"
            v-model="mail"
            type="mail"
          ></v-text-field>
          <p class="mx-auto text-red">Fecha de nacimiento</p>
          <v-text-field
            data-cy="date"
            v-model="birth_date"
            type="date"
          ></v-text-field>

          <v-btn
            data-cy="singup-btn"
            color="red"
            class="signup_btn"
            type="submit"
          >
            Continuar
          </v-btn>
        </form>

        <br />

        <v-alert v-if="missing_info" type="warning" closable>
          Tienes que rellenar todos los campos
        </v-alert>

        <v-alert v-if="show_alert" type="error" closable>
          {{ alert_message }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import router from "@/router";
import { useUserStore } from "@/store/userStore";
const UserStore = useUserStore();
export default {
  data() {
    return {
      full_name: "",
      id: "",
      mail: "",
      birth_date: new Date("1/1/1"),
      password: "",
      isLoading: false,
      missing_info: false,
      alert_message: "",
      show_alert: false,
      logged: false,
    };
  },
  methods: {
    async singUp() {
      this.missing_info = false;
      this.isLoading = true;
      this.show_alert = false;
      this.alert_message = "";
      if (
        this.id === "" ||
        this.password === "" ||
        this.mail === "" ||
        this.full_name === "" ||
        this.birth_date.toString() === new Date("1/1/1").toString()
      ) {
        this.missing_info = true;
        this.isLoading = false;
        return;
      }
      const response = await UserStore.registerUser(
        this.full_name,
        this.id,
        this.mail,
        this.birth_date,
        this.password
      );
      if (response.code == 1) {
        this.show_alert = true;
        this.alert_message = response.message;
        this.isLoading = false;
        return;
      }
      this.isLoading = false;
      this.logged = true;
      location.reload();
      return;
    },
    goHome() {
      router.push("/home");
    },
  },

  computed: {
    islogged() {
      return !UserStore.checkExpired();
    },
  },
};
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
  background: url("/fondo_rojo.avif");
  background-size: cover;
}
</style>
