import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    userRole: "admin",
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async User_Login(user) {
      try {
        const response = await api.post("/auth/login", user);

        console.log(response);
        // this.userRole = "admin";
        // this.userRole = "user";
        // Redirect to appropriate dashboard based on user role
        if (this.userRole === "admin") {
          this.router.push("/admin-dashboard"); // Replace with your admin dashboard route
        } else if (this.userRole === "user") {
          this.router.push("/user-dashboard"); // Replace with your user dashboard route
        } else {
          this.router.push("/");
        }

        Notify.create({
          message: "You have successfully logged in",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
      } catch (error) {
        console.log(error);

        Notify.create({
          message: "Invalid Credentials",
          color: "negative",
          icon: "eva-close-circle-outline",
          position: "top",
          timeout: 1000,
        });
      }
    },
  },
});
