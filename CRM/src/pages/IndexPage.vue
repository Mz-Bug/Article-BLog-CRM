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
                <h4 class="q-ma-none">5</h4>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  class="text-right"
                  color="primary"
                  label="+ New Article"
                />
              </q-item-section>
            </q-item>

            <div class="q-mt-md">
              <p class="text-subtitle1 text-weight-medium q-mb-none">
                Tokopedia: How to increase user decision making on Event and
                Entertainment - UI Case Study
              </p>
              <q-badge
                class="q-pa-sm"
                rounded
                color="grey"
                label="Case Study"
              />

              <q-item class="q-pa-none">
                <p class="text-caption q-mt-md q-mb-none">
                  Published on Aug 14
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
            </div>

            <q-separator inset />

            <div class="q-mt-md">
              <p class="text-subtitle1 text-weight-medium q-mb-none">
                8 UI Design Principle
              </p>
              <q-badge
                class="q-pa-sm"
                rounded
                color="grey"
                label="User Interface"
              />

              <q-item class="q-pa-none">
                <p class="text-caption q-mt-md q-mb-none">
                  Published on Aug 14
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
            </div>

            <q-separator inset />

            <div class="q-mt-md">
              <p class="text-subtitle1 text-weight-medium q-mb-none">
                Bad Bad UI: 10 Common Mistakes in User Interfaces
              </p>
              <q-badge
                class="q-pa-sm"
                rounded
                color="grey"
                label="Visual Design"
              />

              <q-item class="q-pa-none">
                <p class="text-caption q-mt-md q-mb-none">
                  Published on Aug 14
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
            </div>

            <q-separator inset />

            <div class="q-mt-md">
              <p class="text-subtitle1 text-weight-medium q-mb-none">
                Re-Designing for interface complexities to improve experience at
                LN Capital— UI/UX Case Study Re-Designing for — UI/UX Case ...
              </p>
              <q-badge
                class="q-pa-sm"
                rounded
                color="grey"
                label="Case Study"
              />

              <q-item class="q-pa-none">
                <p class="text-caption q-mt-md q-mb-none">
                  Published on Aug 14
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
            </div>
            <q-separator inset />

            <div class="q-mt-md">
              <p class="text-subtitle1 text-weight-medium q-mb-none">
                Bad Bad Bad UX: 20 Common Mistakes in User Experience
              </p>
              <q-badge
                class="q-pa-sm"
                rounded
                color="grey"
                label="Case Study"
              />
              <q-item class="q-pa-none">
                <p class="text-caption q-mt-md q-mb-none">
                  Published on Aug 14
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
            </div>
          </q-tab-panel>

          <q-tab-panel name="category">
            <q-item class="q-pa-none">
              <q-item-section>
                <p class="text-subtitle1 text-grey q-mb-none">Total Category</p>
                <h4 class="q-ma-none">5</h4>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  class="text-right"
                  color="primary"
                  label="+ New Category"
                />
              </q-item-section>
            </q-item>

            <div class="q-pa-md">
              <q-table
                flat
                bordered
                :rows="rows"
                :columns="columns"
                row-key="name"
                :selected-rows-label="getSelectedString"
                selection="multiple"
                v-model:selected="selected"
              >
                <template v-slot:body-cell-action="props">
                  <q-td :props="props">
                    <q-btn
                      flat
                      size="sm"
                      color="primary"
                      icon="edit"
                      @click="share(props.row)"
                    />
                    <q-btn
                      class="q-pa-none"
                      color="red"
                      flat
                      size="sm"
                      icon="delete"
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
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
const columns = [
  {
    name: "number",
    required: true,
    label: "No",
    align: "left",
    field: (row) => row.number,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
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

const rows = [
  {
    number: 1,
    name: "Case Study",
  },
  {
    number: 2,
    name: "Visual Design",
  },
  {
    number: 3,
    name: "User Interface",
  },
  {
    number: 4,
    name: "User Experience",
  },
  {
    number: 5,
    name: "UI/UX",
  },
];
export default defineComponent({
  name: "IndexPage",

  setup() {
    const selected = ref([]);
    return {
      tab: ref("article"),
      selected,
      columns,
      rows,

      share(row) {
        // Implement your logic to share the row's action
        console.log("Sharing action for row:", row);
      },
      getSelectedString() {
        return selected.value.length === 0
          ? ""
          : `${selected.value.length} record${
              selected.value.length > 1 ? "s" : ""
            } selected of ${rows.length}`;
      },
    };
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  // max-width: 250px
</style>
