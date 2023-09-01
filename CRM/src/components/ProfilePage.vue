<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <span></span>
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">US Region</div>

              <!-- Conditionally render user profile data -->
              <div v-if="firstName && lastName" class="text-h5 q-mt-sm q-mb-xs">
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
              <q-img
                v-if="firstName && lastName"
                class="rounded-borders"
                src="https://cdn.quasar.dev/img/boy-avatar.png"
              />
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
    const firstName = ref(null);
    const lastName = ref(null);
    const age = ref(null);
    const email = ref(null);
    const phone = ref(null);
    const bio = ref(null);
    const description = ref(null);
    const profile_image = ref(null);

    onMounted(async () => {
      try {
        await store.profile;
        // Populate the data from the store once it's available
        firstName.value = store.profile.first_name;
        lastName.value = store.profile.last_name;
        age.value = store.profile.age;
        email.value = store.profile.email;
        phone.value = store.profile.phone;
        bio.value = store.profile.bio;
        description.value = store.profile.description;
        profile_image.value = store.profile.profile_image;
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    });

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
