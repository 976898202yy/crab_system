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
            class="filter-item"
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="$refs.crud.rowAdd()"
            >新增
          </el-button>
        </template>
        <template slot="sensorType" slot-scope="scope">
          <span>{{ scope.row.sensorType }}</span>
        </template>
        <template slot="env" slot-scope="scope">
          <span>{{ scope.row.envName }}</span>
        </template>
        <template slot="sensorTypeForm" slot-scope="scope">
          <avue-select
            v-model="scope.row.sensorType"
            :dic="sensorTypeList"
            :props="sensorTypeProps"
            placeholder="请选择传感器类型"
            @change="handleSelect"
          />
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button
            v-if="scope.row.children && permissions.generator_tdatatype_add"
            type="text"
            size="small"
            icon="el-icon-plus"
            @click="handleChildCreate(scope.row,0)"
            >新增
          </el-button>
          <el-button
            v-if="scope.row.children && permissions.generator_tsensortype_edit"
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row, scope.index)"
            >编辑
          </el-button>
          <el-button
            v-if="!scope.row.children && permissions.generator_tdatatype_edit"
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="handleChildCreate(scope.row, 1)"
            >编辑
          </el-button>
          <el-button
            v-if="scope.row.children && permissions.generator_tsensortype_del"
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="deletes(scope.row, scope.index)"
            >删除
          </el-button>
          <el-button
            v-if="!scope.row.children && permissions.generator_tdatatype_del"
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="handleChildDel(scope.row, scope.index)"
            >删除
          </el-button>
        </template>
      </avue-crud>
      <!-- 弹窗, 二级新增 / 修改 -->
      <child-form v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getList"></child-form>
    </basic-container>
  </div>
</template>

<script>
  import {fetchList, addObj, putObj, delObj, delChildObj, getSensorType} from '@/api/generator/tdatatype'
  import {tableOption} from '@/const/crud/generator/tdatatype'
  import {mapGetters} from 'vuex'
  import ChildForm from './child-datatype-form'
  export default {
    data () {
      return {
        form:{},
        tableLoading: false,
        tableData: [],
        tableOption: tableOption,
        // 控制行内新增弹框
        addOrUpdateVisible: false,
      }
    },
    components: {
      ChildForm
    },
    created () {
      this.loadData()
    },
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permissions.admin_systenant_add, false),
          delBtn: this.vaildData(this.permissions.admin_systenant_del, false),
          editBtn: this.vaildData(this.permissions.admin_systenant_edit, false)
        }
      }
    },
    methods: {
      loadData(){
        getSensorType().then(response => {
          this.sensorTypeList = response.data.data
        })
      },
      // 获取数据列表
      getList() {
        this.tableLoading = true
        fetchList().then((response) => {
          this.tableData = response.data.data;
          this.tableLoading = false;
        });
      },
      // 新增
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
      // 二级节点新增 / 二级节点修改
      handleChildCreate(row,type){
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(row,type)
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
        "此操作将永久删除该指标和旗下所有指标(指标名称:" + row.sensorType + "), 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        delObj(row.typeId).then(() => {
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
          "此操作将永久删除该指标(指标名称:" + row.sensorType + "), 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          delChildObj(row.typeId).then(() => {
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
