const { client } = require('nightwatch-cucumber');
const base = require('bizzy-nightwatch-base-page');
const env = require('dotenv').config();

const gistPage = {
  url() {
    const url = "https://gist.github.com/auth/github?return_to=https%3A%2F%2Fgist.github.com%2Fdiscover";
    return url;
  },
  elements: {
    // input
    inputUsername: '#login_field.form-control.input-block',
    inputPass: '#password.form-control.input-block',
    inputDesc: '.form-control.input-block.input-contrast',
    inputFileName: '.form-control.filename.js-gist-filename.js-blob-filename',
    inputContent: 'div.CodeMirror-lines',

    // assert
    assertTitlePage: '.float-none.flex-auto.pl-0.width-fit',
    assertNewGist: '.blob-code.blob-code-inner.js-file-line',
    assertList: '.js-selected-navigation-item.selected.reponav-item',

    // button
    buttonSignIn: '.btn.btn-primary.btn-block',
    buttonNewGist: 'text-bold.pr-3',
    buttonCreatePublic: '.form-actions>button:nth-child(1)',
    editGist: 'https://gist.github.com/tifaraarisyah/44c658f8207247014ffe946656915ac2',
    buttonEdit: 'li>a.btn:nth-child(1)',
    buttonUpdate: '.btn.btn-primary',
    deleteGist: 'https://gist.github.com/tifaraarisyah/3959414890e5b0f979c632eaf9be24d6',
    buttonDelete: '.btn-danger'
  },
  commands: [{
    navigateToLoginPage() {
      this.navigate();
      base.maxWindow(this.api);
    },
    login() {
      base.setValueElement(this, gistPage.elements.inputUsername, process.env.USERNAME);
      base.setValueElement(this, gistPage.elements.inputPass, process.env.PASSWORD);
      base.clickElement(this, gistPage.elements.buttonSignIn);
    },
    assertTitle() {
      base.expectVisible(client, gistPage.elements.assertTitlePage);
    },
    clickNew() {
      base.clickElement(this, gistPage.elements.buttonNewGist);
    },
    inputDesc() {
      base.setValueElement(this, gistPage.elements.inputDesc, 'test gist');
    },
    inputFileName() {
      base.setValueElement(this, gistPage.elements.inputFileName, 'gist.js');
    },
    inputContent() {
      base.clickElement(this, gistPage.elements.inputContent);
      client.keys('test gist create new public');
    },
    clickCreatePublic() {
      base.clickElement(this, gistPage.elements.buttonCreatePublic);
    },
    assertGist() {
      return base.assertContainsText(this, gistPage.elements.assertNewGist, 'test gist create new public');
    },
    listPage() {
      this.navigate(process.env.GIST_LIST);
    },
    editGist() {
      base.clickElement(this, gistPage.elements.editGist);
      base.clickElement(this, gistPage.elements.buttonEdit);
      base.clickElement(this, gistPage.elements.inputContent);
      client.keys(' updated');    
      base.clickElement(this, gistPage.elements.buttonUpdate);
    },
    assertGistEdit() {
      return base.assertContainsText(client, gistPage.elements.assertNewGist, 'test gist create new public updated');
    },
    assertGistList() {
      return base.expectVisible(client, gistPage.elements.assertList);
    },
    deleteGist() {
      base.clickElement(this, gistPage.elements.editGist);
      base.clickElement(this, gistPage.elements.buttonDelete);
    }
  }],
};

module.exports = gistPage;