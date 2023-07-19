<template>
    <el-dialog title="权限" :visible.sync="visible">
        <el-form :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            label-width="100px">
            <el-form-item label="塘口管理员:" prop="userList">
                <el-select
                v-model="dataForm.userList"
                multiple
                placeholder="请选择塘口管理员"
                style="width: 100%"
                @change="valueChange"
                >
                    <el-option v-for="(item,i) in role" :key="i" :label="item.userName" :value="item.userId"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dataFormSubmit()">修改</el-button>
            <el-button icon="el-icon-circle-close" @click="visible = false">取消</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { getPermission } from "@/api/admin/enterprise"
import { adjust, findPersion } from '@/api/admin/pond'
export default {
    data() {
        return{
            visible: false,
            dataForm:{
                pondId: '',
                userList:[]
            },
            dataRule:{
                userList: [
                    { required: true, message: "塘口管理员不能为空", trigger: "blur" },
                ],
            },
            role: [],
        }
    },
    methods:{
        init(row){
            this.dataForm.pondId = row.pondId;
            this.visible = true;
            this.loadData();
            findPersion(row.pondId).then(resoult => {
                let res = resoult.data;
                this.dataForm.userList = res.data
                // if(res.data.length > 0){
                    
                // }else{
                //     this.dataForm.userList = []
                // }
            })
        },
        loadData(){
            getPermission('塘口管理员').then(resoult => {
                let res = resoult.data;
                if(res.code == 0){
                    this.role = res.data;
                }
            });
        },
        valueChange(e){
            this.dataForm.userList = e;
        },
        dataFormSubmit(){
            this.$refs["dataForm"].validate((valid) => {
                if (valid) {
                    adjust(this.dataForm).then(res => {
                        this.$notify.success("修改成功");
                        this.visible = false;
                    })
                }
            })
        }
    }
}
</script>