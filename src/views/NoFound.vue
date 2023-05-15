<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <!-- <img class="pic-404__parent" :src="img404" alt="404" />
        <img class="pic-404__child left" :src="img404Cloud" alt="404" />
        <img class="pic-404__child mid" :src="img404Cloud" alt="404" />
        <img class="pic-404__child right" :src="img404Cloud" alt="404" /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line import/extensions
import { defineComponent } from "vue";
// import img404 from "@/assets/noFound/404.png";
// eslint-disable-next-line import/extensions
// import img404Cloud from "@/assets/noFound/404_cloud.png";

export default defineComponent({
  name: "NoFound",
  data() {
    return {
      // img404,
      // img404Cloud,
    };
  },
});
</script>
