const { client } = require('nightwatch-cucumber');
const { Given, When, Then, After } = require('cucumber');

const gist = client.page.gist_test_page();

Given(/^user login to gist page$/, async () => {
  await gist.navigateToLoginPage();
  await gist.login();
});

When(/^user click new gist$/, () => gist.clickNew());

When(/^user create new gist$/, async () => {
  await gist.inputDesc();
  await gist.inputFileName();
  await gist.inputContent();
});

When(/^user click create public gist$/, () => gist.clickCreatePublic());

When(/^user at gist list page$/, () => gist.listPage());

When(/^user edit gist$/, () => gist.editGist());

When(/^user delete gist$/, () => gist.deleteGist());

Then(/^user will see gist homepage$/, () => gist.assertTitle());

Then(/^user will see new gist$/, () => gist.assertGist());

Then(/^user will see edited gist$/, () => gist.assertGistEdit());

Then(/^user will see list gist$/, () => gist.assertGistList());