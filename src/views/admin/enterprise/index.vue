<template>
  <div class="enterprise">
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
          <!-- :before-open="handleOpenBefore" -->
          <avue-crud ref="crud"
            :option="tableOption"
            v-model="form"
            :page.sync="page"
            :table-loading="tableLoading"
            :data="tableData"
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
            <template slot="type" slot-scope="scope">
              <span>{{ scope.row.description }}</span>
            </template>
            <template slot="province" slot-scope="scope">
              <span>{{ scope.row.provinceName }}</span>
            </template>
            <template slot="city" slot-scope="scope">
              <span>{{ scope.row.cityName }}</span>
            </template>
            <template slot="district" slot-scope="scope">
              <span>{{ scope.row.districtName }}</span>
            </template>
             <template slot="town" slot-scope="scope">
              <span>{{ scope.row.townName }}</span>
            </template>
            <template slot="areaIdsForm" slot-scope="scope">
              <avue-cascader
                lazy
                v-model="form.areaIds"
                :props="areaIdsProps"
                :lazy-load="lazyLoad"
                placeholder="请选择行政区"
                :node-click="cascaderChange(scope)"
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
import { fetchList, addObj, putObj, delObj, getCascader } from "@/api/admin/enterprise";
import { tableOption } from '@/const/crud/admin/enterprise';
import { fetchTree } from "@/api/admin/dept";
import { mapGetters } from "vuex";
import permissionsForm from './permissions-form'
export default {
  data() {
    return {
      form:{},
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
      tableOption: tableOption,
      areaIdsProps:{
        label: 'name',
        value: 'id'
      },
      searchForm: {},
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      tableLoading: false,
      permissionsVisible: false,
      roles:[]
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
    cascaderChange(scope){
      this.form.areaIds = scope.row.areaIds;
    },
    lazyLoad(node, resolve) {
      let stop_level = 3;
      let level = node.level;
      let data = node.data || {};
      let list = [];
      let callback = () => {
        resolve((list || []).map(ele => {
          return Object.assign(ele, {
            leaf: level >= stop_level
          })
        }));
      }
      if (level == 0) {
        getCascader('100000').then(res => {
          list = res.data.data;
          callback()
        })
      }
      if (level == 1) {
        getCascader(data.id).then(res => {
          list = res.data.data;
          callback()
        })
      } else if (level == 2) {
        getCascader(data.id).then(res => {
          list = res.data.data;
          callback()
        })
      }else if (level == 3) {
        getCascader(data.id).then(res => {
          list = res.data.data;
          callback()
        })
      }else{
        callback()
      }
    },
    init() {
      fetchTree().then(response => {
        this.treeData = response.data.data;
      });
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
    // handleOpenBefore(show, type) {
    //   window.boxType = type;
    //   // 查询部门树
    //   fetchTree().then(response => {
    //     this.treeDeptData = response.data.data;
    //   });
    //   // 查询角色列表
    //   deptRoleList().then(response => {
    //     this.rolesOptions = response.data.data;
    //   });

    //   if (["edit", "views"].includes(type)) {
    //     this.role = [];
    //     for (let i = 0; i < this.form.roleList.length; i++) {
    //       this.role[i] = this.form.roleList[i].roleId;
    //     }
    //   } else if (type === "add") {
    //     this.role = [];
    //     this.form.username = undefined;
    //     this.form.phone = undefined;
    //     this.form.password = undefined;
    //   }
    //   show();
    // },
    handleUpdate(row, index) {
      this.form = row;
      this.form.areaIds = [Number(row.province),Number(row.city),Number(row.district),Number(row.town)];
      this.form.type = row.descriptionId + "";
      this.$refs.crud.rowEdit(this.form, index);
    },
    sizeChange(pageSize) {
      this.page.currentPage = 1; 
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
    update(row, index, done, loading) {
      this.form.province = row.areaIds[0];
      this.form.city = row.areaIds[1];
      this.form.district = row.areaIds[2];
      this.form.town = row.areaIds[3];
      putObj(this.form).then(data => {
        this.$message.success('修改成功')
        done()
        this.getList(this.page)
      }).catch(() => {
        loading()
      })
    },
    handleCreate(row, done, loading) {
      row.province = row.areaIds[0];
      row.city = row.areaIds[1];
      row.district = row.areaIds[2];
      row.town = row.areaIds[3];
      row.del_flag = 0;
      addObj(row).then(data => {
        this.$message.success('新增成功')
        done()
        this.getList(this.page)
        console.log(row)
      }).catch(() => {
        loading()
      })
    },
    // 删除
    deletes(row, index) {
      this.$confirm(
        "此操作将永久删除该企业(企业名称:" + row.name + "), 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        delObj(row.enterpriseId)
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
    handlePermissions(row, index){
      this.permissionsVisible = true 
      this.$nextTick(() => {
        this.$refs.addPermission.init(row)
      }) 
    },
    //  导出excel
    exportExcel() {
      this.downBlobFile("/admin/enterprise/importExcel", this.searchForm, "企业表.xlsx");
    },
  },
};
</script>
<style lang="scss">
.enterprise {
  height: 100%;
  &__tree {
    padding-top: 3px;
    padding-right: 20px;
  }
}
</style>
