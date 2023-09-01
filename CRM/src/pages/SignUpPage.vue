<template>
  <q-page class="flex flex-center">
    <q-card class="my-card q-my-sm">
      <!-- title -->
      <q-card-section class="text-center">
        <div class="text-h4 text-weight-bolder">Sign Up</div>
      </q-card-section>

      <!-- Other Login options -->
      <q-card-actions align="around">
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
        <q-separator class="q-my-sm" />
      </div>

      <!-- Sign up form -->
      <q-form @submit="SignUp">
        <q-card-section>
          <!-- input firstname lastname  -->
          <div class="row q-gutter-sm">
            <q-input
              class="q-mt-xs col"
              dense
              outlined
              v-model="firstName"
              label="First Name"
              type="text"
              :rules="[
                (val) => (val && val.length > 0) || 'This field is required',
              ]"
            >
            </q-input>
            <q-input
              class="q-mt-xs col"
              dense
              outlined
              v-model="lastName"
              label="Last Name"
              type="text"
              :rules="[
                (val) => (val && val.length > 0) || 'This field is required',
              ]"
            >
            </q-input>
          </div>

          <!-- input age -->
          <div>
            <q-input
              class="q-mt-xs"
              dense
              outlined
              type="number"
              v-model="age"
              label="Age"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Please type your age',
                (val) => (val > 0 && val < 1000) || 'Please type a real age',
              ]"
            />
          </div>

          <!-- input email -->
          <div>
            <q-input
              class="q-mt-xs"
              dense
              outlined
              v-model="email"
              label="Email"
              type="text"
              :rules="[
                (val) => (val && val.length > 0) || 'This field is required',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
          </div>

          <!-- input phone and profile picture  -->
          <div class="row q-gutter-sm">
            <q-input
              class="q-mt-xs col"
              dense
              outlined
              v-model="phone"
              label="Phone"
              type="phone"
              :rules="[
                (val) => (val && val.length > 0) || 'This field is required',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="phone_iphone" />
              </template>
            </q-input>

            <!-- <q-file
              class="q-mt-xs col"
              v-model="profilePicture"
              label="Upload Profile Picture"
              dense
              outlined
              max-files="1"
              @input="handleProfilePictureChange"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file> -->
          </div>

          <!-- input password -->
          <div>
            <q-input
              class="q-mt-xs"
              label="Password"
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

          <!-- terms and conditions chexkbox -->
          <q-checkbox
            v-model="purple"
            label="I agree Terms and conditions"
            color="teal"
          />
        </q-card-section>

        <!-- Sign up button -->
        <q-card-actions vertical align="center">
          <q-btn
            color="purple"
            no-caps
            class="full-width"
            type="submit"
            label="Sign Up"
          />
          <!-- @click="login" -->
        </q-card-actions>

        <!-- login button for existing account -->
        <q-card-section
          class="q-pt-none q-pb-none text-center text-weight-bold"
        >
          I have already acoount
          <q-btn
            dense
            no-caps
            flat
            unelvated
            class="text-warning"
            label="Login"
            to="/"
          />
        </q-card-section>
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
    const firstName = ref("");
    const lastName = ref("");
    const age = ref("");
    const email = ref("");
    const phone = ref("");
    const profilePicture = ref("https://cdn.quasar.dev/img/boy-avatar.png");
    const Password = ref("");
    const password1 = ref("");
    const passwordFieldType = ref("password");
    const store = useCounterStore();
    const purple = ref(false);
    function togglePasswordVisibility() {
      passwordFieldType.value =
        passwordFieldType.value === "password" ? "text" : "password";
    }
    function SignUp() {
      const formData = new FormData();
      formData.append("first_name", firstName.value);
      formData.append("last_name", lastName.value);
      formData.append("age", age.value);
      formData.append("email", email.value);
      formData.append("phone", phone.value);
      // formData.append("profile_image", profilePicture.value);
      formData.append("bio", "this is a sample bio");
      formData.append("description", "this is a sample bio description");
      formData.append("password", password1.value);

      store.SignUP(formData);
    }
    return {
      firstName,
      lastName,
      age,
      email,
      Password,
      phone,
      profilePicture,
      SignUp,
      passwordFieldType,
      togglePasswordVisibility,
      password1,
      store,
      purple,
    };
  },
};
</script>
