import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');  // Зайти на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восст.пароль
          }); 

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // Есть крестик и он виден для пользователя
     })
   
    it('Верный пароль и верный логин', function () {
         
         cy.get(main_page.email).type(data.login) // Ввести верный логин
         cy.get(main_page.password).type(data.password) // Ввести верный пароль
         cy.get(main_page.login_button).click(); // Нажать войти

         cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу текст
         cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
     })

    it('Восстановление пароля', function () {
        
        cy.get(main_page.fogot_pass_btn).click();  // Нажать на кнопку Забыли пароль
        cy.get(recovery_password_page.email).type(data.login) // Ввести логин
        cy.get(recovery_password_page.send_button).click(); // Нажать Отправить код

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверяю, что есть такой текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    })

     it('НЕверный пароль и верный логин', function () {
        
        cy.get(main_page.email).type(data.login) // Ввести верный логин
        cy.get(main_page.password).type('iLoveqastudio7') // Ввести НЕверный пароль
        cy.get(main_page.login_button).click(); // Нажать войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    })

    it('Верный пароль и НЕверный логин', function () {
        
        cy.get(main_page.email).type('german@donikov.ru') // Ввести НЕверный логин
        cy.get(main_page.password).type(data.password) // Ввести верный пароль
        cy.get(main_page.login_button).click(); // Нажать войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю
    })

    it('Ввести логин без @', function () {
        
        cy.get(main_page.email).type('germandonikov.ru') // Ввести логин без @
        cy.get(main_page.password).type(data.password) // Ввести верный пароль
        cy.get(main_page.login_button).click(); // Нажать войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю

    })
    
    it('Проверка на приведение к строчным буквам в логине', function () {
        
        cy.get(main_page.email).type('GerMan@Dolnikov.ru') // Ввести логин
        cy.get(main_page.password).type(data.password) // Ввести верный пароль
        cy.get(main_page.login_button).click(); // Нажать войти

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю 
    })
})
