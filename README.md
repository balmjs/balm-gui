<p align="center"><img src="https://github.com/balmjs/balm-gui/blob/master/balm.png"></p>

# Balm-Gui
<ul>
  <li>这是一个界面相当简陋的electron桌面程序</li>
  <li>集成了<a href="https://github.com/balmjs/balm" target="_blank">balmjs</a>、<a href="https://github.com/balmjs/balm-cli" target="_blank">balm-cli</a>（主要功能）、<a href="https://yarnpkg.com" target="_blank">yarn</a></li>
  <li>这个工具不是什么终极解决方案，主要是为了帮助那些还不是太熟悉命令行操作的人们来快速搭建现代化的前端工作环境。如果你已经习惯命令行操作，可以忽略它</li>
</ul>

# 环境要求

<ul>
  <li>Node.js >= 4.0.0</li>
</ul>

# 支持的操作系统
<ul>
  <li>Windows：>= win7(x64, x32)</li>
  <li>Mac OS: true</li>
  <li>linux: 由于手边没有可用的linux测试机，暂时还不支持。你也可以clone这个仓库，然后命令行进入项目运行：<code>npm run prod</code> 进行打包</li>
</ul>


# 下载地址

<p style="font-size:24px;"><a href="http://sharlock.me/download/balm/">传送门</a></p>


# 已经实现的功能
<ul>
  <li>
    通过balm-cli的样板库快速搭建项目。目前支持的有：
    <ul>
      <li>simple</li>
      <li>vue</li>
      <li>vue-expert</li>
      <li>vue-master</li>
      <li>ng</li>
      <li>react</li>
      <li>react-expert</li>
      <li>electron</li>
    </ul>
  </li>
  <li>
    安装项目依赖
  </li>
  <li>
    运行一个开发服务器
  </li>
  <li>
    进行一些常见的前端构建任务
  </li>
</ul>

# 接下来要实现的功能

<ul>
  <li>使用程序为指定的项目维护（添加、删除）dependencies或者devDependencies，这是下个版本必定实现的功能。
    <br>
    目前还是请在项目内部使用命令行手动维护依赖</li>
  <li>项目构建配置全界面化。这将花费较长的时间，可能会在多个版本之后才能完成。
    <br>目前只能手动修改配置文件。这里有一个balmjs的配置文档传送门：<a href="https://github.com/balmjs/balm/blob/master/docs/configuration.md">Configuration</a></li>
  <li>丰富脚手架balm-cli的功能，优化细节。balm-cli在最初开发的时候就只是一个简单的辅助工具，另外我们在为其添加样板库的时候也并没有打算开发这么一个界面工具，所以可能需要把之前所有的样板库重构一遍。这同样也是上面开发配置可视化功能要耗费较长时间的原因</li>
  <li>另一些可能要用到的功能，比如：自定义命令之类。这些功能我们会等到内部讨论清楚之后再公布出来</li>
</ul>
