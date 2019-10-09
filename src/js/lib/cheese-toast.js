(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.CheeseToast = factory());
}(this, function () { 'use strict';

  function CheeseToast ({
    text,
    className,
    timeout = 3000,
    transitionDuration = '0.4',
    position = 'top'
  }) {
    this.toast = document.createElement('div');
    this.toast.innerText = text;
    this.toast.className = className;
    this.toast.style.transition = `${transitionDuration}s all ease-in-out`;
    this.toast.style.position = 'fixed';
    this.toast.style.right = '0';
    if (position === 'bottom') {
      this.toast.style.bottom = '0';
      this.toast.style.transform = 'translateY(100%)';
    } else {
      this.toast.style.top = '0';
      this.toast.style.transform = 'translateY(-100%)';
    }

    this.hide = () => {
      this.toast.style.transform = position === 'bottom'
        ? 'translateY(100%)'
        : 'translateY(-100%)';
      setTimeout(() => {
        document.documentElement.contains(this.toast) &&
        document.documentElement.removeChild(this.toast);
      }, transitionDuration * 1000);
    };

    const closeBtn = document.createElement('span');
    closeBtn.innerText = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.right = '17px';
    closeBtn.style.top = '4px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.addEventListener('click', this.hide);
    this.toast.appendChild(closeBtn);

    document.documentElement.appendChild(this.toast);
    setTimeout(() => {
      this.toast.style.transform = 'translateY(0)';
    }, 100);
    setTimeout(this.hide, timeout);

    return {
      hide: this.hide
    }
  }

  return CheeseToast;

}));
