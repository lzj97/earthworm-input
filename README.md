## 一个用于在 earthworm 网页的控制台中答题的油猴插件

首先要手动选择课程并开始游戏

插件会在 `window` 注入以下方法


### 1. `window.show()`
查看当前句子


### 2. `window.input(string)`
- `string` 句子答案

回答错误3次会在控制台输出正确的答案

回答正确后自动显示下一个句子



![image](assets/guide.gif)


### 3. `window.play()`
播放音频

### 4. `window.next()`
 开始下一章(仅当前章节结束时可用)

