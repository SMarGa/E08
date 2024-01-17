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

    <v-row justify="center">
      <v-card class="text-center elevation-15">
        <v-card-title class="title">Añade tu comentario</v-card-title>

        <v-card-text>
          <form @submit.prevent="postComment">
            <p class="mx-auto text-red Text_title">Introduzca el comentario</p>
            <v-text-field data-cy="username" v-model="comment"></v-text-field>
          </form>
          <v-btn class="bg-red white--text" @click="postComment">Añadir </v-btn>
          <br />
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col v-for="comment in bookComments" :key="comment.id" cols="12" md="4">
        <v-card class="text-center elevation-15">
          <v-card-title>Usuario: {{ comment.author }}</v-card-title>

          <v-card-text>
            <p>{{ comment.comment }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/store/userStore";
const UserStore = useUserStore();

const userID = UserStore._id;
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
const route = useRoute();
const bookInfo = ref<book_response>();
const bookComments = ref();

export default {
  data() {
    return {
      bookId: "",
      bookInfo,
      bookComments,
      userID,
      comment: "",
      warning: false,
      warning_message: "",
    };
  },

  methods: {
    async postComment() {
      this.warning = false;
      this.warning_message = "";
      if (this.comment.length < 10) {
        this.warning = true;
        this.warning_message = "Comentario muy corto";
        return;
      } else {
        const book_id = this.bookId;
        const coment_content = this.comment;
        const user_id = this.userID;

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/comments`,
            {
              book_referenced: book_id,
              author: user_id,
              comment: coment_content,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status == 201) {
            location.reload();
            return;
          }
        } catch (error) {
          this.warning = true;
          this.warning_message = "Error inesperado";
          console.log(error);
          return;
        }
      }
    },

    async fetchBookData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/books?id=${this.bookId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.bookInfo = response.data.data[0];
      } catch (error) {
        console.error(error);
      }
    },

    async fetchComments() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/comments/${this.bookId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.bookComments = response.data.data;
      } catch (error) {
        this.bookComments = undefined;
        console.error(error);
      }
    },
  },

  created() {
    this.bookId = this.$route.params.id as string;
    this.fetchBookData();
    this.fetchComments();
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
