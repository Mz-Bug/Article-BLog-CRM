import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    userRole: "admin",
    article: null,
    category: null,
    update: null,
    roles: [],
    Permissions: [],
    User: [],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async SignUP(formData) {
      try {
        const response = await api.post("/api/signup", formData);
        console.log(response);

        Notify.create({
          message: "You have signed up successfully",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
        this.router.push("/");
      } catch (error) {
        console.log(error);
        Notify.create({
          message: "Error while sign up",
          color: "negative",
          icon: "eva-close-circle-outline",
          position: "top",
          timeout: 1000,
        });
      }
    },
    async User_Login(user) {
      try {
        const response = await api.post("/api/login", user);
        console.log(response.data);
        this.userRole = response.data.user.role.name;
        localStorage.setItem("token", response.data.Bearer);
        // Redirect to appropriate dashboard based on user role
        if (this.userRole === "root") {
          this.router.push("/admin-dashboard"); // Replace with your admin dashboard route
        } else if (this.userRole === "admin") {
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

    async New_Artcle(article, id) {
      try {
        const response = await api.post(`/api/blog/add/${id}`, article);
        this.article = response.data;
        Notify.create({
          message: "You have successfully Added Article",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
      } catch (error) {
        console.error("Error:", error);
        Notify.create({
          message: "Error While Adding Article",
          color: "negative",
          icon: "eva-close-circle-outline",
          position: "top",
          timeout: 1000,
        });
      }
    },
    //Get All Category
    async Get_All_Category() {
      api
        .get("api/categories")
        .then((response) => {
          // console.log(response);
          this.category = response.data;
          // console.log(this.category);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    async Add_new_Category(category) {
      try {
        const response = await api.post("/api/category/add", null, {
          params: category,
        });
        this.category = response.data;
        Notify.create({
          message: "You have successfully Added Category",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
      } catch (error) {
        console.error("Error:", error);
        Notify.create({
          message: "Error While Added Category",
          color: "negative",
          icon: "eva-close-circle-outline",
          position: "top",
          timeout: 1000,
        });
      }
    },
    // async Update_category(update) {
    //   console.log(this.update);
    // api
    //   .post("/api/category/update/" + this.update.id,)
    //   .then((res) => {
    //     console.log(res);
    //     Notify.create({
    //       message: "You have successfully Updated Category",
    //       color: "positive",
    //       icon: "eva-checkmark-circle-outline",
    //       position: "top",
    //       timeout: 1000,
    //     });
    //   })
    //   .catch((err) => {
    //     Notify.create({
    //       message: "Error While Updated Category",
    //       color: "negative",
    //       icon: "eva-close-circle-outline",
    //       position: "top",
    //       timeout: 1000,
    //     });
    //     console.log(err);
    //   //   });
    // },

    //GET Roles
    async GET_Roles() {
      try {
        const response = await api.get("/api/role", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
          },
        });
        console.log(response);
        this.roles = response.data;
        console.log(this.roles);
      } catch (error) {
        console.log(error);
      }
    },

    async New_Role(formData) {
      try {
        const response = await api.post("/api/role/add", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
          },
        });
        console.log("Response:", response.data);
        Notify.create({
          message: "You have successfully Addded Role",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
        this.GET_Roles();
      } catch (error) {
        console.error("Error:", error);
        Notify.create({
          message: "Error while Adding Role",
          color: "negative",
          icon: "eva-close-circle-outline",
          position: "top",
          timeout: 1000,
        });
      }
    },

    async Update_Role(formData) {
      try {
        const response = await api.put("/api/role/update", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
          },
        });
        console.log("Response:", response.data);
        Notify.create({
          message: "You have Update Role",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
        this.GET_Roles();
      } catch (error) {
        console.error("Error:", error);
        Notify.create({
          message: "Error while update Role",
          color: "negative",
          icon: "eva-close-circle-outline",
          position: "top",
          timeout: 1000,
        });
      }
    },

    // async Delete_Role(id) {
    //   console.log(id);
    //   try {
    //     const response = await api.delete("/api/role/delete", id, {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
    //       },
    //     });
    //     console.log("Response:", response.data);
    //     Notify.create({
    //       message: "You have successfully Delete Role",
    //       color: "positive",
    //       icon: "eva-checkmark-circle-outline",
    //       position: "top",
    //       timeout: 1000,
    //     });
    //     this.GET_Roles();
    //   } catch (error) {
    //     console.error("Error:", error);
    //     Notify.create({
    //       message: "Error while Delete Role",
    //       color: "negative",
    //       icon: "eva-close-circle-outline",
    //       position: "top",
    //       timeout: 1000,
    //     });
    //   }
    async Delete_Role(id) {
      console.log(id);
      try {
        const response = await api.delete(`/api/role/delete`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            id: id,
          },
        });
        console.log("Response:", response.data);
        Notify.create({
          message: "You have successfully deleted the role",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
        this.GET_Roles();
      } catch (error) {
        console.error("Error:", error);
        Notify.create({
          message: "Error while deleting the role",
          color: "negative",
          icon: "eva-close-circle-outline",
          position: "top",
          timeout: 1000,
        });
      }
    },

    // Permission
    async GET_permission() {
      try {
        const response = await api.get("/api/access", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
          },
        });
        console.log(response);
        this.Permissions = response.data;
        console.log(this.roles);
      } catch (error) {
        console.log(error);
      }
    },

    async New_permission(formData) {
      try {
        const response = await api.post("/api/access/add", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
          },
        });
        console.log("Response:", response.data);
        Notify.create({
          message: "You have successfully Addded Permission",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
        this.GET_permission();
      } catch (error) {
        console.error("Error:", error);
        Notify.create({
          message: "Error while Adding Permission",
          color: "negative",
          icon: "eva-close-circle-outline",
          position: "top",
          timeout: 1000,
        });
      }
    },

    async Update_permission(formData) {
      try {
        const response = await api.put("/api/access/update", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
          },
        });
        console.log("Response:", response.data);
        Notify.create({
          message: "You have Update Permission",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
        this.GET_permission();
      } catch (error) {
        console.error("Error:", error);
        Notify.create({
          message: "Error while update Permission",
          color: "negative",
          icon: "eva-close-circle-outline",
          position: "top",
          timeout: 1000,
        });
      }
    },

    async Delete_Role(id) {
      console.log(id);
      try {
        const response = await api.delete(`/api/access/delete`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            id: id,
          },
        });
        console.log("Response:", response.data);
        Notify.create({
          message: "You have successfully deleted the Permission",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
        this.GET_Roles();
      } catch (error) {
        console.error("Error:", error);
        Notify.create({
          message: "Error while deleting the Permission",
          color: "negative",
          icon: "eva-close-circle-outline",
          position: "top",
          timeout: 1000,
        });
      }
    },
    // User
    async GET_User() {
      try {
        const response = await api.get("/api/current-user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
          },
        });
        // console.log(response);
        this.User = response.data;
        console.log(this.User);
      } catch (error) {
        console.log(error);
      }
    },

    async New_Use(formData) {
      try {
        const response = await api.post("/api/user/add", formData);
        console.log(response);
        Notify.create({
          message: "You have Added User successfully",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
        this.GET_User();
      } catch (error) {
        console.log(error);
        Notify.create({
          message: "Error while Adding new User",
          color: "negative",
          icon: "eva-close-circle-outline",
          position: "top",
          timeout: 1000,
        });
      }
    },
  },
});
