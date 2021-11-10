<template>
  <div class="app-container">
    <BasicTable />
    <SlotTable />
    <RenderTable />
    <ComponentTable />
    <TreeTable />
    <OperatorTable />
    <ForcedTable />
    <PaginationTable />
  </div>
</template>

<script lang="tsx">
import { defineComponent } from 'vue';

import BasicTable from '@/components/free-table/demo/BasicTable.vue';
import ComponentTable from '@/components/free-table/demo/ComponentTable.vue';
import ForcedTable from '@/components/free-table/demo/ForcedTable.vue';
import OperatorTable from '@/components/free-table/demo/OperatorTable.vue';
import PaginationTable from '@/components/free-table/demo/PaginationTable.vue';
import RenderTable from '@/components/free-table/demo/RenderTable.vue';
import SlotTable from '@/components/free-table/demo/SlotTable.vue';
import TreeTable from '@/components/free-table/demo/TreeTable.vue';

export default defineComponent({
  components: {
    BasicTable,
    SlotTable,
    RenderTable,
    ComponentTable,
    TreeTable,
    OperatorTable,
    ForcedTable,
    PaginationTable,
  },

  setup() {
    return {};
  },
});
</script>
