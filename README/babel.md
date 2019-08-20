一：理解 babel之配置文件.babelrc 基本配置项

1. 什么是babel? 它是干什么用的？

   ES6是2015年发布的下一代javascript语言标准，它引入了新的语法和API，使我们编写js代码更加得心应手，比如class，let,for...of promise等等这样的，但是可惜的是这些js新特性只被最新版本的浏览器支持，但是低版本浏览器并不支持，那么低版本浏览器下就需要一个转换工具，把es6代码转换成浏览器能识别的代码，babel就是这样的一个工具。可以理解为 babel是javascript语法的编译器。
2. Babel编译器
    在Babel执行编译的过程中，会从项目的根目录下的 .babelrc文件中读取配置。.babelrc是一个json格式的文件。
    在.babelrc配置文件中，主要是对预设(presets) 和 插件(plugins) 进行配置。.babelrc配置文件一般为如下：
    ```
    {
        "plugins": [
            [
                "transform-runtime",
                {
                    "polyfill": false
                }
            ]
        ],
        "presets": [
            [
                "env",
                {
                    "modules": false
                }
            ],
            "stage-2",
            "react"
        ]
        }
    ```
2.1 plugins
    该属性是告诉babel要使用那些插件，这些插件可以控制如何转换代码。

1. 理解 babel-polyfill 和 babel-runtime 及 babel-plugin-transform-runtime

    Babel默认只转换新的javascript语法，而不转换新的API，比如 Iterator, Generator, Set, Maps, Proxy, Reflect,Symbol,Promise 等全局对象。以及一些在全局对象上的方法(比如 Object.assign)都不会转码。
    比如说，ES6在Array对象上新增了Array.form方法，Babel就不会转码这个方法，如果想让这个方法运行，必须使用 babel-polyfill来转换等。
    因此：babel-polyfill和babel-runtime就是为了解决新的API与这种全局对象或全局对象方法不足的问题，因此可以使用这两个插件可以转换的。

    babel-polyfill 的原理是当运行环境中并没有实现的一些方法，babel-polyfill会做兼容。
    babel-runtime 它是将es6编译成es5去执行。我们使用es6的语法来编写，最终会通过babel-runtime编译成es5.也就是说，不管浏览器是否支持ES6，只要是ES6的语法，它都会进行转码成ES5.所以就有很多冗余的代码。

    babel-polyfill 它是通过向全局对象和内置对象的prototype上添加方法来实现的。比如运行环境中不支持Array.prototype.find 方法，引入polyfill, 我们就可以使用es6方法来编写了，但是缺点就是会造成全局空间污染。

    babel-runtime: 它不会污染全局对象和内置对象的原型，比如说我们需要Promise，我们只需要import Promise from 'babel-runtime/core-js/promise'即可，这样不仅避免污染全局对象，而且可以减少不必要的代码。

    虽然 babel-runtime 可以解决 babel-polyfill中的避免污染全局对象，但是它自己也有缺点的，比如上，如果我现在有100个文件甚至更多的话，难道我们需要一个个文件加import Promise from 'babel-runtime/core-js/promise' 吗？那这样肯定是不行的，因此这个时候出来一个 叫 babel-plugin-transform-runtime，
    它就可以帮助我们去避免手动引入 import的痛苦，并且它还做了公用方法的抽离。比如说我们有100个模块都使用promise，但是promise的polyfill仅仅存在1份。
    这就是 babel-plugin-transform-runtime 插件的作用。
2. 理解 babel-plugin-transform-runtime 的配置一些选项
    ```
    {
        'plugins': [
            [
                'transform-runtime', 
                {
                    'helpers': false,
                    'polyfill': false,
                    'regenerator': true,
                    'moduleName': 'babel-runtime'
                }
            ]
        ]
    }
    ```
    helpers: 默认值为true，表示是否开启内联的babel helpers(即babel或者环境本来存在的某些对象方法函数)如：extends，etc这样的
            在调用模块名字时将被替换名字。
    polyfill：默认值为true，表示是否把内置的东西(Promise, Set, Map)等转换成非全局污染的。
    regenerator：默认值为true，是否开启generator函数转换成使用regenerator runtime来避免污染全局域。
    moduleName：默认值为 babel-runtime，当调用辅助 设置模块（module）名字/路径.
3. presets
    presets属性告诉Babel要转换的源码使用了哪些新的语法特性，presets是一组Plugins的集合。
    *. 理解 babel-preset-env
        babel-preset-es2015: 可以将es6的代码编译成es5.
        babel-preset-es2016: 可以将es7的代码编译为es6.
        babel-preset-es2017: 可以将es8的代码编译为es7.
        babel-preset-latest: 支持现有所有ECMAScript版本的新特性。
    1. targets: {[string]: number | string }, 默认为{};
        含义是支持一个运行环境的对象，比如支持node版本；可以如下配置： node: '6.0';
        运行环境: chrome, opera, edge, firefox, safari, ie, ios, android, node, electron

    2. targets.browsers <Array | string>
        支持浏览器的配置项，该配置项使用方式可以到 browserslist来查询（https://github.com/browserslist/browserslist）
        比如上面的 支持每个浏览器最后两个版本和safari大于等于7版本。如上配置。

    3. modules 
        该参数的含义是：启用将ES6模块语法转换为另一种模块类型。将该设置为false就不会转换模块。默认为 'commonjs'.
        该值可以有如下：
        'amd' | 'umd' | 'systemjs' | 'commonjs' | false
    4. loose, 该参数值默认为false。
        含义是：允许它们为这个 preset 的任何插件启用”loose” 转换。

    5. include: 包含一些插件，默认为 [];
    6. exclude； 排除哪些插件，默认为 [];

    *2 理解 babel-presets-stage-x
        babel-preset-stage-0

        babel-preset-stage-1

        babel-preset-stage-2

        babel-preset-stage-3
    以上每种预设都依赖于紧随的后期阶段预设，数字越小，阶段越靠后，存在依赖关系。也就是说stage-0是包括stage-1的，以此类推。因此 stage-0包含stage-1/2/3的内容。所以如果我们不知道需要哪个stage-x的话，直接引入stage-0就好了。


## 插件
#1.babel-plugin-module-resolver 
是一个Babel模块解析插件, 在.babelrc中可以配置模块的导入搜索路径. 为模块添加一个新的解析器。这个插件允许你添加新的“根”目录，这些目录包含你的模块。它还允许您设置一个自定义别名目录，具体的文件，甚至其他NPM模块。