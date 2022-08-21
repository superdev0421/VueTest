// ==========================================
//  Title:  test.js
//  Date:   19 August 2022
// ==========================================

describe("My First Test", () => {
  //  Test the Page Loading
  //  Acceptence Criteria: 
  //    1. There is title(h1) tag with content("Welcome to Test Assessment")
  //    2. There is Create Button
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Welcome to Test Assessment");
    cy.contains("button", "Create");
  });

  //  Test the Create button
  //  Method: 
  //    1. Test the "Create" -> "Discard" (result: noItem)
  //    2. Test the "Create" -> "Confirm" (result: newItem)
  it(`Tests "Create" Method.\n1. Create->Discard\n2. Create->Create`, () => {
    // visit the page
    cy.visit("/");

    // Action: "Create" -> "Discard"
    // Expected Result: ".notiem" = visible
    cy.contains("button", "Create").click();
    cy.get(".note-container input").type("New Item1");
    cy.get(".note-container textarea").type("New Content1");
    cy.get(".discard").click();
    cy.get(".noitem").should("be.visible");

    // Action: "Create" -> "Discard"
    // Expected Result: Note(title: "New Item1", content: "New Content1") must be shown
    cy.contains("button", "Create").click();
    cy.get(".note-container input").type("New Item1");
    cy.get(".note-container textarea").type("New Content1");
    cy.get(".confirm").click();
    cy.contains(".title", "New Item1");
    cy.contains(".content", "New Content1");
    cy.contains(".update", "Update");
    cy.contains(".delete", "Delete");
  });

  //  Test the Delete button
  //  Method: 
  //    1. Create Item  (result: newItem)
  //    2. Delete Item  (result: noItem)
  it(`Tests "Delete" Method`, () => {
    // visit the page
    cy.visit("/");

    // Create Note
    cy.contains("button", "Create").click();
    cy.get(".note-container input").type("New Item1");
    cy.get(".note-container textarea").type("New Content1");
    cy.get(".confirm").click();

    // Action: click "Delete" button of note
    cy.contains("button", "Delete").click();
    cy.get(".noitem").should("be.visible");
  });

  //  Test the Update button
  //  Method: 
  //    1. Create Item  (result: newItem)
  //    2. "Update" -> "Discard"  (result: existing Item)
  //    2. "Update" -> "Confirm"  (result: newItem)
  it(`Tests 'Update' Method.\n1. 'Update' -> 'Discard'\n2. 'Update' -> 'Confirm'`, () => {
    // visit the page
    cy.visit("/");

    // Create Note
    cy.contains("button", "Create").click();
    cy.get(".note-container input").type("New Item1");
    cy.get(".note-container textarea").type("New Content1");
    cy.get(".confirm").click();

    // Test "Update" -> "Discard"
    cy.get(".note-container .actions .update").click();
    cy.get(".note-container input").clear();
    cy.get(".note-container input").type("Updated Item1");
    cy.get(".note-container textarea").clear();
    cy.get(".note-container textarea").type("Updated Content1");
    cy.get(".note-container .actions .discard").click();
    cy.contains(".title", "New Item1");
    cy.contains(".content", "New Content1");
    cy.contains(".update", "Update");
    cy.contains(".delete", "Delete");

    // Test "Update" -> "Confirm"
    cy.get(".note-container .actions .update").click();
    cy.get(".note-container input").clear();
    cy.get(".note-container input").type("Updated Item1");
    cy.get(".note-container textarea").clear();
    cy.get(".note-container textarea").type("Updated Content1");
    cy.get(".note-container .actions .confirm").click();
    cy.contains(".title", "Updated Item1");
    cy.contains(".content", "Updated Content1");
    cy.contains(".update", "Update");
    cy.contains(".delete", "Delete");
  });
});
