(function() {
  'use strict';

  const urlMatches = [
    { 
      'service': 'time',
      'regex': /https:\/\/time.tbank.ru\/*/
    }
  ]
  const currentUrl = window.location.href;
  const service = urlMatches.find(url => url.regex.test(currentUrl))?.service;

  const defaultName = 'Svetlana Fokina';
  const changedName = 'Yan Logan';

  switch (service) {
    case 'time':
      changeTime();
      break;
    default:
      break;
  }

  function changeTime() {
    const selectors = [
      'title', // заголовок страницы личного чата
      '[data-test-id="searchResults"] [data-test-id="userItem"]',
      '.SidebarChannelLinkLabel[data-qa="sidebar_channel_name"]', // название личного чата в сайдбаре
      '#channelHeaderTitle[data-qa="channel_header_title"] .channel-header-user-icon + span', // заголовок чата на странице личного чата
      '.channel-intro-profile button', // заголовок интро на странице личного чата
      '.channel-intro-text span', // текст интро на странице личного чата
      '[data-testid="profile-header-username"]', // имя в info
      '[data-testid="post_textbox_placeholder"]', // плейсхолдер в личныом чате
      '.post__header button', // заголовок в постах и комменатах
      '.post__body', // текст в постах
      '.user-profile-popover__name', // имя в карточке юзера
      '.suggestion-list__item span.ml-2', // имя в подсказках при теге
      '.sidebar--right__title__channel', // заголовок треда в правом сайдбаре
      '[data-qa="user_full_name"]', // имя в меню профиля
    ];

    const replaceName = (element) => {
      if (element && typeof element.innerHTML === "string" && element.innerText?.includes(defaultName)) {
        element.innerHTML = element.innerHTML.replace(defaultName, changedName);
      }
    };

    // process only matched elements
    const processNode = (node) => {
      if (!(node instanceof HTMLElement)) return;

      if (node.matches(selectors.join(", "))) {
        replaceName(node);
      }
      node.querySelectorAll(selectors.join(", ")).forEach(replaceName);
    };

    // process existing elements
    document.querySelectorAll(selectors.join(", ")).forEach(replaceName);

    // observe only changed elements
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          Array.from(mutation.addedNodes).forEach(processNode);
        }

        if (mutation.type === "characterData") {
          const parent = mutation.target.parentElement;

          if (parent && parent.matches(selectors)) {
            replaceName(parent);
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

})();