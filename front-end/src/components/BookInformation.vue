<template>
  <v-container class="text-center fill-height">
    <v-row justify="center">
      <v-card class="mx-auto mt-5 elevation-24 card" outlined>
        <v-card-title v-if="bookInfo" class="title">
          Información detallada
        </v-card-title>
        <v-img
          v-if="bookInfo"
          :src="`${bookInfo.bookcover}`"
          :id="bookInfo.id"
          alt="Book Cover"
          max-width="200"
          max-height="200"
          class="d-flex justify-center bookcover"
          style="margin: auto"
        ></v-img>

        <v-card-text v-if="bookInfo">
          <p class="Text_title">Título</p>
          <p class="text">{{ bookInfo.book_name }}</p>
          <p class="Text_title">Año de publicación</p>
          <p class="text">
            {{ bookInfo.release_year }}
          </p>

          <p class="Text_title">Descripción</p>
          <p class="text">
            {{ bookInfo.description }}
          </p>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
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

const router = useRouter();
const route = useRoute();
const bookId = ref();
const bookInfo = ref<book_response>();

const getBookData = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/books?id=${bookId.value}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    bookInfo.value = response.data.data[0];
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  bookId.value = route.params.id;
  getBookData();
});
</script>
<style scoped>
.logo_pr {
  max-width: 5%;
  max-height: 5%;
}

.title {
  font-size: 3rem;
  padding: 1.5rem;
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

.bookcover {
  padding: 1rem;
}
</style>
