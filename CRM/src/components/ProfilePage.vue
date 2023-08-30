<template>
  <div class="q-pa-md row q-gutter-sm">
    <q-card flat bordered class="my-card col">
      <q-card-section>
        <div class="q-col-gutter-md row items-start">
          <div class="col-7">
            <p class="text-subtitle2">US Region</p>
            <div class="text-h4">Rizwan Attiq</div>
            <p class="text-grey">
              Sales and Marketing Executive | Graduate and past committee |
              Keynote speaker on Selling and Recruiting Topics
            </p>
          </div>

          <div class="col-5">
            <q-img
              class="rounded-borders"
              src="https://picsum.photos/500/300"
              :ratio="1"
            />
          </div>
        </div>
      </q-card-section>

      <q-separator inset />
      <q-card-section>
        Assessing clients needs and present suitable promoted products. Liaising
        with and persuading targeted doctors to prescribe our products utilizing
        effective sales skills.
      </q-card-section>
    </q-card>

    <q-card flat bordered class="my-card q-pa-md col">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="firstName"
          label="First Name"
        />

        <q-input
          filled
          v-model="lastName"
          label="Last Name"
        />

        <q-input
          filled
          type="number"
          v-model="age"
          label="Age"
        />

        <q-input v-model="email" filled type="email" label="Email"
          lazy-rules />
          <q-input v-model="phone" filled type="tel"  label="Phone" />
        <div>
          <q-btn label="Update" type="submit" color="primary" />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
export default {
  setup() {
    const $q = useQuasar();

    const firstName = ref(null);
    const lastName = ref(null);
    const age = ref(null);
    const email = ref(null);
    const phone = ref(null);

    firstName.value='Rizwan'
    lastName.value='Attiq'
    age.value=24
    email.value='rizwan.attiq220@gmail.com'
    phone.value='03003459656'

    return {
      firstName,
      lastName,
      age,
      email,
      phone,
    };
  },
};
</script>

<style lang="sass" scoped>
// .my-card
//   width: 100%
//   max-width: 50%
</style>
