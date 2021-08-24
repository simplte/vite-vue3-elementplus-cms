// 注册全局组件
import { App } from 'vue';
import ElIcon from '@/components/el-icon';
import FreeDialog from '@/components/free-dialog';
import FreeForm from '@/components/free-form';
import FreePagination from '@/components/free-pagination';
import FreeTable from '@/components/free-table';
import FreeIcon from '@/components/free-icon';
import FreeException from '@/components/free-exception';
export function setupComponents(app: App) {
  app.component(ElIcon.name, ElIcon);
  app.component(FreeIcon.name, FreeIcon);
  app.component(FreeForm.name, FreeForm);
  app.component(FreeDialog.name, FreeDialog);
  app.component(FreeTable.name, FreeTable);
  app.component(FreePagination.name, FreePagination);
  app.component(FreeException.name, FreeException);
}
