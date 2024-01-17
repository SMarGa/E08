<template>
  <v-footer app absolute class="footer_style" color="red darken-2">
    <v-container>
      <v-row>
        <v-col>
          <div class="d-flex flex-column align-center">
            <p class="footer_text_style">
              &copy; 2024 <E-B></E-B>. Todos los derechos reservados.
            </p>
            <p class="footer_text_style">
              Autores: Saúl Martín García y Laura Dorta Marrero
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer_style {
  margin-top: auto;
  height: 4rem; /* Ajusta la altura según tus preferencias o déjalo como "auto" para que se ajuste automáticamente al contenido */

  text-align: center;
  color: white;
}

.footer_text_style {
  font-size: small;
}
</style>
