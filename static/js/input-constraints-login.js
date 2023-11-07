!(function () {
  const inputField = document.querySelector("input#password");
  const patternMatch = inputField['pattern'].replace(/({\d})/gi, '');
  const maxValueLength = inputField['maxLength'];

  inputField.addEventListener("beforeinput", (event) => {
    const inputEventEntry = event.data || '';
    const changedInputValue = event.target.value + inputEventEntry;

    if (event.target.value.length >= maxValueLength && inputEventEntry.length) {
      event.preventDefault();
    }

    const matchResults = changedInputValue.match(patternMatch);

    if (!matchResults || !matchResults[0].length) {
      event.preventDefault();
    }
  });
})();
