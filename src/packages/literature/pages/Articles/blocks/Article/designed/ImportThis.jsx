import React from 'react';
import {
  Chapter,
  ChaptersList,
  ChapterWithCounter,
  Container,
  Example,
  Header,
  Paragraph,
  ParagraphTitle,
  ParagraphTitleWithCounter,
  Quote,
  AdditionalInfo,
  Reference,
  YoutubeVideo,
} from './themeComponents/lora';

function ImportThis() {
  return (
    <Container>
      <Header>
        <Reference>
          По&nbsp;мотивам корпоративного выступления от&nbsp;08.08.2019
        </Reference>
        <h1>import this</h1>
        <h3>
          19&nbsp;принципов достижения Дзена при написании компьютерных программ
        </h3>
      </Header>
      <main>
        <Paragraph>
          Хороший код&nbsp;&mdash; понятие субъективное. Я&nbsp;приписываю ему
          два основных качества: его должно быть легко понять и&nbsp;в&nbsp;него
          должно быть легко внести изменения. Таким образом, хороший код
          остается легко дорабатываемым. Это качество высоко оценят
          и&nbsp;заказчик и коллеги-программисты. В&nbsp;этой статье
          я&nbsp;делюсь своими подходами к написанию кода.
        </Paragraph>
        <ChaptersList>
          <Chapter>
            <ParagraphTitle>Import this.</ParagraphTitle>
            <Paragraph>
              Если вы&nbsp;работали с&nbsp;Питоном, то&nbsp;возможно слышали про
              пасхалку из заголовка статьи. Если выполнить в&nbsp;стандартном
              интерпретаторе Питона import this, то&nbsp;будет выведен девиз
              из&nbsp;девятнадцати предложений, называемый Zen of&nbsp;Python.
              <YoutubeVideo youtubeId="8BvOfsMN8bI" />
            </Paragraph>
            <Paragraph>
              Пусть эти постулаты несколько туманны и&nbsp;даже порой
              противоречивы, мне они все равно нравятся, за&nbsp;то, что наводят
              на&nbsp;размышления из которых можно вывести более четкие правила.
            </Paragraph>
          </Chapter>
          <ChapterWithCounter>
            <ParagraphTitle>
              Beautiful is&nbsp;better than ugly.
              <AdditionalInfo>Красивое лучше, чем уродливое.</AdditionalInfo>
            </ParagraphTitle>
            <Quote>
              &laquo;Некрасивое решение&nbsp;&mdash; точно неправильное.
              Красивое &mdash; возможно правильное.&raquo;
            </Quote>
            <Paragraph>
              К&nbsp;сожалению, не&nbsp;вспомнил автора афоризма.
              В&nbsp;оригинале имелась ввиду математическая задача,
              но&nbsp;не&nbsp;вижу препятствий, в&nbsp;применении цитаты
              к&nbsp;решениям в&nbsp;разработке ПО. Перефразируя, если
              вы&nbsp;нашли решение, но&nbsp;оно вас смущает
              по&nbsp;эстетическим причинам, то&nbsp;наверняка можно найти более
              ловкий подход или хотя&nbsp;бы попытаться это сделать.
            </Paragraph>
            <Paragraph>
              В&nbsp;коде следует избегать избыточных действий
              и&nbsp;информации. Иногда лишняя информация не&nbsp;совсем
              очевидна. Например, если ваши данные неупорядоченны,
              то&nbsp;некрасиво использовать их&nbsp;для хранения массив.
            </Paragraph>
            <Paragraph>
              Сам массив (не&nbsp;кортеж), обыкновенно подразумевает обращение
              к&nbsp;его элементам путем перебора. Поэтому обращение
              к&nbsp;элементу массива по индексу выглядит некрасиво
              и&nbsp;вероятно свидетельствует о&nbsp;неудачном архитектурном
              решении.
            </Paragraph>
            <Paragraph>
              Еще я&nbsp;пользуюсь принципом, который назвал про себя принципом
              симметрии, полагаю у&nbsp;него есть и&nbsp;нормальное, научное,
              название. Он о&nbsp;том, что если два понятия находятся
              на&nbsp;одном уровне абстракции, то&nbsp;обращения к&nbsp;ним
              должны происходить схожим образом. В&nbsp;противном случае,
              в&nbsp;коде одно или несколько из&nbsp;таких обращений начинают
              обрабатываться как исключительные ситуации, что не&nbsp;есть
              хорошо. Но об&nbsp;этом чуть позже.
            </Paragraph>
          </ChapterWithCounter>
          <ChapterWithCounter>
            <ParagraphTitle>
              Explicit is&nbsp;better than implicit.
              <AdditionalInfo>Явное лучше, чем неявное.</AdditionalInfo>
            </ParagraphTitle>
            <Paragraph>
              Кажется это уже притча во&nbsp;языцех. Но&nbsp;все-таки
              в&nbsp;программистах, в том числе и&nbsp;во&nbsp;мне, живет
              непреодолимое стремление сделать какой-нибудь трюк в&nbsp;коде.
              Считается, что знание всяких квирков это индикатор знания языка.
              Возможно, по&nbsp;количеству изученных хаков удобно отсекать
              соискателей на&nbsp;собеседовании, но&nbsp;я&nbsp;бы поспорил с
              практичностью этого подхода.
            </Paragraph>
            <Paragraph>
              По&nbsp;крайней мере в&nbsp;прикладном коде они крайне
              нежелательны, т.к. скорее напоминают архивирование,
              а&nbsp;не&nbsp;оптимизацию. И&nbsp;коллеги, прежде чем смогут
              приняться за&nbsp;полезную работу, будут обречены на распаковку
              оригинальных идей, спрятанных за&nbsp;необычными комбинациями
              операторов.
            </Paragraph>
            <Paragraph>
              Если язык или библиотека дают вам возможность что-то сделать
              неявно, стоит подумать дважды, прежде чем пользоваться этим. Ведь
              для ваших коллег, да&nbsp;и&nbsp;скорее всего для вас
              в&nbsp;будущем, смысл происходящего тоже станет неявен.
              И&nbsp;придется потратить время на разбирательства.
            </Paragraph>
            <Paragraph>
              Использование значения по&nbsp;умолчанию&nbsp;&mdash; это тоже про
              неявное присваивание. Проблема в&nbsp;том, что не&nbsp;всегда
              понятно, соответствует ли&nbsp;такое поведение замыслу
              программиста или он&nbsp;просто забыл передать соответствующий
              параметр.
            </Paragraph>
            <Paragraph>
              Есть конечно и&nbsp;исключения из&nbsp;этого правила, которые
              продиктованы здравым смыслом. Например контекст. Контекст
              используется, чтобы не&nbsp;передавать ссылки через нескольких
              посредников. При разумном использовании это делает код более
              кратким, емким и&nbsp;надежным. И это преимущество контекста
              перевешивает издержки от&nbsp;его неявной сути.
            </Paragraph>
            <Paragraph>
              Тем не&nbsp;менее, можно проследить, как контекст остается
              в&nbsp;поле сакральных знаний о&nbsp;проекте. Например, если
              мы&nbsp;передаем в контексте сведения об&nbsp;используемом
              устройстве, новичок в&nbsp;проекте может не&nbsp;заметить этого
              и&nbsp;продублировать вычисления в&nbsp;своем компоненте.
            </Paragraph>
          </ChapterWithCounter>
          <ChapterWithCounter>
            <ParagraphTitle>
              Simple is&nbsp;better than complex.
              <AdditionalInfo>Простое лучше, чем сложное.</AdditionalInfo>
            </ParagraphTitle>
            <ParagraphTitleWithCounter>
              Complex is&nbsp;better than complicated.
              <AdditionalInfo>Сложное лучше, чем запутанное.</AdditionalInfo>
            </ParagraphTitleWithCounter>
            <Paragraph>
              Согласно{' '}
              <a href="https://www.ozon.ru/context/detail/id/142768363/">
                Стивену Макконелу
              </a>
              , главный принцип разработки ПО&nbsp;&mdash; это управление
              сложностью. Сложность и&nbsp;непредсказуемость окружающего мира
              передается бизнес-правилам. Без контроля она выйдет за&nbsp;рамки
              когнитивных способностей человека. То&nbsp;есть взорвет
              исполнителю мозг, т.к. есть предел у&nbsp;количества информации,
              которой можно оперировать в&nbsp;один момент времени.
            </Paragraph>
            <Paragraph>
              Не&nbsp;уследив за&nbsp;сложностью, приходится тратить драгоценное
              время на разбор багов, разбор полетов или разработку безопасных
              воркараундов. А&nbsp;воркараунды порочным кругом ведут
              к&nbsp;росту сложности проекта. Фичи пилятся медленнее, баги все
              более запутанные и&nbsp;всем от&nbsp;этого грустно.
            </Paragraph>
            <Paragraph>
              Поэтому, со&nbsp;сложностью надо бороться. Следить
              за&nbsp;связностью и зацеплением. Вместо методов Бога, состоящих
              из&nbsp;сотен строк, использовать небольшие, связанные методы,
              на&nbsp;понимание которых требуется минимальное время,
              а&nbsp;также выносить в&nbsp;отдельные модули утилиты, компоненты.
            </Paragraph>
            <Paragraph>
              Стоит подумать о&nbsp;том, насколько обширна область,
              в&nbsp;которую придется погрузиться вашим коллегам, когда придет
              их&nbsp;очередь работать с&nbsp;вашим кодом. Это и&nbsp;объем
              кода, и&nbsp;сущности которые в&nbsp;нем описаны. Можно сузить
              область, выделив сущности в&nbsp;отдельные пакеты
              и&nbsp;подготовив АПИ для использования их&nbsp;в&nbsp;основной
              части приложения.
            </Paragraph>
            <Paragraph>
              Кроме борьбы со&nbsp;сложностью в&nbsp;коде, боритесь с&nbsp;ней
              и&nbsp;в бизнес-логике. Все равно, бизнес-логика это карта
              и&nbsp;она не&nbsp;станет территорией. Но&nbsp;каждая
              дополнительная деталь стоит времени и денег. Иногда это
              оправданно, иногда нет, ваш продакт-менеджер как раз
              и&nbsp;занимается тем, что определяет, какой участок
              детализировать следующим. У&nbsp;вас с&nbsp;ним одна
              цель&nbsp;&mdash; качественный продукт. И&nbsp;если вы вместе
              найдете способ уменьшить сложность бизнес-логики&nbsp;&mdash;
              выиграют все.
            </Paragraph>
          </ChapterWithCounter>
          <ChapterWithCounter>
            <ParagraphTitle>
              Flat is&nbsp;better than nested.
              <AdditionalInfo>Плоское лучше, чем вложенное.</AdditionalInfo>
            </ParagraphTitle>
            <Paragraph>
              В&nbsp;иерархических структурах кажется хорошей идеей
              рассматривать только два уровня за&nbsp;раз. Это относится
              и&nbsp;к&nbsp;ветвлению в&nbsp;коде, и&nbsp;к декомпозиции
              объектов. Глубокая вложенность&nbsp;&mdash; это сигнал, что на
              данном участке кода сконцентрирована излишняя сложность.
            </Paragraph>
            <Paragraph>
              Когда в&nbsp;коде встречается ветвление глубиной больше чем один
              уровень, то&nbsp;стоит подумать о&nbsp;рефакторинге и&nbsp;вынести
              вложенные инструкции в&nbsp;отдельный метод.
            </Paragraph>
            <Paragraph>
              Обращение к&nbsp;полям объекта, вложенным на&nbsp;нескольких
              уровнях&nbsp;&mdash; может быть сигналом о&nbsp;чрезмерно
              разросшейся сущности или о&nbsp;том, что метод пытается работать
              с&nbsp;разными уровнями абстракции.
            </Paragraph>
            <Paragraph>
              Обращение к&nbsp;полю поля класса, это подозрительно
              и&nbsp;ненадежно, следует подумать о&nbsp;создании геттера.
            </Paragraph>
          </ChapterWithCounter>
          <ChapterWithCounter>
            <ParagraphTitle>
              Sparse is&nbsp;better than dense.
              <AdditionalInfo>Разреженное лучше, чем плотное.</AdditionalInfo>
            </ParagraphTitle>
            <Paragraph>
              В&nbsp;моей интерпретации это правило о&nbsp;том, что не&nbsp;надо
              стараться уместить как можно больше логики в&nbsp;одну
              конструкцию. Наоборот, следует каждый шаг вычисления выделять
              в&nbsp;отдельное выражение. Тем более не&nbsp;стоит экономить
              на&nbsp;строках или символах в&nbsp;коде. Это перекликается
              и&nbsp;с&nbsp;предыдущим тезисом про плоскую структуру.
            </Paragraph>
            <Paragraph>
              Есть одна вещь которую программисту стоит любить больше, чем
              писать код&nbsp;&mdash; это удалять код. Я&nbsp;бы считал
              причастившимися к&nbsp;Дзену тех программистов, у&nbsp;которых
              удаление собственного кода вызывает не&nbsp;сожаление,
              а&nbsp;удовлетворение и&nbsp;чувство хорошо сделанной работы.
            </Paragraph>
            <Paragraph>
              Кодовая база, она как здание. Если кто-то живет один,
              в&nbsp;огромном особняке, то&nbsp;площади простаивают
              и&nbsp;приносят убыток. Ведь за&nbsp;них надо платить:
              за&nbsp;коммуналку, за&nbsp;тепло, за&nbsp;уборку. В&nbsp;коде это
              сложность понимания, возможные баги, затраты на&nbsp;тестирование.
              Каждая, как лишняя, так и&nbsp;нужная инструкция требует свою
              арендную плату. Такая ситуация может возникнуть и&nbsp;когда
              в&nbsp;большом доме жило много жильцов, а&nbsp;потом часть
              разъехались, т.е. какая-то функциональность стала не&nbsp;нужна.
              Дом, конечно, не&nbsp;стоит сносить, но&nbsp;можно подумать
              о&nbsp;размене. Неиспользуемый код&nbsp;же надо удалять,
              безусловно и&nbsp;хладнокровно. В&nbsp;конце-концов, старый код
              остается в истории системы контроля версий.
            </Paragraph>
          </ChapterWithCounter>
          <ChapterWithCounter>
            <ParagraphTitle>
              Readability counts.
              <AdditionalInfo>Читаемость имеет значение.</AdditionalInfo>
            </ParagraphTitle>
            <Paragraph>
              Уже многое сказано про&nbsp;то, что код пишут один раз,
              а&nbsp;читают десять раз. Поэтому, если нашелся способ написать
              код понятнее, но&nbsp;он противоречит одной из&nbsp;принятых
              в&nbsp;вашей команде практик, то предпочтительнее разово
              отказаться от&nbsp;практики.
            </Paragraph>
            <Paragraph>
              Упомяну и&nbsp;комментарии в&nbsp;коде. Комментарии нужно писать
              только если без них никак. Хороший код объясняет сам себя,
              а&nbsp;костыли и воркараунды редко удается понять с&nbsp;первого
              взгляда, вот они и требуют дополнительных разъяснений. Поэтому,
              даже уместные комментарии являются признаком костылей.
            </Paragraph>
            <Paragraph>
              Но&nbsp;это нормально. Не&nbsp;страшно признаться в&nbsp;написании
              костыля. Тот кто будет работать с&nbsp;таким кодом все равно
              увидит его сущность. Зато, прочитав в&nbsp;комментарии
              о&nbsp;причинах и&nbsp;области, на&nbsp;которую стоит обратить
              внимание, следующий программист скорее почувствует благодарность
              взамен раздражения. Объяснение сэкономит ему время
              на&nbsp;понимание кода, отладку и&nbsp;продумывание тест-кейсов.
            </Paragraph>
            <Paragraph>
              Большой минус у&nbsp;комментариев в&nbsp;коде в&nbsp;том, что они
              устаревают. Слишком часто при внесении правок в&nbsp;код забывают
              проверить сопутствующие комментарии. Этого недостатка лишены
              комментарии к коммитам.
            </Paragraph>
            <Paragraph>
              У&nbsp;комментариев к&nbsp;коммитам есть прекрасные свойства,
              отличающие их от&nbsp;комментариев к&nbsp;коду: они
              не&nbsp;загромождают код и&nbsp;они всегда актуальны, потому что
              они привязаны к&nbsp;моменту коммита. И&nbsp;если код будет стерт,
              то&nbsp;и&nbsp;аннотацию к&nbsp;нему уже никто не&nbsp;увидит.
            </Paragraph>
            <Paragraph>
              Описывайте в&nbsp;комментах к&nbsp;коммиту, какие решения
              вы&nbsp;рассмотрели, почему приняли одно и&nbsp;отвергли другие.
              Какие особые случаи учтены в&nbsp;ваших правках. Полезно добавлять
              ссылки на&nbsp;ишью, макет. Можно даже скопировать переписку
              по&nbsp;теме с&nbsp;коллегами. Описание того что сделано
              в&nbsp;коммите не&nbsp;так важно, потому что обычно это и&nbsp;так
              понятно из&nbsp;изменений и&nbsp;должно быть понятно
              из&nbsp;задачи, ссылка на которую обязательно должна
              присутствовать. Лично я&nbsp;оставляю описание в&nbsp;заголовке,
              чтобы коммит было проще было найти в&nbsp;списке или можно
              скопировать заголовки для отчета о&nbsp;проделанной работе.
            </Paragraph>
            <Example description="плохой комментарий к коммиту">
              Однажды я&nbsp;правил баг верстки и&nbsp;нашел, что для его
              исправления достаточно удалить одну строку. С&nbsp;этим
              я&nbsp;разобрался за&nbsp;15&nbsp;минут. В блейме, в&nbsp;коммите
              с&nbsp;этой строкой, было написано &laquo;фикс верстки&raquo;. Еще
              два часа я&nbsp;искал, какую верстку и&nbsp;в&nbsp;каком браузере
              фиксит та строка и&nbsp;не&nbsp;нашел. Так ее&nbsp;и&nbsp;удалил.
              Мораль: 1&nbsp;минута при коммите может сэкономить два часа
              отладки. Даже если пригодится только каждый 120
              коммит&nbsp;&mdash; кто-то не&nbsp;испытает боль, может
              и&nbsp;вы&nbsp;сами. А значит мир станет чуточку лучше.
            </Example>
          </ChapterWithCounter>
          <ChapterWithCounter>
            <ParagraphTitle>
              Special cases aren&rsquo;t special enough to&nbsp;break the rules.
              <AdditionalInfo>
                Особые случаи не&nbsp;настолько особые, чтобы нарушать правила.
              </AdditionalInfo>
            </ParagraphTitle>
            <Paragraph>
              Количество проблем и&nbsp;боли в&nbsp;приложении пропорционально
              его сложности. Сложность&nbsp;же растет с&nbsp;каждым исключением
              из&nbsp;правил. Это касается и&nbsp;бизнес-логики, и&nbsp;трюков
              с&nbsp;языком программирования, и организации приложения.
              Например, если все утилиты лежат в&nbsp;одной папке, но&nbsp;еще
              несколько в&nbsp;другой&nbsp;&mdash; это тоже сложно. Поэтому, при
              соблазне сделать исключение, подумайте хорошенько, можно&nbsp;ли
              обойтись общим правилом или разумно будет внести правку
              в&nbsp;общий код, чтобы в&nbsp;него гармонично уложилась
              и&nbsp;новая логика. Если исключения вам подбросили дизайнеры или
              продакт-менеджер &mdash; обсудите их&nbsp;отдельно, укажите
              на&nbsp;их&nbsp;цену. Конечно, совсем без исключений
              не&nbsp;обойтись, однако важно понять, стоит&nbsp;ли овчинка
              выделки.
            </Paragraph>
          </ChapterWithCounter>
          <ChapterWithCounter>
            <ParagraphTitle>
              Although practicality beats purity.
              <AdditionalInfo>
                При этом практичность важнее безупречности.
              </AdditionalInfo>
            </ParagraphTitle>
            <Paragraph>
              Выполнять все правила невозможно, не&nbsp;хватит времени
              и&nbsp;сил. Фанатичное стремление к&nbsp;идеалу&nbsp;&mdash;
              недостаток для хорошего инженера. Поэтому иногда правила можно
              нарушать, особенно, если понятно, зачем вы&nbsp;это делаете
              и&nbsp;можете объяснить другим.
            </Paragraph>
            <Paragraph>
              Люди важнее технологий. Всех не&nbsp;заставишь мыслить одинаково.
              Иногда надо давать людям допускать ошибки и&nbsp;учиться
              на&nbsp;них. А иногда может оказаться, что заблуждение было
              на&nbsp;вашей стороне. Если у&nbsp;вас есть супер-правило,
              супер-подход или еще что-то, но команда его не&nbsp;приняла,
              то&nbsp;и&nbsp;фиг с&nbsp;ним!
            </Paragraph>
            <Paragraph>
              Правила нужны не&nbsp;потому что они самые правильные
              и&nbsp;истина в последней инстанции, а&nbsp;потому что они для
              всех одни. Гребем под одну гребёнку и&nbsp;создаём конвейер,
              повышая производительность труда. Из&nbsp;правил, прошедших
              конкурентный отбор вырастают лучшие практики.
            </Paragraph>
            <Paragraph>
              И&nbsp;все&nbsp;же, костыли лучше писать изолированно
              и&nbsp;инкапсулировано, где-нибудь в&nbsp;отдельном методе,
              желательно с&nbsp;пометкой unsafe. Тогда в&nbsp;лучшие времена
              можно будет отрезать ниточку ведущую к&nbsp;плохому коду
              и&nbsp;привязать новое блестящее решение.
            </Paragraph>
          </ChapterWithCounter>
          <ChapterWithCounter>
            <ParagraphTitle>
              Errors should never pass silently.
              <AdditionalInfo>
                Ошибки никогда не&nbsp;должны замалчиваться.
              </AdditionalInfo>
            </ParagraphTitle>
            <ParagraphTitleWithCounter>
              Unless explicitly silenced.
              <AdditionalInfo>Если не&nbsp;замалчиваются явно.</AdditionalInfo>
            </ParagraphTitleWithCounter>
            <Paragraph>
              Про обработку ошибок обычно думают в&nbsp;последнюю очередь
              и&nbsp;делают абы как. А&nbsp;без корректной обработки проект
              получается разбалансированным. Мой совет&nbsp;&mdash; уделить
              дополнительное время и разработать надежную и&nbsp;удобную систему
              обработки ошибок в приложении.
            </Paragraph>
            <Paragraph>
              Самый опасный порок&nbsp;&mdash; это замалчивание ошибок, когда
              приложение столкнувшись с&nbsp;непредусмотренной ситуацией
              продолжает работу, хотя известно, что в&nbsp;стейте у&nbsp;него
              некорректные данные.
            </Paragraph>
            <Paragraph>
              Можно исправлять ошибочные данные на&nbsp;безопасные дефолтные
              значения, но&nbsp;это тоже путь к&nbsp;непредсказуемому
              и&nbsp;ошибочному поведению.
            </Paragraph>
            <Paragraph>
              Разумный, хоть и&nbsp;болезненный путь&nbsp;&mdash; это fast fail,
              когда состояние приложения проверяется на&nbsp;консистентность
              в&nbsp;каждом значимом узле, а&nbsp;при обнаружении ошибки
              выбрасывается исключение. Так большинство проблем будут обнаружены
              на&nbsp;этапах отладки и&nbsp;тестирования. Недостаток
              у&nbsp;этого подхода в&nbsp;том, что он&nbsp;снижает надежность
              работы приложения, и&nbsp;иногда несущественные проблемы будут
              вызывать креш на&nbsp;стороне пользователя.
            </Paragraph>
            <Paragraph>
              Таким образом, для важного кода, вроде расчета стоимости услуги,
              скорее должен быть применен fast-fail. А&nbsp;для несущественного,
              вроде расчета анимации, можно явно перехватить исключение и
              прекратить его распространение. Какой участок кода важный,
              а&nbsp;какой нет&nbsp;&mdash; следует определять
              по&nbsp;требованиям со&nbsp;стороны архитектуры и бизнес-логики.
            </Paragraph>
          </ChapterWithCounter>
          <ChapterWithCounter>
            <ParagraphTitle>
              In&nbsp;the face of&nbsp;ambiguity, refuse the temptation
              to&nbsp;guess.
              <AdditionalInfo>
                Встретив двусмысленность, отбрось искушение угадать.
              </AdditionalInfo>
            </ParagraphTitle>
            <Paragraph>
              Следует избегать любой двусмысленности в&nbsp;коде. Не&nbsp;стоит
              использовать слишком общие имена переменных. Самый яркий пример -
              &laquo;data&raquo;. Оно означает все и&nbsp;ничего одновременно.
              Это индикатор того, что автор сам до&nbsp;конца не&nbsp;продумал,
              что происходит в рассматриваемом участке кода. Вместо
              &laquo;data&raquo; нужно точно и однозначно указать, какая
              сущность используется.
            </Paragraph>
            <Paragraph>
              В&nbsp;проекте не&nbsp;должны использоваться переменные
              с&nbsp;одинаковым названием для разных сущностей бизнес-логики. И,
              наоборот, одинаковые сущности бизнес-логики должны храниться
              в&nbsp;переменных с одинаковыми названиями, пусть даже
              в&nbsp;не&nbsp;связанных участках системы. Это очень упростит
              рефакторинг и&nbsp;поиск по&nbsp;проекту.
            </Paragraph>
            <Paragraph>
              В&nbsp;коде, имеющем дело с&nbsp;бизнес-логикой не&nbsp;следует
              использовать названия переменных вроде &laquo;value&raquo;,
              &laquo;file&raquo;, &laquo;list&raquo;. Используйте конкретные
              термины, понятные продакт-менеджеру: &laquo;lastnameValue&raquo;,
              &laquo;monthlySalesReportFile&raquo;, &laquo;flightsList&raquo;.
            </Paragraph>
            <Paragraph>
              &laquo;value&raquo;, &laquo;file&raquo;, &laquo;list&raquo;
              допустимы в&nbsp;абстрактном коде, когда речь идет действительно
              о&nbsp;произвольном значении или файле. Естественно,
              не&nbsp;следует смешивать код, оперирующий абстрактными понятиями,
              и код про бизнес-логику.
            </Paragraph>
          </ChapterWithCounter>
          <ChapterWithCounter>
            <ParagraphTitle>
              There should be&nbsp;one&nbsp;&mdash; and preferably only
              one&nbsp;&mdash; obvious way to&nbsp;do it.
              <AdditionalInfo>
                Должен существовать один&nbsp;&mdash; и, желательно, только один
                &mdash; очевидный способ сделать это.
              </AdditionalInfo>
            </ParagraphTitle>
            <ParagraphTitleWithCounter>
              Although that way may not be&nbsp;obvious at&nbsp;first unless
              you&rsquo;re Dutch*.
              <AdditionalInfo>
                Хотя он&nbsp;поначалу может быть и&nbsp;не&nbsp;очевиден, если
                вы&nbsp;не голландец.*
                <AdditionalInfo>
                  *Шутливый намек на&nbsp;создателя Питона.
                </AdditionalInfo>
              </AdditionalInfo>
            </ParagraphTitleWithCounter>
            <Paragraph>
              При разработке программного обеспечения постоянно приходится
              принимать решения: какую выбрать технологию; использовать&nbsp;ли
              библиотеку или написать велосипед; как назвать переменную, которая
              описывает надбавку на&nbsp;скидку за&nbsp;третью покупку
              дополнительной услуги в&nbsp;статусе премиум. Иногда
              на&nbsp;ум&nbsp;ничего не&nbsp;приходит. Иногда сразу несколько
              решений. Иногда программист видит только одно решение
              и&nbsp;принимает его.
            </Paragraph>
            <Paragraph>
              Если решений нет, все просто&nbsp;&mdash; их&nbsp;надо искать.
              В&nbsp;крайнем случае, не&nbsp;решать проблему&nbsp;&mdash; тоже
              решение.
            </Paragraph>
            <Paragraph>
              Если в&nbsp;голову пришло только одно единственное решение, уже
              неплохо. Но, как показывает практика, редко когда это первое и
              единственное &laquo;наивное&raquo; решение обходится без
              недостатков.
            </Paragraph>
            <Paragraph>
              Поэтому, хорошей тактикой может быть не&nbsp;останавливаться
              на&nbsp;первом решении, но&nbsp;попробовать найти альтернативы.
              Особенно это актуально для сложных задач. И&nbsp;уже
              сравнив&nbsp;их, обратив внимание на преимущества
              и&nbsp;недостатки каждого решения, выбрать наилучшее, исходя
              из&nbsp;знаний и&nbsp;принятых практик. После такого анализа
              с&nbsp;учетом найденных при сравнении и&nbsp;обдумывании
              аргументов должно выделиться &laquo;очевидное&raquo; решение.
            </Paragraph>
          </ChapterWithCounter>
          <ChapterWithCounter>
            <ParagraphTitle>
              Now is&nbsp;better than never.
              <AdditionalInfo>Сейчас лучше, чем никогда.</AdditionalInfo>
            </ParagraphTitle>
            <ParagraphTitleWithCounter>
              Although never is&nbsp;often better than *right* now.
              <AdditionalInfo>
                Хотя никогда зачастую лучше, чем прямо сейчас.
              </AdditionalInfo>
            </ParagraphTitleWithCounter>
            <Paragraph>
              Этот пункт про небольшие порции технического долга, при встрече с
              которыми обыкновенно возникает желание записать
              их&nbsp;в&nbsp;todo.
            </Paragraph>
            <Paragraph>
              Все, что важно, но&nbsp;хочется отложить, из-за давления, сроков,
              усталости, лучше сделать прямо сейчас, в&nbsp;рамках задачи.
              Потому что, в&nbsp;большинстве случаев, потом
              означает&nbsp;&mdash; никогда.
            </Paragraph>
            <Paragraph>
              Однако следует с&nbsp;большой щепетильностью
              и&nbsp;пристрастностью отнестись к&nbsp;определению того, что
              действительно важно. И&nbsp;волевым решением навсегда отказаться
              от&nbsp;всех сомнительных задач. В&nbsp;идеале, к&nbsp;моменту
              коммита, все todo должны быть разрешены или отброшены.
            </Paragraph>
            <Example>
              // todo: сделать нормально, на&nbsp;следующей неделе.
            </Example>
          </ChapterWithCounter>
          <ChapterWithCounter>
            <ParagraphTitle>
              If&nbsp;the implementation is&nbsp;hard to&nbsp;explain,
              it&rsquo;s a&nbsp;bad idea.
              <AdditionalInfo>
                Если реализацию сложно объяснить&nbsp;&mdash; идея плоха.
              </AdditionalInfo>
            </ParagraphTitle>
            <ParagraphTitleWithCounter>
              If&nbsp;the implementation is&nbsp;easy to&nbsp;explain,
              it&nbsp;may be&nbsp;a&nbsp;good idea.
              <AdditionalInfo>
                Если реализацию легко объяснить&nbsp;&mdash; идея, возможно,
                хороша.
              </AdditionalInfo>
            </ParagraphTitleWithCounter>
            <Paragraph>
              Если идею трудно объяснить, то&nbsp;ее&nbsp;впоследствии будет
              трудно понять, даже хорошо написанный код останется сложным для
              понимания. Другими словами пострадает читабельность, чего&nbsp;бы
              хотелось избежать. Поэтому, чем сложнее формализовать идею, тем
              важнее это сделать. По&nbsp;ходу дела можно найти либо способы ее
              упрощения, либо оставить описание в&nbsp;качестве документации.
            </Paragraph>
            <Paragraph>
              Одна голова хорошо, а&nbsp;две лучше. Дождитесь пока у&nbsp;вашего
              коллеги освободится минутка и&nbsp;проговорите с&nbsp;ним идею:
              незамыленный взгляд поможет найти явные недостатки,
              да&nbsp;и&nbsp;сами лучше во&nbsp;всем разберетесь.
            </Paragraph>
            <Paragraph />
          </ChapterWithCounter>
          <ChapterWithCounter>
            <ParagraphTitle>
              Namespaces are one honking great idea&nbsp;&mdash; let&rsquo;s
              do&nbsp;more of&nbsp;those!
              <AdditionalInfo>
                Пространства имён&nbsp;&mdash; отличная вещь! Давайте будем
                делать их больше!
              </AdditionalInfo>
            </ParagraphTitle>
            <Paragraph>Какие хорошие идеи есть у&nbsp;вас?</Paragraph>
          </ChapterWithCounter>
        </ChaptersList>
        <ParagraphTitle>Заключение.</ParagraphTitle>
        <Paragraph>
          Мне вся эта философия помогает не&nbsp;скатываться в&nbsp;говнокод.
          Ведь как обычно: надо спешить, некогда думать, делай давай. Держа эти
          принципы в&nbsp;голове я&nbsp;могу отличить правильное решение
          от&nbsp;неправильного. А&nbsp;зная, что правильно, я&nbsp;могу
          отстоять свое мнение перед менеджером и обосновать время
          на&nbsp;проектирование и&nbsp;на&nbsp;решение проблем тех долга.
        </Paragraph>
        <Paragraph>
          Желаю и&nbsp;вам найти свои приемы, чтобы справиться со&nbsp;Сциллами
          и Харибдами на&nbsp;нелегком пути разработчика к&nbsp;качественному
          и&nbsp;любимому продукту.
        </Paragraph>
        <Paragraph>
          Для более подробного погружения в&nbsp;тему, рекомендую книги
          признанных авторитетов,{' '}
          <a href="https://www.ozon.ru/context/detail/id/5011068/">
            &laquo;Чистый Код&raquo;
          </a>{' '}
          Роберта Мартина или{' '}
          <a href="https://www.ozon.ru/context/detail/id/142768363/">
            &laquo;Совершенный Код&raquo;
          </a>{' '}
          Стива Макконела.
        </Paragraph>
      </main>
    </Container>
  );
}

export default ImportThis;
