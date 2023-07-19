<template>
  <el-dialog
    :title="dataForm.del_flag == 0 ? '新增' : '修改'"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      label-width="100px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="传感器类型:" prop="sensorType">
            <el-select
              v-model="dataForm.sensorTypeName"
              placeholder="请选择传感器类型"
              style="width: 100%"
            >
              <el-option v-for="(item,i) in sensorTypeList" :key="i" :label="item.description" :value="item.sensorType"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数据指标:" prop="dataType">
            <el-input
              v-model="dataForm.dataType"
              placeholder="请输入数据指标"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="单位:" prop="unit">
            <el-input
              v-model="dataForm.unit"
              placeholder="请输入单位"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数据类型:" prop="env">
            <el-select
              v-model="dataForm.env"
              placeholder="请选择数据类型"
              style="width: 100%"
            >
              <el-option v-for="(item,i) in envList" :key="i" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="描述:" prop="description">
            <el-input
              v-model="dataForm.description"
              placeholder="请输入描述"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dataFormSubmit()"
        >{{dataForm.del_flag === 0 ? '保存' : '修改'}}</el-button>
      <el-button icon="el-icon-circle-close" @click="visible = false">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getChildObj, addChildObj, putChildObj, getEnvType, getSensorType } from "@/api/generator/tdatatype";

export default {
  data() {
    return {
      visible: false,
      type: '',
      dataForm: {
        sensorType: '',
        sensorTypeName:'',
        dataType: '',
        unit: '',
        env: '',
        description: ''
      },
      dataRule: {
        sensorTypeName: [
          { required: true, message: "传感器类型不能为空", trigger: "blur" },
        ],
        description: [
          { required: true, message: "描述不能为空", trigger: "blur" },
        ]
      },
      sensorTypeList:[],
      envList:[]
    };
  },
  created(){
    this.loadData()
  },
  methods: {
    loadData(){
      getEnvType().then(response => {
        this.envList = response.data.data;
      })
      getSensorType().then(response => {
        this.sensorTypeList = response.data.data
        console.log(this.sensorTypeList)
      })
    },
    init(row,type) {
      console.log(row)
      console.log(type)
      this.dataForm.typeId = row.typeId || 0;
      this.$set(this.dataForm,'del_flag',type)
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (type == 1) {
          getChildObj(row.typeId).then(response => {
            this.dataForm = response.data.data
            console.log(this.dataForm)
            this.$set(this.dataForm,'sensorTypeName',response.data.data.description)
            this.$set(this.dataForm,'sensorType',response.data.data.sensorType)
          })
        }else{
          this.$set(this.dataForm,'sensorTypeName',row.description)
          this.$set(this.dataForm,'sensorType',row.sensorType)
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (this.dataForm.del_flag == 1) {
            this.dataForm.sensorType = this.dataForm.sensorTypeName
            putChildObj(this.dataForm)
              .then((data) => {
                this.$notify.success("修改成功");
                this.visible = false;
                this.$emit("refreshDataList");
              })
              .catch(() => {
               
              });
          } else {
            addChildObj(this.dataForm)
              .then((data) => {
                this.$notify.success("添加成功");
                this.visible = false;
                this.$emit("refreshDataList");
              })
              .catch(() => {
                
              });
          }
        }
      });
    },
  },
};
</script>
