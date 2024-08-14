<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6 text-weight-bolder">Article</div>
        </q-card-section>

        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab name="article" label="Article" />
          <q-tab name="category" label="Category" />
        </q-tabs>

        <q-separator inset />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="article">
            <q-item class="q-pa-none">
              <q-item-section>
                <p class="text-subtitle1 text-grey q-mb-none">Total Article</p>

                <h4 class="q-ma-none">
                  {{ store.article ? store.article.length : 0 }}
                </h4>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  class="text-right"
                  color="primary"
                  label="+ New Article"
                  to="/create_article"
                />
              </q-item-section>
            </q-item>

            <div class="q-mt-md" v-for="blog in store.article" :key="blog">
              <p class="text-subtitle1 text-weight-medium q-mb-none">
                {{ blog.Title }}: {{ blog.Content }}
              </p>
              <q-badge
                class="q-pa-sm"
                rounded
                color="grey"
                :label="blog.Description"
              />

              <q-item class="q-pa-none">
                <p class="text-caption q-mt-md q-mb-none">
                  Published on : {{ blog.created_at }}
                </p>
                <q-btn flat size="sm" color="grey" icon="ios_share" />
                <q-btn
                  class="q-pa-none"
                  color="grey"
                  flat
                  size="sm"
                  icon="more_horiz"
                />
              </q-item>
              <q-separator inset />
            </div>
          </q-tab-panel>

          <q-tab-panel name="category">
            <q-item class="q-pa-none">
              <q-item-section>
                <p class="text-subtitle1 text-grey q-mb-none">Total Category</p>
                <h4 class="q-ma-none">
                  {{ store.category ? store.category.length : 0 }}
                </h4>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  class="text-right"
                  color="primary"
                  label="+ New Category"
                  @click="add_cetogory = true"
                />
              </q-item-section>
            </q-item>

            <div class="q-pa-md">
              <q-table
                flat
                bordered
                :rows="store.category"
                :columns="columns"
                row-key="name"
              >
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
                      @click="DeleteRow(props.row)"
                    />
                  </q-td>
                </template>
              </q-table>

              <div class="q-mt-md">
                <!-- Selected: {{ JSON.stringify(selected) }} -->
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <q-dialog v-model="add_cetogory">
      <q-card style="width: 600px; max-width: 60vw">
        <q-card-section>
          <div class="text-h6">
            Add new Category
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
                  <q-item-label class="text-body1 q-my-md"
                    >Category Name</q-item-label
                  >
                  <q-input
                    dense
                    outlined
                    v-model="categoryy"
                    placeholder="Category Name"
                  />
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
            @click="add_new_category"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="edit_cetogory">
      <q-card style="width: 600px; max-width: 60vw">
        <q-card-section>
          <div class="text-h6">
            Add new Category
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
                  <q-item-label class="text-body1 q-my-md"
                    >Category Name</q-item-label
                  >
                  <q-input
                    dense
                    outlined
                    v-model="editcategoryy"
                    placeholder="Category Name"
                  />
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
            @click="update_category"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref, onMounted } from "vue";
import { useCounterStore } from "src/stores/example-store";
const columns = [
  {
    name: "number",
    required: true,
    label: "Id",
    align: "left",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.Name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "create",
    required: true,
    label: "Created At",
    align: "left",
    field: "created_at",
    format: (val) => {
      const date = new Date(val);
      return date.toISOString().split("T")[0];
    },
  },
  {
    name: "action",
    align: "center",
    label: "Action",
    field: "action",
    sortable: false,
  },
  ,
];

export default defineComponent({
  name: "IndexPage",
  setup() {
    const selected = ref([]);
    const store = useCounterStore();
    const categoryy = ref("");
    const add_cetogory = ref(false);
    const edit_cetogory = ref(false);
    let editcategoryy = ref("");
    let rowData = null;
    function EditRow(row) {
      edit_cetogory.value = true;
      console.log(row);
      editcategoryy.value = row.Name;
      rowData = row;
    }
    function update_category() {
      const formData = new FormData();
      formData.append("Name", editcategoryy.value);

      store.Update_Cetegory(formData, rowData.id);
    }
    function add_new_category() {
      let category = {
        Name: categoryy.value,
      };
      store.Add_new_Category(category);
    }
    function DeleteRow(rowData) {
      store.Delete_Category(rowData.id);
    }
    onMounted(() => {
      store.Get_Article();
      store.Get_All_Category();
    });
    return {
      tab: ref("article"),
      selected,
      columns,
      store,
      add_cetogory,
      add_new_category,
      categoryy,
      share(row) {
        // Implement your logic to share the row's action
        console.log("Sharing action for row:", row);
      },

      EditRow,
      rowData,
      edit_cetogory,
      editcategoryy,
      update_category,
      DeleteRow,
    };
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  // max-width: 250px
</style>
