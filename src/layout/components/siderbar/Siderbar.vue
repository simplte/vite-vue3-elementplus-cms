<template>
  <aside class="app-layout-siderbar">
    <div class="app-siderbar">
      <div class="app-siderbar-menus">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            :unique-opened="false"
            :collapse="!collapsed"
            :default-active="currentActiveKey"
            background-color="var(--layout-siderbar-bg)"
            text-color="var(--color-info)"
            active-text-color="var(--color-primary)"
            @select="handleMenuClick"
          >
            <template v-for="item in menus" :key="item.path">
              <siderbar-item :menu-item="item" />
            </template>
          </el-menu>
        </el-scrollbar>
      </div>

      <div class="app-siderbar-links">
        <div class="arc-bg">
          <div class="btn-box" @click="toggleSidebar">
            <i :class="[collapsed ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right']"></i>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
import { AppActionTypes } from '@/store/modules/app/action-types';
import { routes } from '@/router';
import SiderbarItem from './SiderbarItem.vue';
import { transformRouteMenu } from './utils/helper';

export default defineComponent({
  name: 'AppSiderbar',

  components: {
    SiderbarItem,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const currentActiveKey = computed(() => {
      const { meta, path } = route;
      if (meta?.currentActiveMenu) {
        return meta.currentActiveMenu;
      }
      return path;
    });

    const collapsed = computed(() => store.state.app.sidebarCollapsed);

    const toggleSidebar = () => {
      store.dispatch(AppActionTypes.SidebarCollapsed);
    };

    const handleMenuClick = (path) => {
      router.push({ path });
    };

    const menus = computed(() => {
      return transformRouteMenu(routes);
    });

    return {
      currentActiveKey,
      menus,
      collapsed,
      toggleSidebar,
      handleMenuClick,
    };
  },
});
</script>

<style lang="scss">
.app-siderbar {
  display: flex;
  flex-direction: column;
  height: 100%;

  &-menus {
    flex: 1 1 0%;
    overflow: hidden auto;

    .el-scrollbar {
      height: 100%;
    }

    .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }
  }

  &-links {
    box-sizing: border-box;
    width: 100%;
    padding: 0 16px;
    height: 45px;
    margin-bottom: 100px;

    .arc-bg {
      position: absolute;
      right: 0;
      width: 36px;
      height: 73px;
      background-image: url('../../../assets/images/logo.png');

      .btn-box {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 3px;
        margin: auto 0;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 50%;
        background: #bfdbf7;
        cursor: pointer;

        [class^='el-icon-'] {
          font-size: 10px;
          color: var(--color-primary);
          transition: 0.3s;
        }
        &:hover .el-icon-d-arrow-left {
          transform: translate(-2px);
        }
        &:hover .el-icon-d-arrow-right {
          transform: translate(2px);
        }
      }
    }
  }

  .el-menu {
    border-right: none;
    // menu hover
    .submenu-title-noDropdown,
    .el-submenu__title {
      &:hover,
      &:focus {
        background-color: rgba(var(--color-primary-rgb), 0.1) !important;
      }
    }

    .el-menu-item,
    .nest-menu .el-submenu > .el-submenu__title,
    .el-submenu .el-menu-item {
      &:hover,
      &:focus {
        background-color: rgba(var(--color-primary-rgb), 0.1) !important;
      }
    }

    .el-submenu__icon-arrow {
      margin-top: -4px;
    }

    .el-menu-item.is-active {
      background: #fff !important;

      &::before {
        content: '';
        position: absolute;
        height: 100%;
        left: 0;
        width: 4px;
        background-color: rgba(var(--color-primary-rgb), 1);
      }
    }
  }
}
</style>
