var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 一、初始数据类型
var my_name = 'aaa';
console.log(my_name);
var my_num = 100;
console.log(my_num);
var flag = true;
console.log(flag);
var und = undefined;
console.log(und);
var my_nul = null;
console.log(my_nul);
var my_any = "aaa" + 100;
console.log(my_any);
// void
function getName(str) {
    console.log('this is name received: ' + str);
}
getName('gnl');
var obj;
obj = 123;
obj = 'aaa';
obj = function () { };
obj = [];
obj = {};
// 二、字面量，定义什么值就只能赋什么值
var dog;
// error: '"cat"' is not assignable to type '"dog"'.
// dog = 'cat'
dog = 'dog';
var animal;
animal = 'cat';
animal = 'dog';
// 三、复杂数据类型
// 1、array 设置数组的类型 比如这个例子 true 这个就会报错，不属于number，数组的元素必须是规定好的类型 其他类型同理
// let arr_a: number[] = [1, 2, 3, true, 4]
var arr = [1, 2, 3, , 4];
console.log(arr);
// 2、元组 tuple
var tuple_a = ['aaa', false, 100];
console.log(tuple_a);
var MiPhone = {
    id: 1111,
    brand: 'xiaomi',
    type: 'mi-phone',
    price: 1999.0
};
var HWPhone = {
    brand: 'huawei',
    type: 'hw-phone'
};
console.log(MiPhone);
MiPhone.type = 'mix';
console.log(MiPhone);
console.log(HWPhone);
// 4、函数 function
// 要规定函数的 输入类型 和 返回类型
// 在形参后面接冒号声明 形参的类型，在 ()后面冒号声明 返回值类型
// 也可以为函数添加可选参数 这里用 ? 即可，这样我们就可以调用两个参数或者三个参数不报错
function myFun1(a, b, c) {
    return a + b;
}
// 注意：可选参数之后不能再加规定类型的形参 error: A required parameter cannot follow an optional parameter.
// function myFun2 (a: number, b: number, c?: number, d: number): void {}
// 可以把它添加个 ？变为可选参数
function myFun3(a, b, c, d) { }
console.log(myFun1(1, 2));
// 除了上面这种声明式写法还有一种表达式写法
var res = function (a, b) {
    return a - b;
};
var mysum = res;
console.log(mysum);
// 5、联合类型 union types
// 对于一个变量的类型可能是几种类型的时候我们可以使用 any ，但是 any 的范围有点大，不到万不得已不使用
// 如果知道是其中的哪几种类型的话，我们就可以使用 联合类型 用 | 分隔
var union_var;
// 注意：在没有赋值之前，只能访问共同的方法、属性，比如下面的例子，number 没有length 属性
// union_var.valueOf()
union_var = false;
console.log(union_var);
union_var = 'union_var_str';
console.log(union_var, union_var.length);
union_var = 100;
console.log(union_var);
// 6、对象 object
// 直接 let a: object; 没有什么意义，因为 js 中对象太多
var my_obj;
my_obj = {
    id: 1,
    name: "zhangsan",
    isEnable: true
};
console.log(my_obj);
// 四、断言 type inference
// 在上面联合类型的变量传入的时候，我们声明了这个类型为 number | string 它不能不能调用 length 方法
// 机器没法判断这个类型，但是我们比机器更了解这个类型，可以人为指定类型 string 这里我们就可以用到 类型断言
function getLen(param) {
    // 1、用 as 来进行断言
    // const str = param as string
    // 2、用 范型 来进行断言
    var str = param;
    if (str.length) {
        return str.length;
    }
    return str.toString().length;
}
console.log(getLen(123));
// 五、类型守卫 type guard
// typeof、instanceof、 in
// 遇到联合类型的时候，使用 类型守卫可以 缩小范围
function getLenGuard(param) {
    if (typeof param === 'string') {
        return param.length;
    }
    return param.toString().length;
}
console.log(getLen(122222));
// 六、类 class
// 在 ES6 中就有 类的概念了，在 TS 中对类添加一些功能
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.eat = function () {
        console.log(this.name + " \u5728\u5403\u996D");
    };
    Person.prototype.setName = function (name) {
        this.name = name;
    };
    Person.money = 100;
    Person.slogan = 'new bee';
    return Person;
}());
var zs = new Person("张三");
zs.eat();
zs.setName('lisi');
zs.eat();
// 1、3个访问修饰符，和 Java 一样
// Public: 修饰的属性或方法是共有的 在 任何地方 都能访问
// Protected: 修饰的属性或方法是受保护的 在 本类 和 子类中 能够访问
// Private: 修饰的属性或方法是私有的 只有 本类 中访问
// 2、静态属性 static
// 使用 static 修饰的属性是通过 类 去访问，是每个实例共有的
// 同样 static 可以修饰 方法，用 static 修饰的方法称为 类方法，可以使用类直接调用
Person.money = 99;
console.log(Person.money);
// 3、只读 readonly
// 给属性添加上 readonly 就能保证该属性只读，不能修改，如果存在 static 修饰符，写在其后
// error: Cannot assign to 'slogan' because it is a read-only property.
// Person.slogan = 'old bee'
console.log(Person.slogan);
// 4、抽象类 abstract
// TS 新增的抽象类 写一个类的时候，不希望直接使用该类创建实例**（不能被 new ）**那么我们把它设置为抽象类，让它不能被实例化 只能被继承
// 在 class 前面 添加 abstract 修饰符
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.eat = function () {
        console.log(this.name + " eating...fish");
    };
    Cat.prototype.say = function () {
        return "miao miao miao";
    };
    return Cat;
}(Animal));
var m_cat = new Cat('lmao');
m_cat.eat();
console.log(m_cat.say());
var Men = /** @class */ (function () {
    function Men() {
    }
    Men.prototype.run = function () {
    };
    Men.prototype.sleep = function () {
    };
    Men.prototype.eat = function () {
    };
    Men.prototype.say = function () {
    };
    return Men;
}());
// 八、枚举
// 1、数字枚举
// 默认值从 0 开始
var Week;
(function (Week) {
    // 自定义默认值 Mon = a 后，后续的枚举依次加 a
    Week[Week["Mon"] = 1] = "Mon";
    Week[Week["Tue"] = 2] = "Tue";
    Week[Week["Wed"] = 3] = "Wed";
    Week[Week["Thu"] = 4] = "Thu";
    Week[Week["Fri"] = 5] = "Fri";
    Week[Week["Sat"] = 6] = "Sat";
    Week[Week["Sun"] = 7] = "Sun";
})(Week || (Week = {}));
console.log(Week.Mon);
console.log(Week.Tue);
// 也可以通过下标获取
// concat() 在Week[4] 的值后面拼接'a','b', 'c' ==》 Thuabc
console.log(Week[4].concat('a', 'b', 'c'));
// 2、字符串枚举
// 3、常量枚举
// 九、范型
// 十、类型别名
// 十一、交叉类型
