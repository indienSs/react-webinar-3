/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Рекурсивная функция фильтрации элементов
 * @param arr {Array}
 * @returns {Array}
 */
export function arrayRecurseFilter(arr) {
  const parents = [];
  const children = [];

  if (arr.length <= 1) return arr;

  arr.forEach(el => {
    if (!el.parent) {
      parents.push(el);
    } else {
      children.push(el);
    }
  });

  const result = filterChildren(parents, children);

  return result;
}

function filterChildren(parents, children, counter = 1) {
  let result = parents;
  let resChildren = children;

  while (resChildren.length) {
    parents = result;
    children = resChildren;
    
    //Поиск совпадения родительского id с id child-элемента
    for (let i = 0; i < parents.length; i++) {
      for (let j = 0; j < children.length; j++) {
        if (parents[i]._id === children[j].parent._id) {
          result.splice(i + 1, 0, {
            ...children[j],
            title: "- ".repeat(counter) + children[j].title,
            parent: null,
          });
          resChildren.splice(j, 1, {
            ...children[j],
            parent: {_id: null},
          });
          // resChildren.splice(j, 1);
        }
      }
    }
    counter += 1;
    resChildren = resChildren.filter(el => el.parent._id !== null);
  }

  return result;
}
