<template>
  <div class="oops">
    <div class="error-text">
      <!-- <img :src="dynamicIcon" /> -->
      <span>{{ title }}</span>
      <p>{{ description }}</p>
      <a v-if="showBtn" class="back" @click="onClick">
        {{ btnAction === 'back' ? '返回' : '刷新' }}
      </a>
    </div>
  </div>
</template>
<script>
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FreeException',

  props: {
    icon: String,
    title: String,
    description: String,
    showBtn: {
      type: Boolean,
      default: true,
    },
    btnAction: {
      type: String,
      default: 'back',
    },
  },

  setup(props) {
    const router = useRouter();

    const back = () => {
      if (window.history.length > 2) {
        router.go(-1);
      } else {
        router.push('/');
      }
    };

    const refresh = () => {
      router.push('/login');
    };

    const onClick = () => {
      if (props.btnAction === 'back') {
        return back();
      }
      if (props.btnAction === 'refresh') {
        return refresh();
      }
    };

    // const dynamicIcon = computed(() => require(`@/assets/images/error/${props.icon}.svg`));

    return {
      onClick,
      // dynamicIcon,
    };
  },
});
</script>

<style scoped lang="scss">
.oops {
  display: inline-grid;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  margin: 0;
}

.error-text {
  font-size: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000;
  margin-top: -15vh;

  img {
    width: 550px;
  }

  span {
    position: relative;
    font-size: 36px;
    font-weight: 700;
  }

  p {
    font-size: 16px;
    color: var(--color-info);
    margin: 20px 0 10px 0;
    font-weight: 400;
  }

  .back {
    cursor: pointer;
    background: #fff;
    color: #000;
    font-size: 16px;
    text-decoration: none;
    margin: 20px auto 0;
    padding: 0.6em 2em;
    border-radius: 500px;
    box-shadow: 0 10px 50px 4px rgba(0, 0, 0, 0.1), inset 0 16px 0 0 var(--color-primary);
    transition: all 300ms ease;

    &:hover {
      color: #fff;
      transform: translateY(-13px);
      background: var(--color-primary);
      box-shadow: 0 35px 90px 4px rgba(0, 0, 0, 0.3), inset 0 0 0 2px #fff;
    }
  }
}
</style>
