declare module '*.vue' {
  import { defineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
