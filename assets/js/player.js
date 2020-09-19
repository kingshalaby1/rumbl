let Player = {
  player: null,

  init(domId, playerId, onReady) {
    window.onYouTubeIframeAPIReady = () => {
      this.onIframeReady(domId, playerId, onReady)
    }
    console.log('player ready!2')

    let youtubeScriptTag = document.createElement('script')
    youtubeScriptTag.src = '//www.youtube.com/iframe_api'
    document.head.appendChild(youtubeScriptTag)
    console.log('player ready!3')
  },

  onIframeReady(domId, playerId, onReady) {
    console.log('player ready!4')
    this.player = new YT.Player(domId, {
      height: '360',
      width: '240',
      videoId: playerId,
      events: {
        onReady: event => onReady(event),
        onStateChange: event => this.onPlayerStateChange(event),
      },
    })
  },

  onPlayerStateChange(event) {},
  getCurrentTime() {
    return Math.floor(this.player.getCurrentTime() * 1000)
  },
  seekTo(millsec) {
    return this.player.seekTo(millsec / 1000)
  },
}
export default Player
