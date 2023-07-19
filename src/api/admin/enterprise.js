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
    url: '/admin/enterprise/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/enterprise/saveEnterPrise',
    method: 'post',
    data: obj
  })
}

export function getObj(enterpriseId) {
  return request({
    url: '/admin/enterprise/findOne/' + enterpriseId,
    method: 'get'
  })
}

export function delObj(enterpriseId) {
  return request({
    url: '/admin/enterprise/deleteEnterprise/' + enterpriseId,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/enterprise/updateEnterprise',
    method: 'put',
    data: obj
  })
}

export function getCascader(parentId) {
  return request({
    url: '/admin/city/findCity/'+ parentId,
    method: 'get'
  })
}

export function getPermission(roleName) {
  return request({
    url: '/admin/user/getControllership?roleName='+ roleName,
    method: 'get'
  })
}

export function adjust(obj){
  return request({
    url: '/admin/enterprise/updateSiteAndPond',
    method: 'post',
    data: obj
  })
}

export function findPersion(enterpriseId){
  return request({
    url: '/admin/enterprise/findEnterPersion/'+ enterpriseId,
    method: 'get'
  })
}