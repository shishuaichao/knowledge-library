function copyCode() {
  // 获取复制按钮对应的代码元素
  var codeElement = document.querySelector(".copy-code");

  // 获取代码元素的文本内容
  var codeText = codeElement.innerText;

  // 调用复制函数复制文本
  copyToClipboard(codeText);
}

function copyToClipboard(text) {
  // 创建一个文本域元素
  var textArea = document.createElement("textarea");

  // 设置文本域的值
  textArea.value = text;

  // 将文本域添加到文档中
  document.body.appendChild(textArea);

  // 选择文本域中的文本
  textArea.select();

  // 执行复制命令
  document.execCommand("copy");

  // 移除文本域元素
  document.body.removeChild(textArea);

  // 弹出提示框
  alert("已复制到剪贴板！");
}
