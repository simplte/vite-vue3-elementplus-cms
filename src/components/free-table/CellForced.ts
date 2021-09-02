import { h } from 'vue';
import ElCheckbox from 'element-plus/lib/el-checkbox';
import { AnyObject, Store, TableColumnCtx } from 'element-plus/lib/el-table/src/table.type';

// 这些选项不应该被覆盖
// eslint-disable-next-line @typescript-eslint/naming-convention
export const cellForced = {
  selection: {
    renderHeader({ store: store_ }) {
      const store = store_ as Store;
      function isDisabled() {
        return store.states.data.value && store.states.data.value.length === 0;
      }
      return h(ElCheckbox, {
        disabled: isDisabled(),
        indeterminate: store.states.selection.value.length > 0 && !store.states.isAllSelected.value,
        'onUpdate:modelValue': store.toggleAllSelection,
        modelValue: store.states.isAllSelected.value,
      });
    },
    renderCell({
      row,
      column,
      store,
      $index,
    }: {
      row: AnyObject;
      column: TableColumnCtx;
      store: Store;
      $index: string;
    }) {
      return h(ElCheckbox, {
        disabled: column.selectable ? !column.selectable.call(null, row, $index) : false,
        onInput: () => {
          store.commit('rowSelectedChanged', row);
        },
        onClick: (event: Event) => event.stopPropagation(),
        // 修复 TypeError: Cannot read property 'isSelected' of undefined
        modelValue: store?.isSelected(row),
      });
    },
    sortable: false,
    resizable: false,
  },
  index: {
    renderHeader({ column: column_ }) {
      const column = column_ as TableColumnCtx;
      return column.label || '#';
    },
    renderCell({ column, $index }: { column: TableColumnCtx; $index: string }) {
      let i = $index + 1;
      const { index } = column;

      if (typeof index === 'number') {
        i = $index + index;
      } else if (typeof index === 'function') {
        i = index($index);
      }
      return h('div', {}, [i]);
    },
    sortable: false,
  },
  expand: {
    renderHeader({ column: column_ }) {
      const column = column_ as TableColumnCtx;
      return column.label || '';
    },
    renderCell({ row: row_, store: store_ }) {
      const store = store_ as Store;
      const row = row_ as AnyObject;
      const classes = ['el-table__expand-icon'];
      if (store.states.expandRows.value.indexOf(row) > -1) {
        classes.push('el-table__expand-icon--expanded');
      }
      // eslint-disable-next-line @typescript-eslint/space-before-function-paren
      const callback = function (e) {
        e.stopPropagation();
        store.toggleRowExpansion(row);
      };
      return h(
        'div',
        {
          class: classes,
          onClick: callback,
        },
        [
          h('i', {
            class: 'el-icon el-icon-arrow-right',
          }),
        ]
      );
    },
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column',
  },
};

export default cellForced;
