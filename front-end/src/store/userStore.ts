import { defineStore } from "pinia";
import { UserInfo } from "@/interfaces/user";
import { jwtDecode } from "jwt-decode";
import { Certificate } from "crypto";

interface UserState {
  id: string;
  full_name: string;
  mail: string;
  birth_date: Date;
  token: string;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    id: "",
    full_name: "",
    mail: "",
    birth_date: new Date(),
    token: "",
  }),
  getters: {
    _id: (state) => state.id,
    _full_name: (state) => state.full_name,
    _mail: (state) => state.mail,
    _birth_date: (state) => state.birth_date,
    _token: (state) => state.token,
  },
  actions: {
    setUserInfo(userInfo: UserInfo, token: string) {
      const user = {
        id: userInfo.id,
        full_name: userInfo.full_name,
        mail: userInfo.mail,
        birth_date: userInfo.birth_date,
      };
      Object.assign(this, user);
      localStorage.setItem("userData", JSON.stringify(userInfo));
      localStorage.setItem("token", token);
    },
    checkInfo() {
      return this.id != "";
    },
    reloadInfo() {
      this.id = JSON.parse(localStorage.getItem("userData") as string).id;
      this.full_name = JSON.parse(
        localStorage.getItem("userData") as string
      ).full_name;
      this.mail = JSON.parse(localStorage.getItem("userData") as string).mail;
      this.birth_date = new Date(
        JSON.parse(localStorage.getItem("userData") as string).birth_date
      );
      this.token = JSON.parse(localStorage.getItem("userData") as string).token;
    },
    clearUserInfo() {
      this.id = "";
      this.full_name = "";
      this.mail = "";
      this.birth_date = new Date();
      this.token = "";
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
    },
    checkExpired() {
      const token = localStorage.getItem("token");
      let expireDate = 0;
      if (token) {
        const check = jwtDecode(token);
        expireDate = Number(check.exp);
        if (Number(Date.now() / 1000) < expireDate) return false;
        return true;
      }
      return true;
    },
  },
});
