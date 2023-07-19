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

import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/admin/sensortype/sensorTree',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/sensortype/saveSensor',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/generator/tdatatype/' + id,
    method: 'get'
  })
}

export function delObj(typeId) {
  return request({
    url: '/admin/sensortype/deleteSensor/' + typeId,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/sensortype/updateSensor',
    method: 'put',
    data: obj
  })
}

export function getSensorType() {
  return request({
    url: '/admin/sensortype/findAllSensorType',
    method: 'get'
  })
}

export function getEnvType() {
  return request({
    url: '/admin/dict/type/env_type',
    method: 'get'
  })
}

export function getChildObj(typeId){
  return request({
    url: '/admin/datatype/findOne/' + typeId,
    method: 'get'
  })
}

export function addChildObj(obj) {
  return request({
    url: '/admin/datatype/saveDataType',
    method: 'post',
    data: obj
  })
}

export function putChildObj(obj) {
  return request({
    url: '/admin/datatype/updateDataType',
    method: 'put',
    data: obj
  })
}

export function delChildObj(typeId) {
  return request({
    url: '/admin/datatype/deleteDataType/' + typeId,
    method: 'delete'
  })
}