<template>
  <v-container class="text-center fill-height">
    <v-row justify="center">
      <v-col>
        <v-card v-if="!deleted" class="mx-auto mt-5 elevation-24 card" outlined>
          <v-avatar color="red" size="x-large">
            <v-icon icon="mdi-account-circle"></v-icon>
          </v-avatar>
          <v-card-title class="title">
            Hola {{ userStore._full_name }}!
          </v-card-title>
          <v-card-subtitle class="subtitle">{{
            userStore._mail
          }}</v-card-subtitle>
          <v-card-text>
            <p class="Text_title">Nombre de usuario</p>
            <p class="text">{{ userStore.id }}</p>
            <p class="Text_title">Fecha de Nacimiento</p>
            <p class="text">
              {{ userStore._birth_date.toLocaleString().split(",")[0] }}
            </p>
          </v-card-text>

          <v-card-actions>
            <v-btn
              data-cy="delete-btn"
              class="bg-red white--text"
              @click="deleteUser"
              >Eliminar Usuario</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn class="bg-red white--text" @click="updateUser"
              >Modificar información</v-btn
            >
          </v-card-actions>
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
          <br />
          <v-card-title class="text-h5"
            >Usuario eliminado correctamente</v-card-title
          >
          <br />
          <div class="d-flex justify-center">
            <v-btn
              data-cy="continue"
              color="red"
              class="login_btn"
              @click="goHome()"
            >
              Continuar
            </v-btn>
          </div>

          <br />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { useUserStore } from "@/store/userStore";
import router from "@/router";
export default {
  data() {
    return {
      deleted: false,
      userStore: useUserStore(),
    };
  },

  methods: {
    async deleteUser() {
      await this.userStore.deleteUser();
      this.deleted = true;
    },

    async updateUser() {},

    goHome() {
      location.reload();
    },
  },

  created() {
    this.userStore = useUserStore();
    this.userStore.reloadInfo();
  },
};
</script>

<style scoped>
.logo_pr {
  max-width: 5%;
  max-height: 5%;
}

.title {
  font-size: 3rem;
  padding: 0.5rem;
}

.subtitle {
  font-size: 1rem;
  margin-bottom: 0.8rem;
}

.card {
  padding: 2rem;
  border-radius: 1rem;
}

.text {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
.Text_title {
  color: red;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 1rem;
}

.fill-height {
  height: 100%;
}

.align-center {
  align-items: center;
}
</style>
