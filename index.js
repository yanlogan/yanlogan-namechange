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
      '.post__header', // заголовок в постах и комменатах
      '.post__body', // текст в постах
      '.user-profile-popover__name', // имя в карточке юзера
      '.suggestion-list__item span.ml-2', // имя в подсказках при теге
      '.sidebar--right__title__channel', // заголовок треда в правом сайдбаре
      '[data-qa="user_full_name"]', // имя в меню профиля
      '.ThreadItem h1', // заголовок на вкладке тредов
      '.channel-intro__content', // интро в канале
      '[data-testid="rigth_sidebar.members_container"]', // в участниках канала
      '.post-preview__header', // в превью треда
      '[data-testid="groupMemberRow"]', // в карточке группы юзеров
      'more-modal__name', // в участниках группы юзеров
      '[data-testid="autocomplete-succeed-view"]', // в подсказках
      '.mention--highlight' // в списке тредов в меншнах
      // TODO: найти упомининания @s.v.fokina
    ];

    // FIXME: пропадает всплывашка реактов на моих сообщениях
    // BUG: крашится вкладка, попробовать через innerText

    const replaceName = (element) => {
      if (element && element.innerText && element.innerText.includes(defaultName)) {
        element.innerText = element.innerText.replace(defaultName, changedName);
      }
    };

    // process all elements
    const processElements = () => {
      const elements = document.querySelectorAll(selectors.join(", "));
      elements.forEach(replaceName);
    }

    // process only matched elements
    const processNode = (node) => {
      if (!(node instanceof HTMLElement)) return;

      if (node.matches(selectors.join(", "))) {
        replaceName(node);
      }
      node.querySelectorAll(selectors.join(", ")).forEach(replaceName);
    };

    let debounceTimer;
    const debouncedProcess = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(processElements, 50);
    };

    // process existing elements
    processElements();
    debouncedProcess();


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

    // const observer = new MutationObserver(debouncedProcess);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

})();