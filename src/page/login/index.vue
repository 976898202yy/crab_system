<template>
  <div class="login-container">
    <div class="login-weaper  animated bounceInDown">
      <div class="login-logo">
        <img src="/img/logo.png" alt="">
      </div>
      <p class="login-tip">{{ website.title }} v 4.2</p>
      <div class="login-border">
        <div class="login-main">
          <h4 class="login-title">
            <el-select v-model="active"
                       class="login-select animated fadeIn"
                       placeholder="点击请选择租户"
                       @change="handleCommand">
              <el-option v-for="tenant in tenantList"
                         :key="tenant.id"
                         :label="tenant.name"
                         :value="tenant.id"></el-option>
            </el-select>
          </h4>
          <userLogin v-if="activeName==='user'"/>
          <codeLogin v-else-if="activeName==='code'"/>
          <thirdLogin v-else-if="activeName==='third'"/>
          <div class="login-menu">
            <a href="#"
               @click.stop="activeName='user'">账号密码</a>
            <a href="#"
               @click.stop="activeName='code'">手机号登录</a>
            <a href="#"
               @click.stop="activeName='third'">第三方登录</a>
          </div>
        </div>

      </div>
    </div>
    <div class="login-copyright">
      {{ website.copyright }}
    </div>
    <top-color v-show="false"/>
  </div>
</template>
<script>
import {fetchList} from '@/api/admin/tenant'
import userLogin from './userlogin'
import codeLogin from './codelogin'
import thirdLogin from './thirdlogin'
import {mapGetters} from 'vuex'
import {getStore, setStore} from '@/util/store'
import topColor from '@/page/index/top/top-color'

export default {
  name: 'Login',
  components: {
    userLogin,
    codeLogin,
    thirdLogin,
    topColor
  },
  data() {
    return {
      tenantList: [],
      active: '',
      activeName: 'user',
      socialForm: {}
    }
  },
  watch: {
    $route: {
      handler() {
        const params = this.$route.query
        if (this.validatenull(params.state) && this.validatenull(params.code)) return

        this.socialForm.state = params.state
        this.socialForm.code = params.code

        const loading = this.$loading({
          lock: true,
          text: `登录中,请稍后。。。`,
          spinner: 'el-icon-loading'
        })
        this.$store.dispatch('LoginBySocial', this.socialForm).then(
          () => {
            loading.close()
            this.$router.push({path: this.tagWel.value})
          }).catch(() => {
          loading.close()
        })
      },
      immediate: true
    }
  },
  created() {
    this.getTenantList()
    this.active = getStore({name: 'tenantId'})
  },
  computed: {
    ...mapGetters(['website', 'tagWel'])
  },
  methods: {
    handleCommand(command) {
      setStore({name: 'tenantId', content: command})
    },
    getTenantList() {
      fetchList().then(response => {
        this.tenantList = response.data.data
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/login.scss";
</style>
