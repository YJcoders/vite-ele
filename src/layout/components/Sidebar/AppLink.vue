<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { isExternal } from "@/utils";

const type = "router-link";
const props = defineProps({
  to: {
    type: String,
    default: "",
  },
});
const linkProps = (url: string) => {
  if (isExternal(url)) {
    return {
      is: "a",
      href: url,
      target: "_blank",
      rel: "noopener",
      to: url,
    };
  }
  return {
    // is: "router-link",
    to: url,
  };
};
</script>
