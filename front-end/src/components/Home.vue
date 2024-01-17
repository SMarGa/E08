<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline text-center title_style"
            >Bienvenido a la Biblioteca Online</v-card-title
          >
          <v-card-text class="text-center subtitle_style">
            <p>
              Explora nuestra colección de libros y encuentra tu próxima lectura
              emocionante.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="text-center">
        <v-col class="text-center">
          <p class="text_style">Explora los libros que tenemos disponibles</p>
          <v-btn rounded="xl" class="btn_style" color="red" stacked to="/books">
            <v-icon icon="mdi-book-open-variant"> </v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center">
          <p class="text_style">
            ¿Ya tienes cuenta? Entra para poder comentar en libros
          </p>
          <v-btn rounded="xl" class="btn_style" color="red" stacked to="/login">
            <v-icon icon="mdi-login"> </v-icon>
          </v-btn>
        </v-col>
        <v-col class="text-center">
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
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup></script>

<style scoped>
.btn_style {
  size: 5vw;
}
.title_style {
  font-size: 2.7vw;
}

.subtitle_style {
  font-size: 2.1vw;
}

.text_style {
  font-size: 2.2vw;
}

@media (max-width: 800px) {
  .btn_style {
    size: 6vw;
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
