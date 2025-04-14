function FormatNumber({ value }) {
  // Verifica se o valor é um número
  const formatNumber = (number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(number);
  };

  return formatNumber(value);
}

export default FormatNumber;
