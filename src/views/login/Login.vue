<template>
  <div class="wrapper">
    <img class="wrapper__img" src='http://www.dell-lee.com/imgs/vue3/user.png' />
    <div class="wrapper__input">
      <input
              class="wrapper__input__content"
              placeholder="用户名(随便填写)"
              v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
              type="password"
              class="wrapper__input__content"
              placeholder="请输入密码(随便填写)"
              v-model="password"
              autocomplete="new-password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登陆</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    <Toast v-if="show" :message="toastMessage"/>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// 处理注册逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '' })

  const handleLogin = async () => {
    try {
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'home' })
      } else {
        showToast('登陆失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }

  const { username, password } = toRefs(data)
  return { username, password, handleLogin}
}

// 处理注册跳转
const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    router.push({ name: 'egister' })
  }
  return { handleRegisterClick }
}

export default {
  name: 'Login',
  components: { Toast },
  // 职责就是告诉你，代码执行的一个流程
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegisterClick } = useRegisterEffect()

    return { username, password, show, toastMessage, handleLogin, handleRegisterClick }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/viriables.scss';
  .wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &__img {
      display: block;
      margin: 0 auto .9rem auto;
      width: 1.66rem;
      height: 1.66rem;
    }
    &__input {
      height: .98rem;
      margin: 0 .4rem .16rem .4rem;
      padding: 0 .36rem;
      background: #F9F9F9;
      border: 1px solid rgba(0,0,0,0.10);
      border-radius: 6px;
      border-radius: 6px;
      &__content {
        line-height: .98rem;
        border: none;
        outline: none;
        width: 100%;
        background: none;
        font-size: .16rem;
        color: $content-notice-fontcolor;
        &::placeholder {
          color: $content-notice-fontcolor;
        }
      }
    }
    &__login-button {
      margin: .62rem .4rem .36rem .4rem;
      line-height: .98rem;
      background: #0091FF;
      box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
      border-radius: .04rem;
      border-radius: .04rem;
      color: #fff;
      font-size: .46rem;
      text-align: center;
    }
    &__login-link {
      text-align: center;
      font-size: .42rem;
      color: $content-notice-fontcolor;
    }
  }
</style>
