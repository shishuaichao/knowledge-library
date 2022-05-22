<template>
  <div>
    <!-- 纵向滚动盒子 t-head -->
    <div class="wrapper t-head">
      <!-- 纵向滚动内容区域 -->
      <div class="cont">
        <!-- 第一列固定（相对于盒子绝对定位） -->
        <div class="left fixed">
          <div class="item head_item" :style="{'width': '130px'}">债券简称</div>
        </div>
        <!-- 横向滚动盒子 -->
        <div class="right" ref="headCont">
          <!-- 横向滚动内容区域 -->
          <div class="content">
            <li>
              <div class="item head_item" :style="{'width': '130px'}">债券简称</div>
              <div class="item head_item" :style="{'width': '80px'}">待偿期(年)</div>
              <div class="item head_item" :style="{'width': '100px'}">估价收益率(%)</div>
              <div class="item head_item" :style="{'width': '90px'}">票面利率(%)</div>
              <div class="item head_item" :style="{'width': '60px'}">发行量</div>
            </li>
          </div>
        </div>
      </div>
    </div>
    <!-- 给菜单定位用的盒子 -->
    <div class="vertical-wrapper-box">
      <!-- 纵向滚动盒子 t-body -->
      <div class="wrapper t-body" ref="verticalCont" :style="{'height': `${contHeight}px`}">
        <!-- 纵向滚动内容区域 -->
        <div class="cont">
          <!-- 第一列固定（相对于盒子绝对定位） -->
          <div class="left fixed">
            <div class="item cont_fix_title" :style="{'width': '130px'}" v-for="(item, key) in list" :key="key" :class="{'active': activeIndex === key}">
              <div class="title">{{item.name}}</div>
              <div class="code">{{item.code}}</div>
            </div>
          </div>
          <div class="left fixed mask">
            <div class="item cont_fix_title" :style="{'width': '130px'}" v-for="(item, key) in list" :key="key" :class="{'active': activeIndex === key}" @touchstart="touchStart(key, $event)" @touchend="touchEnd" @touchmove="touchMove">
            </div>
          </div>
          <!-- 横向滚动盒子 -->
          <div class="right" ref="bodyCont">
            <!-- 横向滚动内容区域 -->
            <div class="content">
              <li v-for="(item, key) in list" :key="key" :class="{'active': activeIndex === key}" @touchstart="touchStart(key, $event)" @touchend="touchEnd" @touchmove="touchMove">
                <div class="item" :style="{'width': '130px'}">{{item.name}}</div>
                <div class="item" :style="{'width': '80px'}">{{item.age}}</div>
                <div class="item" :style="{'width': '100px', 'color': '#FF8736'}">{{item.height}}</div>
                <div class="item" :style="{'width': '90px'}">{{item.age}}</div>
                <div class="item" :style="{'width': '60px'}">{{item.yw}}</div>
              </li>
            </div>
          </div>
        </div>
      </div>
      <!-- menu -->
      <div v-if="showMenu" class="menu" :style="{'top': `${menuTop}px`}">
        <div class="option del" @click="delHandle">删除</div>
        <div class="option to_top" @click="toTopHandle">置顶</div>
        <div class="option to_botoom" @click="toBottomHandle">置底</div>
        <div class="arrow"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, ref } from 'vue'
export default defineComponent({
  components: {
    
  },
  setup () {
    let list = reactive([
      { name: '张大sdf张大sdf张大sdf张大sdf张大sdf', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.5561, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '李二', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.2123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '张三', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.3123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '李四', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.4123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '王五', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.5123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '赵六', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.6123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '樊七', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.7123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '王八', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.8123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '老九', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.9123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '阿十', code: 'SDFSDRESX sdf', gender: 'woman', age: 3.0123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '十一', code: 'SDFSDRESX sdf', gender: 'woman', age: 3.1123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '十二', code: 'SDFSDRESX sdf', gender: 'woman', age: 3.2123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '十三', code: 'SDFSDRESX sdf', gender: 'woman', age: 3.3123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '十四', code: 'SDFSDRESX sdf', gender: 'woman', age: 3.4123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '张大', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.1123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '李二', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.2123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '张三', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.3123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '李四', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.4123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '王五', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.5123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '赵六', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.6123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '樊七', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.7123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '王八', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.8123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '老九', code: 'SDFSDRESX sdf', gender: 'woman', age: 2.9123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '阿十', code: 'SDFSDRESX sdf', gender: 'woman', age: 3.0123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '十一', code: 'SDFSDRESX sdf', gender: 'woman', age: 3.1123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '十二', code: 'SDFSDRESX sdf', gender: 'woman', age: 3.2123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '十三', code: 'SDFSDRESX sdf', gender: 'woman', age: 3.3123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false },
      { name: '十四', code: 'SDFSDRESX sdf', gender: 'woman', age: 3.4123, height: 160, xw: 80, yw: 40, tw: 75, weight: 80, hair: 'black', js: false }
    ])

    let headCont = ref(null)
    let bodyCont = ref(null)
    let verticalCont = ref(null)

    const offset = 50  // 滚动到底判断
    const theEnd = () => {
      // console.log('到底了')
    }

    let showMenu = ref(false)  // 判断显示tips
    let activeIndex = ref(null) // 定位选中索引
    const hideMenuEvent = () => {
      showMenu.value = false;
      activeIndex.value = null;
    }

    const scrollTop = ref(0) // 用于定位menu
    const menuTop = ref(0) // 用于定位menu
    const startTime = ref(null) // 用户长按计时
    const longTouchInterval = ref(500) // 长按时间
    const longTouchTimer = ref(null) // 用于清除点击
    const touchStart = (index, e) => {
      e.stopPropagation();
      hideMenuEvent()
      startTime.value = Date.parse(new Date())
      inVokeLongTouch(index, e)
    }
    const touchEnd = () => {
      let now = Date.parse(new Date())
      if (now - startTime.value < longTouchInterval.value) {
        clearTimeout(longTouchTimer.value)
      }
    }
    const touchMove = () => {
      hideMenuEvent()
      clearTimeout(longTouchTimer.value)
    }
    const inVokeLongTouch = (index, e) => {
      
      longTouchTimer.value = setTimeout(() => {
        activeIndex.value = index
        menuTop.value = e.target.offsetTop - scrollTop.value - 36
        showMenu.value = true
        // console.log('长按了', e.target.offsetTop, activeIndex.value, menuTop.value)
      }, longTouchInterval.value);
    }

    const delHandle = () => {
      list.splice(activeIndex.value, 1)
      hideMenuEvent()
    }
    const toTopHandle = () => {
      let item = list[activeIndex.value]
      list.splice(activeIndex.value, 1)
      list.unshift(item)
      hideMenuEvent()
    }
    const toBottomHandle = () => {
      let item = list[activeIndex.value]
      list.splice(activeIndex.value, 1)
      list.push(item)
      hideMenuEvent()
    }
    let contHeight = ref(null)
    onMounted(() => {
      headCont.value.addEventListener('scroll', (e) => {
        hideMenuEvent()
        let t = e.target
        bodyCont.value.scrollLeft = t.scrollLeft;
      })
      bodyCont.value.addEventListener('scroll', (e) => {
        hideMenuEvent()
        let t = e.target
        headCont.value.scrollLeft = t.scrollLeft;
      })

      verticalCont.value.addEventListener('scroll', (e) => {
        hideMenuEvent()
        let t = e.target
        scrollTop.value = t.scrollTop
        if ((t.scrollHeight - t.offsetHeight) - t.scrollTop < offset) {
          theEnd()
        }
      })

      const appdiv = document.querySelector('#app')
      contHeight.value = appdiv.scrollHeight - 44 - 120;
    }) 

    return {
      list,
      headCont,
      bodyCont,
      verticalCont,
      activeIndex,
      touchStart,
      touchEnd,
      touchMove,
      delHandle,
      toTopHandle,
      toBottomHandle,
      showMenu,
      menuTop,
      contHeight
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  height: 300px;
  width: 370px; 
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  .cont {
    width: 100%;
    position: static;
    .left {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      &.mask {
        z-index: 2;
        .item {
          opacity: 0;
        }
      }
    }
    .right {
      width: 100%;
      z-index: 0;
      position: relative;
      overflow-y: hidden;
      overflow-x: auto;
      .content {
        width: 100%;
        li {
          display: flex;
          flex-shrink: 0;
          /* 此处宽可根据具体标签宽度来定 */
          width: 460px;
        }
        li:nth-child(even) {
          background-color: #F5F8FE;
        }
      }
    }
  }
  .item {
    line-height: 60px;
    height: 60px;
    text-align: right;
    font-size: 14px;
    color: #0C0101;
    padding: 0 10px;
    &.head_item {
      font-size: 12px;
      color: #706E6E;
    }
    &.cont_fix_title {
      position: relative;
      line-height: 20px;
      padding-top: 10px;
      .title {
        height: 20px;
        width: 130px;
        top: 10px;
        left: 10px;
        @include textOverflow(1);
        
      }
      .code {
        font-size: 12px;
        color: #A9A6A6;
        height: 20px;
        width: 130px;
        height: 20px;
        top: 30px;
        left: 10px;
        @include textOverflow(1);
      }
    }
  }
  &.t-head {
    height: 36px;
    line-height: 36px;
    z-index: 10;
    font-size: 12px;
    color: #706E6E;
    .cont {
      .lfet:nth-child(even) {
        background-color: #F5F8FE;
      }
      .item {
        height: 36px !important;
        line-height: 36px !important;
        border-bottom: none;
      }
    }
  }
  &.t-head,
  &.t-body {
    .left {
      .item {
        background-color: #fff;
        text-align: left;
      }
      .item:nth-child(even) {
        background-color: #F5F8FE;
      }
    }
  }
}


.wrapper,
.right {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.wrapper::-webkit-scrollbar,
.right::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
* {
  user-select: none;
}

/* 菜单 */
.vertical-wrapper-box {
  width: 370px;
  position: relative;
}
.vertical-wrapper-box .menu {
  position: absolute;
  width: 224px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.9);
  left: 50%;
  transform: translateX(-50%);
  top: 100px;
  z-index: 100;
  color: #fff;
  text-align: center;
  display: flex;
  padding: 0 4px;
  border-radius: 15px;
  .option { 
    width: 72px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .to_top {
    position: relative;
    &::before {
      content: ' ';
      position: absolute;
      width: 0;
      height: 14px;
      border-right: 1px solid #f8f8f8;
      top: 8px;
      left: 0;
      z-index: 1;
    }
    &::after {
      content: ' ';
      position: absolute;
      width: 0;
      height: 14px;
      border-right: 1px solid #f8f8f8;
      top: 8px;
      right: 0;
      z-index: 1;
    }
  }
  .arrow {
    width: 0;
    height: 0;
    border: 5px solid rgba(0, 0, 0, 0.9);
    border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent;
    border-top-width: 7px;
    position: absolute;
    top: 29px;
    left: 110px;
  }
}

.active,
.active .item {
  background-color: #f8f8f8 !important;
}
</style>
