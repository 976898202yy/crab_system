<template>
  <div class="mod-config">
    <basic-container>
      <avue-crud
        ref="crud"
        v-model="form"
        :data="tableData"
        :permission="permissionList"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @refresh-change="getList()"
        @row-update="update"
        @row-save="handleCreate"
        >
        <template slot="menuLeft">
          <el-button
            v-if="permissions.generator_tdevice_add"
            class="filter-item"
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="$refs.crud.rowAdd()"
            >新增
          </el-button>
        </template>
        <template slot="deviceType" slot-scope="scope">
          <span>{{ scope.row.deviceTypeName }}</span>
        </template>
        <template slot="status" slot-scope="scope">
          <span>{{ scope.row.statusName }}</span>
        </template>
        <template slot="sensorType" slot-scope="scope">
          <span>{{ scope.row.sensorTypeName }}</span>
        </template>
        <template slot="dataType" slot-scope="scope">
          <span>{{ scope.row.dataTypeName }}</span>
        </template>
        <template slot="enterprise" slot-scope="scope">
          <span>{{ scope.row.enterpriseName }}</span>
        </template>
        <template slot="enterpriseForm" slot-scope="scope">
          <avue-select
            v-model="scope.row.enterprise"
            :dic="enterpriseList"
            :props="enterpriseProps"
            placeholder="请选择所属企业"
          />
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button
            v-if="scope.row.children && permissions.generator_tchilddevice_add"
            type="text"
            size="small"
            icon="el-icon-plus"
            @click="handleChildCreate(scope.row,0)"
            >新增
          </el-button>
          <el-button
            v-if="scope.row.children && permissions.generator_tdevice_edit"
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row, scope.index)"
            >编辑
          </el-button>
          <el-button
            v-if="!scope.row.children && permissions.generator_tchilddevice_edit"
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="handleChildCreate(scope.row,1)"
            >编辑
          </el-button>
          <el-button
            v-if="scope.row.children && permissions.generator_tdevice_del"
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="deletes(scope.row, scope.index)"
            >删除
          </el-button>
          <el-button
            v-if="!scope.row.children && permissions.generator_tchilddevice_del"
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="handleChildDel(scope.row, scope.index)"
            >删除
          </el-button>
        </template>
      </avue-crud>
      <!-- 弹窗, 二级新增 / 修改 -->
      <child-form v-if="addOrUpdateVisible" :fatherDeviceName="fatherDeviceName" :fatherDeviceId="fatherDeviceId" ref="addOrUpdate" @refreshDataList="getList"></child-form>
    </basic-container>
  </div>
</template>

<script>
import { fetchList, addObj, putObj, delObj, delChildObj } from '@/api/generator/tdevice'
import { getEnterprise } from "@/api/admin/site";
import {tableOption} from '@/const/crud/generator/tdevice'  
import ChildForm from './child-device-form'
import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        form:{},
        tableLoading: false,
        tableData: [],
        tableOption: tableOption,
        enterpriseList: [],
        enterpriseProps:{
          label: 'enterpriseName',
          value: 'enterprise'
        },
        // 控制行内新增弹框
        addOrUpdateVisible: false,
        // 父设备名称 & id
        fatherDeviceName: '',
        fatherDeviceId: ''
      }
    },
    components: {
      ChildForm
    },
    created () {
      this.getList();
      this.loadData();
    },
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permissions.generator_tdevice_add, false),
          delBtn: this.vaildData(this.permissions.generator_tdevice_del, false),
          editBtn: this.vaildData(this.permissions.generator_tdevice_edit, false)
        }
      }
    },
    methods: {
      loadData(){
        getEnterprise().then(response => {
          this.enterpriseList = response.data.data;
        })
      },
      // 获取数据列表
      getList () {
        this.tableLoading = true
        fetchList().then(response => {
          this.tableData = response.data.data;
        })
        this.tableLoading = false
      },
      // 二级节点新增 / 二级节点修改
      handleChildCreate(row,type){
        this.fatherDeviceName = row.deviceName
        this.fatherDeviceId = row.deviceId
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(row,type)
        })
      },
      // 一级节点新增
      handleCreate(row, done, loading) {
        this.form.del_flag = 0;
        addObj(this.form).then(data => {
          this.$message.success('新增成功')
          done()
          this.getList()
        }).catch(() => {
          loading()
        })
      },
      handleUpdate(row, index) {
        this.$refs.crud.rowEdit(row, index);
      },
      // 修改
      update(row, index, done, loading) {
        putObj(row).then(data => {
          this.$message.success('修改成功')
          done()
          this.getList()
        }).catch(() => {
          loading()
        })
      },
      // 一级删除
    deletes(row, index) {
      this.$confirm(
        "此操作将永久删除该设备和旗下所有设备(设备名称:" + row.deviceName + "), 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        delObj(row.deviceId).then(() => {
          this.getList()
          this.$notify.success("删除成功");
        })
        .catch(() => {
          this.$notify.error("删除失败");
        })
        .catch(() => {});
      });
    },
    // 二级删除
    handleChildDel(row, index){
      this.$confirm(
          "此操作将永久删除该设备(设备名称:" + row.deviceName + "), 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          delChildObj(row.deviceId).then(() => {
            this.getList()
            this.$notify.success("删除成功");
          })
          .catch(() => {
            this.$notify.error("删除失败");
          });
        })
        .catch(() => {});
      }
    }
  }
</script>
