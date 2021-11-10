<template>
  <header class="app-layout-header app-fixed-header">
    <div class="app-header">
      <div class="app-header-logo">
        <a href="/" alt="logo">
          <img src="@/assets/images/logo.png" />
        </a>
      </div>

      <div style="flex: 1 1 0%">
        <slot></slot>
      </div>
      <div class="app-header-right">
        <el-tooltip
          class="app-header-action app-fullscreen"
          placement="bottom-start"
          content="全屏模式"
        >
          <full-screen />
        </el-tooltip>

        <el-dropdown class="app-header-action">
          <span class="el-dropdown-link">
            <el-avatar size="small" :src="userInfo.userAvatar" />
            <span>{{ userInfo.userName }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-switch-button">
                <span>注销登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';

import { getUserInfo as getUserInfoApi } from '@/api/user/index';
import FullScreen from '@/components/free-fullscreen';

export default defineComponent({
  name: 'AppHeader',

  components: {
    FullScreen,
  },

  setup() {
    // ------------------------------------------ reactive ------------------------------------------
    const userInfo = reactive({
      // userId: '',
      userName: '',
      userAvatar: '',
      isAdmin: false,
    });
    const getUserInfo = async () => {
      try {
        const result = await getUserInfoApi();
        if (result && result.code === 0 && result.data) {
          const { userName = '', headThumb = '' } = result.data;
          userInfo.userName = userName;
          userInfo.userAvatar = headThumb;
          // store.dispatch('user/setUserInfo', userInfo);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    onMounted(() => {
      getUserInfo();
    });
    return {
      userInfo,
    };
  },
});
</script>

<style lang="scss">
.app-header {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  color: #fff;
  background-color: var(--layout-header-bg);

  .label {
    height: 32px;
    margin-right: 50px;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
  }

  .active {
    border-bottom: 2px solid #fff;
  }

  &-logo {
    position: relative;
    margin-right: 73px;
    overflow: hidden;

    a {
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      text-decoration: none;
    }

    img {
      width: 160px;
      height: 30px;
      object-fit: contain;
    }
  }

  &-content {
    flex: 1 1 0%;
  }

  &-right {
    display: flex;
    float: right;
    margin-left: auto;
    overflow: hidden;

    .app-header-action {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 5px;
      cursor: pointer;
      transition: all 0.3s;

      &:last-child {
        padding-right: 0;
      }
    }

    .app-fullscreen {
      .free-icon svg.svg-icon {
        vertical-align: -0.3rem;
      }
    }

    .el-dropdown {
      height: 100%;
      line-height: inherit;
      color: #fff;

      .el-avatar {
        margin-right: 0.5em;
        vertical-align: -0.6em;
      }
    }
  }
}

.app-fixed-header {
  position: fixed;
  top: 0;
  z-index: 2000;
  width: 100%;
  min-width: 1080px;
}
</style>
