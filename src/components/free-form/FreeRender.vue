<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
  props: {
    scope: Object,
    render: Function,
  },

  render() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = getCurrentInstance() as any;
    return ctx?.props.render(ctx?.props.scope, ctx?.props) || null;
  },
});
</script>
