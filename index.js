// ==UserScript==
// @name         在 earthworm 的控制台答题
// @namespace    https://github.com/lzj97
// @version      0.0.1
// @description  程序员就要用程序员的方式答题
// @author       Calvin
// @match        https://earthworm.cuixueshe.com/*
// @icon         https://earthworm.cuixueshe.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  // Your code here...
  // 题目容器的类名
  const textClass = '.mb-4.mt-10.text-2xl'
  // 输入框的类名
  const inputClass = '.absolute.h-full.w-full.opacity-0'
  // 输错3次弹出提示的类名
  const tipClass = '.absolute.top-36.flex.items-center.justify-center.text-xl  .text-3xl'

  window.show = function () {
    return document.querySelector(textClass).innerHTML
  }

  // 触发回车事件
  function enter(input) {
    const enterKeyEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      which: 13,
      bubbles: true,
      cancelable: true,
    })
    if (input) {
      input.dispatchEvent(enterKeyEvent)
    }
    else {
      window.dispatchEvent(enterKeyEvent)
    }
  }

  // 触发空格事件
  function space(input) {
    const spaceKeyEvent = new KeyboardEvent('keydown', {
      key: ' ',
      code: 'Space',
      keyCode: 32,
      which: 32,
      bubbles: true,
      cancelable: true,
    })
    input.dispatchEvent(spaceKeyEvent)
  }

  window.input = function (text) {
    const inputNode = document.querySelector(inputClass)
    if (inputNode) {
      inputNode.value = text
      // 创建并触发input事件，使v-model绑定的属性也随之更新
      const event = new Event('input', {
        bubbles: true,
        cancelable: true,
      })
      inputNode.dispatchEvent(event)

      nextTick().then(() => {
        enter(inputNode)

        nextTick().then(() => {
          const pass = !document.querySelector(inputClass)
          if (pass) {
            enter()

            nextTick().then(() => {
              // 输入正确，将下一题显示在控制台
              console.info(window.show())
            })
          }
          else {
            const tipNode = document.querySelector(tipClass)
            const tip = tipNode ? tipNode.innerHTML : ''
            console.error(tip || "输入错误")
            space(inputNode)
          }
        })
      })
    }
  }

  function nextTick() {
    return new Promise((resolve) => {
      resolve(true)
    })
  }
})()