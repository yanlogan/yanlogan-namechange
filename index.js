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

  function changeTime () {

    const observer = new MutationObserver(() => {
        const elements = document.querySelectorAll('title, [data-qa="sidebar_channel_name"], [data-qa="channel_header_title"] .channel-header-user-icon ~ span, [data-qa="user_full_name"], .post__header [aria-label="svetlana fokina"], .channel-intro-profile button, [data-testid="post_textbox_placeholder"], .user-profile-popover__name, .channel-intro-text span, .suggestion-list__item span.ml-2, .sidebar--right__title__channel');

        elements.forEach(item => {
            if (item.innerText.includes(defaultName)) {
                item.innerHTML = item.innerHTML.replace(defaultName, changedName);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
  }

})();