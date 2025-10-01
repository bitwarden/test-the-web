!(function () {
  const dialog = document.getElementById("formDialog");
  const openButton = document.getElementById("open-dialog-button");
  const closeButton = document.getElementById("close-dialog-button");

  openButton.addEventListener("click", () => {
    dialog.showModal();
  });

  closeButton.addEventListener("click", () => {
    dialog.close();
  });
})();
