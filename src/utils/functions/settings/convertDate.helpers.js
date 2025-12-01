class ConvertDate {
  formatDate(date) {
    // format date dd/mm/yyyy
    const convertDate = new Date(date);
    const today = convertDate.getDay();
    const month = convertDate.getMonth();
    const year = convertDate.getUTCFullYear();

    return `${today}/${1 + month}/${year}`;
  }
}

export default ConvertDate;
