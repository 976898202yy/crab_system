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
    url: '/admin/site/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/site/saveSite',
    method: 'post',
    data: obj
  })
}

export function getObj(siteId) {
  return request({
    url: '/admin/site/findOne/' + siteId,
    method: 'get'
  })
}

export function delObj(siteId) {
  return request({
    url: '/admin/site/deleteSite/' + siteId,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/site/updateSite',
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

export function getEnterprise(){
  return request({
    url: '/admin/enterprise/findEnterprise',
    method: 'get'
  })
}

export function adjust(obj){
  return request({
    url: '/admin/site/updateSitePerson',
    method: 'post',
    data: obj
  })
}

export function findPersion(siteId){
  return request({
    url: '/admin/site/findSitePersion/'+ siteId,
    method: 'get'
  })
}