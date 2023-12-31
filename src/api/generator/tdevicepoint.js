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
    url: '/admin/devicepoint/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/devicepoint/saveDevicePoint',
    method: 'post',
    data: obj
  })
}

export function getObj(pointId) {
  return request({
    url: '/admin/devicepoint/findOne/' + pointId,
    method: 'get'
  })
}

export function delObj(pointId) {
  return request({
    url: '/admin/devicepoint/deleteDevicePoint/' + pointId,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/devicepoint/updateDevicePoint',
    method: 'put',
    data: obj
  })
}

export function getDevice() {
  return request({
    url: '/admin/device/findAllDevice',
    method: 'get'
  })
}

export function getChildDevice() {
  return request({
    url: '/admin/childdevice/findAllChildDevice',
    method: 'get'
  })
}