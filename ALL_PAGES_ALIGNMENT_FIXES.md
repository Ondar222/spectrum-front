# Исправления выравнивания всех страниц

## 🎯 Обзор исправлений

Исправлены все "кривые, не ровные моменты" на следующих страницах:
- ✅ **ServicePage** - Страница услуг
- ✅ **PriceListPage** - Прайс-лист
- ✅ **DoctorsPage** - Страница врачей
- ✅ **PromotionsPage** - Страница акций
- ✅ **ReviewsPage** - Страница отзывов
- ✅ **FAQPage** - Страница вопросов и ответов
- ✅ **DocumentsPage** - Страница документов
- ✅ **ContactsPage** - Страница контактов

## 🔧 Детальные исправления по страницам

### 1. **PromotionsPage.tsx** - Страница акций

#### Проблемы:
- Карточки акций имели разную высоту
- Кнопки "Записаться" не были выровнены
- Текст выглядел неровно

#### Исправления:
```jsx
// Добавлен flexbox layout
<div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
  <div className="p-6 flex flex-col flex-grow">
    <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">{promo.title}</h3>
    <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{promo.description}</p>
    <div className="mt-auto pt-4 border-t border-gray-200">
      {/* Кнопки и дата */}
    </div>
  </div>
</div>
```

#### Результат:
- Одинаковая высота всех карточек
- Кнопки выровнены по горизонтали
- Улучшенная типографика

### 2. **ReviewsPage.tsx** - Страница отзывов

#### Проблемы:
- Карточки отзывов имели разную высоту
- Фото отзывов "плавали" по высоте
- Текст не был структурирован

#### Исправления:
```jsx
// Минимальная высота и flexbox
<div className="bg-white rounded-lg shadow-md p-6 min-h-[200px] flex flex-col">
  <div className="flex justify-between items-start mb-4">
    {/* Заголовок и рейтинг */}
  </div>
  <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{review.text}</p>
  {review.photos && (
    <div className="flex space-x-2 mt-auto">
      {/* Фото прижаты к низу */}
    </div>
  )}
</div>
```

#### Результат:
- Минимальная высота 200px для всех карточек
- Фото отзывов прижаты к низу
- Улучшенная читаемость текста

### 3. **FAQPage.tsx** - Страница вопросов и ответов

#### Проблемы:
- Карточки FAQ имели разную высоту
- Текст ответов выглядел сжато
- Категории не были выделены

#### Исправления:
```jsx
// Минимальная высота и улучшенная структура
<div className="bg-white rounded-lg shadow-md overflow-hidden min-h-[120px] flex flex-col">
  <div className="p-6 flex flex-col flex-grow">
    <div className="flex items-center mb-3">
      <span className="bg-teal/10 text-teal px-3 py-1 rounded-full text-sm font-medium">
        {item.category}
      </span>
    </div>
    <h3 className="text-xl font-semibold mb-3 leading-tight text-gray-900">{item.question}</h3>
    <p className="text-gray-600 whitespace-pre-line leading-relaxed flex-grow">{item.answer}</p>
  </div>
</div>
```

#### Результат:
- Минимальная высота 120px
- Улучшенное выделение категорий
- Лучшая читаемость ответов

### 4. **DocumentsPage.tsx** - Страница документов

#### Проблемы:
- Карточки документов имели разную высоту
- Кнопки "Скачать" не были выровнены
- Информация о файлах выглядела сжато

#### Исправления:
```jsx
// Flexbox с разделителем
<div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col h-full min-h-[200px]">
  <div className="flex-grow">
    <h3 className="text-lg font-semibold text-dark mb-3 leading-tight">{doc.title}</h3>
    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{doc.description}</p>
    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
      {/* Информация о файле */}
    </div>
  </div>
  <div className="mt-auto pt-4 border-t border-gray-200">
    <a className="inline-flex items-center px-6 py-2 bg-primary hover:bg-primaryDark text-white text-sm font-medium rounded-lg transition-colors w-full justify-center">
      Скачать
    </a>
  </div>
</div>
```

#### Результат:
- Одинаковая высота всех карточек
- Кнопки "Скачать" выровнены и растянуты на всю ширину
- Четкое разделение контента и действий

### 5. **ContactsPage.tsx** - Страница контактов

#### Проблемы:
- Карточки контактов и карты имели разную высоту
- Текст контактов выглядел сжато
- Карта не была адаптивной

#### Исправления:
```jsx
// Flexbox для равной высоты
<div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
  <h2 className="text-2xl font-semibold mb-6 text-gray-900">Контактная информация</h2>
  <div className="space-y-6 flex-grow">
    <div>
      <h3 className="font-medium text-gray-700 mb-2">Адрес</h3>
      <p className="text-gray-600 leading-relaxed">г. Москва, ул. Примерная, д. 123</p>
    </div>
    {/* Остальные контакты */}
  </div>
</div>

<div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
  <h2 className="text-2xl font-semibold mb-6 text-gray-900">Как добраться</h2>
  <div className="aspect-w-16 aspect-h-9 flex-grow">
    <iframe className="rounded-lg" />
  </div>
</div>
```

#### Результат:
- Карточки контактов и карты имеют одинаковую высоту
- Улучшенная читаемость контактной информации
- Адаптивная карта с закругленными углами

## 🎨 Общие улучшения

### Консистентные отступы
- **mb-3** - стандартный отступ между элементами
- **pt-4** - отступ сверху для кнопок
- **px-6 py-2** - стандартные отступы кнопок

### Улучшенная типографика
- **leading-tight** - для заголовков
- **leading-relaxed** - для описаний
- **text-gray-900** - для основных заголовков

### Flexbox Layout
- **flex flex-col h-full** - вертикальное расположение с полной высотой
- **flex-grow** - растягивание контентной области
- **mt-auto** - автоматический отступ для кнопок

### Минимальные высоты
- **min-h-[120px]** - для FAQ карточек
- **min-h-[200px]** - для отзывов и документов

## 📱 Адаптивность

Все исправления полностью адаптивны:
- **grid-cols-1** - мобильные устройства
- **md:grid-cols-2** - планшеты
- **lg:grid-cols-3** - десктопы

## 🌟 Итоговый результат

### Единообразный дизайн
- Все карточки имеют одинаковую высоту
- Кнопки выровнены по горизонтали
- Консистентные отступы и интервалы

### Улучшенная читаемость
- Правильное межстрочное расстояние
- Логичная иерархия элементов
- Четкое разделение контента и действий

### Профессиональный вид
- Ровные линии и выравнивание
- Сбалансированные пропорции
- Чистый и аккуратный интерфейс

## 🔍 Ключевые CSS классы

### Flexbox
- `flex flex-col` - вертикальное расположение
- `flex-grow` - растягивание элемента
- `mt-auto` - автоматический отступ сверху
- `h-full` - полная высота

### Текст
- `leading-tight` - плотное межстрочное расстояние
- `leading-relaxed` - расслабленное межстрочное расстояние
- `text-gray-900` - основной цвет заголовков

### Отступы
- `mb-3` - отступ снизу
- `pt-4` - отступ сверху
- `px-6 py-2` - внутренние отступы кнопок

### Высота
- `min-h-[120px]` - минимальная высота для FAQ
- `min-h-[200px]` - минимальная высота для карточек

