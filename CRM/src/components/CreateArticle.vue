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
        <div class="text-h5 q-my-sm">Title</div>
        <div>
          <q-input
            dense
            outlined
            v-model="text"
            type="text"
            placeholder="Title"
          />
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none q-ml-md">
        <div class="text-h5 q-my-md">Content</div>
        <editor></editor>
      </q-card-section>
      <q-card-actions align="right" class="q-mr-lg q-mb-sm">
        <div class="q-gutter-lg">
          <q-btn no-caps flat color="primary" label="Cancel" />
          <q-btn no-caps unelevated color="primary" label="Publish" />
        </div>
      </q-card-actions>
    </q-card>
  </q-page>
</template>
<script>
import editor from "./EiditorPage.vue";
export default {
  components: {
    editor,
  },
  setup() {
    return {};
  },
};
</script>
