import React from 'react';
import {
  Container,
  Header,
  Paragraph,
  ParagraphTitle,
  ChaptersList,
  Chapter,
  Quote,
  Example,
  Small,
  Clause,
  Guidance,
  OrderedList,
  UnorderedList,
  Footnote,
} from './themeComponents/lora';

function Chaldini() {
  return (
    <Container>
      <Header>
        <h1>Р.&nbsp;Чалдини и&nbsp;др. &laquo;Психология убеждения&raquo;</h1>
        <h3>Краткий конспект книги</h3>
      </Header>
      <main>
        <Paragraph>
          В&nbsp;книге, с&nbsp;опорой на&nbsp;исследования <em>ученых</em>,
          представлены полсотни разных техник, призванных повысить
          проникновенность вашей идеи для вашей аудитории. Каждая техника сулит
          какой-то процент улучшений, от&nbsp;мизерного, в&nbsp;пределах
          погрешности, до&nbsp;значительного.
        </Paragraph>
        <Paragraph>
          Этот конспект готовился для личных нужд и&nbsp;не&nbsp;эквивалентен
          материалу из&nbsp;книги. Конечно я&nbsp;старался передать идеи автора,
          но&nbsp;уверен, что в чем-то отклонился от&nbsp;оригинальной задумки.
          Несколько пунктов я&nbsp;и вовсе пропустил. По&nbsp;соображением
          краткости и&nbsp;экономии времени, здесь нет отсылок
          к&nbsp;оригинальным исследованиям. А&nbsp;еще весь материал подвергнут
          искажениям моей личной интерпретации.
        </Paragraph>
        <Paragraph>
          Поэтому перед тем как продолжить чтение подумайте, возможно вас больше
          заинтересует оригинал книги.
        </Paragraph>
        <ChaptersList>
          <Chapter>
            <ParagraphTitle>1. Социальное доказательство </ParagraphTitle>
            <Guidance>
              <UnorderedList>
                <Clause>
                  Подчеркивать поведение одобряемое большинством в&nbsp;той или
                  иной ситуации
                </Clause>
                <Clause>
                  Указывать на&nbsp;растущее число присоединившихся, особенно на
                  ранних стадиях компании, когда вам надо набрать обороты.
                </Clause>
              </UnorderedList>
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>2. Против толпы</ParagraphTitle>
            <Paragraph>
              Каждому, кто хочет воспрепятствовать определенному поведению,
              стоит подумать о&nbsp;возможности вызвать ассоциацию этого
              поведения с&nbsp;нежелательной самоидентификацией
            </Paragraph>
            <Quote>
              За&nbsp;противодействие общественному мнению мы&nbsp;платим своими
              эмоциями и&nbsp;цена эта может быть весьма ощутимой, даже
              болезненной
            </Quote>
          </Chapter>
          <Chapter>
            <ParagraphTitle>3. Еще о&nbsp;социальных нормах</ParagraphTitle>
            <Paragraph>
              Попытки убеждения будут более успешными, если строить послания в
              терминах отклонения от&nbsp;социальной нормы,
              а&nbsp;не&nbsp;соответствия&nbsp;ей. Имеется ввиду социальная
              норма рассматриваемая собеседником. Сначала нужно учесть реакцию
              аудитории на&nbsp;социальные нормы.
            </Paragraph>
            <Quote>
              ... люди склонны к&nbsp;подчинению нормам. В&nbsp;то&nbsp;же время
              в&nbsp;качестве самохарактеристики они выбирают как раз
              те&nbsp;черты, которыми отличаются от&nbsp;других
            </Quote>
          </Chapter>
          <Chapter>
            <ParagraphTitle>4. Разбитые окна </ParagraphTitle>
            <Paragraph>
              Когда кто-то замечает, что равные ему по&nbsp;положению люди
              нарушили одну социальную норму, он&nbsp;не&nbsp;только сам
              становится более склонным к&nbsp;ее&nbsp;нарушению, но&nbsp;также
              в&nbsp;большей степени оказывается готов нарушить другую
              социальную норму связанную с&nbsp;первой.
            </Paragraph>
            <Example>
              Люди видят граффити -&gt; Больше мусорят. Люди видят много мусора
              -&gt; Больше склонны стащить то&nbsp;что плохо лежит
            </Example>
            <Guidance>
              Нужно показывать уважение других людей к&nbsp;принятым нормам
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>5. Люди любят свои имена</ParagraphTitle>
            <Paragraph>
              Обращайтесь к&nbsp;собеседнику по&nbsp;имени, когда это возможно.
              Люди делают больше пожертвований пострадавшим от&nbsp;урагана,
              с&nbsp;названием начинающимся на&nbsp;ту&nbsp;же букву, что
              и&nbsp;их&nbsp;имя
            </Paragraph>
          </Chapter>
          <Chapter>
            <ParagraphTitle>6. Выбирайте тип общности</ParagraphTitle>
            <Example>
              Пример: Фанаты манчестера больше были готовы помочь фанату
              Ливерпуля, если до&nbsp;этого они расказывали, чем
              их&nbsp;привлекает быть футбольным фанатом, а&nbsp;не&nbsp;чем
              им&nbsp;нравиться манчестер (в&nbsp;этом случае помогали ожидаемо
              редко)
            </Example>
          </Chapter>
          <Chapter>
            <ParagraphTitle>
              7. Чем дольше отношения, тем меньше понимания между партнерами
            </ParagraphTitle>
            <Paragraph>
              Потому что отношающиеся стороны ориентируются на&nbsp;мнение
              сложившееся в&nbsp;начале отношений, а&nbsp;люди со&nbsp;временем
              меняются.
            </Paragraph>
            <Guidance>
              Нужно обмениваться новой информацией. Говорить о&nbsp;тех вещах, о
              которых уже казалось&nbsp;бы все ясно.
            </Guidance>
            <Example>
              Пригласите на&nbsp;деловую встречу нового человека, ему будет
              нормально задавать простые вопросы, которые казалось&nbsp;бы
              очевидны для бывалых участников. Тем не&nbsp;менее ответы могут
              оказаться неожиданными и&nbsp;для бывалых.
            </Example>
          </Chapter>
          <Chapter>
            <ParagraphTitle>
              8-9. Людям не&nbsp;легко отказаться от&nbsp;обязательства
            </ParagraphTitle>
            <Paragraph>
              Если есть возможность&nbsp;&mdash; возьмите с&nbsp;собеседника
              обязательство. Обязательство может быть неформальным &mdash;
              простое согласие или неявным&nbsp;&mdash; вместо обязательства
              явиться на&nbsp;собрание можно попросить подготовить пару вопросов
              к докладчику.
            </Paragraph>
            <Example>
              Можно подарить значок типа &laquo;Друг земли&raquo;.
            </Example>
            <Guidance>
              Попросите подтверждения обязательства или проговорите его, чтобы
              сверить часы и&nbsp;чтобы собеседник уделил больше внимания тому
              на что он&nbsp;соглашается. Обязательство должно быть конкретным.
              Хорошо, если человек будет встречать напоминания о&nbsp;своем
              обязательстве. Люди больше склонны выполнять обязательства, если
              они взяли на&nbsp;себя их&nbsp;сами.
            </Guidance>
            <Example>
              Время следующей явки к&nbsp;врачу проставляют
              в&nbsp;регистратуре&nbsp;&mdash; обязательство установленно извне.
              Пациенты пишут время следуюей явки от&nbsp;руки&nbsp;&mdash; берут
              обязательство сами.
            </Example>
          </Chapter>
          <Chapter>
            <ParagraphTitle>10. Эффект позволения</ParagraphTitle>
            <Example>
              После беговой дорожки есть соблазн позволить себе пироженное. Если
              люди знают, что есть аппарат для утилизации то&nbsp;производят
              больше мусора, меньше стараясь экономить ресурсы
            </Example>
          </Chapter>
          <Chapter>
            <ParagraphTitle>11. Важное дело</ParagraphTitle>
            <Guidance>
              Лучшая мотивация&nbsp;&mdash; когда сотрудники понимают, почему их
              работа важна. Напоминайте им&nbsp;об&nbsp;этом. Расскажите истории
              клиентов, или познакомьте с&nbsp;клиентами.
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>12. Эскалация обязательств</ParagraphTitle>
            <Paragraph>
              <UnorderedList>
                <Clause>
                  Первый принцип: Если человек берет на&nbsp;себя даже небольшое
                  обязательство, то&nbsp;под влиянием чувства долга
                  и&nbsp;внимания со стороны окружающих он&nbsp;считает
                  обязанным это обязательство выполнить.
                </Clause>
                <Clause>
                  Второй принцип: На&nbsp;первое место выходит не&nbsp;желание
                  победить, а&nbsp;желание избежать проигрыша.
                </Clause>
              </UnorderedList>
            </Paragraph>
            <Example>
              Если человек выступает инициатором переговоров, он&nbsp;испытвает
              излишнее желание довести их&nbsp;до&nbsp;конца и&nbsp;заключить
              сделку, хотя возможно лучшее решение&nbsp;&mdash; от&nbsp;сделки
              отказаться
            </Example>
            <Guidance>
              Как избежать: принятие принципиально важного решения
              об&nbsp;участии в&nbsp;переговорах поручается одному сотруднику,
              а&nbsp;ведение переговоров&nbsp;&mdash; другому. Однако может
              не&nbsp;сработать, если эти сотрудники поддерживают между собою
              отношения.
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>13. Намерения по&nbsp;воплощению</ParagraphTitle>
            <Guidance>
              После согласия на&nbsp;что-то, что&nbsp;бы повысить шансы, что
              обещанное будет исполнено, попросите составить план о&nbsp;том,
              что будет делать собеседник для исполнения. Либо задайте наводящие
              вопросы.
            </Guidance>
            <Footnote>
              Подход логичный, но&nbsp;проценты, оценивающие эффективность этой
              стратегии, приведенные в&nbsp;книге очень скромные. Практически в
              пределах погрешности: от&nbsp;1&nbsp;до&nbsp;10%
            </Footnote>
          </Chapter>
          <Chapter>
            <ParagraphTitle>14. Привязка к&nbsp;будущему</ParagraphTitle>
            <Guidance>
              Вместо просьбы согласиться что-то изменить сейчас, попросите дать
              согласие на&nbsp;изменение в&nbsp;будущем.
            </Guidance>
            <Example>
              Попросить время на&nbsp;рефакторинг в&nbsp;следующем квартале
            </Example>
          </Chapter>
          <Chapter>
            <ParagraphTitle>
              15. Ответственность перед завтрашним собой
            </ParagraphTitle>
            <Paragraph>
              Чем более сильную связь чувствует человек с&nbsp;завтрашним собой,
              тем скорее он&nbsp;готов измениться к&nbsp;лучшему.
            </Paragraph>
            <Example>
              В&nbsp;эксперименте людям давали посмотреть на&nbsp;свою
              состаренную фотку и&nbsp;больше людей согласилось увеличить
              пенсионные накопления. Но процент там тоже сомнителен.
            </Example>
          </Chapter>
          <Chapter>
            <ParagraphTitle>16. Неточные цели</ParagraphTitle>
            <Paragraph>
              Вместо того чтобы ставить точную цель, например похудеть
              на&nbsp;10кг лучше ставить интервал&nbsp;&mdash; похудеть
              на&nbsp;8&mdash;12кг. Так будет больше шансов продержаться,
              а&nbsp;не&nbsp;откатиться на&nbsp;первом&nbsp;же кг. А&nbsp;еще
              так даже можно перевыполнить цели, если дело заладиться.
            </Paragraph>
            <Quote>
              Люди должны считать выбранную ими цель достаточно амбициозной,
              чтобы достигнув ее&nbsp;они могли испытать чувство удовлетворения.
              В то&nbsp;же время эта цель не&nbsp;должна быть недостижимой
            </Quote>
          </Chapter>
          <Chapter>
            <ParagraphTitle> 17. Расширенный активный выбор</ParagraphTitle>
            <Paragraph>
              Есть стратегия поставить человека согласным по&nbsp;умолчанию, она
              работает (например добавленная по&nbsp;умолчанию страховка при
              покупке авиабилета), но&nbsp;она естественным образом вызывает
              возмущение человека, который воспринимает это как обман и лишение
              выбора. В&nbsp;то&nbsp;же время можно оставить возможность выбора
              и&nbsp;все&nbsp;же увеличить процент согласия.
            </Paragraph>
            <Guidance>
              Это случится если вместо одного пункта:
              <Small>
                <div>&#9633; Я&nbsp;согласен на&nbsp;прививку</div>
              </Small>
              будет два варианта:
              <Small>
                <div>&#9633; Я&nbsp;согласен на&nbsp;прививку</div>
                <div>&#9633; Я&nbsp;отказываюсь от&nbsp;прививки</div>
              </Small>
              Еще можно изменять текст:
              <Small>
                <div>
                  &#9633; Я&nbsp;согласен привиться и&nbsp;не&nbsp;болеть зимой
                </div>
                <div>
                  &#9633; Я&nbsp;отказываюсь от&nbsp;прививки и&nbsp;соглашаюсь
                  с&nbsp;риском заболеть и пропустить неделю работы.
                </div>
              </Small>
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>18. Меньше времени на&nbsp;раздумья</ParagraphTitle>
            <Example>
              Сертификат с&nbsp;длительным сроком намереваются реализовать
              большее число потенциальных покупателей, однако на&nbsp;деле
              пользуются им меньше. Откладывают до&nbsp;последнего
              и&nbsp;забивают.
            </Example>
          </Chapter>
          <Chapter>
            <ParagraphTitle>20. Потенциал</ParagraphTitle>
            <Quote>
              Как это не&nbsp;парадоксально, предполагаемая возможность
              преуспеть в какой-либо сфере деятельности часто является более
              привлекательной в&nbsp;глазах тех, кто принимает решения, чем уже
              имеющееся мастерство
            </Quote>
            <Guidance>
              В&nbsp;своем сообщение сначала обратите внимание
              на&nbsp;потенциальную выгоду для клиента, а&nbsp;потом
              о&nbsp;высоком качестве услуг уже предоставленных в&nbsp;прошлом
              (достижениях)
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>21. Совещания</ParagraphTitle>
            <Paragraph>
              <OrderedList>
                <Clause>
                  Пусть все участники совещания предоставят материалы заранее
                </Clause>
                <Clause>
                  Пусть тот, кто ведет совещание выступает последним, чтобы
                  не&nbsp;оказывать влияние на&nbsp;группу
                </Clause>
                <Clause>
                  Пусть ведущий составит чек-лист необходимых условий для
                  успешного совещания.
                  <p>
                    Пример вопросов: Все&nbsp;ли ответственные за&nbsp;принятие
                    решения находятся на совещании? Найдется&nbsp;ли здесь
                    кто-либо с&nbsp;противоположным, но&nbsp;полезным мнением?
                  </p>
                </Clause>
              </OrderedList>
            </Paragraph>
            <Guidance>
              Если расставить стулья в&nbsp;форме круга, то&nbsp;участники будут
              более склонны к&nbsp;чувству общности и&nbsp;сосредотачиваются
              на&nbsp;общей пользе, а&nbsp;если в&nbsp;форме буквы&nbsp;L,
              то&nbsp;к&nbsp;чувству исключительности и&nbsp;большей
              ответственности. Кроме того места рассадки стоит определять
              организаторам. Достаточно поставить карточки с&nbsp;именами.
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>22. Одежда</ParagraphTitle>
            <Paragraph>
              Правильный выбор одежды может повысить воспринимаемую
              авторитетность. Плюс имеет значение фактор сходства
              с&nbsp;принятым дресс-кодом.
            </Paragraph>
            <Guidance>
              Одевайтесь как принято среди ваших слушателей, но чуть более
              строго.
            </Guidance>
            <Example>
              Помочь незнакомцу соглашалось вдвое больше людей, если он&nbsp;был
              одет в&nbsp;форму охранника
            </Example>
          </Chapter>
          <Chapter>
            <ParagraphTitle>23. Контекст</ParagraphTitle>
            <Paragraph>
              Доводы выступающего принимаются после обсуждения
              во&nbsp;&laquo;Внутреннем диалоге&raquo;. Поэтому важен контекст
              этого диалога.
            </Paragraph>
            <Example>
              Предложение сделать более строгим ограничение скорости вызовет
              больший отклик, если незадолго перед тем слушатель узнал о
              нескольких случаях тяжелых аварий на&nbsp;оспариваемой допустимой
              скорости.
            </Example>
            <Paragraph>
              Если выступающего принимают за&nbsp;авторитета,
              то&nbsp;критическое мышление отключается. На&nbsp;томографии
              не&nbsp;фиксировали активность связанных с&nbsp;ним отделов мозга.
            </Paragraph>
            <Guidance>
              При представлении обратить внимание на&nbsp;моменты, которые
              помогут воспринимать вас как авторитета
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>24. Тон</ParagraphTitle>
            <Paragraph>
              В&nbsp;ситуации, когда нет четкого однозначного ответа, небольшая
              нота неуверенности в&nbsp;речи эксперта привлечет внимание
              к&nbsp;тому о чем он&nbsp;говорит и&nbsp;создаст более
              доверительную атмосферу. Что поспособствует его убедительности
            </Paragraph>
          </Chapter>
          <Chapter>
            <ParagraphTitle>25. Центральное положение</ParagraphTitle>
            <Paragraph>
              Человек который разместился в&nbsp;центре группы приобретает
              большее влияние на&nbsp;остальных. Ему более склонны прощать
              промахи и ошибки. Однако если явно указать главного это
              преимущество нивелируется
            </Paragraph>
          </Chapter>
          <Chapter>
            <ParagraphTitle>26. Высота потолка</ParagraphTitle>
            <Quote>
              Когда потолок высокий, люди склонны мыслить более концептуально
              и&nbsp;творчески, а&nbsp;когда низкий&nbsp;&mdash; более конкретно
              и&nbsp;узко
            </Quote>
          </Chapter>
          <Chapter>
            <ParagraphTitle>27. Место проведения переговоров</ParagraphTitle>
            <Paragraph>
              Сторона на&nbsp;чьей территории проходят переговоры находится
              в&nbsp;более выгодном положении
            </Paragraph>
          </Chapter>
          <Chapter>
            <ParagraphTitle>28. Установка перед переговорами</ParagraphTitle>
            <Paragraph>
              Если подумать перед важным разговором или собеседованием о
              каком-то моменте из&nbsp;прошлого, когда ты&nbsp;чувствовал себя
              сильным, то&nbsp;это оказывает положительное влияние
              на&nbsp;результат. А&nbsp;если подумать о&nbsp;моменте, когда
              чувствовал себя слабым, то&nbsp;сравнимо отрицательное. Открытые
              позы&nbsp;&mdash; признак сильного человека. Открытая поза имеет
              обратный эффект, в&nbsp;том смысле если ее принять намерянно, это
              может придать ощущение силы.
            </Paragraph>
          </Chapter>
          <Chapter>
            <ParagraphTitle>31. Взаимная помощь</ParagraphTitle>
            <Guidance>
              Первым приходите на&nbsp;помощь коллегам, оказывайте услуги,
              предлагайте информацию Обязательно подчеркивайте, что оказали
              помощь в&nbsp;рамках двустороннего соглашения, естественного и
              справедливого:
              <UnorderedList>
                <Clause>
                  Не&nbsp;за&nbsp;что, коллеги всегда помогают друг другу
                </Clause>
                <Clause>
                  О&nbsp;чем разговор! Я&nbsp;знаю, что в&nbsp;подобной ситуации
                  вы сделали&nbsp;бы то&nbsp;же самое для меня.
                </Clause>
              </UnorderedList>
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>32. Искренняя благодарность</ParagraphTitle>
            <Paragraph>
              Один из&nbsp;способов увеличения своего влияния получателем помощи
              может оказаться явное выражение благодарности тому, кто эту помощь
              оказал
            </Paragraph>
          </Chapter>
          <Chapter>
            <ParagraphTitle>33. Неожиданность</ParagraphTitle>
            <Example>
              Если официант оставлял конфету вместе со&nbsp;счетом, а&nbsp;потом
              возвращался и&nbsp;оставлял еще одну, то&nbsp;ему давали больше
              чаевых
            </Example>
          </Chapter>
          <Chapter>
            <ParagraphTitle>34. Просто попросите</ParagraphTitle>
            <Paragraph>
              Люди обычно значительно недооценивают вероятность того, что им
              ответят согласием на&nbsp;просьбу о&nbsp;помощи
            </Paragraph>
          </Chapter>
          <Chapter>
            <ParagraphTitle>35. Первое предложение</ParagraphTitle>
            <Paragraph>
              На&nbsp;переговорах преимущество за&nbsp;тем, кто вносит свое
              предложение первым. Потому что первое предложение становится
              отправной точкой для переговоров. Оппонент может даже сам начать
              искать объяснения первой ставке (вероятно высокой для него)
              и&nbsp;даже найти&nbsp;их.
            </Paragraph>
            <Guidance>
              Чтобы не&nbsp;оказаться в&nbsp;более слабом положении, когда
              оппонент успел внести предложение первым или, если прайс заранее
              оговорен, нужно загодя придумать идеальную для себя цену
              и&nbsp;найти ей&nbsp;объяснения&mdash;аргументы.
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>36. Не&nbsp;округляйте сумму</ParagraphTitle>
            <Paragraph>
              Предложение стоимостью в&nbsp;30215 рублей кажется более
              выверенным, чем в&nbsp;30000. Создается впечатление, будто оно
              высчитано по некоторой методике, а&nbsp;значит оправдано.
              К&nbsp;тому&nbsp;же это несколько неожиданно и&nbsp;такое
              предложение вызовет больший интерес среди списка подобных.
              И&nbsp;все&nbsp;же лучше подготовить аргументы о&nbsp;причине
              именно такой оценки&nbsp;По той&nbsp;же причине лучше попросить
              сотрудников подготовить работу не&nbsp;через две недели,
              а&nbsp;через 13 дней. И&nbsp;пригласить для демонстрации
              результатов в&nbsp;15:47
            </Paragraph>
          </Chapter>
          <Chapter>
            <ParagraphTitle>37. 999&nbsp;в цене</ParagraphTitle>
            <Paragraph>
              Первая цифра меньше, покупателю кажется выгоднее. Сотрудникам
              сложнее смухлевать, из-за возросшей сложности расчетов.
            </Paragraph>
            <Paragraph>
              Однако возможно вы&nbsp;хотите продавать именно более дорогой
              товар?
            </Paragraph>
            <Guidance>
              Другой способ использования&nbsp;&mdash; задавать себе цели,
              кажущиеся более достижимыми: пробежать не&nbsp;10км, а&nbsp;9,8.
              Или собрание не&nbsp;на&nbsp;2&nbsp;часа,
              а&nbsp;на&nbsp;1ч&nbsp;55м
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>
              38а. Феномен перцептивного контраста
            </ParagraphTitle>
            <Paragraph>
              Восприятие предложения можно изменить, не&nbsp;меняя при этом
              самого предложения.
            </Paragraph>
            <Example>
              Бутылка вина за&nbsp;35&nbsp;долларов кажется дорогой, если она
              стоит среди вин по&nbsp;15&nbsp;долларов, но&nbsp;если окружить
              ее&nbsp;винами за&nbsp;60 долларов, то&nbsp;она наоборот будет
              восприниматься дешевой.
            </Example>
            <Guidance>
              Можно приберечь предложение на&nbsp;которое мы&nbsp;хотим, чтобы
              клиент согласился и&nbsp;продемонстрировать в&nbsp;начале
              несколько неподходящих вариантов. И&nbsp;тогда, когда
              мы&nbsp;сделаем актуальное предложение оно предстанет в&nbsp;более
              выгодном свете.
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>38б. Продукт, затем цена</ParagraphTitle>
            <Paragraph>
              Если расчет не&nbsp;элементарный больше внимания уделяется первому
              пункту и&nbsp;видимо, если первый пункт несет пользу
              у&nbsp;не&nbsp;траты, то предложение выглядит более заманчивым.
            </Paragraph>
            <Example>
              <UnorderedList>
                <Clause>
                  21&nbsp;Гб за&nbsp;370 рублей предпочтительнее чем 370 рублей
                  за&nbsp;31гб.
                </Clause>
                <Clause>
                  23&nbsp;проектов за&nbsp;2,5 года работы лучше чем 2,5 года
                  работы и 23&nbsp;проектов.
                </Clause>
              </UnorderedList>
            </Example>
            <Paragraph>
              Если расчеты сделать легко , то&nbsp;нет значительной разницы.
            </Paragraph>
            <Example>10гб за&nbsp;200руб или 200руб за&nbsp;10гб</Example>
          </Chapter>
          <Chapter>
            <ParagraphTitle>39. Бонусы</ParagraphTitle>
            <Paragraph>
              Бесплатный бонус к&nbsp;основной услуги обесценивает&nbsp;ее.
              Словно вы добавляете теплую воду в&nbsp;горячую.
            </Paragraph>
            <Guidance>
              Вместо маленького бонуса для каждого клиента лучше сделайте
              большой бонус для избранных клиентов, на&nbsp;ту&nbsp;же сумму.
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>40. Выяснение возможной платы</ParagraphTitle>
            <Paragraph>
              Когда человек собирается приобрести несколько однотипных
              предметов, когда он&nbsp;сам указывает цену или сделать
              пожертвование группе людей, то&nbsp;если его сначала спросить
              сколько&nbsp;бы он пожертвовал одному из&nbsp;группы, а&nbsp;потом
              только попросить сделать пожертвование для всех, то&nbsp;величины
              пожертвования может значительно возрасти. Важно чтобы группа была
              разменной величины &mdash;&nbsp;на&nbsp;десятках тысяч такая
              стратегия уже не&nbsp;сработает
            </Paragraph>
            <Example>
              Перед тем как запросить у&nbsp;руководства годовой бюджет на
              командировки, сначала спросить как руководство оценивает бюджет
              на&nbsp;одну командировку
            </Example>
          </Chapter>
          <Chapter>
            <ParagraphTitle>41. Детализированное дополнение</ParagraphTitle>
            <Paragraph>
              Подчеркивайте особенности тех людей, для кого вы&nbsp;делаете свои
              продукты или кому вы&nbsp;оказываете помощь. Цвет волос,
              увлечения, что-то что позволить представить конкретного живого
              человека, а не&nbsp;абстрактного.
            </Paragraph>
            <Example>
              Фотография пациента в&nbsp;его карточке делает отношение
              к&nbsp;нему более человечным.
            </Example>
          </Chapter>
          <Chapter>
            <ParagraphTitle>42. Альтернативные издержки</ParagraphTitle>
            <Paragraph>
              Есть разница между выбором &laquo;купить dvd или не&nbsp;купить
              dvd&raquo; или &laquo;Купить dvd или приберечь деньги
              на&nbsp;что-нибудь другое&raquo;. Как не трудно предположить,
              во&nbsp;втором варианте купят меньше dvd.
            </Paragraph>
            <Example>
              Реклама икеи: дизайнерский шкафчик для обуви и&nbsp;одна пара
              за&nbsp;1700 долларов или икеевский шкафчик и&nbsp;30&nbsp;пар
              обуви за&nbsp;1670
            </Example>
          </Chapter>
          <Chapter>
            <ParagraphTitle>43. Теория малых количеств</ParagraphTitle>
            <Quote>
              Теория малых количеств предполагает, что на&nbsp;каком&nbsp;бы
              этапе накопления баллов не&nbsp;находился данный клиент, обратная
              связь должна сосредотачиваться на&nbsp;небольших шагах,
              будь&nbsp;то уже достигнутые успехи или еще оставшиеся усилия
            </Quote>
            <Example>
              Если надо пробежать 10&nbsp;км, то&nbsp;первую половину пути
              следует думать о&nbsp;том сколько км&nbsp;вы&nbsp;уже пробежали,
              а&nbsp;вторую о&nbsp;том, сколько еще осталось
            </Example>
          </Chapter>
          <Chapter>
            <ParagraphTitle>44. Мотивирующее задание</ParagraphTitle>
            <Paragraph>
              Если выбор прост и&nbsp;мотивация выполнить задачу сильна,
              то&nbsp;цели достигают чаще&nbsp;те, кто имеет свободу действий.
              Но&nbsp;если выбор сложнее или уровень мотивации ниже,
              то&nbsp;цели скорее достигают&nbsp;те, кому предписан заданный
              режим&nbsp;&mdash; определенная последовательность действий.
            </Paragraph>
          </Chapter>
          <Chapter>
            <ParagraphTitle>45. Эффект изменения категории</ParagraphTitle>
            <Paragraph>
              Мотивация заполучить две вещи из&nbsp;разных категорий гораздо
              выше, чем получить две вещи одной категории, при прочих равных.
              Люди начинают считать, что они что-то &laquo;проиграют&raquo;,
              если не&nbsp;заполучат по&nbsp;вещи из&nbsp;каждой категории.
            </Paragraph>
            <Guidance>
              Если вы&nbsp;хотите с&nbsp;помощью вознаграждений повлиять
              на&nbsp;людей так, чтобы они выполнили то&nbsp;или иное задание,
              разделите эти приятные мелочи на&nbsp;несколько категорий
              одинаковой ценности
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>47. Учитесь на&nbsp;чужих ошибках</ParagraphTitle>
            <Paragraph>
              Истории успеха приносят мало пользы, потому что успех сопутствует
              много факторов и&nbsp;практически невозможно воспроизвести
              их&nbsp;все. А&nbsp;вот причины неудач определить гораздо легче.
              При изучении чужих ошибок не&nbsp;будет желания оправдать их
              внешними факторами, потому что не&nbsp;нужно пытаться защитить
              свое эго.
            </Paragraph>
            <Guidance>
              Стоит интересоваться не&nbsp;удачами и&nbsp;вызвавшими
              их&nbsp;действиями и&nbsp;не повторять&nbsp;их. Педагоги могут
              подчеркивать ошибки прошлых групп студентов, врачи пациентов,
              а&nbsp;тренеры спортсменов.
            </Guidance>
          </Chapter>
          <Chapter>
            <ParagraphTitle>48. Учитесь на&nbsp;своих ошибках</ParagraphTitle>
            <Paragraph>
              Процессу обучения способствуют фразы&nbsp;&mdash; &laquo;Чем
              больше ошибок вы&nbsp;делаете, тем больше знаний
              приобретаете&nbsp;&mdash; Делать ошибки естественно&raquo;. Ошибки
              показывают, на&nbsp;что именно следует обратить внимание
              в&nbsp;первую очередь Высокий уровень обслуживания &mdash; это
              не&nbsp;полное избегание ошибок, а&nbsp;своевременное
              их&nbsp;исправление.
            </Paragraph>
            <Quote>
              В&nbsp;бизнесе лучше не&nbsp;предотвращать ошибки,
              а&nbsp;избавляться от&nbsp;них.
            </Quote>
          </Chapter>
          <Chapter>
            <ParagraphTitle>49. Момент для отзыва</ParagraphTitle>
            <Paragraph>
              Положительное мнение в&nbsp;интернете имело&nbsp;бы такую&nbsp;же
              ценность, как и&nbsp;отрицательное, если&nbsp;бы было указанно,
              что оно основано на сегодняшнем опыте.
            </Paragraph>
          </Chapter>
          <Chapter>
            <ParagraphTitle>51. Тактильный контакт</ParagraphTitle>
            <Quote>
              У&nbsp;всех участников эксперимента, которым дали возможность
              потрогать товар, эмоциональная реакция на&nbsp;него была более
              позитивной, а&nbsp;тактильный контакт сделал ощущение
              собственности сильнее
            </Quote>
            <Paragraph>
              Важно только, чтобы товар был либо нейтральный, либо приятный на
              ощупь
            </Paragraph>
          </Chapter>
          <Chapter>
            <ParagraphTitle>52. Эффект пика-конца</ParagraphTitle>
            <Paragraph>
              После того как мы&nbsp;вышли из&nbsp;состояния в&nbsp;котором
              находились какое-то время (отпуск, врачебная процедура) самые
              сильные воспоминания у&nbsp;нас будут о&nbsp;пиковом моменте
              события и&nbsp;о&nbsp;его конце. Человек склонен обращать
              не&nbsp;слишком много внимания на продолжительность события
            </Paragraph>
          </Chapter>
          <Chapter>
            <ParagraphTitle>
              53. Оптимальное едииновременное количество стратегий убеждения
            </ParagraphTitle>
            <Paragraph>
              Наиболее эффективное количество утверждений в&nbsp;рекламе &mdash;
              три, дальше слушатель уже насторожится.
            </Paragraph>
          </Chapter>
        </ChaptersList>
      </main>
    </Container>
  );
}

export default Chaldini;
