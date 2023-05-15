<template>
  <!-- <el-input v-model="filterText" placeholder="Filter keyword" /> -->

  <el-tree
    ref="treeRef"
    class="set-tree"
    highlight-current
    check-on-click-node
    check-strictly
    node-key="objectId"
    :expand-on-click-node="false"
    :data="treeData"
    :props="defaultProps"
    :filter-node-method="filterNode"
    :current-node-key="currentKey"
    :default-expanded-keys="expandKeys"
    @node-click="onNode"
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node text-ellipsis">
        <el-icon><Folder /></el-icon>
        <span>{{ node.label }}</span>
      </span>

      <el-dropdown trigger="click">
        <span class="tree-more">
          <el-icon><MoreFilled /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>编辑</el-dropdown-item>
            <el-dropdown-item :disabled="!data.canDel"> 删除 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { ElTree } from "element-plus";
import type { Tree } from "./types";
import getInstance from "@/hooks/getInstance";
const { proxy } = getInstance();
const emit = defineEmits(["handleSelect"]);

const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();

const defaultProps = {
  children: "children",
  label: "label",
};

watch(filterText, (val) => {
  treeRef.value!.filter(val);
});

const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.label.includes(value);
};

let treeData = ref<Tree[]>([]);
let flattenTree = ref<Tree[]>([]);
let currentKey = ref<string | number>("");
let expandKeys = ref<T>([]);
getTreeData();

function getTreeData() {
  proxy.$axios.common.getDirectory("application").then((res: Array<T>) => {
    console.log(res);
    treeData.value = dealData(res);
    if (treeData.value.length) {
      currentKey.value = treeData.value[0].objectId;
      expandKeys.value.push(treeData.value[0].objectId);

      emit("handleSelect", treeData.value[0]);
    }
  });
}
function dealData(arr: any) {
  arr.forEach((item: any) => {
    item.isLeaf = item.leaf;
    item.label = item.directoryName;
    item.level = item.depth;
    item.canDel = !item.children || (item.children && !item.children.length);

    if (item.level == 1) {
      // 没有子目录时，不显示折叠按钮
      if (item.children && !item.children.length) item.isLeaf = true;
    }
    flattenTree.value.push(item);

    if (item.children && item.children.length) dealData(item.children);
  });

  return arr;
}

const onNode = (tree: Tree) => {
  emit("handleSelect", tree);
};
</script>

<style lang="less" scoped>
.set-tree {
  :deep(.el-tree-node__label) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    text-align: left;
  }
  .custom-tree-node {
    position: relative;
    line-height: 2rem;
    padding-left: 1rem;
    display: inline-block;
    width: calc(100% - 3.5rem);
    max-width: calc(100% - 3.5rem);
    .el-icon {
      position: absolute;
      left: 0;
      top: 48%;
      transform: translateY(-50%);
    }
  }

  .tree-more {
    position: absolute;
    right: -1.75rem;
    width: 1.75rem;
    height: 1.75rem;
    padding-top: 0.35rem;
    margin-top: 0.123rem;
    border-radius: 0.25rem;
    text-align: center;
    transform: rotate(90deg);
    visibility: hidden;
  }
  .tree-more:hover {
    background: #e1ebf9;
  }

  :deep(.el-tree-node__content:hover) {
    .tree-more {
      visibility: visible;
    }
  }
}
</style>
