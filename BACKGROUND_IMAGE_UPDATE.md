# Обновление фонового изображения главной страницы

## 🎯 Цель обновления

Заменить фоновое изображение на всех компонентах главной страницы на новое изображение с URL: [https://clinicaldan.ru/upload/iblock/37e/37ee47227d019ba56cb6a41102fea374.jpg](https://clinicaldan.ru/upload/iblock/37e/37ee47227d019ba56cb6a41102fea374.jpg)

## 🔄 Обновленные компоненты

### 1. **Hero.tsx** - Главный слайдер
- **Файл**: `/src/components/Hero.tsx`
- **Изменения**: Обновлены URL изображений в массиве `slides`
- **Количество слайдов**: 2 (оба используют новое изображение)

```jsx
// До
image: "https://avatars.mds.yandex.net/get-altay/2366463/2a000001704cc02d17401370e2a58f0d1f5f/XXXL"

// После  
image: "https://clinicaldan.ru/upload/iblock/37e/37ee47227d019ba56cb6a41102fea374.jpg"
```

### 2. **Advantages.tsx** - Секция преимуществ
- **Файл**: `/src/components/Advantages.tsx`
- **Изменения**: Обновлен URL в `backgroundImage` стиле
- **Эффект**: Белый градиентный оверлей для читаемости

```jsx
// До
backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9)), url('https://avatars.mds.yandex.net/get-altay/2366463/2a000001704cc02d17401370e2a58f0d1f5f/XXXL')`

// После
backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9)), url('https://clinicaldan.ru/upload/iblock/37e/37ee47227d019ba56cb6a41102fea374.jpg')`
```

### 3. **Testimonials.tsx** - Секция отзывов
- **Файл**: `/src/components/Testimonials.tsx`
- **Изменения**: Обновлен URL в `backgroundImage` стиле
- **Эффект**: Темный градиентный оверлей для контраста

```jsx
// До
backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url('https://avatars.mds.yandex.net/get-altay/2366463/2a000001704cc02d17401370e2a58f0d1f5f/XXXL')`

// После
backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url('https://clinicaldan.ru/upload/iblock/37e/37ee47227d019ba56cb6a41102fea374.jpg')`
```

### 4. **ContactForm.tsx** - Форма обратной связи
- **Файл**: `/src/components/ContactForm.tsx`
- **Изменения**: Обновлен URL в `backgroundImage` стиле
- **Эффект**: Белый градиентный оверлей для читаемости формы

```jsx
// До
backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9)), url('https://avatars.mds.yandex.net/get-altay/2366463/2a000001704cc02d17401370e2a58f0d1f5f/XXXL')`

// После
backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9)), url('https://clinicaldan.ru/upload/iblock/37e/37ee47227d019ba56cb6a41102fea374.jpg')`
```

### 5. **Footer.tsx** - Подвал сайта
- **Файл**: `/src/components/Footer.tsx`
- **Изменения**: Обновлен URL в `backgroundImage` стиле
- **Эффект**: Темный градиентный оверлей для контраста

```jsx
// До
backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url(https://avatars.mds.yandex.net/get-altay/2366463/2a000001704cc02d17401370e2a58f0d1f5f/XXXL)`

// После
backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url(https://clinicaldan.ru/upload/iblock/37e/37ee47227d019ba56cb6a41102fea374.jpg)`
```

## 🎨 Сохраненные стили

### Позиционирование фона:
- **backgroundPosition**: `center 30%` - для оптимального отображения
- **backgroundSize**: `cover` - полное покрытие области
- **backgroundAttachment**: `fixed` - параллакс эффект

### Градиентные оверлеи:
- **Светлые секции** (Advantages, ContactForm): `rgba(255, 255, 255, 0.95)` → `rgba(255, 255, 255, 0.9)`
- **Темные секции** (Testimonials, Footer): `rgba(0, 0, 0, 0.7)` → `rgba(0, 0, 0, 0.6)`

## 📱 Адаптивность

Все обновления полностью адаптивны и работают на всех устройствах:
- **Мобильные устройства** - корректное отображение
- **Планшеты** - оптимизированное позиционирование
- **Десктопы** - полный параллакс эффект

## 🔧 Технические детали

### Новый URL изображения:
```
https://clinicaldan.ru/upload/iblock/37e/37ee47227d019ba56cb6a41102fea374.jpg
```

### CSS свойства (неизменные):
```css
backgroundSize: cover
backgroundPosition: center 30%
backgroundAttachment: fixed
```

### Градиентные оверлеи:
```css
/* Светлые секции */
linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))

/* Темные секции */
linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6))
```

## 🌟 Результат

### Единообразный дизайн:
- Все компоненты главной страницы используют одно изображение
- Сохранены все визуальные эффекты и стили
- Гармоничное сочетание с существующим дизайном

### Производительность:
- Изображение загружается один раз и кэшируется браузером
- Параллакс эффект работает плавно
- Адаптивное отображение на всех устройствах

### Визуальная целостность:
- Плавные переходы между секциями
- Консистентное позиционирование фона
- Сохранена читаемость текста на всех секциях

## 🔍 Проверка обновлений

### Компоненты с новым фоном:
- ✅ **Hero** - главный слайдер
- ✅ **Advantages** - секция преимуществ  
- ✅ **Testimonials** - секция отзывов
- ✅ **ContactForm** - форма обратной связи
- ✅ **Footer** - подвал сайта

### Сохраненные эффекты:
- ✅ **Параллакс** - `backgroundAttachment: fixed`
- ✅ **Позиционирование** - `center 30%`
- ✅ **Градиенты** - для читаемости текста
- ✅ **Адаптивность** - на всех устройствах

## 📝 Примечания

- Все изменения применены без нарушения существующей функциональности
- Сохранены все анимации и интерактивные элементы
- Изображение оптимизировано для веб-использования
- URL изображения взят с официального сайта клиники

