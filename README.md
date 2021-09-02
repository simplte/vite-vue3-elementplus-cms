# Vue 3 + Typescript + Vite

使用 vue3 ts vite 创建一个后台管理系统 仅用于学习，不能用于生产 bug 很多

### todolist

- 支持 elemetplus done
- axios done
- sass done
- vue-router done
- vuex done
- mock
- jest
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
