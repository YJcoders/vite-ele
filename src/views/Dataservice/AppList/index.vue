<template>
  <div class="app-list set-flex set-full-height">
    <div class="left-container">
      <tree @handleSelect="handleSelect" />
    </div>

    <div class="right-container">
      <div class="search-bar">search</div>
      <div class="option-bar set-flex">
        <div>
          <el-button type="primary">新增</el-button>
          <el-button>批量上线</el-button>
        </div>
        <div>
          <el-button color="#626aef">下载</el-button>
        </div>
      </div>

      <div class="content">
        <el-table :data="tableData">
          <el-table-column fixed prop="sName" label="服务应用名称" width="150">
            <template #default="scope">
              <div v-tableTooltip class="text-ellipsis">
                {{ scope.row.sName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="shortName" label="简称" width="120" />
          <el-table-column label="状态" width="80">
            <template #default="scope">
              <el-tag
                :color="scope.row.iStatus == 1 ? '#E5F8F0' : '#F2F4F6'"
                :style="{
                  color: scope.row.iStatus == 1 ? '#33C074' : '#4E5D78',
                }"
              >
                {{ scope.row.iStatus == 1 ? "已上线" : "未上线" }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="iApiCount" label="绑定API数量" width="120" />
          <el-table-column prop="createBy" label="创建人" width="100" />
          <el-table-column prop="createDate" label="创建时间" width="160" />
          <el-table-column prop="updateDate" label="更新时间" width="160" />
          <el-table-column prop="sDescribe" label="描述">
            <template #default="scope">
              <div class="text-ellipsis">
                {{ scope.row.sDescribe }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import * as dayjs from "dayjs";
import { dealQueryDate } from "@/utils/dealQueryDate";
import type { Tree } from "./types";
import tree from "./tree.vue";
import getInstance from "@/hooks/getInstance";
const { proxy } = getInstance();

interface obj {
  [propName: string]: any;
}
let searchData = ref<obj>({});
let currentNode = ref<obj>({});
let tableData = ref<Object>([]);

const handleSelect = (tree: Tree) => {
  currentNode.value = tree;
  // console.log(tree);
  handleSearch(0, 10);
};
function handleSearch(page: number, pageSize: number) {
  let params = `totalResults=true&offset=${page}&limit=${pageSize}&orderBy=updateDate:desc,sName:desc&query=`;
  // 时间处理
  let createDates: string[] = [];
  let updateDates: string[] = [];
  if (searchData.value.createDate && searchData.value.createDate.length) {
    createDates = [
      `${dayjs(searchData.value.createDate[0]).format("YYYY-MM-DD")} 00:00:00`,
      `${dayjs(searchData.value.createDate[1]).format("YYYY-MM-DD")} 23:59:59`,
    ];
  }
  if (searchData.value.updateDate && searchData.value.updateDate.length) {
    updateDates = [
      `${dayjs(searchData.value.updateDate[0]).format("YYYY-MM-DD")} 00:00:00`,
      `${dayjs(searchData.value.updateDate[1]).format("YYYY-MM-DD")} 23:59:59`,
    ];
  }
  //   回显后的组织ID字段赋值
  // if (this.searchEchoOrgId) {
  //   this.searchData.sAppOrgName = this.searchEchoOrgId;
  // }
  params = dealQueryDate(params, createDates, updateDates);
  for (const key in searchData.value) {
    const value = searchData.value[key];
    if (
      value !== undefined &&
      key !== "createDate" &&
      key !== "updateDate" &&
      value.toString().trim().length
    ) {
      params =
        key !== "sName" && key !== "createBy" && key !== "shortName"
          ? `${params} and ${key}=${
              typeof value === "number" ? value : `'${value}'`
            }`
          : `${params} and ${key} like '*${encodeURIComponent(
              value.replaceAll("\\", "\\\\")
            )}*'`;
    }
  }
  // 查询对应目录下的数据
  if (currentNode.value.path) {
    params = `${params} and directoryPath like '${currentNode.value.path}*'`;
  }
  params = `${params}&showName=createBy:userName`;

  // console.log(params);
  proxy.$axios.common
    .getAppList(params)
    .then((res: any) => {
      // this.saveSearchData = Object.assign({}, this.searchData);
      const arr = res.items || [];
      tableData.value = arr;
      // this.tableConfig.pagination.total = res.totalResults;
    })
    .finally(() => {
      // this.tableConfig.loading = false;
    });
}

const setTableClass = ({ row, column }) => {
  console.log(row, column);
};
</script>

<style lang="less" scoped>
.app-list {
  .left-container {
    width: 15rem;
    min-width: 15rem;
    background: #fff;
  }
  .right-container {
    width: calc(100% - 15rem);

    .search-bar {
      width: 100%;
      height: auto;
      min-height: 2.5rem;
      position: relative;
      padding: 1rem 2rem 0px;
      background-color: #fff;
      box-shadow: 0px 2px 0.625rem 0 rgb(26 93 150 / 10%);
    }
    .option-bar {
      height: auto;
      margin: 0.75rem 1.5rem;
    }
    .content {
      margin: 0.75rem 1.5rem;
    }
  }
}
</style>
