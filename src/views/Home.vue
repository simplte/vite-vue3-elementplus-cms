<template>
  <div class="home">
    <img src="@/assets/images/logo.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    // 获取环境变量 {"VITE_APP_BASE_URL":"http://test.api.woa.com","BASE_URL":"/","MODE":"development","DEV":true,"PROD":false,"SSR":false,"LEGACY":false}
    console.log('home import.meta', import.meta);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // console.log('import.meta.env', import.meta.env);

    // ts高阶属性使用
    /**
     * Record
     * 定义对象key和value的值
     */
    interface PageInfo {
      title: string;
    }
    type Page = 'home' | 'about' | 'contact';
    const nav: Record<Page, PageInfo> = {
      home: { title: 'home' },
      about: { title: 'about' },
      contact: { title: 'contact' },
    };
    console.log(nav);
    type Name = string;
    type Members = 'xiaohong' | 'xiaolv' | 'xiaogou';
    const memberList: Record<Members, Name> = {
      xiaohong: '123',
      xiaolv: '123',
      xiaogou: '123',
    };
    console.log(memberList);

    /**
     * 交叉类型
     * extend
     * 将多个类型合并成一个类型
     */
    class Person {
      name: string;
      constructor(name: string) {
        this.name = name;
      }
      getName() {
        console.log(this.name);
      }
    }
    interface JobType {
      isWork: boolean;
      name: string;
      startWrok(): boolean;
    }
    class Worker implements JobType {
      isWork: boolean;
      name: string;
      constructor(isWork: boolean) {
        this.isWork = isWork;
        console.log(isWork);
        this.name = '123';
      }
      startWrok(): boolean {
        return true;
      }
    }
    // const xiaohai = extend(new Worker(true), new Person('小狗'));
    // console.log(xiaohai.startWrok());

    /**
     * 联合类型
     * 只能访问此联合类型的所有类型里共有的成员
     */
    // interface Brid {
    //   fly(): boolean;
    //   Jump(): boolean;
    // }

    // interface Fish {
    //   topaopao(): boolean;
    //   swim(): boolean;
    //   Jump(): boolean;
    // }
    // let data: Fish | Brid = {
    //   Jump(): boolean {
    //     return true;
    //   },
    // };
    // console.log(data.Jump());
    // function getSmallPet(): Fish | Brid {}
    // let pet = getSmallPet();
    // pet.Jump();
    return {};
  },
});
</script>

<style lang="scss">
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30vh;
  text-align: center;

  img {
    width: 400px;
    filter: invert(1) sepia(1) saturate(5) hue-rotate(175deg);
  }
}
</style>
