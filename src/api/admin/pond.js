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
    url: '/admin/pond/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/pond/savePond',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/pond/findOne/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/pond/deletePond/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/pond/updatePond',
    method: 'put',
    data: obj
  })
}

export function getAreaUnit() {
  return request({
    url: '/admin/dict/type/area_unit',
    method: 'get'
  })
}

export function getEnterprise(){
  return request({
    url: '/admin/enterprise/findEnterprise',
    method: 'get'
  })
}

export function getSite(){
  return request({
    url: '/admin/site/findSite',
    method: 'get'
  })
}

export function getPond(siteId){
  return request({
    url: '/admin/pond/findAllPond/' + siteId,
    method: 'get'
  })
}

export function adjust(obj){
  return request({
    url: '/admin/pond/updatePondPerson',
    method: 'post',
    data: obj
  })
}

export function findPersion(pondId){
  return request({
    url: '/admin/pond/findPondPersion/'+ pondId,
    method: 'get'
  })
}