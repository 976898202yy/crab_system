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

export const tableOption = {
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    editBtn: false,
    delBtn: false,
    align: 'center',
    addBtn: false,
    column: [
      {
        label: '安装点id',
        prop: 'pointId',
        hide: true,
        editDisabled: true,
        editDisplay: false,
        addDisplay: false
      },
      {
        label: '设备名称',
        prop: 'deviceId',
        slot: true,
        formslot: true,
        rules: [
          { required: true, message: '请选择设备名称', trigger: 'blur'}
        ]
      },
      {
        labelWidth: 100,
        label: '子设备名称',
        prop: 'childDeviceId',
        slot: true,
        formslot: true
      },
      {
        labelWidth: 100,
        label: '安装点名称',
        prop: 'pointName',
        rules: [{
          required: true,
          message: '请输入安装点名称',
          trigger: 'blur'
        }]
      },
      {
        labelWidth: 100,
        label: '安装点层级',
        prop: 'pointLevel',
        type: 'radio',
        border:true,
        dicData: [{
            label: '基地',
            value: '1'
        }, {
            label: '塘口',
            value: '2'
        }]
      },
      {
        label: '设备层级',
        prop: 'deviceLevel',
        type: 'radio',
        slot: true,
        border:true,
        dicUrl:'/admin/dict/type/device_level_type'
      },
      {
        labelWidth: 100,
        label: '安置点位置',
        prop: 'location',
        rules: [{
          required: true,
          message: '请输入安置点位置',
          trigger: 'blur'
        }]
      },
      {
        label: '所属企业',
        prop: 'enterpriseId',
        formslot: true,
        slot: true,
        overHidden: true
      },
      {
        label: '所属基地',
        prop: 'siteId',
        formslot: true,
        slot: true,
        overHidden: true
      },
      {
        label: '所属塘口',
        prop: 'pondId',
        formslot: true,
        slot: true,
        overHidden: true
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
  