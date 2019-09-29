import Taro, { Component } from '@tarojs/taro'
import { View, Video } from '@tarojs/components'
import './index.scss'

type Props = {
  src: string
  title?: string
  content?: string
  cancelColor?: string
  confirmColor?: string
}
type State = {
  isPlay: boolean // 当前是否在播放中
  isFirst: boolean // 当非wife情况下，只有第一次会有弹框提示
}

class AppVideo extends Component<Props, State> {
  static defaultProps = {
    title: '提示',
    content: '当前为非WiFi环境，是否继续播放',
    cancelColor: '#585858',
    confirmColor: '#ff4f00'
  }
  state: State = {
    isPlay: false,
    isFirst: true
  }
  componentDidMount() {
    this.videoContext = Taro.createVideoContext('video', this)
    // 真机ios调试有问题，但是体验版就没事
    const _this = this
    wx.onNetworkStatusChange(res => {
      const { isPlay } = _this.state
      // console.log(res.networkType, isPlay)
      const networkType = res.networkType
      _this.setState({
        isFirst: true
      })
      if (isPlay && networkType !== 'wifi') {
        _this.videoTips()
        _this.videoContext.pause()
      }
    })
  }

  handlePlay = () => {
    const { isPlay, isFirst } = this.state
    const _this = this

    if (isPlay || !isFirst) return

    wx.getNetworkType({
      success: function(res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        const networkType = res.networkType
        if (networkType !== 'wifi') {
          _this.setState({
            // openModal: true,
            isPlay: false
          })
          _this.videoTips()
          _this.videoContext.pause()
        } else {
          _this.setState({
            isPlay: true,
            isFirst: false
          })
        }
      }
    })
  }
  handleQuit = () => {
    this.setState({
      // openModal: false,
      isPlay: false
    })
    this.videoContext.pause()
  }
  handleOk = () => {
    this.setState({
      // openModal: false,
      isPlay: true,
      isFirst: false
    })
    this.videoContext.play()
  }
  handlePause = () => {
    this.setState({
      isPlay: false
    })
  }

  // 网络环境提示
  videoTips = () => {
    const { title, content, cancelColor, confirmColor } = this.props
    Taro.showModal({
      title,
      content,
      cancelColor,
      confirmColor
    }).then(res => {
      if (res.confirm) {
        this.setState({
          isPlay: true,
          isFirst: false
        })
        this.videoContext.play()
      }
      if (res.cancel) {
        this.setState({
          isPlay: false
        })
        this.videoContext.pause()
      }
    })
  }

  componentWillUnmount() {
    this.videoContext.pause()
    this.setState({
      isPlay: false,
      isFirst: true
    })
  }
  render() {
    const { src } = this.props
    return (
      <View className="videoPage">
        <Video
          src={src}
          controls
          id="video"
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          className="videoPage-video"
          objectFit="cover"
        />
      </View>
    )
  }
}

export default AppVideo
