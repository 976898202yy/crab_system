<template>
  <div class="mod-config">
    <basic-container>
      <avue-crud
        ref="crud"
        v-model="form"
        :option="tableOption"
        :page.sync="page"
        :permission="permissionList"
        :before-open="handleOpenBefore"
        :table-loading="tableLoading"
        :data="tableData"
        @on-load="getList"
        @size-change="sizeChange"
        @refresh-change="getList(page)"
        @current-change="currentChange"
        @row-update="update"
        @row-save="handleCreate"
      >
        <template slot="menuLeft">
          <el-button
            v-if="permissions.generator_tdevicepoint_add"
            class="filter-item"
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="$refs.crud.rowAdd()"
            >新增
          </el-button>
        </template>
        <template slot="deviceId" slot-scope="scope">
          <span>{{ scope.row.deviceName }}</span>
        </template>
        <template slot="childDeviceId" slot-scope="scope">
          <span>{{ scope.row.childDeviceName }}</span>
        </template>
        <template slot="deviceLevel" slot-scope="scope">
          <span>{{ scope.row.deviceLevelName }}</span>
        </template>
        <template slot="enterpriseId" slot-scope="scope">
          <span>{{ scope.row.enterpriseName }}</span>
        </template>
        <template slot="siteId" slot-scope="scope">
          <span>{{ scope.row.siteName }}</span>
        </template>
        <template slot="pondId" slot-scope="scope">
          <span>{{ scope.row.pondName }}</span>
        </template>
        <template slot="deviceIdForm" slot-scope="scope">
          <avue-select
            v-model="scope.row.deviceId"
            :dic="deviceList"
            :props="deviceProps"
            placeholder="请选择设备名称"
          />
        </template>
        <template slot="childDeviceIdForm" slot-scope="scope">
          <avue-select
            v-model="scope.row.childDeviceId"
            :dic="childDeviceList"
            :props="childDeviceProps"
            placeholder="请选择子设备名称"
          />
        </template>
        <template slot="enterpriseIdForm" slot-scope="scope">
          <avue-select
            v-model="scope.row.enterpriseId"
            :dic="enterpriseList"
            :props="enterpriseProps"
            placeholder="请选择所属企业"
          />
        </template>
        <template slot="siteIdForm" slot-scope="scope">
          <avue-select
            v-model="scope.row.siteId"
            :dic="siteList"
            :props="siteProps"
            placeholder="请选择所属基地"
            @change="handleChange"
          />
        </template>
        <template slot="pondIdForm" slot-scope="scope">
          <avue-select
            v-model="scope.row.pondId"
            :dic="pondList"
            :props="pondProps"
            placeholder="请选择所属塘口"
          />
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button
            v-if="permissions.generator_tdevicepoint_edit"
            type="text"
            size="small"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row, scope.index)"
            >编辑
          </el-button>
          <el-button
            v-if="permissions.generator_tdevicepoint_del"
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="deletes(scope.row, scope.index)"
            >删除
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { fetchList, addObj, putObj, delObj, getDevice, getChildDevice } from "@/api/generator/tdevicepoint";
import { getEnterprise, getSite, getPond } from "@/api/admin/pond";
import { tableOption } from '@/const/crud/generator/tdevicepoint';
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {},
      tableOption: tableOption,
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      tableLoading: false,
      deviceList: [],
      deviceProps: {
        label: 'deviceName',
        value: 'deviceId'
      },
      childDeviceList: [],
      childDeviceProps: {
        label: 'deviceName',
        value: 'deviceId'
      },
      enterpriseList: [],
      enterpriseProps:{
        label: 'enterpriseName',
        value: 'enterprise'
      },
      siteList:[],
      siteProps:{
        label: 'siteName',
        value: 'site'
      },
      pondList: [],
      pondProps:{
        label: 'name',
        value: 'pondId'
      },
    };
  },
  created() {
    
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permissions.generator_tdevicepoint_add, false),
        delBtn: this.vaildData(this.permissions.generator_tdevicepoint_del, false),
        editBtn: this.vaildData(this.permissions.generator_tdevicepoint_edit, false)
      }
    }
  },
  methods: {
    loadData(){
      getEnterprise().then(response => {
        this.enterpriseList = response.data.data;
      })
      getSite().then(response => {
        this.siteList = response.data.data;
      })
      getDevice().then(response => {
        this.deviceList = response.data.data;
      })
      getChildDevice().then(response => {
        this.childDeviceList = response.data.data;
      })
    },
    // 获取数据列表
    getList(page, params) {
      this.tableLoading = true;
      fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params)).then((response) => {
        this.tableData = response.data.data.records;
        this.page.total = response.data.data.total;
        this.tableLoading = false;
      });
    },
    handleChange(e){
      if(e){
        getPond(e).then(response => {
          this.pondList = response.data.data;
        })
      }
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    handleOpenBefore(show, type){
      this.loadData();
       if (type === "add") {
        this.form.pointId = undefined;
        this.form.deviceId = undefined;
        this.form.childDeviceId = undefined;
        this.form.pointName = undefined;
        this.form.pointLevel = undefined;
        this.form.deviceLevel = undefined;
        this.form.location = undefined;
        this.form.enterpriseId = undefined;
        this.form.siteId = undefined;
        this.form.pondId = undefined;
      }
      show();
    },
    // 新增 / 修改
    handleCreate(row, done, loading) {
      this.form.del_flag = 0;
      addObj(this.form).then(data => {
        this.$message.success('新增成功')
        done()
        this.getList(this.page)
      }).catch(() => {
        loading()
      })
    },
    handleUpdate(row, index) {
      console.log(row)
      row.childDeviceId = Number(row.childDeviceId)
      row.deviceLevel = row.deviceLevel + ''
      if(row.pointLevel == "基地"){
        row.pointLevel = "1"
      }else{
        row.pointLevel = "2"
      }
      this.$refs.crud.rowEdit(row, index);
    },
    update(row, index, done, loading) {
      putObj(row).then(data => {
        this.$message.success('修改成功')
        done()
        this.getList(this.page)
      }).catch(() => {
        loading()
      })
    },
    // 删除
    deletes(row, index) {
      this.$confirm(
        "此操作将永久删除该安装点(安装点名称:" + row.pointName + "), 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        delObj(row.pointId)
          .then(() => {
            if (this.tableData.length == 1 && this.page.currentPage > 1) {
              this.page.currentPage -= 1; // 往前跳一页
              this.getList(this.page)
            }
            this.getList(this.page)
            this.$notify.success("删除成功");
          })
          .catch(() => {
            this.$notify.error("删除失败");
          });
      })
      .catch(() => {});
    },
  },
};
</script>
