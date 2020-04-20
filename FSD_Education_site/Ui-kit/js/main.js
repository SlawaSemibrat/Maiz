//Словоформы честно взяты отсюда https://realadmin.ru/coding/sklonenie-na-javascript.html
function num2str(n, text_forms) {
  n = Math.abs(n) % 100; var n1 = n % 10;
  if (n > 10 && n < 20) { return text_forms[2]; }
  if (n1 > 1 && n1 < 5) { return text_forms[1]; }
  if (n1 == 1) { return text_forms[0]; }
  return text_forms[2];
}
//Обновлялка текса в шапке dropDown
function updateDropdowns(){
  let dropdowns = document.querySelectorAll('.dropdown')
  dropdowns.forEach(dropdown => {
    //Если сложная шапка для dropdown в названии выводим значения из нескольких итемов
    if(dropdown.hasAttribute('several-word-forms')) {
      var result = []
      let results
      let sum = 0
      let i = 0
      let defaultValue = dropdown.getAttribute('default')
      dropdown.querySelectorAll('.dropdown-list__item').forEach(item =>{
      // Получаем все Элементы dropdown cо словоформами
       if(item.hasAttribute('wordForms')){
         //Получаем Value
         let elValue = item.querySelectorAll('.value')
         let value
         elValue.forEach(valueItem =>{
           value = Number.parseInt(valueItem.innerText)
           sum += Number.parseInt(valueItem.innerText)
         })
         //Получаем словоформу
         if(value > 0){
           let wordForms = item.getAttribute('wordForms').split(' ')
           let rightForm = num2str(value, wordForms)
           result[i] = value + ' ' + rightForm
           i++
         }}
         /*for (var i = 0; i < result.length; i++) {
           if (result[i]!=0) {
             results = result[1]+ ', '+result[2] + ', '+ result[3]
           }
         }*/
        //Пишем в заголовок дропдауна результат
        if(sum !== 0){
          dropdown.querySelector('.dropdown__name').value = innerText = result[0]+ ', '+result[1] + ', '+ result[2]
        }
        else{
          dropdown.querySelector('.dropdown__name').value = defaultValue
        }
      })
    }
    //Простая форма dropdown - Типа сколько гостей
    else{
      //Получаем сумму всех у dropdown записываем в value
      let valuesElements = dropdown.querySelectorAll('.value')
      let value = 0
      valuesElements.forEach(valueItem => {
        value += (Number.parseInt(valueItem.innerText))
      })
      //Получаем словоформы и записываем в массив
      let wordForms = dropdown.hasAttribute('wordforms') ? dropdown.getAttribute('wordforms').split(' '): undefined
      let rightForm = wordForms !== undefined ? num2str(value, wordForms): ''
      //Записываем в название dropdow значение всех
      if(value !==0){
        dropdown.querySelector('.dropdown__name').innerText = value+' '+rightForm
      }
      else{
        dropdown.querySelector('.dropdown__name').innerText = dropdown.hasAttribute("default") ? dropdown.getAttribute('default'): dropdown.querySelector('.dropdown__name').innerText = value+' '+rightForm
      }
    }
  })
}

//Функция создания контролов управления
function createControls(defaultValue){
  let element = document.createElement('div')
  let minus = document.createElement('div')
  let value = document.createElement('div')
  let plus = document.createElement('div')
  element.className = 'controls'
  value.className = 'value'
  minus.classList.add('minus__container')
  plus.classList.add('plus__container')
  //Добавляем класс disabled если значение меньше чем 1
  defaultValue < 1 ? minus.classList.add('disabled') :null
  value.innerText = defaultValue
  plus.innerText = '+'
  plus.addEventListener('click', function(){
    //Удаляем класс disabled у минуса если значение равно нулю
    //если там было минус значение не удаляем:)
    if(Number.parseInt(value.innerText) === 0){
      minus.classList.remove('disabled')
    }
    value.innerText= Number.parseInt(value.innerText)+1
    updateDropdowns()
  })
  minus.innerText = '-'
  minus.addEventListener('click', function(){
    //Добавляем класс disabled если значение равно 1
    if(parseInt(value.innerText) === 1){
      minus.classList.add('disabled')
    }
    //Блокируем минус если значение ноль и меньше
    if(parseInt(value.innerText) > 0){
      value.innerText= Number.parseInt(value.innerText)-1
    }
    updateDropdowns()
  })
  element.append(minus)
  element.append(value)
  element.append(plus)
  return(element)
}
document.addEventListener('DOMContentLoaded', function(){
  //Получаем все дропдауны
  let drop = document.querySelectorAll('.dropdown')
  drop.forEach((item,i) => {
    //Каждому дропдауну навешиваем событие открытия
    let dropdownName = item.querySelector('.dropdown__name')
    dropdownName.addEventListener('click', function(){
      event.target.closest(".dropdown").classList.toggle("active")
      event.target.closest(".dropdown__name").classList.toggle("dropdown__name__chengOnClick")
    })
    //Получаем все итемы у текущего дропдауна
    let listItems = item.querySelectorAll('.dropdown-list__item')
    listItems.forEach(item => {
      item.append(createControls(item.hasAttribute('default') ? item.getAttribute('default'):0))
    })
    updateDropdowns()
  })
})
