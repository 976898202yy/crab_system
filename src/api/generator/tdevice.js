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
    url: '/admin/device/deviceTree',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/device/saveDevice',
    method: 'post',
    data: obj
  })
}

export function getObj(deviceId) {
  return request({
    url: '/admin/device/findOne/' + deviceId,
    method: 'get'
  })
}

export function delObj(deviceId) {
  return request({
    url: '/admin/device/deleteDevice/' + deviceId,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/device/updateDevice',
    method: 'put',
    data: obj
  })
}

export function getDeviceType() {
  return request({
    url: '/admin/dict/type/device_type',
    method: 'get'
  })
}

export function getStatus() {
  return request({
    url: '/admin/dict/type/device_status',
    method: 'get'
  })
}

export function getSensorType() {
  return request({
    url: '/admin/sensortype/findAllSensorType',
    method: 'get'
  })
}

export function getDataType() {
  return request({
    url: '/admin/datatype/findAllDataType',
    method: 'get'
  })
}

export function addChildObj(obj) {
  return request({
    url: '/admin/childdevice/saveChildDevice',
    method: 'post',
    data: obj
  })
}

export function putChildObj(obj) {
  return request({
    url: '/admin/childdevice/updateChildDevice',
    method: 'put',
    data: obj
  })
}

export function getChildObj(deviceId) {
  return request({
    url: '/admin/childdevice/findOne/' + deviceId,
    method: 'get'
  })
}

export function delChildObj(deviceId) {
  return request({
    url: '/admin/childdevice/deleteChildDevice/' + deviceId,
    method: 'delete'
  })
}