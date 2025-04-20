### Всем привет! На связи ваш любимый бессменный дежурный Team Support – Ян Логан.

В соответствии с политикой Т-Банка, везде в чатах и задачах используются паспортные имена, включая меня. Так исторически сложилось, что я не использую это имя с 2015 года (10 лет!) и отзываюсь только на имя Ян, поэтому все в компании знают меня именно так - за это отдельное спасибо всем причастным. Надеюсь, так будет оставаться и дальше, для меня это важно.

❗️Прошу вас учитывать это при обращении ко мне по любым рабочим и нерабочим вопросам.

Чтобы упростить всем жизнь и не создавать недопониманий, я написал скрипт для Tempermonkey, который заменяет моё имя везде, где это возможно, на привычное всем. Добавьте его, пожалуйста, рядышком с расширением для работы с API. Как это сделать, объясняю  ниже.

Коммуникация – очень важная часть нашей работы, поэтому надеюсь на ваше понимание и уважение 🖤 

### Что делает скрипт?
Локально подменяет мое отображаемое имя в сервисах Т-Банка. Текущий список:
- Браузерная версия TiMe
- Jira
- Confluence

### Как установить
1. Установите расширение [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) и влючите его
2. Нажмите сперва на иконку расширение, а после на "Создать новый скрипт"
3. Очистите весь текст, вместо него вставьте код из спойлера ниже
    <details>
    <summary>Код для вставки</summary>

    ```js
      // ==UserScript==
      // @name         Yan Logan name change
      // @version      dynamic
      // @description  https://raw.githubusercontent.com/yanlogan/yanlogan-namechange/refs/heads/main/README.md
      // @match        *://*/*
      // @icon         https://www.google.com/s2/favicons?sz=64&domain=tbank.ru
      // @require      https://raw.githubusercontent.com/yanlogan/yanlogan-namechange/refs/heads/main/index.js
      // @downloadURL  https://raw.githubusercontent.com/yanlogan/yanlogan-namechange/refs/heads/main/index.js
      // @updateURL    https://raw.githubusercontent.com/yanlogan/yanlogan-namechange/refs/heads/main/index.js
      // @run-at       document-ready
      // @grant        GM_addStyle
      // @author       Yan Logan
      // ==/UserScript==
    ```
    </details>
4. Сохраните результат, через "Файл → Сохранить" или просто Ctrl+S.