import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import VCalendar from "v-calendar";
import "v-calendar/style.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VCalendar, {});
app.mount("#app");
