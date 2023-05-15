<template>
  <div class="FormInfo">sss</div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import getInstance from "@/hooks/getInstance";
const { proxy } = getInstance();
onMounted(() => {
  console.log(proxy);

  proxy.$axios.common.getDirectory("application").then((res: Array<T>): T => {
    console.log(res);
  });
});
</script>

<style lang="less" scoped></style>
