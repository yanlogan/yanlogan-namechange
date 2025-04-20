(function() {
  'use strict';

  const observer = new MutationObserver(() => {
      const elements = document.querySelectorAll('title, [data-qa="sidebar_channel_name"], [data-qa="channel_header_title"] .channel-header-user-icon ~ span, [data-qa="user_full_name"], .post__header [aria-label="svetlana fokina"], .channel-intro-profile button, [data-testid="post_textbox_placeholder"], .user-profile-popover__name, .channel-intro-text span, .suggestion-list__item span.ml-2');

      elements.forEach(item => {
          if (item.innerText.includes('Svetlana Fokina')) {
              item.innerHTML = item.innerHTML.replace('Svetlana Fokina', 'Yan Logan');
          }
      });
  });

  observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
  });

})();