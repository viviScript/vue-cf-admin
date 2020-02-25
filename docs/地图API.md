# 可视化地图API

> 集合了地图常用方法的使用与规范

## demo

>前端DEMO项目的地图示例页面

## 引入

```bash
<script type="text/javascript" src="http://192.168.0.96:8080/api-ksh/api?v=1.0&system=dg-ksh-home"></script>
```

>**! src的地址需要根据不同的环境进行更换**

## 地图API的具体使用

- 创建一个地图'

   ```bash
    // 创建一个 div 并设置好宽高和id
    <div id="map" style="width:530px;height:530px"></div>
   ```

   ```javascript
   var cMap = new CMap.Map("map") // 调用该方法并传入div的id
   ```

  - 获取地图当前显示层次和设置当前显示层级

  ```javascript
  cMap.getView().getZoom() // 获取当前显示层级
  cMap.getView().setZoom(14) // 设置当前显示层级 14为想要设置的层级
  cMap.setAnimateZoom(14) // 有动画效果
  ```

  - 获取地图中心点和设置地图中心点

  ```javascript
  cMap.getView().getCenter() // 获取当前地图中心点坐标
  cMap.setAnimateCenter([x, y]) // 设置地图中心点，有动画效果，将地图移动至当前中心点显示的位置，传入参数为一个包含xy坐标的数组
  ```

  - 设置地图基础工具（比例尺，缩放尺，图层切换控件）

  ```javascript
  // 比例尺
  var scaleLineContorl = CMap.Control.ScaleLineContorl()
  cMap.addControl(scaleLineContorl)
  // 缩放尺
  var zoomControl = new CMap.Control.ZoomControl()
  cMap.addControl(zoomControl)
  // 图层切换控件
  var mapLayerControl = new CMap.Control.MapLayerControl()
  cMap.addControl(mapLayerControl)
  ```

  - 页面宽高发生变化时，地图自适应大小（防止地图变成空白

  ```javascript
  cMap.getOlMap().updateSize()
  ```

  - 获取当前显示范围和设置当前显示范围

  ```javascript
  cMap.getViewExtent() // 获取当前显示范围
  cMap.setViewExtent(extent, 1000) // 设置当前显示范围 参数extent 为需要设置的范围 格式为 [minx, miny, maxx, maxy] 参数1000为动画效果
  ```

  - 在地图上新建一个点并设置图片等操作

  ```javascript
  let Point = new CMap.Geometry.Point([x, y]) // 新建一个点
  Point.setImage('/static/images/1.png') // 传入参数为图片的路径
  cMap.addGeometry(Point) // 添加点的几何图形到地图上
  Point.addClickEventListener(function (e) { // 给点绑定点击事件
    console.log(e)
  })
  // 在点的底部设置文字，在地图层级至16级时显示 (用于显示警员姓名，卡口名称等)
  Point.setText([16, 'policeName'], {
    textBaseline: 'top', // 文字底层显示
    offsetY: 28 // 文字相对y轴位置向下偏移10px
  })
  ```

  - 在地图上新建一个圆

  ```javascript
  let Circle = new CMap.Geometry.Circle(center, 300, '', Style)
  cMap.addGeometry(Circle)
  // center 为圆心坐标 [x, y]
  // 300 为半径
  // Style 为圆设置样式 格式如下
  var Style = new ol.style.Style({
     stroke: new ol.style.Stroke({
     color: '#ff9600',
     width: 2
    })
  })
  // *也可以如下所示画圆
  let point = new CMap.Geometry.Point([x, y]) // 先new一个点
  cMap.addGeometry(point) // 将点上图
  let style = new ol.style.Style({
    fill: new ol.style.Fill({color: 'rgba(153,153,153,.4)'})
  })
  var Circle = point.buffer(1000, style) // 1000 为圆的半径
  // 这里为设置圆可编辑 拖动缩放圆时会调用回调函数
  Circle.enable({callback: function (e) {
    console.log(e)
  }})
  ```

  - 在地图上新建一条线

  ```javascript
  let line = new CMap.Geometry.LineString([x, y])
  cMap.addGeometry(line)
  ```

  - 在地图上新建一条多边形

  ```javascript
  var polygon = new CMap.Geometry.Polygon(coordinate)
  cMap.addGeometry(polygon)
  // coordinate 为一个点的数组，画多边形时，需传入四个点的坐标
  ```

### 在画几何图形时，都可以为图形设置样式

  ```javascript
  new ol.style.Style({
    stroke: new ol.style.Stroke({ // 线
      color: 'black',
      width: 1
    }),
    fill: new ol.style.Fill({ // 填充色
      color: '#ff9600'
    })
  })
  ```

- 向点传入参数并获取参数

  ```javascript
  point.setData({a: 1})
  point.getData() // {a: 1}
  // 或者在点击point时获取数据
  point.addClickEventListener(point, function (e) {
    console.log(e.data.getData())
  })
  ```

  - 利用画笔在地图上画线

  ```javascript
  var draw
  var drawLineStringDraw
  function drawLineString () {
      draw = new CMap.Draw(cMap,{type:CMap.Draw.type.LINESTRING})
      draw.on(CMap.Draw.eventType.DRAWEND,function(e){
        drawLineStringDraw = CMap.Geometry.createLineStrin(e.feature,cMap)
        draw.removeDraw()
      })
    }
  drawLineStringDraw.enable() // 设置线可编辑(可拖动)
  drawLineStringDraw.disable() // 设置线不可编辑
  ```

  - 利用画笔在地图上画点

  ```javascript
    var draw
    var drawPointDraw
    function drawPoint () {
      // 初始化画笔
    draw = new CMap.Draw(cMap,{type:CMap.Draw.type.POINT})
      draw.on(CMap.Draw.eventType.DRAWEND,function(e){
          // 创建点对象
       drawPointDraw = CMap.Geometry.createPoint(e.feature,cMap)
          // 获取点的坐标
        var coordinates = e.feature.getGeometry().getCoordinates()
       draw.removeDraw() // 移除画笔
       })
    }
      drawPointDraw.enable() // 设置点可编辑(可拖动)
      drawPointDraw.disable() // 设置点不可编辑
      // 以点为圆心画圆
      var bufferCircle = drawPointDraw.buffer(100) // 半径为100
    //设置缓存圆，可编辑
    bufferCircle.enable()
  ```

  - 利用画笔在地图上画圆

  ```javascript
  var draw
  var drawCircleGeometry
  function drawCircle(){
      draw = new CMap.Draw(cMap,{type:CMap.Draw.type.CIRCLE})
      draw.on(CMap.Draw.eventType.DRAWEND,function(e){
          //创建CMap.Geometry.Circle圆对象
          drawCircleGeometry = CMap.Geometry.createCircle(e.feature,cMap)
          //创建圆中心点对象
          var centerPoint = drawCircleGeometry.createCenterPoint()
          //设置中心点动画波浪效果
          centerPoint.setAnimate(CMap.Geometry.Point.Animate.WAVE)
          //设置圆背景颜色
          drawCircleGeometry.setStyle(new ol.style.Style({fill:new ol.style.Fill({color: 'rgba(153,153,153,.6)'}) }))
            let geo = e.circle.getGeometry() // 获取要素的几何信息
            let coordinates = geo.getExtent() // 获取圆心坐标
      })
    }
    //设置圆可编辑
  drawCircleGeometry.enable({
        minRadius : 100, //当启用圆可编辑时，圆显示的最小半径
        callback : function(e){} , //回调函数，圆画（拖拽）完后触发
        delay : 500, //缓存区域延迟显示时间
        isFitView: true //视野自适应
   })
  ```

  - 利用画笔在地图上画多边形

  ```javascript
  var draw
  var drawPolygonDraw
  function drawLineString(){
      draw = new CMap.Draw(cMap,{type:CMap.Draw.type.CIRCLE,geometryFunction: ol.interaction.Draw.createBox()})
      draw.on(CMap.Draw.eventType.DRAWEND,function(e){
        drawPolygonDraw = CMap.Geometry.createPolygon(e.feature,cMap)
        draw.removeDraw()
      })
  }
  ```

  - 清除所画的点线圆对象

  ```javascript
  object.remove() // object 为点线圆的对象
  ```

  - 批量清除地图上的点线圆对象

  ```javascript
  // object 为点线圆的对象
  object.setType('obj')
  cMap.removeGeometrybyType('obj')
  ```

  - 给对象设置 id 为唯一标识符

  ```javascript
  Point.setId('123')
  // 通过id在地图上找到该对象
  cMap.getGeometryById('123') // return Point
  cMap.getFeatureById('123') // return Point
  // 在地图上清除该对象
  cMap.removeFeatureById('123')
  ```

  - Dialog的使用

  ```javascript
  // 首先定义dialog
  var dialog = new CMap.Dialog.TextDialog('123', {
        isShowCloseButton: true // 是否显示关闭按钮
  })
  dialog.setOffset([-78, -8]) // 控制dialog显示的位置
  // 点击point时打开dialog
  point.addClickEventListener(point, function (e) {
        // 单击事件回调函数中拼接html 字符串到地图对话框dialog中
        dialog.setContent(`<div>我是传入参数:2</div>`)
        dialog.setStyle('width:250px;height:auto') // 设置dialog样式
        // 设置dialog中心
        dialog.setPosition(point.getGeometry().getCoordinates())
        dialog.open(cMap) // 打开dialog
  })
  ```

  - 移动点的位置（使用场景：接收pdt的position信息时，改变pdt的在地图上的位置）

  ```javascript
  pdtPoint.setCoordinates([x, y])
  ```

  - 根据图层的缩放，动态改变图片的显示（分为小中大）

  ```javascript
  Point.setImage([
    // 图层在1-12时显示小图片 依次类推
    { minZoom: 1, maxZoom: 12, img: '/static/images/bx/small.png' },
    { minZoom: 13, maxZoom: 16, img: '/static/images/bx/middle.png' },
    { minZoom: 17, img: '/static/images/bx/large.png' }
  ])
  ```

- 坐标转换为标准84坐标

  ```javascript
    cMap.util.coordinateTransTo4326([x, y])
  ```

- 将字符串的坐标串，转换成二维数组

  ```javascript
  cMap.util.strTransfTo2dArray(string)
  ```

- 地图常用工具

  ```javascript
  CMap.Tool.MeasureLength(cMap) // 测距
  CMap.Tool.Label(cMap) // 标注
  CMap.Tool.MeasureArea(cMap) // 测面
  // 全屏
  cMap.requestFullScreen() // 全屏
  cMap.exitFullScreen() // 退出全屏
  // 清除地图工具测量或标注时留下的覆盖物
  cMap.removeGeometryByType(CMap.Tool.drawGeometry.TYPE)
  ```

- 移除所有feature对象

  ```javascript
  cMap.removeAllFeatures()
  ```

- 判断点是否在范围内

  ```javascript
  // 已知点的坐标为 [x, y] 范围为 [minX, minY, maxX, maxY]
    if (maxX > x && x > minX && maxY > y && y > minY) {
        console.log('点在范围内')
    } else {
        console.log('点不在范围内')
    }
  ```

- 聚点显示

  ```javascript
  // videoData 为数组 里面的每个对象都是单个的视频数据
  // 首先定义一个视频聚点图层
  var Layer = new CMap.ClusterPointLayer(cMap, 40, [
      { minZoom: 1, maxZoom: 12, img: '/static/images/img-x.png' },
      { minZoom: 13, maxZoom: 16, img: '/static/images/img-z.png' },
      { minZoom: 17, img: '/static/images/img-d.png' }
  ])
  // 定义dialog
  var dialog = new CMap.Dialog.TextDialog('123', {
      isShowCloseButton: true // 是否显示关闭按钮
  })
  dialog.setOffset([-78, -8]) // 控制dialog显示的位置
  // 循环视频数据 创建点的对象 并将对象添加至聚点图层
  for (var i in videoData) {
      let coordinate = [videoData[i].x, videoData[i].y]
      let point = new CMap.Geometry.Point(coordinate)
      point.setText(videoData[i].mc, {
          textBaseline: 'top',
          offsetY: 10
      })
      point.setData(videoData[i])
      point.setId(videoData[i].guid)
      point.addClickEventListener(function (e) {
          dialog.setContent("<div>视频点</div>")
          dialog.open(cMap)
      })
      Layer.addPoint(point)  // 将点添加至聚点图层
  }
  Layer.toMap() // 将聚点图层上图
  // 设置聚点点击事件
  Layer.addClickEventListener(function (e) {
      // e.caller.get('features') 可以获取当前聚点的所有数据
      // 如果聚点个数大于10 地图缩进
      if (e.caller.get('features').length > 10) {
          let zoom = cMap.getView().getZoom()
          cMap.setAnimateZoom(zoom + 1)
      } else {
          dialog.setContent("<div>聚点</div>")
          dialog.open(cMap)
      }
  })
  // 清除聚点
  cMap.getOlMap().removeLayer(Layer.vector)
  Layer = null
    ```

## 方法汇总

  方法名 | 说明 | 参数
------------ | ------------- | -------------
new CMap.Map() | 在页面新建一个地图 | String 容器id
cMap.getView().getZoom() | 获取当前显示层级 | -
cMap.getView().setZoom() | 设置当前显示层级 | Number
cMap.setAnimateZoom() | 设置当前显示层级有动画效果 | Number
cMap.getView().getCenter() | 获取当前地图中心点坐标 | -
cMap.setAnimateCenter() | 设置地图中心点,有动画效果 | Array 包含xy坐标的数组
cMap.addControl(CMap.Control.ScaleLineContorl()) | 比例尺工具 | -
cMap.addControl(new CMap.Control.ZoomControl()) | 缩放工具 | -
cMap.addControl(new CMap.Control.MapLayerControl()) | 图层切换工具
cMap.getOlMap().updateSize() | 地图自适应页面大小（防止地图变成空白）| -
cMap.getViewExtent() | 获取当前显示范围 | -
cMap.setViewExtent() | 设置当前显示范围 | Array,Number 范围数组和动画效果
new CMap.Geometry.Point() | 创建一个点的对象 | Array 包含xy坐标的数组
new CMap.Geometry.Circle() | 创建一个圆对象 | Array,Number,String,Object 圆心坐标,半径,'',样式
new CMap.Geometry.LineString() | 创建一个线对象 | Array
new CMap.Geometry.Polygon() | 创建一个多边形对象 | Array ！需传入两个以上坐标
new ol.style.Style() | 自定义样式 | Object
setImage() | 为点设置图片 | String 图片路径
cMap.addGeometry() | 将几何图形对象添加至地图 | Object
addClickEventListener() | 绑定点击事件 | Object,function
enable() | 几何图形可编辑 | -
disable() | 几何图形不可编辑 | -
setData() | 传入参数 | Object
getData() | 获取参数 | -
remove() | 清除feature | -
setType() | 为feature设置type 用于批量清除 | String
cMap.removeGeometrybyType() | 批量清除 | String
setId() | 为feature设置id为唯一标识符 | String
cMap.getGeometryById() | 通过id在地图上找到geometry | String
cMap.getFeatureById() | 通过id在地图上找到feature | String
cMap.removeFeatureById() | 通过id在地图上清除feature | String
new CMap.Dialog.TextDialog() | 定义dialog | String, Object(配置参数)
dialog.setOffset() | 控制dialog显示的位置 | Array
dialog.setContent() | 设置dialog的文本内容 | Srting html拼接文本
dialog.setStyle() | 设置dialog样式 | Srting
dialog.open() | 打开dialog | cMap
setCoordinates() | 移动点的位置 | Array
cMap.util.coordinateTransTo4326() | 坐标转换为标准84坐标 | Array
cMap.util.strTransfTo2dArray() | 将字符串的坐标串，转换成二维数组 | Srting
CMap.Tool.MeasureLength | 测距 | cMap
CMap.Tool.Label() | 标注 | cMap
CMap.Tool.MeasureArea() | 测面 | cMap
cMap.requestFullScreen() | 全屏
cMap.exitFullScreen() | 退出全屏
cMap.removeGeometryByType(CMap.Tool.drawGeometry.TYPE) | 清除地图工具测量或标注时留下的覆盖物 | -