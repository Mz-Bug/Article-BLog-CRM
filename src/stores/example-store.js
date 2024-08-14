import { defineStore } from "pinia";
import { Notify } from "quasar";
import { api } from "src/boot/axios";
export const useCounterStore = defineStore("counter", {
  state: () => ({
    userRole: "admin",
    article: [
      {
        Title: "Fake News",
        Content: "This is a detailed analysis of the spread of fake news on social media.",
        Description: "An article discussing the impact and origins of fake news.",
        created_at: "2024-08-10"
      },
      {
        Title: "Climate Change",
        Content: "An in-depth look at the current state of global climate change.",
        Description: "Explores the causes, effects, and solutions to climate change.",
        created_at: "2024-07-25"
      },
      {
        Title: "Artificial Intelligence",
        Content: "A comprehensive guide to understanding artificial intelligence and its applications.",
        Description: "Discusses the rise of AI and its impact on various industries.",
        created_at: "2024-06-15"
      },
      {
        Title: "Space Exploration",
        Content: "This article covers the latest advancements in space exploration.",
        Description: "Focuses on recent missions and the future of space travel.",
        created_at: "2024-08-01"
      }
    ],
    category: [
      {
        id: 1,
        name: "Technology",
        created_at: "08-2-2022"
      },
      {
        id: 2,
        name: "Health",
        created_at: "09-2-2022"
      },
      {
        id: 3,
        name: "Travel",
        created_at: "18-2-2022"
      },
      {
        id: 4,
        name: "Education",
        created_at: "10-2-2022"
      },
      {
        id: 5,
        name: "Finance",
        created_at: "11-2-2022"
      },
      {
        id: 6,
        name: "Lifestyle",
        created_at: "12-2-2022"
      },
      {
        id: 7,
        name: "Entertainment",
        created_at: "13-2-2022"
      },
      {
        id: 8,
        name: "Food",
        created_at: "4-2-2022"
      },
      {
        id: 9,
        name: "Sports",
        created_at: "15-2-2022"
      },
      {
        id: 10,
        name: "Environment",
        created_at: "16-2-2022"
      }
    ],
    update: null,
    roles: [
      {
        id: "1",
        name: "Admin",
        description: "Admin user with full access",
        created_at: "16-02-2022",
      },
      {
        id: "2",
        name: "Moderator",
        description: "Moderator user with limited administrative privileges",
        created_at: "20-03-2022",
      },
      {
        id: "3",
        name: "User",
        description: "Regular user with standard access",
        created_at: "25-04-2022",
      },
      {
        id: "4",
        name: "Guest",
        description: "Guest user with read-only access",
        created_at: "01-05-2022",
      }
    ],
    Permissions: [
      {
        access_control_id: "1",
        name: "Read Access",
        description: "Allows users to view content.",
        created_at: "16-02-2022"
      },
      {
        access_control_id: "2",
        name: "Write Access",
        description: "Allows users to modify or add content.",
        created_at: "20-03-2022"
      },
      {
        access_control_id: "3",
        name: "Delete Access",
        description: "Allows users to delete content.",
        created_at: "25-04-2022"
      },
      {
        access_control_id: "4",
        name: "Admin Access",
        description: "Full control over the system, including user management.",
        created_at: "01-05-2022"
      }
    ],
    User: [
      {
        name: "20 Aug 2023",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        created_at: "16-02-2022",
        phone: "+92 23423546"
      },
      {
        name: "25 Aug 2023",
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        created_at: "20-03-2022",
        phone: "+92 34567890"
      },
      {
        name: "30 Aug 2023",
        first_name: "Michael",
        last_name: "Johnson",
        email: "michael.johnson@example.com",
        created_at: "05-01-2023",
        phone: "+92 45678901"
      },
      {
        name: "10 Sep 2023",
        first_name: "Emily",
        last_name: "Davis",
        email: "emily.davis@example.com",
        created_at: "12-04-2022",
        phone: "+92 56789012"
      },
      {
        name: "15 Sep 2023",
        first_name: "David",
        last_name: "Brown",
        email: "david.brown@example.com",
        created_at: "22-07-2022",
        phone: "+92 67890123"
      },
      {
        name: "20 Sep 2023",
        first_name: "Sophia",
        last_name: "Miller",
        email: "sophia.miller@example.com",
        created_at: "30-08-2022",
        phone: "+92 78901234"
      },
      {
        name: "25 Sep 2023",
        first_name: "James",
        last_name: "Wilson",
        email: "james.wilson@example.com",
        created_at: "14-09-2022",
        phone: "+92 89012345"
      }
    ],
    profile: null,
    coumunity: [
      {
        name: "20 Aug 2023",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        status: "Subscribed",
      },
      {
        name: "29 Aug 2023",
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        status: "Subscribed",
      },
      {
        name: "28 Aug 2023",
        first_name: "Michael",
        last_name: "Johnson",
        email: "michael.johnson@example.com",
        status: "Subscribed",
      },
      {
        name: "27 Aug 2023",
        first_name: "Emily",
        last_name: "Davis",
        email: "emily.davis@example.com",
        status: "Subscribed",
      },
      {
        name: "26 Aug 2023",
        first_name: "David",
        last_name: "Brown",
        email: "david.brown@example.com",
        status: "Subscribed",
      },
      {
        name: "25 Aug 2023",
        first_name: "Sophia",
        last_name: "Miller",
        email: "sophia.miller@example.com",
        status: "Subscribed",
      },
      {
        name: "24 Aug 2023",
        first_name: "James",
        last_name: "Wilson",
        email: "james.wilson@example.com",
        status: "Subscribed",
      }
    ],
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
        const response = await api.post("/auth/login", user);
        console.log(response.data);
        this.userRole = "admin";
        localStorage.setItem("token", response.data.token);
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
        // const response = await api.post(`/api/blog/add/${id}`, article);
        // this.article = response.data;
        this.article.push(article)
        Notify.create({
          message: "You have successfully Added Article",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
        this.router.push('/article')
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
