# Vue 3 + Typescript + Vite

使用 vue3 ts vite 创建一个后台管理系统 仅用于学习，不能用于生产 bug 很多

### todolist

- 支持 elemetplus done
- axios done
- sass done
- vue-router done
- vuex done
- mock done
- jest done
- eslint+prettier+stylelint done
- husky done
- ...

### 项目初始化笔记

#### ts

```
Pick 从某个接口中选择需要的属性，且会跟随原接口变化

interface Tinterface {
  name: string;
  age: number;
  sex: boolean;
}
<!--接口-->
interface TChild extends Pick<Tinterface, 'name' | 'age'> {}
let testData: TChild = {
  name: 'asdf',
  age: 123,
};
<!--类型-->
type ChildType = Pick<Tinterface, 'name' | 'age'>;
let testChild: ChildType = {
  name: 'asdf',
  age: 123,
};
```

```
Record 定义对象指定的key和value类型

type定义的 对象类型 key是string，value 是Tinterface和{scholl: string} 的联合数据 ，即value必须是包含Tinterface和{school: string}的对象
interface Tinterface {
  name: string;
  age: number;
  sex: boolean;
}

type ChildType = Record<string, Tinterface & { school: string }>;
let childData: ChildType = {
  name: {
    name: '123',
    age: 123,
    sex: true,
    school: '123',
  },
};
```

```
omit 剔除接口的某些属性
type User = {
    id: string;
    name: string;
    sex: boolean;
}
type Man = Omit<User, 'sex'>
等价于
type Man = {
    id: string;
    name: string;
}
```

```
Parameters 的作用是用于获得函数的参数类型组成的元组类型
```

#### angular 代码提交规范 遵守 git 提交约定

```
需要安装：

1：@commitlint/cli 校验提交说明是否符合规范

2：@commitlint/config-conventional 安装符合Angular风格的校验规则
需要在项目根路径下添加文件：
.commitlintrc.js

module.exports = {
  extends: ['@commitlint/config-conventional'],
};


3：cz-conventional-changelog Commitizen适配器
需要执行初始化命令生成符合angular的提交说明：
commitizen init cz-conventional-changelog --save --save-exact
命令做了三件事：
    1：在项目中安装cz-conventional-changelog 适配器依赖
    2：将适配器依赖保存到package.json的devDependencies字段信息
    3：需要在package.json中增加config配置

     "config": {
        "commitizen": {
          "path": "./node_modules/cz-conventional-changelog"
        }
      },

    完成上面操作就可以使用cz的命令git cz代替git commit

4：如果需要定制提交说明则需要cz-customizable
然后在根路径新增文件.cz-config.js
个人理解基本上不需要定制化
module.exports = {
  disableEmoji: false,
  list: ['test', 'feat', 'fix', 'chore', 'docs', 'refactor', 'style', 'ci', 'perf'],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'breaking', 'issues', 'lerna'],
  scopes: [],
  types: {
    chore: {
      description: 'Build process or auxiliary tool changes',
      emoji: '🤖',
      value: 'chore',
    },
    ci: {
      description: 'CI related changes',
      emoji: '🎡',
      value: 'ci',
    },
    docs: {
      description: 'Documentation only changes',
      emoji: '✏️',
      value: 'docs',
    },
    feat: {
      description: 'A new feature',
      emoji: '🎸',
      value: 'feat',
    },
    fix: {
      description: 'A bug fix',
      emoji: '🐛',
      value: 'fix',
    },
    perf: {
      description: 'A code change that improves performance',
      emoji: '⚡️',
      value: 'perf',
    },
    refactor: {
      description: 'A code change that neither fixes a bug or adds a feature',
      emoji: '💡',
      value: 'refactor',
    },
    release: {
      description: 'Create a release commit',
      emoji: '🏹',
      value: 'release',
    },
    style: {
      description: 'Markup, white-space, formatting, missing semi-colons...',
      emoji: '💄',
      value: 'style',
    },
    test: {
      description: 'Adding missing tests',
      emoji: '💍',
      value: 'test',
    },
  },
};

个人项目中完成配置安装的依赖包：
    "@commitlint/cli": "^12.1.4",
    "@commitlint/config-conventional": "^12.1.4"
  "cz-conventional-changelog": "^3.3.0",
    "cz-customizable": "^6.3.0", 我觉得这个装了没有用 不需要定制提交信息，删了一样提交

全局安装的插件有：
conventional-changelog-cli
commitizen
git-cz

完成以上配置即可git cz 提交代码

```

#### husky 配置

```
1：安装husky npm install -D husky
2：在package.json中添加prepare脚本
"scripts": {
    "prepare": "husky install"
  }
prepare脚本会在npm install（不带参数）之后自动执行
该命令会创建.husky/目录并指定该目录为git hooks所在的目录。
3：git hooks 添加git hook 需要执行以下命令

npx husky add .husky/pre-commit "npm run test"
执行完会创建pre-commit的shell脚本
就是说执行完 git cz 操作之后会执行这个sh脚本

脚本的功能就是执行npm run test这个命令
npm run test的命令是可以修改的

4：在项目中我们会使用commit-msg这个git hook来校验我们commit时添加的备注信息是否符合规范
需要执行以下命令创建commit-msg sh脚本

npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

5: 安装 lint-staged
以保证提交的代码没有语法错误，不会影响项目其他文件的内容

在 husky文件夹下的_文件夹中添加.lintstagedrc.js 文件 约定哪些文件会被检查
文件内容：

module.exports = {
  'src/**/*.{js,jsx,vue,ts,tsx}': ['eslint --fix', 'git add'],
  'src/**/*.{html,vue,css,sass,scss}': ['stylelint --fix', 'git add'],
};

6：创建common.sh保证window下提交没有问题
内容如下：
command_exists () {
  command -v "$1" >/dev/null 2>&1
}

# Workaround for Windows 10, Git Bash and Yarn
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi

7：在pre-commit 脚本中增加
. "$(dirname "$0")/common.sh"

8：修改pre-commit 脚本中执行的命令
npm run lint-staged
9：package.json中增加命令
"lint-staged": "lint-staged -c ./.husky/.lintstagedrc.js",

10：安装 lint-staged

项目中安装相关的插件：
"husky": "^7.0.1",
"lint-staged": "^11.0.1",
```

### stylelint 样式格式化与校验

- 需要安装的插件

```
"stylelint": "^13.13.1",

禁用所有与格式相关的 `Stylelint` 规则，解决 `prettier` 与 `stylelint` 规则冲突，确保将其放在 `extends` 队列最后，这样它将覆盖其他配置。
"stylelint-config-prettier": "^8.0.2",

官网提供的 css 标准
"stylelint-config-standard": "^22.0.0",

属性排列顺序
"stylelint-order": "^4.1.0",
"stylelint-config-recess-order": "^2.4.0",

基于 `prettier` 代码风格的 `Stylelint` 规则
"stylelint-prettier": "^1.2.0",
```

- 配置文件 `.stylelintrc.js`

```
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order', // CSS property order https://markdotto.com/2011/11/29/css-property-order/
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['after-single-line-comment', 'first-nested'],
      },
    ],
    'no-invalid-double-slash-comments': null,
    'number-leading-zero': null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'declaration-empty-line-before': null,
    'color-no-invalid-hex': true,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['mixin', 'extend', 'content', 'include', 'for', 'function', 'return'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [],
        ignoreSelectors: [':export', /^:import/],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'import', 'local', 'deep', 'mixin'],
      },
    ],
    indentation: 2,
    'no-descending-specificity': null,
    'declaration-colon-newline-after': null,
  },
};

```

`.stylelintignore`

```
**/*.min.css
**/dist/
**/public/
**/node_modules/
```

- `package.json`中创建全局样式格式化命令

```
"lint:stylelint": "stylelint --cache --fix \"**/*.{vue,less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
```

- 配合`husky `预提交之前检查样式格式

```
在husky文件夹_文件夹下.lintstagedrc.js脚本中新增
'src/**/*.{html,vue,css,sass,scss}': ['stylelint --fix', 'git add'],
```

- `vscode`下载插件`stylelint` `sass`
- `vscode settings.json` 增加配置

```
"css.validate": false,
"less.validate": false,
"scss.validate": false,
"editor.codeActionsOnSave": {
   "source.fixAll.stylelint": true, // 自动stylelint
   "source.fixAll.eslint": true // 自动eslint 因为我配置的还有eslint自动化格式工具
},
"files.autoSaveDelay": 500
```

**至此自动格式化样式与格式预提交格式检查就 ok 了**

### vue3 中配置`jest`单元测试

- 安装对应版本的依赖

```
"@types/jest": "^27.0.1",
"@vue/test-utils": "^2.0.0-rc.9",
"babel-jest": "^27.1.0",
"eslint-plugin-jest": "^24.4.0",
"jest": "^27.1.0",
"ts-jest": "^27.0.5",
"vue-jest": "^5.0.0-alpha.10",
```

```
装依赖时  @vue/test-utils 装的版本不是最新的版本一直包vue-complier 编译器的错误
Cannot find module 'vue-template-compiler' from 'node_modules/_@vue_test-utils@1.2.2@@vue/test-utils/dist/vue-test-utils.js'
```

- 装完依赖后需要执行`ts-jest`命令生成 `jest.config.js` 文件

```
npx ts-jest config:init

在jset.config.js中配置对应的测试环境


```

- 相关文档

```
https://zhuanlan.zhihu.com/p/282835230
```

- 创建单元测试方法

```
describe  功能描述
expect 运行结果
toBe   期望结果  也叫断言

describe('对象测试', () => {

    it("是否同一个对象", () => {
        const foo = { a: 1 }
        expect(foo).toBe(foo)
    })

    it("对象值是否相等", () => {
        expect({ a: 1, foo: { b: 2 } }).toEqual({ a: 1, foo: { b: 2 } })
    })

    test('对象赋值', () => {
        const data = { one: 1 };
        data['two'] = 2;
        expect(data).toEqual({ one: 1, two: 2 });
    });

});

异步测试 通过设置done形参
it('异步测试', (done) => {
    function bar() {
        console.log('bar..')
        done();
    }
    foo(bar);
});

```

- 异步测试

```
describe('异步测试', () => {
    jest.useFakeTimers();
    function foo(callback) {
        console.log('foo...')
        setTimeout(()=> {
            callback && callback()
        },1000)
    }
    it('断言异步测试', () => {
    //创建mock函数，用于断言函数被执行或是执行次数的判断
        const callback =jest.fn();
        foo(callback);
        except(callback).not.toBeCalled();
        //快进，使所有定时器回调
        jest.runAllTimers();
        expect(callback).toBelCalled();

    })
})

```

- dom 渲染测试

```
describe('Dom测试', () => {
    it('测试按钮是否被渲染 ', () => {
        document.body.innerHTML = `
    <div>
        <button id='btn'>小按钮</button>
    </div> `
        console.log(document.getElementById('btn'), document.getElementById('btn').toString())
        expect(document.getElementById('btn')).not.toBeNull();
        expect(document.getElementById('btn').toString()).toBe("[object HTMLButtonElement]");
    });

    it('测试点击事件', () => {
        const onclick = jest.fn();
        document.body.innerHTML = `
        <div>
            <button id='btn'>小按钮</button>
        </div> `
        const btn = document.getElementById('btn');
        // 确保事件没有被调用
        expect(onclick).not.toBeCalled();
        btn.onclick = onclick;
        btn.click();
        // 确保时间被调用了
        expect(onclick).toBeCalled();
        <!-- 确保事件被调用的次数是否是（）中的值 -->
        expect(onclick).toHaveBeenCalledTimes(1);
        btn.click();
        btn.click();
        expect(onclick).toHaveBeenCalledTimes(3);
    });
});
```

- vue 测试

```
1：mount shallowMount 的区别
mount 挂载所有子组件
shallowMount 挂载当前组件
```

1. vue 组件渲染测试

```
it("挂载btn测试",()=> {
    const wraper = shallowMount(CountBtn);
    const btn = wraper.find("btn");
    expect(wraper.html()).toBe(`<button>点击次数0</button>`)
})
```

2. 点击事件测试

```
it('优雅的测试点击事件', async () => {
    const wraper = shallowMount(CountBtn);
    const btn = wraper.find("button");
    expect(wraper.html()).toBe(`<button>点击次数0</button>`);
    btn.trigger('click');
    await wraper.vm.$nextTick();
    expect(wraper.html()).toBe(`<button>点击次数1</button>`);
});
```

3. axios 异步请求测试

```
<!-- User.vue -->
<template>
<table>
    <tr v-for="item in list" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.age}}</td>
    </tr>
</table>
</template>

<script>
export default {
    data() {
        return {
            list: []
        }
    },
    created() {
        this.$http.get('/user').then(({
            data
        }) => {
            this.list = data
        })
    }
}
</script>
// User.spec.js
import { mount } from '@vue/test-utils';
import User from '@/components/User';

it('测试用户组件', async() => {
    const wrapper = mount(User,{
        mocks:{
            $http:{
                get: url=>Promise.resolve({data:[{id:1,name:'xxxx',age:18},{id:2,name:'yyyy',age:19}]})
            }
        }
    })
    console.log(wrapper.html())
    // 渲染前
    expect(wrapper.html()).toBe('<table></table>');
    await wrapper.vm.$nextTick();
    // 渲染后
    // console.log(wrapper.html())
    // console.log(wrapper.find('tr'))
    expect(wrapper.findAll('tr').length).toBe(2)
    expect(wrapper.findAll('td').at(2).html()).toBe('<td>18</td>')

});

```

---

- 常见的命令：

```
 "nocache": "jest --no-cache", //清除缓存
  "watch": "jest --watchAll", //实时监听
  "coverage": "jest --coverage",  //生成覆盖测试文档
  "verbose": "npx jest --verbose" //显示测试描述
```

#### mock 插件集成

- 安装的插件

```
<!--生产依赖-->
"mockjs": "^1.1.0",
"lodash-es": "^4.17.21",
<!--开发依赖-->
"vite-plugin-mock": "^2.9.4",
"@types/lodash-es": "^4.17.4",
"babel-plugin-lodash": "^3.3.4"
```

- 根路径创建`mock`文件夹

```
1:创建测试文件模块文件夹
ex:
mock->user
import { MockMethod } from 'vite-plugin-mock';
export default [
  // mock userInfo
  {
    url: '/api/v1/userInfo',
    timeout: 200,
    method: 'get',
    response: ({ body }) => {
      console.log('body', body);
      return {
        code: 0,
        message: 'OK',
        data: {
          userName: 'admin',
          headThumb: 'https://lupic.cdn.bcebos.com/20200412/3024701264_14_747_533.jpg',
        },
      };
    },
  },
] as MockMethod[];

------------------
mock -> _createMockServer.ts

import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

const modules = import.meta.globEager('./**/*.ts');

const mockModules: any[] = [];
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return;
  }
  mockModules.push(...modules[key].default);
});

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules);
}

```

- vite 配置

```
import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(isBuild: boolean) {
<!--创建mock服务器配置-->
  return viteMockServe({
    // eslint-disable-next-line no-useless-escape
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    <!--injectCode代码注入的文件-->
    injectCode: `
       import { setupProdMockServer } from '../mock/_createProductionServer';

       setupProdMockServer();
       `,
  });
}

```

- vite 插件挂载 `vite.config.js`

```
plugins: createVitePlugins(viteEnv, isBuild),
```

### `eslint` `prettier`格式化`ts`及`vue`代码

1. 插件安装

```
1：必装插件
"prettier": "^2.3.2",
"eslint": "^7.32.0",
2：对ts语法检查支持
"@typescript-eslint/eslint-plugin": "^4.30.0",
"@typescript-eslint/parser": "^4.30.0",
3：eslint与prettier语法冲突时需要安装以下插件
"eslint-config-prettier": "^8.3.0",
4：eslint-plugin-prettier 插件会调用 prettier对你的代码风格进行检查，其原理是先使用 prettier对你的代码进行格式化，然后与格式化之前的代码进行对比，如果过出现了不一致，这个地方就会被 prettier进行标记。
"eslint-plugin-prettier": "^3.4.0",

5：支持vue文件eslint语法检查
"eslint-plugin-vue": "^7.17.0",
6：如果需要支持对jest的支持需要安装
"eslint-plugin-jest": "^24.4.0",

```

2. `.eslint.js`

```
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    <!--有些配置中使用 prettier/@typescript-eslint 作用使得@typescript-eslint中的样式规范失效，遵循prettier中的样式规范-->
    'prettier',
    <!--使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出-->
    'plugin:prettier/recommended',
  ],
  // 解析器
  // eslint-plugin-vue 里的大多数规则都需要 vue-eslint-parser 来解析 template 的AST， 然而 babel-eslint 和 vue-eslint-parser 在解析上有冲突，解决办法是把 "parser": "babel-eslint", 移入到 parserOptions 内。
  // 本项目需要对ts支持，所以需要@typescript-eslint/parser 来负责ts的语法检查
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': ['warn', { props: false }],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};

```

3. `.prettire.config.js`

```
module.exports = {
  // ES5中有效的结尾逗号（对象，数组等）
  trailingComma: 'es5',
  // 不使用缩进符，而使用空格
  useTabs: false,
  // tab 用两个空格代替
  tabWidth: 2,
  // 添加分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 一行最多 100 字符
  printWidth: 100,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 换行符使用 lf
  endOfLine: 'lf',
  /* 优化html闭合标签不换行的问题 */
  htmlWhitespaceSensitivity: 'ignore',
};

```

### 搭建项目时 项目中的一些问题解决方案

1.通过路径别名引入组件时会报错

```

Cannot find module ‘‘store/index’ or its corresponding type declarations.Vetur(2307)

解决办法：
1:在tsconfig.json中配置
'baserUrl': './',
 "paths": {
      "@/*": [
        "src/*"
      ]
    },
2:vite.config.js中增加
alias:{
  '@': resolve(__dirname, 'src'),
};
3: 使用vscode单独打开项目
因为vetur只会在当前项目根据路径下去寻找tsconfog.json的配置


```

2. 切换边栏路径时

```
控制台会报
props attributes (class) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.
找了下解决方案
将BasicLayout.vue中 view-router的app-container样式去掉
```

3. 解决编译时 sass 报错的问题

```
因为Dart sass 新版本目弃用“/”的用法，sass自定义element theme时会报warnning

解决方式：
1：npm install -g sass-migrator
2：进入项目node_modules文件
执行sass-migrator division **/*.scss

我参照上面这个方式执行上述命令时没有任何响应

然后尝试更新了sass的版本 然后报错解决，最后确定解决办法时更新sass版本
这是找的类似问题的方案：
change "sass": "^1.33.0", to "sass": "1.32.13", in package.json.
delete package-lock.json
delete node_modules folder

我更新了一下sass版本然后就好了
cnpm i -D sass@1.32.12

最终解决办法：
cnpm i 之后
启动还是会有一样的报错
然后又执行了
cnpm i -D sass@1.32.12
问题解决
```
