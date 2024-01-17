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
      <v-card v-if="!hasComment" class="mx-auto mt-5 elevation-24 card">
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
      <v-card v-else class="mx-auto mt-5 elevation-24 card">
        <v-card-title class="title_style">Elimina tu comentario</v-card-title>
        <v-card-text>
          <v-btn class="bg-red white--text" @click="deleteComment"
            >Eliminar
          </v-btn>
          <br />
        </v-card-text>
      </v-card>
    </v-row>

    <v-row justify="center">
      <v-col
        v-for="comment in bookComments"
        :key="comment.author"
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

const assets_url = `${import.meta.env.VITE_ASSETS_URL}`;

interface comment_response {
  book_referenced: string;
  author: string;
  comment: string;
}

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
const bookComments = ref<comment_response[]>();

export default {
  data() {
    return {
      userStore: useUserStore(),
      loggedUserID: "",
      bookId: "",
      hasComment: false,
      bookInfo,
      bookcover: "",
      bookComments,
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
        const user_id = this.userStore._id;

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

        if (this.bookComments != undefined) {
          this.bookComments.forEach((comment) => {
            if (comment.author == this.userStore._id) {
              this.hasComment = true;
            }
          });
        }
      } catch (error) {
        this.bookComments = undefined;
        console.error(error);
      }
    },

    async deleteComment() {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/comments/${this.userStore._id}/${
            this.bookId
          }`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        location.reload();
      } catch (error) {
        console.error(error);
      }
    },
  },

  async created() {
    this.bookId = this.$route.params.id as string;
    this.userStore = await useUserStore();
    await this.userStore.reloadInfo();
    await this.fetchBookData();
    await this.fetchComments();
    if (bookInfo.value != undefined) {
      this.bookcover = `${assets_url}${bookInfo.value.bookcover}`;
    }
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
  height: 100%;

  border-radius: 1rem;
}

.text {
  font-size: 1.3vw;
  padding: 1.3vw;
}
.Text_title {
  color: red;
  font-size: 1.7vw;
  padding: auto;
}

.bookcover {
  padding: 1rem;

  max-width: 40%;
  max-height: 40%;
}

.title_style {
  padding: 1.7vw;
  font-size: 2.7vw;
}

@media (max-width: 800px) {
  .title_style {
    font-size: 5.5vw;
  }
  .bookcover {
    padding: 1rem;

    max-width: 60%;
    max-height: 60%;
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
