


const dataList = ['娱乐', '视频', '头条', '健康', '科技', '发现', '热点', '财经', '短剧', '手机']
var rootDuration = 250

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
let dragNodeClone = null

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
      exChangeNode(dragNode, e.target, true)
    } else {
      // 从前往后移
      exChangeNode(dragNode, e.target)
    }
  });
  li.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  li.addEventListener("dragend", (e) => {
    dragNode.classList.remove("moving");
    // 丢弃克隆标签
    hideClone(dragNodeClone, true)
  });
})
