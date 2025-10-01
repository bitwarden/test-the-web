!(function () {
  const popover = document.getElementById("formPopover");
  const openButton = document.getElementById("open-popover-button");
  const closeButton = document.getElementById("close-popover-button");

  // Open popover by default
  popover.showPopover();

  openButton.popoverTargetElement = popover;
  closeButton.popoverTargetElement = popover;

  openButton.popoverTargetAction = "show";
  closeButton.popoverTargetAction = "hide";
})();
