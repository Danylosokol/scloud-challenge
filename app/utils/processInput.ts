 /**
   * Filter out from input non-numerical chars.
   *
   * @param event - event from input element
   * @returns only numercal values from the input
   */
export const getNumerical = (event: React.FormEvent<HTMLInputElement>): number => {
  const inputValue: string = event.currentTarget.value ? event.currentTarget.value.replace("£", "") : "0"; 
  let numericalValue: string = inputValue.replace(/[^0-9]/g, '');
  if(!numericalValue.length){
    numericalValue = "0";
  }
  return parseInt(numericalValue, 10);
};