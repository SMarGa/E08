<template>
  <v-app-bar color="red darken-2">
    <v-app-bar-title class="nav-bar-title">E-Biblio</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon
      class="nav-bar-icon hidden-md-and-up"
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-btn
      v-if="!userIsLogged"
      v-for="item in items_not_auth"
      :key="item.title"
      :to="item.route"
      class="nav-bar-btn hidden-sm-and-down"
      stacked
    >
      <v-icon :icon="item.icon"></v-icon>
      {{ item.title }}
    </v-btn>

    <v-btn
      v-if="userIsLogged"
      v-for="item in items_auth"
      :key="item.title"
      :to="item.route"
      class="nav-bar-btn hidden-sm-and-down"
      stacked
    >
      <v-icon :icon="item.icon"></v-icon>
      {{ item.title }}
    </v-btn>

    <v-btn
      v-if="userIsLogged"
      @click="logOut()"
      class="nav-bar-btn hidden-sm-and-down"
      stacked
    >
      <v-icon icon="mdi-logout"></v-icon>
      Logout
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
    v-if="!userIsLogged"
  >
    <v-list>
      <v-list-item
        v-for="item in items_not_auth"
        :key="item.title"
        :to="item.route"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
    v-if="userIsLogged"
  >
    <v-list>
      <v-list-item
        v-for="item in items_auth"
        :key="item.title"
        :to="item.route"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <v-list-item key="logout" @click="logOut()">Logout</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/store/userStore";
import router from "@/router";

const UserStore = useUserStore();

export default defineComponent({
  data: () => ({
    UserStore: UserStore,
    router: router,
    drawer: false,
    group: null,
    items_not_auth: [
      {
        title: "Home",
        route: "/home",
        icon: "mdi-home",
      },
      {
        title: "Books",
        route: "/books",
        icon: "mdi-book-open-variant",
      },
      {
        title: "Log in",
        route: "/login",
        icon: "mdi-login",
      },
      {
        title: "Sign up",
        route: "/signup",
        icon: "mdi-account-plus-outline",
      },
    ],
    items_auth: [
      {
        title: "Home",
        route: "/",
        icon: "mdi-home",
      },
      {
        title: "Profile",
        route: "/profile",
        icon: "mdi-account-circle-outline",
      },

      {
        title: "Books",
        route: "/books",
        icon: "mdi-book-open-variant",
      },
    ],
  }),

  computed: {
    userIsLogged() {
      return !this.UserStore.checkExpired();
    },
  },

  methods: {
    logOut() {
      UserStore.clearUserInfo();
      location.reload();
    },
  },
});
</script>
<style scoped>
.nav-bar-title {
  color: white;
}
.nav-bar-btn {
  color: white;
}
.nav-bar-icon {
  color: white;
}

.logo-pr {
  width: 100%;
}
</style>
