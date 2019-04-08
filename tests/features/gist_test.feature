Feature: Creating End-to-End (E2E) tests for creating a gist

Background: Login to gist
  Given user login to gist page

Scenario: As a User, I want to create a public gist
  Given user login to gist page
  Then user will see gist homepage
  When user click new gist
    And user create new gist
    And user click create public gist
  Then user will see new gist

Scenario: As a User, I want to edit an existing gist
  When user at gist list page
    And user edit gist
  Then user will see edited gist

Scenario: As a User, I want to delete an existing gist
  When user at gist list page
    And user delete gist
  Then user will see list gist

Scenario: As a User, I want to see my list of gists
  When user at gist list page
  Then user will see list gist