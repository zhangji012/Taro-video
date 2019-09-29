# 基于taro封装的小程序视频播放网络切换过程中提示

## 项目启动
    yarn
    yarn dev:weapp

## API

``` javascript

  <AppVideo
    src="https://file-ve.veimg.cn/veryeast/user_data/2019/09/201909291551070m5esvax65rju.mp4"
  />
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `src` | 视频播放地址(必填) | `string` |
| `title` | 网络切换弹框提示头部(选填) | `string` | `提示` |
| `content` | 网络切换弹框提示内容(选填) | `string` | `当前为非WiFi环境，是否继续播放` |
| `cancelColor` | 网络切换弹框删除按钮颜色(选填) | `string` | `#585858` |
| `confirmColor` | 网络切换弹框提示确认按钮颜色(选填) | `string` | `#ff4f00` |



