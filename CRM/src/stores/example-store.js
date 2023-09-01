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
    profile: null,
    coumunity: [],
  }),
  getters: {},
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
        this.profile = response.data.user;
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

    // Getting All articles/ Blogs from API
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

    //Getting All Categories from API
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

    // Adding New Category from API
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
        this.Get_All_Category();
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

    async Update_Cetegory(formData, id) {
      try {
        const response = await api.post(
          "/api/category/update/" + id,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
            },
          }
        );
        console.log("Response:", response.data);
        Notify.create({
          message: "You have Update Cetegory",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
        this.Get_All_Category();
      } catch (error) {
        console.error("Error:", error);
        Notify.create({
          message: "Error while update RoCetegoryle",
          color: "negative",
          icon: "eva-close-circle-outline",
          position: "top",
          timeout: 1000,
        });
      }
    },

    async Delete_Category(id) {
      try {
        const response = await api.post("/api/category/delete/" + id, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Response:", response.data);
        Notify.create({
          message: "You have successfully deleted the Cetegory",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
        this.Get_All_Category();
      } catch (error) {
        console.error("Error:", error);
        Notify.create({
          message: "Error while deleting the Cetegory",
          color: "negative",
          icon: "eva-close-circle-outline",
          position: "top",
          timeout: 1000,
        });
      }
    },
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
        const response = await api.get("/api/users", {
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
    //Community
    async GET_Community() {
      try {
        const response = await api.get("api/show/members", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with your actual token
          },
        });
        console.log(response);
        this.coumunity = response.data;
        console.log(this.coumunity);
      } catch (error) {
        console.log(error);
      }
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
  },
});
