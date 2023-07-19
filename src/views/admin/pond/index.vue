<template>
  <div class="pond">
    <basic-container>
      <el-row :span="24">
        <el-col :xs="24" :sm="24" :md="5" class="user__tree">
          <avue-tree 
            :option="treeOption"
            :data="treeData"
            @node-click="nodeClick">
            <span class="el-tree-node__label" slot-scope="{ node, data }">
              <el-tooltip
                class="item"
                effect="dark"
                content="无数据权限"
                placement="right-start"
                v-if="data.isLock"
              >
                <span>{{ node.label }} <i class="el-icon-lock"></i></span>
              </el-tooltip>
              <span v-if="!data.isLock">{{ node.label }}</span>
            </span>
          </avue-tree>
        </el-col>
        <el-col :xs="24" :sm="24" :md="19">
          <avue-crud ref="crud"
            v-model="form"
            :option="tableOption"
            :page.sync="page"
            :table-loading="tableLoading"
            :data="tableData"
            :before-open="handleOpenBefore"
            @on-load="getList"
            @search-change="searchChange"
            @size-change="sizeChange"
            @refresh-change="getList(page)"
            @current-change="currentChange"
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
              <el-button
                v-if="permissions.admin_site_export"
                icon="el-icon-download"
                type="primary"
                plain
                @click="exportExcel()"
                >导出</el-button
              >
            </template>
            <template slot="areaUnit" slot-scope="scope">
              <span>{{ scope.row.areaUnitName }}</span>
            </template>
            <template slot="enterprise" slot-scope="scope">
              <span>{{ scope.row.enterpriseName }}</span>
            </template>
            <template slot="site" slot-scope="scope">
              <span>{{ scope.row.siteName }}</span>
            </template>
            <template slot="areaForm" slot-scope="scope">
              <el-input placeholder="请输入面积" v-model="scope.row.area" class="input-with-select">
                <el-select v-model="form.areaUnit" slot="append" placeholder="请选择面积单位">
                  <el-option v-for="(item,i) in areaUnitList" :key="i" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-input>
              <!-- <avue-select
                v-model="scope.row.areaUnit"
                :dic="areaUnitList"
                :props="areaUnitProps"
                placeholder="请选择面积单位"
              /> -->
            </template>
            <template slot="enterpriseForm" slot-scope="scope">
              <avue-select
                v-model="scope.row.enterprise"
                :dic="enterpriseList"
                :props="enterpriseProps"
                placeholder="请选择所属企业"
              />
            </template>
            <template slot="siteForm" slot-scope="scope">
              <avue-select
                v-model="scope.row.site"
                :dic="siteList"
                :props="siteProps"
                placeholder="请选择所属基地"
              />
            </template>
            <template slot="menu" slot-scope="scope">
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row, scope.index)"
                >编辑
              </el-button>
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                @click="deletes(scope.row, scope.index)"
                >删除
              </el-button>
              <el-button
                type="text"
                size="small"
                icon="el-icon-plus"
                @click="handlePermissions(scope.row)"
                >权限
              </el-button>
            </template>
          </avue-crud>
        </el-col>
      </el-row>
      <permissions-form v-if="permissionsVisible" ref="addPermission"></permissions-form>
    </basic-container>
  </div>
</template>

<script>
import { fetchList, addObj, putObj, delObj, getAreaUnit, getEnterprise, getSite } from "@/api/admin/pond";
import { tableOption } from '@/const/crud/admin/pond';
import { fetchTree } from "@/api/admin/dept";
import { mapGetters } from "vuex";
import permissionsForm from './permissions-form'
export default {
  data() {
    return {
      form: {},
      treeOption: {
        nodeKey: "id",
        addBtn: false,
        menu: false,
        props: {
          label: "name",
          value: "id"
        }
      },
      treeData: [],
      areaUnitList: [],
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
      tableOption: tableOption,
      searchForm: {},
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      tableLoading: false,
      permissionsVisible: false
    };
  },
  components: {
    permissionsForm
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  methods: {
    init() {
      fetchTree().then(response => {
        this.treeData = response.data.data;
      });
      getAreaUnit().then(res => {
        this.areaUnitList = res.data.data;
      })
      getEnterprise().then(response => {
        this.enterpriseList = response.data.data;
      })
      getSite().then(response => {
        this.siteList = response.data.data;
      })
    },
    // 获取数据列表
    getList(page, params) {
      this.tableLoading = true
      fetchList(Object.assign({
          current: page.currentPage,
          size: page.pageSize
        }, params, this.searchForm)).then((response) => {
        this.tableData = response.data.data.records;
        this.page.total = response.data.data.total;
        this.tableLoading = false;
      });
    },
    searchChange(form, done) {
      this.searchForm = form
      this.page.currentPage = 1
      this.getList(this.page, form)
      done()
    },
    nodeClick(data) {
      this.page.page = 1;
      this.getList(this.page, { deptId: data.id });
    },
    handleOpenBefore(show, type) {
      if (type === "add") {
        this.form.address = undefined;
        this.form.area = undefined;
        this.form.depth = undefined;
        this.form.enterprise = undefined;
        this.form.lat = undefined;
        this.form.lng = undefined;
        this.form.name = undefined;
        this.form.site = undefined;
      }
      // window.boxType = type;
      // // 查询部门树
      // fetchTree().then(response => {
      //   this.treeDeptData = response.data.data;
      // });
      // // 查询角色列表
      // deptRoleList().then(response => {
      //   this.rolesOptions = response.data.data;
      // });

      // if (["edit", "views"].includes(type)) {
      //   this.role = [];
      //   for (let i = 0; i < this.form.roleList.length; i++) {
      //     this.role[i] = this.form.roleList[i].roleId;
      //   }
      // } else if (type === "add") {
      //   this.role = [];
      //   this.form.username = undefined;
      //   this.form.phone = undefined;
      //   this.form.password = undefined;
      // }
      show();
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    handleUpdate(row, index) {
      row.areaUnit = row.areaUnit + "";
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
    handleCreate(row, done, loading) {
      if(!row.areaUnit) {
        this.$message.error('请选择面积单位')
        loading()
        return
      }
      this.form.del_flag = 0;
      addObj(this.form).then(data => {
        this.$message.success('新增成功')
        done()
        this.getList(this.page)
      }).catch(() => {
        loading()
      })
    },
    // 删除
    deletes(row, index) {
      this.$confirm(
        "此操作将永久删除该塘口(塘口名称:" + row.name + "), 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        delObj(row.pondId)
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
      });
    },
    // 权限
    handlePermissions(row){
       this.permissionsVisible = true
       this.$nextTick(() => {
          this.$refs.addPermission.init(row)
        })
    },
    //  导出excel
    exportExcel() {
      this.downBlobFile("/admin/pond/importExcel", this.searchForm, "塘口表.xlsx");
    }
  },
};
</script>
<style lang="scss" scoped>
.pond {
  height: 100%;
  &__tree {
    padding-top: 3px;
    padding-right: 20px;
  }
}
::v-deep{
  .el-input-group__append{
    background-color: #fff !important;
    .el-select .el-input--small {
      width: 140px;
    }
  }
}

</style>
