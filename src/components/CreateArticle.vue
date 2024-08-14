<template>
  <q-page class="q-pa-lg">
    <q-card flat bordered class="q-my-lg">
      <q-card-section>
        <q-list>
          <q-item>
            <q-item-section class="text-h5 text-weight-bold"
              >Create New Article</q-item-section
            >
            <q-item-section side>
              <span class="q-gutter-md">
                <q-select
                  filled
                  v-model="cetgorymodel"
                  label="Select Category"
                  :options="store.category"
                  style="width: 250px"
                  behavior="menu"
                  option-label="Name"
                  emit-value
                />
                <!-- option-value="Name" -->
              </span>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section class="q-ml-md">
        <div class="text-h5 q-my-sm">Title</div>
        <div>
          <q-input
            dense
            outlined
            v-model="title"
            type="text"
            placeholder="Title"
          />
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none q-ml-md">
        <div class="text-h5 q-my-md">Content</div>
        <editor v-model="editorValue"></editor>
      </q-card-section>
      <q-card-actions align="right" class="q-mr-lg q-mb-sm">
        <div class="q-gutter-lg">
          <q-btn no-caps flat color="primary" label="Cancel" />
          <q-btn
            no-caps
            unelevated
            color="primary"
            label="Publish"
            @click="newaddarticle"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>
<script>
import editor from "./EiditorPage.vue";
import { useCounterStore } from "../stores/example-store";
import { ref, onMounted } from "vue";
export default {
  components: {
    editor,
  },
  setup() {
    const store = useCounterStore();
    const title = ref("");
    const editorValue = ref("");
    const cetgorymodel = ref(null);
    function addarticle() {}
    onMounted(() => {
      store.Get_All_Category();
    });
    function newaddarticle() {
      if (cetgorymodel.value) {
        const formData = new FormData();
        formData.append("Title", title.value);
        formData.append("Content", editorValue.value);
        formData.append("Description", cetgorymodel.value.Name);

        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }
        store.New_Artcle(formData, cetgorymodel.value.id); // Use uppercase 'Id' for the category ID
      } else {
        // Handle case where category is not selected
        console.log("Please select a category");
      }
      (title.value = ""), (editorValue.value = "");
    }

    return {
      addarticle,
      store,
      title,
      editorValue,
      cetgorymodel,
      newaddarticle,
    };
  },
};
</script>
