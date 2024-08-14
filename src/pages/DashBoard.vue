<template>
  <q-page class="q-pa-lg">
    <q-card flat bordered class="q-my-lg">
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section class="text-h5 text-weight-bold"
              >Visitors</q-item-section
            >
            <q-item-section side>
              <span class="q-gutter-md">
                <q-btn
                  no-caps
                  outline
                  unelevated
                  disable
                  icon-right="eva-calendar-outline"
                  label="August 2022" />
                <q-btn
                  dense
                  flat
                  color="grey"
                  icon="eva-more-vertical-outline"
                  @click="onClick"
              /></span>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <div class="row">
        <div class="col-4">
          <q-card-section class="q-ml-md">
            <div class="text-h6 text-weight-light">Monthly Visits</div>
            <div class="text-h4 q-py-xs">10.574</div>
          </q-card-section>
          <q-card-section class="q-ml-md">
            <div class="q-py-xs">
              <q-img
                style="height: 150px; width: 250px"
                src="~assets/graph.svg"
              />
            </div>
          </q-card-section>
        </div>
        <div class="col-8">
          <q-card-section class="q-ml-md">
            <div class="q-py-xs">
              <q-img src="~assets/chart.svg" />
            </div>
          </q-card-section>
        </div>
      </div>
    </q-card>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section class="text-h5 text-weight-bold"
              >Subscribers</q-item-section
            >
            <q-item-section side>
              <span class="q-gutter-md">
                <q-btn
                  no-caps
                  outline
                  unelevated
                  disable
                  icon-right="eva-chevron-down-outline"
                  label="Subscribe" />
                <q-btn
                  dense
                  flat
                  color="grey"
                  icon="eva-more-vertical-outline"
                  @click="onClick"
              /></span>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section class="q-ml-md">
        <div class="text-h6 text-weight-light">Monthly Visits</div>
        <div class="text-h6">
          10.57
          <q-badge color="green">
            12
            <q-icon
              name="eva-diagonal-arrow-right-up-outline"
              color="white"
              class="q-ml-xs"
            />
          </q-badge>
        </div>

        <div class="q-mt-sm">
          <q-table
            flat
            bordered
            :rows="store.coumunity"
            :columns="columns"
            row-key="name"
            :selected-rows-label="getSelectedString"
            selection="multiple"
            v-model:selected="selected"
          >
            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <q-btn
                  flat
                  size="md"
                  color="primary"
                  icon="edit"
                  @click="share(props.row)"
                />

                <q-btn
                  class="q-pa-none"
                  color="red"
                  flat
                  size="md"
                  icon="delete"
                  @click="deleteitem(props.row)"
                />
              </q-td>
            </template>
          </q-table>
          <User></User>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import { store } from "quasar/wrappers";
import { ref, onMounted } from "vue";
import { useCounterStore } from "../stores/example-store";
import { api } from "src/boot/axios";
const columns = [
  {
    name: "phone",
    required: true,
    label: "Added Date",
    align: "left",
    field: "created_at",
    format: (val) => {
      const date = new Date(val);
      return date.toISOString().split("T")[0];
    },
  },
  {
    name: "First_Name",
    align: "center",
    label: "First Name",
    field: "first_name",
    sortable: true,
  },
  { name: "Last_Name", label: "Last Name", field: "last_name", sortable: true },
  { name: "email", label: "Email", field: "email" },
  { name: "status", label: "Status", field: "status" },
];

// const rows = [
//   {
//     name: "20 Aug 2022",
//     First_Name: "Maaz",
//     Last_Name: "Ali",
//     email: "maaz@gmail.com",
//     status: "Suscribe",
//   },
//   {
//     name: "29 Aug 2022",
//     First_Name: "Maaz",
//     Last_Name: "Ali",
//     email: "maaz@gmail.com",
//     status: "Suscribe",
//   },
//   {
//     name: "28 Aug 2022",
//     First_Name: "Maaz",
//     Last_Name: "Ali",
//     email: "maaz@gmail.com",
//     status: "Suscribe",
//   },
//   {
//     name: "27 Aug 2022",
//     First_Name: "Maaz",
//     Last_Name: "Ali",
//     email: "maaz@gmail.com",
//     status: "Suscribe",
//   },
//   {
//     name: "26 Aug 2022",
//     First_Name: "Maaz",
//     Last_Name: "Ali",
//     email: "maaz@gmail.com",
//     status: "Suscribe",
//   },
//   {
//     name: "25 Aug 2022",
//     First_Name: "Maaz",
//     Last_Name: "Ali",
//     email: "maaz@gmail.com",
//     status: "Suscribe",
//   },
//   {
//     name: "24 Aug 2022",
//     First_Name: "Maaz",
//     Last_Name: "Ali",
//     email: "maaz@gmail.com",
//     status: "Suscribe",
//   },
// ];

export default {
  setup() {
    const store = useCounterStore();
    const selected = ref([]);
    onMounted(() => {
      store.GET_Community();
    });
    function deleteitem(row) {
      api
        .post("/api/member/delete/" + row.id)
        .then((res) => {
          console.log(res);
          store.GET_Community();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return {
      selected,
      columns,
      // rows,

      getSelectedString() {
        return selected.value.length === 0
          ? ""
          : `${selected.value.length} record${
              selected.value.length > 1 ? "s" : ""
            } selected of ${rows.length}`;
      },
      store,
      deleteitem,
    };
  },
};
</script>
