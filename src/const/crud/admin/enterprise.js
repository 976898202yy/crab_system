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
        label: '企业id',
        prop: 'enterprise_id',
        hide: true,
        editDisabled: true,
        editDisplay: false,
        addDisplay: false
      },
      {
        label: '企业类型',
        prop: 'type',
        type: 'radio',
        slot: true,
        border:true,
        dicUrl: '/admin/dict/type/enterprise_type',
        rules: [
          { required: true, message: '请选择企业类型', trigger: 'blur'}
        ]
      },
      {
        label: '企业名称',
        prop: 'name',
        search: true,
        rules: [{
          required: true,
          message: '请输入企业名称',
          trigger: 'blur'
        }]
      },
      {
        label: '省',
        prop: 'province',
        formslot: true,
        slot: true,
        overHidden: true,
        addDisplay: false,
        editDisplay: false
      },
      {
        label: '市',
        prop: 'city',
        formslot: true,
        slot: true,
        overHidden: true,
        addDisplay: false,
        editDisplay: false
      },
      {
        label: '县、区',
        prop: 'district',
        formslot: true,
        slot: true,
        overHidden: true,
        addDisplay: false,
        editDisplay: false
      },
      {
        label: '乡镇街道',
        prop: 'town',
        formslot: true,
        slot: true,
        overHidden: true,
        addDisplay: false,
        editDisplay: false
      },
      {
        label: '行政区',
        prop: 'areaIds',
        dataType: "array",
        formslot: true,
        slot: true,
        hide: true,
        rules: [{
          type:'array',
          required: true,
          message: '请选择行政区',
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
        label: '电话',
        prop: 'phone'
      },
      {
        label: '邮箱',
        prop: 'email'
      }
    ]
  }
  