<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white">
      <q-toolbar class="text-white">
        <q-avatar color="primary" text-color="white" size="md">J</q-avatar>
        <span class="text-h6 text-primary q-ml-md">Logo</span>

        <q-toolbar-title
          ><q-input
            style="width: 350px; margin-left: 180px; background-color: #f1f3f8"
            dense
            v-model="text"
            outlined
            type="text"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" color="grey" />
            </template> </q-input
        ></q-toolbar-title>
        <div class="q-mt-sm">
          <q-btn flat class="q-mx-md" color="grey" round icon="notifications">
            <q-badge color="red" floating transparent> 4 </q-badge>
          </q-btn>
        </div>
        <q-btn
          class="q-mr-md"
          style="background-color: #f1f3f8"
          no-caps
          flat
          color="black"
          icon="person"
          icon-right="arrow_drop_down"
          label="Jhon Deo"
        >
          <q-menu>
            <q-list style="min-width: 150px">
              <q-item clickable v-close-popup to="/accounts">
                <q-item-section>Account</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      style="background-color: #f1f3f8"
    >
      <!-- drawer content -->
      <q-list padding class="rounded-borders" style="max-width: 350px">
        <q-item-label header>MENU</q-item-label>
        <q-item
          clickable
          class="q-mx-md"
          v-for="(item, index) in menu"
          :key="'menu_' + index"
          :class="{ active: activeIndex === index }"
          @click="activateItem(index, item.route)"
        >
          <q-item-section avatar>
            <q-icon
              :style="{ color: activeIndex === index ? '#FFFFFF' : '#9dacbe' }"
              :name="item.icon"
              size="sm"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-body1">{{ item.name }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item-label header>OTHERS</q-item-label>
        <q-item
          clickable
          class="q-mx-md"
          v-for="(item, index) in other"
          :key="'other_' + index"
          :class="{ active: activeIndex === index + menu.length }"
          @click="activateItem(index + menu.length, item.route)"
        >
          <q-item-section avatar>
            <q-icon
              :style="{
                color:
                  activeIndex === index + menu.length ? '#FFFFFF' : '#9dacbe',
              }"
              :name="item.icon"
              size="sm"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-body1">{{ item.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
const menu = [
  {
    icon: "eva-bar-chart-2-outline",
    name: "Dashboard",
    route: "/dashboard",
  },
  {
    icon: "eva-file-text-outline",
    name: "Article",
    route: "/article",
  },
  {
    icon: "eva-message-circle-outline",
    name: "Chat ",
    route: "/chat",
  },
  
];
const other = [
  {
    icon: "eva-settings-2-outline",
    name: "Settings",
    route: "/settings",
  },
  {
    icon: "eva-person-outline",
    name: "Account",
    route: "/accounts",
  },
  {
    icon: "eva-question-mark-circle-outline",
    name: "Helps",
    route: "/helps",
  },
];
export default {
  setup() {
    const route = useRouter();
    const leftDrawerOpen = ref(false);
    const activeIndex = ref(0);

    function activateItem(index, router) {
      activeIndex.value = index;
      route.push(router);
    }
    function logout() {
      localStorage.removeItem("token");
      route.push("/");
    }
    return {
      activeIndex,
      activateItem,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      menu,
      other,
      logout,
    };
  },
};
</script>
<style>
.active {
  background-color: #002ed0; /* Set the desired background color for the active item */
  color: white; /* Set the text color for the active item */
}
.activeother {
  background-color: #002ed0; /* Set the desired background color for the active item */
  color: white; /* Set the text color for the active item */
}
</style>
