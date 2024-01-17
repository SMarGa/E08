import { defineStore } from "pinia";
import { UserInfo } from "@/interfaces/user";
import { jwtDecode } from "jwt-decode";

import axios, { AxiosError } from "axios";

interface LogInResponse {
  code: number;
  message: string;
}

interface SignUpResponse {
  code: number;
  message: string;
}

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

      this.$patch({
        id: userInfo.id,
        full_name: userInfo.full_name,
        mail: userInfo.mail,
        birth_date: userInfo.birth_date,
        token: token,
      });
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

      this.$patch({
        id: "",
        full_name: "",
        mail: "",
        birth_date: new Date(),
        token: "",
      });
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
    async logUserIn(id: string, password: string): Promise<LogInResponse> {
      if (id.length <= 2) {
        return {
          code: 1,
          message: "User Name needs to be at least 2 characters.",
        };
      }
      if (password.length < 4) {
        return {
          code: 1,
          message: "Password needs to be at least 4 characters.",
        };
      }
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/login`,
          {
            id,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        switch (response.status) {
          case 200:
            const token = response.data.token;
            const user = response.data.user;

            this.setUserInfo(user, token);
            return {
              code: 0,
              message: "Logged In",
            };
          default:
            return {
              code: 1,
              message: response.data.message
                ? response.data.message
                : "Error no identificado",
            };
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log;
          if (error.response?.request.status == 401) {
            return {
              code: 1,
              message: "Credenciales ínvalidos",
            };
          }
        }
        return {
          code: 1,
          message: "Date cant be Furute (Server error)",
        };
      }
    },
    async registerUser(
      full_name: string,
      id: string,
      mail: string,
      birth_date: Date,
      password: string
    ): Promise<SignUpResponse> {
      if (full_name.length <= 2) {
        return {
          code: 1,
          message: "El nombre tiene que contener al menos 3 caracteres.",
        };
      }
      if (id.length <= 2) {
        return {
          code: 1,
          message:
            "El nombre de usuario tiene que ser como mínimo de 3 caracteres.",
        };
      }
      if (password.length < 4) {
        return {
          code: 1,
          message: "La contraseña ha de tener 4 caracteres.",
        };
      }
      console.log(new Date());
      console.log(birth_date);
      console.log(new Date() < birth_date);
      if (new Date("2015/1/1") < birth_date) {
        return {
          code: 1,
          message: "Tienes que introducir una fecha válida",
        };
      }
      if (!/^[a-z.-]+@[a-z.-]+\.[a-z]+$/.test(mail)) {
        return {
          code: 1,
          message: "Tiene que ser un mail válido",
        };
      }

      const user = {
        id: id,
        full_name: full_name,
        mail: mail,
        birth_date: birth_date,
        password: password,
      };
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/signup`,
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (response.status == 201) {
          const token = response.data.token;
          const userInfo = response.data.user;
          this.setUserInfo(userInfo, token);
          return {
            code: 0,
            message: "Signed Up",
          };
        } else {
          console.log(response.data.message);
          return {
            code: 1,
            message: "Error no esperado intentelo de nuevo",
          };
        }
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          if (error.response?.request.status == 406) {
            return {
              code: 1,
              message: "Pruebe otro usuario",
            };
          }
        }
        return {
          code: 1,
          message: "Server Error Try Later",
        };
      }
    },

    async deleteUser() {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/users?id=${this._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.clearUserInfo();
      } catch (error) {
        console.error(error);
      }
    },
  },
});
