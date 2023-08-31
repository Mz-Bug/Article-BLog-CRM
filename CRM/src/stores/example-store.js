import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
export const useCounterStore = defineStore("counter", {
  state: () => ({
    userRole: "user",
    article: null,
    category: null,
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

    //Article Action
    // async Get_Article() {
    //   try {
    //     const url = "https://4572-72-255-39-45.ngrok-free.app/api/current-user"; // Make sure to include the correct endpoint
    //     const accessToken =
    //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZWNmYmRiZjM3ODhiZjMxYTI2MTJjOTgyMWRlZjgzNTE5MjBiNGZmNDQyMTdlOWNkNjg1ODk3YjIxODc3ZTIwN2JiZjQ1M2YyMTBkNjU0YjUiLCJpYXQiOjE2OTM0NjgwNjUuNjE5NDQsIm5iZiI6MTY5MzQ2ODA2NS42MTk0NDgsImV4cCI6MTcyNTA5MDQ2NS41OTc3LCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.OE8fPoXlp30PH8SdFHkOfecMXkliMyZo10MCM7Oc_N-sbPuu1O4ixY38nVAzI7iEgozSOTEH3JzeZenJp_EgW-JUQ26LR1YaOHQMXN3zpwI_B2PVZZ5TxPCdOg5l8Z3TbYv9uAHNn_9pBPmjT27MdjAqMpIbR6tRWjHKTQfJu0hbdz7oLPzrsC0y1U8kME3g3bJUY9yfLf2aLZDXuJfRPRDj0TmvMdiSZarPPczCHnSF4dLLExIdx0VvVYW7RFiuLcc008yMs87YJAIghmLHRvxTL6gQCd0XDMfOxrgICF42D-6EM-QQAuFzSFAyl7iLsHw4aLAACVqnCmlWwusCHv2BjM41LAyuozomFozlAaHJXOr2N8i6FGFuT6PlfoPiDaTyPJObTTNCyQlDgD5WYYJbFBLqTBC0yMLF61O_WCj2R-JvTiAXL4rCtYtyM26B1WgQiDCC8gif9eZlbon1XZPrrWY9878t3bKXgy20G9XP7ICgBlS-Sg9XwQZc2wsp23RcbsGDH4oUaGGaKz0p7sNo0ULdmazu1PBNZI7Q4zqeJgxiY07kD_p0-jc8SvHxoqZ4x_8Q7ih3FK7IUysk6x-CnfevIpWOocOJ_I794ySxGsaj2YQelXWl8UtO5mXru0pldaONXltfp7nw0PnY_SlIxLbWjbZG9SS2MmwyoAM"; // Replace with your actual access token

    //     const response = await axios.get(url, {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`, // Use the "Authorization" header with the access token
    //         "Content-Type": "application/json",
    //         "ngrok-skip-browser-warning": "afsd",
    //       },
    //     });

    //     console.log("Response:", response.data);
    //     // You can do further processing with the response data here
    //   } catch (error) {
    //     console.error("Error:", error);
    //   } finally {
    //     // Any cleanup or post-processing goes here
    //   }
    // },
    // async Get_Article() {
    //   try {
    //     const url = "https://4572-72-255-39-45.ngrok-free.app/api/login"; // Make sure to include the correct endpoint
    //     let user = {
    //       email: "hamza@gmail.com",
    //       password: "123456",
    //     };
    //     const response = await axios.post(url, user, {
    //       headers: {
    //         // Use the "Authorization" header with the access token
    //         "Content-Type": "application/json",
    //         "ngrok-skip-browser-warning": "afsd",
    //       },
    //     });

    //     console.log("Response:", response.data);
    //     // You can do further processing with the response data here
    //   } catch (error) {
    //     console.error("Error:", error);
    //   } finally {
    //     // Any cleanup or post-processing goes here
    //   }
    // },
    // async Get_Article() {
    //   try {
    //     const url = "/api/blogs"; // Make sure to include the correct endpoint

    //     const response = await axios.get(url, {
    //       headers: {
    //         // Use the "Authorization" header with the access token
    //         "Content-Type": "application/json",
    //         "ngrok-skip-browser-warning": "afsd",
    //       },
    //     });

    //     console.log("Response:", response.data);
    //     // You can do further processing with the response data here
    //   } catch (error) {
    //     console.error("Error:", error);
    //   } finally {
    //     // Any cleanup or post-processing goes here
    //   }
    // },

    //
    async Get_Article() {
      api
        .get("/api/blogs")
        .then((response) => {
          this.article = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    //Get All Category
    async Get_All_Category() {
      api
        .get("api/categories")
        .then((response) => {
          this.category = response.data;
          console.log(this.category);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    async Add_new_Category(category) {
      api
        .post("api/categories", category)
        .then((response) => {
          this.category = response.data;
          console.log(this.category);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
});
