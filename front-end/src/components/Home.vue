<template>
  <v-container fluid class="text-center">
    <v-row justify="center">
      <v-col class="text-center">
        <v-card class="card_style mx-auto mt-5">
          <p class="headline text-center title_style">
            Bienvenido a la Biblioteca Online
          </p>

          <p class="text-center subtitle_style">
            Explora nuestra colección de libros y encuentra tu próxima lectura
            emocionante.
          </p>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="text-center">
        <v-card class="card_style mx-auto mt-5">
          <p class="text_style">Explora los libros que tenemos disponibles</p>
          <v-btn rounded="xl" class="btn_style" color="red" stacked to="/books">
            <v-icon icon="mdi-book-open-variant"> </v-icon>
          </v-btn>

          <p class="text_style">
            ¿Ya tienes cuenta? Entra para poder comentar en libros
          </p>
          <v-btn rounded="xl" class="btn_style" color="red" stacked to="/login">
            <v-icon icon="mdi-login"> </v-icon>
          </v-btn>

          <p class="text_style">¿No tienes cuenta? ¡Registrate!</p>
          <v-btn
            rounded="xl"
            class="btn_style"
            color="red"
            stacked
            to="/signup"
          >
            <v-icon icon="mdi-account-plus-outline"> </v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup></script>

<style scoped>
.card_style {
  padding: 1rem;
  border-radius: 1rem;
  width: 70%;
}
.btn_style {
  size: 5vw;
}
.title_style {
  font-size: 2.7vw;
}

.subtitle_style {
  font-size: 2.1vw;
  padding: 0.5rem;
}

.text_style {
  font-size: 2.2vw;
  padding: 0.7rem;
}

@media (max-width: 800px) {
  .card_style {
    padding: 1rem;
    border-radius: 1rem;
    width: 100%;
  }
  .btn_style {
    size: 6vw;
    padding: 1rem;
  }
  .title_style {
    font-size: 5.5vw;
  }

  .subtitle_style {
    font-size: 4.9vw;
  }
  .text_style {
    font-size: 5vw;
  }
}
</style>
