<template>
  <v-container class="text-center">
    <v-row justify="center">
      <v-card class="mt-5 elevation-24 card" outlined>
        <v-card-title v-if="bookInfo" class="title_style">
          {{ bookInfo.book_name }}
        </v-card-title>
        <v-img
          v-if="bookInfo"
          :src="bookcover"
          :id="bookInfo.id"
          alt="Book Cover"
          max-width="55%"
          max-height="55%"
          class="mt-5 d-flex justify-center bookcover"
          style="margin: auto"
        ></v-img>

        <v-card-text v-if="bookInfo">
          <p class="Text_title">Año de publicación</p>
          <p class="text">
            {{ bookInfo.release_year }}
          </p>
        </v-card-text>
        <v-card-text v-if="bookInfo">
          <p class="Text_title">Descripción</p>
          <p class="text">
            {{ bookInfo.description }}
          </p>
        </v-card-text>
      </v-card>
    </v-row>

    <v-row justify="center">
      <v-card class="mx-auto mt-5 elevation-24 card">
        <v-card-title class="title_style">Añade tu comentario</v-card-title>

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

    <v-row justify="center">
      <v-col
        v-for="comment in bookComments"
        :key="comment.id"
        cols="12"
        xs12
        sm6
        md4
        class="text-center"
      >
        <v-card class="mx-auto mt-5 card">
          <v-card-title
            >Usuario {{ comment.author }} ha comentado:</v-card-title
          >

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
const assets_url = `${import.meta.env.VITE_ASSETS_URL}`;
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
      bookcover: "",
      bookComments,
      userID,
      assets_url,
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

  async created() {
    this.bookId = this.$route.params.id as string;
    await this.fetchBookData();
    await this.fetchComments();
    if (bookInfo.value != undefined) {
      this.bookcover = `${assets_url}${bookInfo.value.bookcover}`;
    }
    console.log(this.bookcover);
  },
};
</script>
<style scoped>
.title {
  font-size: 3rem;
  padding: 1.5rem;
}

.card {
  padding: 2%;

  border-radius: 1rem;
}

.text {
  font-size: 1.3vw;
}
.Text_title {
  color: red;
  font-size: 1.7vw;
  border-radius: 1rem;
}

.bookcover {
  padding: 1rem;
  height: 100%;
}

.title_style {
  font-size: 2.7vw;
}

@media (max-width: 800px) {
  .title_style {
    font-size: 6vw;
  }

  .text {
    font-size: 5vw;
    margin-bottom: 0.5rem;
  }
  .Text_title {
    color: red;
    font-size: 5.5vw;
    padding: 1.3rem;
    border-radius: 1rem;
  }
}
</style>
