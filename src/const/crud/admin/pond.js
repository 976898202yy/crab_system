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
    searchMenuSpan: 6,
    editBtn: false,
    delBtn: false,
    align: 'center',
    addBtn: false,
    column: [
      {
        label: '塘口id',
        prop: 'enterprise_id',
        hide: true,
        editDisabled: true,
        editDisplay: false,
        addDisplay: false
      },
      {
        label: '塘口名称',
        prop: 'name',
        search: true,
        rules: [{
          required: true,
          message: '请输入企业名称',
          trigger: 'blur'
        }]
      },
      {
        label: '详细地址',
        prop: 'address',
        rules: [{
          required: true,
          message: '请输入详细地址',
          trigger: 'blur'
        }]
      },
      {
        label: '纬度',
        prop: 'lng'
      },
      {
        label: '经度',
        prop: 'lat'
      },
      {
        label: '面积',
        formslot: true,
        prop: 'area',
        rules: [{
          required: true,
          message: '请输入面积',
          trigger: 'blur'
        }]
      },
      {
        label: '面积单位',
        prop: 'areaUnit',
        slot: true,
        editDisplay: false,
        addDisplay: false
      },
      {
        label: '水深',
        prop: 'depth',
        rules: [{
          required: true,
          message: '请输入水深',
          trigger: 'blur'
        }]
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
        label: '所属基地',
        prop: 'site',
        formslot: true,
        slot: true,
        overHidden: true,
        rules: [{
          required: true,
          message: '请选择所属基地',
          trigger: 'blur'
        }]
      }
    ]
  }
  