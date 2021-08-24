<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
  props: {
    scope: {
      type: Object,
      default: () => ({}),
    },
    render: Function,
  },

  render() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = getCurrentInstance() as any;
    if (Object.keys(ctx.props?.scope).length) {
      return ctx?.props.render(ctx?.props.scope, ctx?.props) || null;
    }
    return null;
  },
});
</script>
