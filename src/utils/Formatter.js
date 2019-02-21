const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const convertMonth = monthNumber => {
  return months[monthNumber];
};

export const formatDate = date => {
  return date
    ? date.getDate() +
        ' ' +
        convertMonth(date.getMonth()) +
        ' de ' +
        date.getFullYear()
    : null;
};
