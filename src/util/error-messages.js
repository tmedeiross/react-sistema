export function handleError(errors) {
  if (errors && errors.length) {
    const processedErrors = errors.reduce((accumulator, currentValue) => {
      if (!accumulator.hasOwnProperty(currentValue.fieldName)) {
        accumulator[currentValue.fieldName] = currentValue.message;
      }
      return accumulator;
    }, {});
    return processedErrors;
  }
  return {};
}
