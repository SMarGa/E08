<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="headline">Inicio de sesión exitoso</v-card-title>
      <v-card-text> ¡Has iniciado sesión con éxito! </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="closePopup">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    closePopup() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped></style>
