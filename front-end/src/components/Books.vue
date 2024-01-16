<template>
  <v-container>
    <h1 class="mt-5 d-flex justify-center">¡Bienvenidos a la biblioteca!</h1>

    <v-row>
      <v-col v-for="book in bookData" :key="book.id" cols="12" md="4">
        <v-card class="text-center elevation-15">
          <v-card-title>Título: {{ book.book_name }}</v-card-title>
          <v-img
            :src="`${book.bookcover}`"
            :id="book.id"
            alt="Book Cover"
            max-width="200"
            max-height="200"
            class="mx-auto"
          ></v-img>

          <v-card-subtitle
            >Año de publicación: {{ book.release_year }}</v-card-subtitle
          >
          <v-card-text>
            <p>Autor: {{ book.author }}</p>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              class="bg-red white--text"
              @click="verMasInformacion(book.id)"
              >Más información</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";
interface book_response {
  id: number;
  description: string;
  book_name: string;
  author: string;
  genres: string[];
  release_year: number;
  editorial: string;
  bookcover: string;
}
const bookData = ref<book_response[]>([]);
const userStore = useUserStore();
const router = useRouter();

const fetchBookData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/books`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    bookData.value = response.data.data;
  } catch (error) {
    console.error("Error fetching book data:", error);
  }
};

const verMasInformacion = (bookId: number) => {
  router.push(`/books/${bookId}`);
};

onMounted(fetchBookData);
</script>

<style scoped></style>
