<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
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
          <el-form-item label="上级设备:" prop="parentDevice">
            <el-input
              v-model="dataForm.parentName"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备名称:" prop="deviceName">
            <el-input
              v-model="dataForm.deviceName"
              placeholder="请输入设备名称"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="设备标示码:" prop="deviceCode">
            <el-input
              v-model="dataForm.deviceCode"
              placeholder="请输入设备标示码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备类型:" prop="deviceType">
            <el-select
              v-model="dataForm.deviceType"
              placeholder="请选择设备状态"
              style="width: 100%"
            >
              <el-option v-for="(item,i) in deviceTypeList" :key="i" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="设备状态:" prop="status">
            <el-select
              v-model="dataForm.status"
              placeholder="请选择设备状态"
              style="width: 100%"
            >
              <el-option v-for="(item,i) in statusList" :key="i" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="传感器类型:" prop="sensorType">
            <el-select
              v-model="dataForm.sensorType"
              placeholder="请选择传感器类型"
              style="width: 100%"
            >
              <el-option v-for="(item,i) in sensorTypeList" :key="i" :label="item.sensorType" :value="item.typeId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="数据指标:" prop="dataType">
            <el-select
              v-model="dataForm.dataType"
              placeholder="请选择数据指标"
              style="width: 100%"
            >
              <el-option v-for="(item,i) in dataTypeList" :key="i" :label="item.dataType" :value="item.typeId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备描述:" prop="description">
            <el-input
              v-model="dataForm.description"
              placeholder="设备描述"
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
import { addChildObj, putChildObj, getChildObj, getSensorType, getDataType, getStatus, getDeviceType } from "@/api/generator/tdevice";

export default {
  props:{
    fatherDeviceName: {
      type: String,
      default: ""
    },
    fatherDeviceId: {
      type: [String, Number]
    }
  },
  data() {
    return {
      visible: false,
      dataForm: {
        deviceName: '',
        deviceCode: '',
        deviceType: '',
        parentDevice: '',
        status: '',
        sensorType: '',
        dataType:'',
        description: ''
      },
      dataRule: {
        deviceName: [
          { required: true, message: "设备名称不能为空", trigger: "blur" },
        ],
        deviceType: [
          { required: true, message: "设备类型不能为空", trigger: "blur" },
        ],
        status: [
          { required: true, message: "设备状态不能为空", trigger: "blur" },
        ]
      },
      deviceTypeList:[],
      dataTypeList: [],
      statusList: [],
      sensorTypeList:[],
    };
  },
  created(){
    this.loadData()
  },
  methods: {
    loadData(){
      getDeviceType().then(response => {
        let res = response.data;
        this.deviceTypeList = res.data;
      })
      getStatus().then(response => {
        let res = response.data;
        this.statusList = res.data;
      })
      getSensorType().then(response => {
        let res = response.data;
        this.sensorTypeList = res.data;
      })
      getDataType().then(response => {
        let res = response.data;
        this.dataTypeList = res.data;
      })
    },
    init(row,type) {
      this.dataForm.deviceId = row.deviceId || 0;
      this.$set(this.dataForm,'del_flag',type)
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (type == 1) {
          getChildObj(row.deviceId).then(response => {
            this.dataForm = response.data.data
            this.dataForm.parentDevice = response.data.data.parentDevice
            this.dataForm.dataType = Number(response.data.data.dataType)
            this.dataForm.sensorType = Number(response.data.data.sensorType)
            this.dataForm.del_flag = 1
          })
        }else{
          this.dataForm.parentDevice = row.deviceId || 0;
          this.dataForm.parentName = row.deviceName
          this.dataForm.deviceId = ""
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          if (this.dataForm.del_flag == 1) {
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
