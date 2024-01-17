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
          src="@/assets/logo_libro.png"
          :width="300"
          contain
          class="logo_pr"
        ></v-img>

        <p>R&W</p>
      </div>

      <v-card-title class="text-h5">Log In</v-card-title>
      <p class="mx-auto ml-5">¡Hola! Bienvenido de vuelta.</p>

      <v-card-text>
        <v-form @submit.prevent="LogIn">
          <p class="mx-auto text-red">Nombre de usuario</p>
          <v-text-field data-cy="username" v-model="id"></v-text-field>
          <p class="mx-auto text-red">Contraseña</p>
          <v-text-field
            data-cy="password"
            v-model="password"
            type="password"
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

        <br />

        <v-alert v-if="missing_info" type="warning" closable>
          Usuario y Contraseña obligatorios
        </v-alert>

        <v-alert v-if="show_alert" type="error" closable>
          {{ alert_message }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script lang="ts">
import { useUserStore } from "@/store/userStore";
import router from "@/router";

const UserStore = useUserStore();

export default {
  data: () => ({
    id: "",
    password: "",
    isLoading: false,
    missing_info: false,
    alert_message: "",
    show_alert: false,
  }),

  computed: {
    islogged() {
      return !UserStore.checkExpired();
    },
  },

  methods: {
    async LogIn() {
      this.missing_info = false;
      this.isLoading = true;
      this.show_alert = false;
      this.alert_message = "";
      if (this.id == "" || this.password == "") {
        this.missing_info = true;
        this.isLoading = false;
        return;
      }
      const response = await UserStore.logUserIn(this.id, this.password);
      if (response.code == 1) {
        this.show_alert = true;
        this.alert_message = response.message;
        this.isLoading = false;
        return;
      }
      this.isLoading = false;
      location.reload();
      return;
    },
    goHome() {
      router.push("/home");
    },
  },
};
</script>

<style scoped>
.logo_pr {
  max-width: 25%;
  max-height: 25%;
}

.login_btn {
  width: 75%;
}
</style>
