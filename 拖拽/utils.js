


function css(el, prop, val) {
  var style = el && el.style;
  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, '');
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }
      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf('webkit') === -1) {
        prop = '-webkit-' + prop;
      }
      style[prop] = val + (typeof val === 'string' ? '' : 'px');
    }
  }
}

function clone(el) {
  let cloneEl = el.cloneNode(true);
  let rect = getRect(el, '克隆标签')
  css(cloneEl, 'left', rect.left)
  css(cloneEl, 'top', rect.top)
  css(cloneEl, 'margin', '0')
  css(cloneEl, 'position', 'absolute')
  css(cloneEl, 'zIndex', 10000)
  return cloneEl
}

// 丢弃克隆节点
function dropCloneNode(cloneEl) {
  cloneEl.parentNode.removeChild(cloneEl);
}

// 获取标签索引
const findCurrentIndex = (node) => {
  let parentNode = node.parentNode
  let arr = Array.from(parentNode.childNodes)
  return arr.indexOf(node)
}

// 获取相对于容器的位置（可以讲容器标签传入，简单来说就是父标签）
const getRect = (element, str) => {
  const rect = element.getBoundingClientRect(); 
  const parentRect = element.parentNode.getBoundingClientRect();
  str && console.log(str, rect);
  str && console.log(str, 'parentRect', parentRect);
  let rectObj = {
    left: rect.left - parentRect.left,
    top: rect.top - parentRect.top,
  }
  console.log('真实位置', rectObj)
  return rectObj
}