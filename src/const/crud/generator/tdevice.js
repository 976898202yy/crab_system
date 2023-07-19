/*
 *    Copyright (c) 2018-2025, idata All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: idata
 */
// 指标管理
export const tableOption = {
    border: true,
    index: false,
    stripe: true,
    align: 'center',
    editBtn: false,
    delBtn: false,
    addBtn: false,
    // defaultExpandAll:true,
    rowKey:'id',
    column: [
      {
        label: '设备id',
        prop: 'deviceId',
        hide: true,
        editDisabled: true,
        editDisplay: false,
        addDisplay: false
      },
      {
        label: '设备名称',
        align: 'left',
        prop: 'deviceName',
        rules: [
          { required: true, message: '请输入设备名称', trigger: 'blur'}
        ]
      },
      {
        labelWidth: 100,
        label: '设备标示码',
        prop: 'deviceCode',
        hide: true
      },
      {
        label: '设备类型',
        prop: 'deviceType',
        slot: true,
        type: 'select',
        dicUrl: '/admin/dict/type/device_type',
        rules: [
          { required: true, message: '请选择设备类型', trigger: 'blur'}
        ]
      },
      {
        label: '设备状态',
        prop: 'status',
        slot: true,
        type: 'select',
        dicUrl: '/admin/dict/type/device_status',
        rules: [
          { required: true, message: '请选择设备状态', trigger: 'blur'}
        ]
      },
      {
        label: '接口网关',
        prop: 'gateway',
        hide: true
      },
      {
        label: '用户名',
        prop: 'username',
        hide: true
      },
      {
        label: '密码',
        prop: 'password',
        hide: true
      },
      {
        label: '传感器类型',
        prop: 'sensorType',
        slot: true,
        editDisplay: false,
        addDisplay: false
      },
      {
        label: '数据指标',
        prop: 'dataType',
        slot: true,
        editDisplay: false,
        addDisplay: false
      },
      {
        label: '设备描述',
        prop: 'description',
        overHidden: true
      },
      {
        label: '所属企业',
        prop: 'enterprise',
        formslot: true,
        slot: true,
        overHidden: true,
        rules: [{
          required: true,
          message: '请选择所属企业',
          trigger: 'blur'
        }]
      },
      {
        width: 150,
        label: '创建时间',
        prop: 'createdTime',
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm',
        valueFormat: 'yyyy-MM-dd HH:mm:ss',
        editDisplay: false,
        addDisplay: false
      }
    ]
  }
  