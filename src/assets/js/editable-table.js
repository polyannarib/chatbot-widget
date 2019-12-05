customElements.whenDefined("editable-table").then(() => {
  const $editableTable = document.querySelector("editable-table");

  const records = JSON.parse(localStorage.getItem("records"));
  if (records) {
    $editableTable.add(records);
  }

  // save records on change
  $editableTable.addEventListener("record:change", function(event) {
    const { changeType, index, record } = event.detail;
    console.log(`record %d %s: %o`, index + 1, changeType, record);

    localStorage.setItem("records", JSON.stringify($editableTable.get()));
  });
});
