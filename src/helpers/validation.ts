import {
  NAME_REGEXP,
  EMAIL_REGEXP,
  PHONE_REGEXP,
  ADDRESS_REGEXP,
  CARD_REGEXP,
  DATE_REGEXP,
  CVV_REGEXP,
  VISA_REGEXP,
  MASTER_REGEXP,
  MIR_REGEXP,
} from '../types/constants';
import LocalStorage from '../data/localStorage';
import Header from '../components/header/header';

const localStorage = new LocalStorage();
const header = new Header();

// НАВЕШИВАЕМ ОБРАБОТЧИКИ

export function addEventsOnModalForm() {
  const buttonBuy = document.getElementById('buy');
  const buttonClose = document.getElementById('close');
  const form = document.getElementById('form');
  const inputNumber = document.getElementById('number');
  const inputDate = document.getElementById('date');
  const inputCVV = document.getElementById('cvv');

  if (buttonBuy && buttonClose && form && inputNumber && inputDate && inputCVV) {
    buttonBuy.addEventListener('click', openModalForm);
    if (localStorage.getOneProductQuick()) openModalForm();
    buttonClose.addEventListener('click', closeModalForm);
    form.addEventListener('submit', handleForm);
    inputNumber.addEventListener('input', addSpace);
    inputNumber.addEventListener('keyup', changeLogo);
    inputDate.addEventListener('keyup', addSplitter);
    inputCVV.addEventListener('input', fixLength);
  }
}

// ЗАКРЫТЬ/ОТКРЫТЬ

export function openModalForm() {
  const form = document.getElementById('modal-form') as HTMLElement;
  form.classList.add('modal-form__open');
  localStorage.clearOneProductQuick();
}

export function closeModalForm() {
  const form = document.getElementById('modal-form') as HTMLElement;
  form.classList.remove('modal-form__open');
}

// ПРОВЕРКА ВСЕХ ПОЛЕЙ НА ВАЛИДНОСТЬ

export function handleForm(e: Event) {
  e.preventDefault();
  const form = document.getElementById('form') as HTMLElement;

  if (validation(form)) {
    const notification = document.getElementById('success');
    notification?.classList.add('success-purchase_open');
    setTimeout(function () {
      notification?.classList.remove('success-purchase_open');
      localStorage.clearOLocalStorage();
      header.render();
      window.location.hash = '#store?';
    }, 5000);
  }
}

// ПРОВЕРЯЕМ ПУСТЫЕ ЛИ ПОЛЯ

function validation(form: HTMLElement) {
  let result = true;
  form.querySelectorAll<HTMLInputElement>('.form__input').forEach((input) => {
    const check = validateInput(input);
    if (!check) {
      validationError(input, 'Ошибка');
      result = false;
    } else validationSuccess(input);
  });
  return result;
}

// ПРОВЕРЯЕМ КАЖДЫЙ ИНПУТ

function validateInput(input: HTMLInputElement) {
  const value = input.value;

  switch (input.dataset.validationtype) {
    case 'name':
      return NAME_REGEXP.test(value);
    case 'phone':
      return PHONE_REGEXP.test(value);
    case 'address':
      return ADDRESS_REGEXP.test(value);
    case 'email':
      return EMAIL_REGEXP.test(value);
    case 'number':
      return CARD_REGEXP.test(value);
    case 'date':
      return DATE_REGEXP.test(value);
    case 'cvv':
      return CVV_REGEXP.test(value);
    default:
      return value !== '';
  }
}

// ВАЛИДАЦИЯ В СЛУЧАЕ УСПЕХА

function validationSuccess(input: HTMLInputElement) {
  if (input.classList.contains('error')) {
    input.classList.remove('error');
    if (input.nextElementSibling) input.nextElementSibling.textContent = '';
  }
}

// ВАЛИДАЦИЯ В СЛУЧАЕ ОШИБКИ

function validationError(input: HTMLInputElement, message: string) {
  if (input.classList.contains('error')) {
    if (input.nextElementSibling && input.nextElementSibling.textContent) {
      if (input.nextElementSibling.textContent.length != 0) {
        input.nextElementSibling.textContent = message;
      }
    }
    return;
  } else {
    input.classList.add('error');
    if (input.nextElementSibling) input.nextElementSibling.textContent = message;
  }
}

// ОБРЕЗАЕТ НОМЕР КАРТЫ И ВСТАВЛЯЕТ ПРОБЕЛЫ

export function addSpace(event: Event) {
  (<HTMLInputElement>event.target).value.slice(0, 19);
  (<HTMLInputElement>event.target).value = (<HTMLInputElement>event.target).value
    .replace(/[^0-9]/gi, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

// ОБРЕЗАЕТ СРОК ДЕЙСТВИЯ И ВСТАВЛЯЕТ РАЗДЕЛИТЕЛЬ

export function addSplitter(event: Event) {
  (<HTMLInputElement>event.target).value = (<HTMLInputElement>event.target).value.slice(0, 5);

  if ((<HTMLInputElement>event.target).value.length === 2)
    (<HTMLInputElement>event.target).value = (<HTMLInputElement>event.target).value + '/';
  else if (
    (<HTMLInputElement>event.target).value.length === 3 &&
    (<HTMLInputElement>event.target).value.charAt(2) === '/'
  )
    (<HTMLInputElement>event.target).value = (<HTMLInputElement>event.target).value.replace(
      '/',
      ''
    );
}

// ОБРЕЗАЕТ CVV

export function fixLength(event: Event) {
  (<HTMLInputElement>event.target).value = (<HTMLInputElement>event.target).value.slice(0, 3);
}

// МЕНЯЕМ ЛОГОТИП

export function changeLogo(event: Event) {
  const target = (<HTMLInputElement>event.target).value;
  const logo = document.querySelector('.modal-form__card-type') as HTMLDivElement;
  if (VISA_REGEXP.test(target)) logo.innerText = 'VISA';
  if (MASTER_REGEXP.test(target)) logo.innerText = 'Master Card';
  if (MIR_REGEXP.test(target)) logo.innerText = 'МИР';
}
