const appendZero = num => (num <= 9 ? "0" + num : num);

const formatDateTime = date => {
  const day = appendZero(date.getDate());
  const month = appendZero(date.getMonth() + 1);
  const year = date.getFullYear();
  const hour = appendZero(date.getHours());
  const minutes = appendZero(date.getMinutes());

  return `${year}-${month}-${day} ${hour}:${minutes}`;
};

export default formatDateTime;
