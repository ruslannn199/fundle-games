import { useRef } from 'react';

const checkIfSafariBrowser = (): boolean => (
  navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') <= -1
);

const useScrollBlock = () => {
  const scrollBlocked = useRef<boolean>(false);
  const isSafariBrowser: boolean = checkIfSafariBrowser();
  const html = document.documentElement;
  const { body } = document;

  const blockScroll = () => {
    if (body && body.style && !scrollBlocked.current) {

      const scrollBarWidth = window.innerWidth - html.clientWidth;
      const bodyPaddingRight = parseInt(window.getComputedStyle(body).getPropertyValue("padding-right"), 10) || 0;

      if (isSafariBrowser) {
        html.style.position = 'relative';
        html.style.overflow = 'hidden';
      }
      body.style.position = 'relative';
      body.style.overflow = 'hidden';
      body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
  
      scrollBlocked.current = true;
    }
  }

  const allowScroll = () => {
    if (body && body.style && scrollBlocked.current) {
      if (isSafariBrowser) {
        html.style.position = '';
        html.style.overflow = '';
      }
      body.style.position = '';
      body.style.overflow = '';
      body.style.paddingRight = '';
  
      scrollBlocked.current = false;
    }
  }

  return [blockScroll, allowScroll];
}

export default useScrollBlock;
