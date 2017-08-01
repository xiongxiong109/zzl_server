<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <title>zzl_2.0</title>
  <link href="/v2/css/dtPage.396e500d8ef18a85c3d083a409ef481e.css" rel="stylesheet"></head>
  <body>
    <div id="app-box"></div>
    <script type="text/javascript">
    	window.GLOBAL = {
    		TOKEN: '{{$token}}'
    	}
    </script>
    <script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script>
      // wechat jssdk config
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "{{$weChatConf['appId']}}", // 必填，公众号的唯一标识
        timestamp: "{{$weChatConf['timestamp']}}", // 必填，生成签名的时间戳
        nonceStr: "{{$weChatConf['nonceStr']}}", // 必填，生成签名的随机串
        signature: "{{$weChatConf['signature']}}",// 必填，签名，见附录1
        jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    </script>
    <!-- built files will be auto injected -->
  <script type="text/javascript" src="/v2/js/manifest.86a86bedd443df9a565e.js"></script><script type="text/javascript" src="/v2/js/vendor.0457b4a87d93538b15ba.js"></script><script type="text/javascript" src="/v2/js/dtPage.d06ae776712aa4b3975f.js"></script></body>
</html>
