// 一、初始数据类型
let my_name: string = 'aaa'
console.log(my_name)

let my_num: Number = 100
console.log(my_num)

let flag: Boolean = true
console.log(flag)

let und: undefined = undefined
console.log(und)

let my_nul: null = null
console.log(my_nul)

let my_any: any = "aaa" + 100
console.log(my_any)

// void
function getName(str: string): void {
    console.log('this is name received: ' + str)
}

getName('gnl')

let obj: any
obj = 123
obj = 'aaa'
obj = function () {}
obj = []
obj = {}

// 二、字面量，定义什么值就只能赋什么值

let dog: 'dog'

// error: '"cat"' is not assignable to type '"dog"'.
// dog = 'cat'
dog = 'dog'

let animal: 'cat'|'dog'
animal = 'cat'
animal = 'dog'

// 三、复杂数据类型

// 1、array 设置数组的类型 比如这个例子 true 这个就会报错，不属于number，数组的元素必须是规定好的类型 其他类型同理
// let arr_a: number[] = [1, 2, 3, true, 4]
let arr: number[] = [1, 2, 3,  , 4]
console.log(arr)

// 2、元组 tuple
let tuple_a: [string, boolean, number] = ['aaa', false, 100]
console.log(tuple_a)

// 3、接口 interface 它能很方便的帮我们定义 Object 类型，它是非常的灵活可以描述对象的各种类型。与 java 的 interface 有些区别

interface Device {
    // readonly 不可改变的，定义完后就不能修改，是不是和 const 有点像，不过 const 是针对变量， readonly 是针对属性
    readonly id?: number
    brand: string
    type: string
    // 在 interface 属性中添加 ？可以省略
    price?: number
}

let MiPhone: Device = {
    id: 1111,
    brand: 'xiaomi',
    type: 'mi-phone',
    price: 1999.0
}

let HWPhone: Device = {
    brand: 'huawei',
    type: 'hw-phone',
}

console.log(MiPhone)
MiPhone.type = 'mix'
console.log(MiPhone)
console.log(HWPhone)

// 4、函数 function
// 要规定函数的 输入类型 和 返回类型
// 在形参后面接冒号声明 形参的类型，在 ()后面冒号声明 返回值类型
// 也可以为函数添加可选参数 这里用 ? 即可，这样我们就可以调用两个参数或者三个参数不报错
function myFun1 (a: number, b: number, c?: number): number {
    return a + b
}

// 注意：可选参数之后不能再加规定类型的形参 error: A required parameter cannot follow an optional parameter.
// function myFun2 (a: number, b: number, c?: number, d: number): void {}
// 可以把它添加个 ？变为可选参数
function myFun3 (a: number, b: number, c?: number, d?: number): void {}

console.log(myFun1(1, 2))

// 除了上面这种声明式写法还有一种表达式写法
const res = (a: number, b: number): number => {
    return a - b
}

interface ISum {
    (a: number, b: number): number
}

let mysum: ISum = res

console.log(mysum)

// 5、联合类型 union types
// 对于一个变量的类型可能是几种类型的时候我们可以使用 any ，但是 any 的范围有点大，不到万不得已不使用
// 如果知道是其中的哪几种类型的话，我们就可以使用 联合类型 用 | 分隔

let union_var: string | number | boolean

// 注意：在没有赋值之前，只能访问共同的方法、属性，比如下面的例子，number 没有length 属性
// union_var.valueOf()

union_var = false
console.log(union_var)

union_var = 'union_var_str'
console.log(union_var, union_var.length)

union_var = 100
console.log(union_var)

// 6、对象 object
// 直接 let a: object; 没有什么意义，因为 js 中对象太多
let my_obj: {
    id: number,
    name: string,
    isEnable: boolean
}

my_obj = {
    id: 1,
    name: "zhangsan",
    isEnable: true
}

console.log(my_obj)


// 四、断言 type inference
// 在上面联合类型的变量传入的时候，我们声明了这个类型为 number | string 它不能不能调用 length 方法
// 机器没法判断这个类型，但是我们比机器更了解这个类型，可以人为指定类型 string 这里我们就可以用到 类型断言
function getLen(param: number | string) : number {
    // 1、用 as 来进行断言
    // const str = param as string
    // 2、用 范型 来进行断言
    const str = <string> param
    if (str.length) {
        return str.length
    }
    return str.toString().length
}

console.log(getLen(123))


// 五、类型守卫 type guard
// typeof、instanceof、 in
// 遇到联合类型的时候，使用 类型守卫可以 缩小范围
function getLenGuard(param: number | string) : number {
    if (typeof param === 'string') {
        return param.length
    }
    return param.toString().length
}

console.log(getLen(122222))

// 六、类 class
// 在 ES6 中就有 类的概念了，在 TS 中对类添加一些功能
class Person {
    private name: string
    static money: number = 100
    static readonly slogan: string = 'new bee'

    constructor(name?: string) {
        this.name = name
    }

    eat() {
        console.log(`${this.name} 在吃饭`)
    }

    setName(name: string) {
        this.name = name
    }
}

const zs = new Person("张三")
zs.eat()
zs.setName('lisi')
zs.eat()

// 1、3个访问修饰符，和 Java 一样
// Public: 修饰的属性或方法是共有的 在 任何地方 都能访问
// Protected: 修饰的属性或方法是受保护的 在 本类 和 子类中 能够访问
// Private: 修饰的属性或方法是私有的 只有 本类 中访问

// 2、静态属性 static
// 使用 static 修饰的属性是通过 类 去访问，是每个实例共有的
// 同样 static 可以修饰 方法，用 static 修饰的方法称为 类方法，可以使用类直接调用
Person.money = 99
console.log(Person.money)

// 3、只读 readonly
// 给属性添加上 readonly 就能保证该属性只读，不能修改，如果存在 static 修饰符，写在其后
// error: Cannot assign to 'slogan' because it is a read-only property.
// Person.slogan = 'old bee'
console.log(Person.slogan)

// 4、抽象类 abstract
// TS 新增的抽象类 写一个类的时候，不希望直接使用该类创建实例**（不能被 new ）**那么我们把它设置为抽象类，让它不能被实例化 只能被继承


// 在 class 前面 添加 abstract 修饰符
abstract class Animal {
    protected name: string

    constructor(name: string) {
        this.name = name
    }

    // 在抽象类中 可以写 抽象方法 ，抽象类没有方法体
    abstract say(): string

    abstract eat(): void

}

class Cat extends Animal {
    eat(): void {
        console.log(`${this.name} eating...fish`)
    }

    say(): string {
        return "miao miao miao";
    }
}

const m_cat = new Cat('lmao')
m_cat.eat()
console.log(m_cat.say())




// 七、接口 interface
// 为了解决 继承 的困境(不能实现多继承)
// 接口可以多实现
// 接口之间可以多继承

interface IAnimal {
    eat(): void
}

interface IBeing {
    run(): void
}

interface People extends IAnimal, IBeing{

    say(): void

    sleep(): void
}

class Men implements People {
    run(): void {
    }

    sleep(): void {
    }

    eat(): void {
    }

    say(): void {
    }
}

// 八、枚举

// 1、数字枚举
// 默认值从 0 开始
enum Week {
    // 自定义默认值 Mon = a 后，后续的枚举依次加 a
    Mon = 1,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat,
    Sun
}

console.log(Week.Mon)
console.log(Week.Tue)

// 也可以通过下标获取
// concat() 在Week[4] 的值后面拼接'a','b', 'c' ==》 Thuabc
console.log(Week[4].concat('a','b', 'c'))

// 2、字符串枚举

// 3、常量枚举

// 九、范型

// 十、类型别名

// 十一、交叉类型