<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <!-- title -->
      <q-card-section class="text-center">
        <div class="text-h5">Welcome Back</div>
        <div class="q-mt-sm">Pick up where you left off</div>
      </q-card-section>
      <q-card-actions>
        <!-- other ways to login -->
        <div class="q-px-lg q-gutter-lg">
          <q-btn no-caps unelevated class="text-black">
            <q-img :src="require('assets/google.svg')" style="width: 20px">
            </q-img>
            <span class="q-pl-sm">Login with Google</span>
          </q-btn>
          <q-btn
            no-caps
            unelevated
            class="text-white"
            style="background-color: #3c5a9a"
          >
            <q-img :src="require('assets/facebook.svg')" style="width: 20px">
            </q-img>
            <span class="q-pl-sm">Login with Facebook</span>
          </q-btn>
        </div>
      </q-card-actions>
      <div class="q-px-lg">
        <q-separator class="q-my-md" />
      </div>

      <!-- Login Form -->
      <q-form @submit="login">
        
        <!-- Input Email -->
        <q-card-section>
          <div>Email Address</div>
          <div>
            <q-input
              class="q-mt-sm"
              dense
              outlined
              v-model="email"
              type="text"
              :rules="[
                (val) => (val && val.length > 0) || 'This field is required',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="eva-email-outline" color="blue-grey-4" />
              </template>
            </q-input>
          </div>
        </q-card-section>

        <!-- Input Password -->
        <q-card-section class="q-pt-none">
          <div>Password</div>
          <div>
            <q-input
              dense
              outlined
              v-model="password1"
              :type="passwordFieldType"
              :rules="[
                (val) => (val && val.length > 0) || 'This field is required',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="eva-lock-outline" color="blue-grey-4" />
              </template>

              <!-- Hidden Password button -->
              <template v-slot:append>
                <q-icon
                  :name="
                    passwordFieldType === 'password'
                      ? 'eva-eye-off-outline'
                      : 'eva-eye-outline'
                  "
                  color="blue-grey-4"
                  @click="togglePasswordVisibility"
                  style="cursor: pointer"
                />
              </template>
            </q-input>
          </div>
        </q-card-section>

        <!-- Forget Password Button -->
        <q-card-section class="q-pt-none">
          Forgot Password?
          <q-btn
            dense
            no-caps
            flat
            unelvated
            class="text-warning"
            label="Click Here"
          />
        </q-card-section>

        <!-- Login Button and create account link -->
        <q-card-actions vertical align="center">
          <q-btn
            color="purple"
            no-caps
            class="full-width"
            type="submit"
            label="Login"
          />

          <q-btn
            flat
            no-caps
            class="full-width text-purple"
            label="Create an Account"
            to="/signup"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>


<!-- Script Area -->
<script>
import { ref } from "vue";
import { useCounterStore } from "../stores/example-store";
export default {
  setup() {
    const email = ref("");
    const Password = ref("");
    const password1 = ref("");
    const passwordFieldType = ref("password");
    const store = useCounterStore();
    function togglePasswordVisibility() {
      passwordFieldType.value =
        passwordFieldType.value === "password" ? "text" : "password";
    }
    function login() {
      const formData = new FormData();
      formData.append("email", email.value);
      formData.append("password", password1.value);

      store.User_Login(formData);
    }
    return {
      email,
      Password,
      login,
      passwordFieldType,
      togglePasswordVisibility,
      password1,
      store,
    };
  },
};
</script>

<!-- Style Area -->
<style scoped>
.my-card {
  max-width: 500px;
}
</style>
