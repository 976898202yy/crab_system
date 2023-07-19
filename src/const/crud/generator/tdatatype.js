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
        label: 'id',
        prop: 'typeId',
        hide: true,
        editDisabled: true,
        editDisplay: false,
        addDisplay: false
      },
      {
        labelWidth: 120,
        label: '传感器类型',
        align: 'left',
        prop: 'sensorType',
        rules: [
          { required: true, message: '请输入传感器类型', trigger: 'blur'}
        ]
      },
      {
        label: '数据指标',
        prop: 'dataType',
        editDisplay: false,
        addDisplay: false
      },
      {
        label: '单位',
        prop: 'unit',
        editDisplay: false,
        addDisplay: false
      },
      {
        label: '数据类型',
        prop: 'env',
        slot: true,
        editDisplay: false,
        addDisplay: false
      },
      {
        label: '描述',
        prop: 'description',
        overHidden: true,
        rules: [
          { required: true, message: '请选择基地名称', trigger: 'blur'}
        ]
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
  