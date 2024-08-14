<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <span></span>
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs col-7">
              <div class="text-overline">US Region</div>

              <!-- Conditionally render user profile data -->
              <div v-if="firstName && lastName" class="text-h5 q-mt-sm q-mb-xs text-capitalize">
                {{ firstName }} {{ lastName }}
              </div>
              <div v-else class="text-h5 q-mt-sm q-mb-xs">Loading...</div>

              <div v-if="bio" class="text-caption text-grey">
                {{ bio }}
              </div>
              <div v-else class="text-caption text-grey">Loading...</div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <!-- Conditionally render user image -->
              <q-img v-if="profile_image" class="rounded-borders" :src="profile_image" />
              <div v-else>Loading...</div>
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <!-- Conditionally render user description -->
            <div v-if="description">{{ description }}</div>
            <div v-else>Loading...</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="firstName" label="First Name" />

              <q-input filled v-model="lastName" label="Last Name" />

              <q-input filled v-model="age" label="Age" />

              <q-input filled v-model="email" label="Email" />

              <q-input filled v-model="phone" label="Phone" />

              <div>
                <q-btn label="Update" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref, onMounted } from "vue";
import { useCounterStore } from "src/stores/example-store";

export default defineComponent({
  setup() {
    const store = useCounterStore();
    const firstName = ref("Maaz");
    const lastName = ref("Ali");
    const age = ref("20");
    const email = ref("abc@gmail.com");
    const phone = ref("+92 243347473");
    const bio = ref("Pakistani");
    const description = ref("A frontend Developer");
    const profile_image = ref("https://cdn.quasar.dev/img/boy-avatar.png");
    return {
      store,
      firstName,
      lastName,
      age,
      email,
      phone,
      bio,
      description,
      profile_image,
    };
  },
});
</script>

<style scoped></style>
