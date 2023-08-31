<template>
  <q-page class="q-pa-lg">
    <q-card>
      <q-table
        title="Permissions"
        :rows="rows"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode == 'grid'"
        :filter="filter"
        :pagination="initialPagination"
        class="q-pa-md"
        no-data-label="I didn't find anything for you"
        :visible-columns="visibleColumns"
      >
        <template v-slot:top-right="props">
          <q-btn
            @click="new_user"
            outline
            color="primary"
            label="Add New"
            class="q-mr-xs q-pa-sm q-px-sm"
          />
          <q-select
            class="q-mr-xs"
            v-model="visibleColumns"
            multiple
            outlined
            dense
            options-dense
            :display-value="$q.lang.table.columns"
            emit-value
            map-options
            :options="columns"
            option-value="name"
            options-cover
            style="min-width: 150px"
          />
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{
                props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen"
              }}
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="
              mode = mode === 'grid' ? 'list' : 'grid';
              separator = mode === 'grid' ? 'none' : 'horizontal';
            "
            v-if="!props.inFullscreen"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{ mode === "grid" ? "List" : "Grid" }}
            </q-tooltip>
          </q-btn>

          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              style="background-color: #5041bc"
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              class="text-purple"
            >
              <span class="text-body1 text-white">{{ col.label }}</span>
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              flat
              size="md"
              color="primary"
              icon="edit"
              @click="EditRow(props.row)"
            />

            <q-btn
              class="q-pa-none"
              color="red"
              flat
              size="md"
              icon="delete"
              @click="deleteRow(props.row)"
            />
          </q-td>
        </template>
        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> Well this is sad... {{ message }} </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="new_customer">
      <q-card style="width: 600px; max-width: 60vw">
        <q-card-section>
          <div class="text-h6">
            Add new User
            <q-btn
              round
              flat
              dense
              icon="close"
              class="float-right"
              color="grey-8"
              v-close-popup
            ></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">First Name</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="fname"
                    placeholder="User Name"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Last name </q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="lname"
                    placeholder="Last Name"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Email</q-item-label>
                  <q-input dense outlined v-model="email" placeholder="Email" />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Phone Number</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="phone"
                    type="tel"
                    placeholder="Phone Number"
                  >
                  </q-input>
                </q-item-section>
              </q-item>
            </q-list>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-teal">
          <q-btn
            class="q-mx-md q-mb-md"
            label="Save"
            type="submit"
            color="primary"
            v-close-popup
            @click="adduser"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="show">
      <q-card>
        <q-card-section class="q-pa-md">
          <q-card-title class="text-h6">Confirm Deletion</q-card-title>
          <p>Are you sure you want to delete this user?</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn color="primary" label="Cancel" v-close-popup />
          <q-btn
            color="negative"
            label="Delete"
            @click="confirmDelete"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { exportFile } from "quasar";
import { ref } from "vue";
import { useQuasar } from "quasar";
const columns = [
  {
    name: "first_name",
    label: "User Name",
    align: "left",
    field: "first_name",
  },
  {
    name: "last_name",
    align: "left",
    label: "Last Name",
    field: "last_name",
  },
  {
    name: "email",
    align: "center",
    label: "Email",
    field: "email",
  },
  {
    name: "phone",
    align: "center",
    label: "Phone Number",
    field: "phone",
  },
  {
    name: "action",
    align: "center",
    label: "Action",
    field: "action",
  },
];
const rows = ref([
  {
    first_name: "Dr. Jada Conolly",
    last_name: "GILBERT",
    email: "jhon@gmail.com",
    phone: "02354645767",
    action: "",
  },
  {
    first_name: "Dr. Jada Conolly",
    last_name: "GILBERT",
    email: "jhon@gmail.com",
    phone: "02354645767",
    action: "",
  },
  {
    first_name: "Dr. Jada Conolly",
    last_name: "GILBERT",
    email: "jhon@gmail.com",
    phone: "02354645767",
    action: "",
  },
  {
    first_name: "Dr. Jada Conolly",
    last_name: "GILBERT",
    email: "jhon@gmail.com",
    phone: "02354645767",
    action: "",
  },
  {
    first_name: "Dr. Jada Conolly",
    last_name: "GILBERT",
    email: "jhon@gmail.com",
    phone: "02354645767",
    action: "",
  },
  {
    first_name: "Dr. Jada Conolly",
    last_name: "GILBERT",
    email: "jhon@gmail.com",
    phone: "02354645767",
    action: "",
  },
  {
    first_name: "Dr. Jada Conolly",
    last_name: "GILBERT",
    email: "jhon@gmail.com",
    phone: "02354645767",
    action: "",
  },
  {
    first_name: "Dr. Jada Conolly",
    last_name: "GILBERT",
    email: "jhon@gmail.com",
    phone: "02354645767",
    action: "",
  },
  {
    first_name: "Dr. Jada Conolly",
    last_name: "GILBERT",
    email: "jhon@gmail.com",
    phone: "02354645767",
    action: "",
  },
  {
    first_name: "Dr. Jada Conolly",
    last_name: "GILBERT",
    email: "jhon@gmail.com",
    phone: "02354645767",
    action: "",
  },
  {
    first_name: "maaz",
    last_name: "GILBERT",
    email: "jhon@gmail.com",
    phone: "02354645767",
    action: "",
  },
]);
export default {
  setup() {
    const filter = ref("");
    const fname = ref("");
    const lname = ref("");
    const email = ref("");
    const phone = ref("");
    const customer = ref({});
    const new_customer = ref(false);
    const mode = ref("list");
    const $q = useQuasar();
    const show = ref(false);
    let rowData = null;
    function wrapCsvValue(val, formatFn) {
      let formatted = formatFn !== void 0 ? formatFn(val) : val;

      formatted =
        formatted === void 0 || formatted === null ? "" : String(formatted);

      formatted = formatted.split('"').join('""');

      return `"${formatted}"`;
    }
    function exportTable() {
      // naive encoding to csv format
      const content = [columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          rows.value.map((row) =>
            columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("User-management.csv", content, "text/csv");

      if (status !== true) {
        $q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    }
    function new_user() {
      new_customer.value = true;
    }
    function adduser() {
      let user = {
        first_name: fname.value,
        last_name: lname.value,
        email: email.value,
        phone: phone.value,
      };
      rows.value.unshift(user);
      fname.value = "";
      lname.value = "";
      email.value = "";
      phone.value = "";
    }
    function EditRow(row) {
      console.log(row);
      new_customer.value = true;
      fname.value = row.first_name;
      lname.value = row.last_name;
      email.value = row.email;
      phone.value = row.phone;
    }
    function deleteRow(row) {
      show.value = true;
      console.log(row);
      rowData = row;
    }
    function confirmDelete() {
      console.log("maaz");
      console.log(rowData);
      const rowName = rowData.first_name;
      const index = rows.value.findIndex((item) => item.first_name === rowName);

      if (index !== -1) {
        rows.value.splice(index, 1);
        console.log(index); // Remove the row at the specified index
      }
    }
    return {
      filter,
      customer,
      new_customer,
      mode,
      columns,
      rows,
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 7,
        // rowsNumber: xx if getting data from a server
      },
      wrapCsvValue,
      exportTable,
      new_user,
      fname,
      lname,
      email,
      phone,
      adduser,
      visibleColumns: ref([
        "first_name",
        "last_name",
        "email",
        "phone",
        "action",
      ]),
      EditRow,
      deleteRow,
      show,
      confirmDelete,
      rowData,
    };
  },
};
</script>
