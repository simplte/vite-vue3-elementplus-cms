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
