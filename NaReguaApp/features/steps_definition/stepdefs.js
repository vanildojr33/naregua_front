const wd = require('wd');
const assert = require('assert');
const { Before, Given, When, Then, After } = require('@cucumber/cucumber');

const Port = 4723;

const config = {
  platformName: 'Android',
  deviceName: 'Alistos', //nome do celular
  udid: 'cf0368b3', //adb devices no terminal
  platformVersion: '10', //versão do android
  appPackage: 'com.nareguaapp',
  appActivity: 'com.nareguaapp.MainActivity',
  automationName: "UiAutomator2"
}

const driver = wd.promiseChainRemote('localhost', Port);

Before({timeout: 50000}, async () => {
  await driver.init(config);
  await driver.sleep(6000); // wait for app to load
});


After(async() => {
  await driver.quit();
});


Given('Eu estou na tela de login', {timeout: 30000}, async() => {
  let ehTelaLogin = await driver.hasElementByAccessibilityId("botao-login");
  assert.equal(ehTelaLogin, true);
});

When('Eu clico na opção de cadastro', {timeout: 20000}, async() => {
  await driver.setImplicitWaitTimeout(15000);
  let botaoCadastro = await driver.elementByAccessibilityId("botao-cadastro");
  botaoCadastro.click();
});

When('Eu estou na tela de cadastro', {timeout: 30000}, async() => {
  let ehTelaCadastro = await driver.hasElementByAccessibilityId("botao-cadastrar");
  assert.equal(ehTelaCadastro, true);
});

When('eu preencho o campo "nome" com João Silva', async() => {
  let preencherNome = await driver.elementByAccessibilityId('campo-nome');
  preencherNome.sendKeys("João Silva");
});

When('eu preencho o campo "email" com "exemplo2@email.com"', async() => {
  let preencherEmail = await driver.elementByAccessibilityId('campo-email');
  preencherEmail.sendKeys("exemplo2@email.com");
});

When('eu preencho o campo "senha" e o campo "confirmar senha" com 123456', async() => {
  let preencherSenha = await driver.elementByAccessibilityId('campo-senha');
  preencherSenha.sendKeys("123456");
  let preencherConfirmarSenha = await driver.elementByAccessibilityId('campo-confirmarSenha');
  preencherConfirmarSenha.sendKeys("123456");
});

When('eu preencho o campo "Nª de celular" com 8822445566', async() => {
  let preencherCelular = await driver.elementByAccessibilityId('campo-celular');
  preencherCelular.sendKeys("8822445566");
});

When('eu pressiono o botão "Cadastrar"', async() => {
  let botaoCadastrar = await driver.elementByAccessibilityId("botao-cadastrar");
  botaoCadastrar.click();
});

Then('eu vejo a tela de login', {timeout: 20000}, async() => {
  await driver.setImplicitWaitTimeout(15000);
  let ehTelaLogin = await driver.hasElementByAccessibilityId("botao-login");
  assert.equal(ehTelaLogin, true);
});

When('eu preencho o campo "senha" com 123456', async() => {
  let preencherSenha = await driver.elementByAccessibilityId('campo-senha');
  preencherSenha.sendKeys("123456");
});

When('eu pressiono o botão "Login"', async() => {
  let botaoLogin = await driver.elementByAccessibilityId("botao-login");
  botaoLogin.click();
});

Then('eu vejo a tela inicial de cliente', {timeout: 20000}, async() => {
  await driver.setImplicitWaitTimeout(15000);
  let ehTelaInicial = await driver.hasElementByAccessibilityId("descricao-prestador");
  assert.equal(ehTelaInicial, true);
});
