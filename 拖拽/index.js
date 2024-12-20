


var dataList = ['娱乐', '视频', '头条', '健康', '科技', '发现', '热点', '财经', '短剧', '手机']

// 1. 创建dom
const rootEl = document.querySelector('.list')
dataList.forEach((e, i) => {
  let li = document.createElement('li')
  li.setAttribute('data-name', e)
  li.className = 'item'
  li.textContent = e + (i + 1)
  rootEl.appendChild(li)
})

// 2. 添加监听事件
let liArr = Array.from(rootEl.childNodes)
let dragNode = null
liArr.forEach(li => {
  li.addEventListener('mousedown', e => {
    if (e.target.isAnimate) {
      e.target.setAttribute('draggable', false)
    } else {
      e.target.setAttribute('draggable', true)
    }
  })
  li.addEventListener("dragstart", e => {
    e.dataTransfer.effectAllowed = "move";
    dragNode = e.target
    dragNode.setAttribute('id', 1)
    // console.log('dragNode', dragNode)
    setTimeout(() => {
      dragNode.classList.add('moving')
    }, 1);
  })
  li.addEventListener("dragenter", e => {
    e.preventDefault();
    if (e.target == dragNode || e.target.isAnimate || e.target.animatingX || e.target.animatingY) return
    let dragNodeIndex = findCurrentIndex(dragNode);
    let targetIndex = findCurrentIndex(e.target);
    
    if (dragNodeIndex > targetIndex) {
      // 从后往前移

      // 创建克隆节点，插入根节点
      let dragNodeClone = clone(dragNode)
      rootEl.appendChild(dragNodeClone);
      // 插入节点、执行动画
      rootEl.insertBefore(dragNode, e.target)
      animate(dragNode, e.target);
      animate(dragNodeClone, dragNode);
      // 丢弃克隆标签
      dropCloneNode(dragNodeClone)
      
    } else {
      // 从前往后移
      rootEl.insertBefore(dragNode, e.target.nextElementSibling)
      animate(dragNode, e.target, false);
    }
  });
  li.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  li.addEventListener("dragend", (e) => {
    dragNode.classList.remove("moving");
  });
})

// 关键动画
const duration = 300
const animate = (insertNode, target) => {
  let insertRect = getRect(insertNode, '插入节点');
  let targetRect = getRect(target, '目标节点');
  css(target, "transition", "");
  css(target, "transform", "");
  let translateX = insertRect.left - targetRect.left;
  let translateY = insertRect.top - targetRect.top;
  target.animatingX = !!translateX;
  target.animatingY = !!translateY;
  console.log("移动了", translateX, translateY);
  css(
    target,
    "transform",
    "translate3d(" + translateX + "px," + translateY + "px, 0)"
  );

  // 1. 先插入 2. 执行动画 3. 动画执行到translate3d，把动画元素回复到初始状态，
  // 4. 然后重绘  this.forRepaintDummy = target.offsetTop; // 立即重绘 repaint
  // 5. 然后执行transition过渡到本身位置（也就是插入后的位置）
  
  this.forRepaintDummy = target.offsetTop; // 立即重绘 repaint

  css(target, "transition", "transform " + duration + "ms" + " linear");
  css(target, "transform", "translate3d(0,0,0)");
  
  if (typeof target.isAnimate === "number") {
    clearTimeout(target.isAnimate);
    console.log('停掉' + target.textContent + '的动画')
  }
  target.isAnimate = setTimeout(function () {
    css(target, "transition", "");
    css(target, "transform", "");
    target.isAnimate = false;
    target.animatingX = false;
    target.animatingY = false;
    // console.log('target', target)
  }, duration);
};