export default function extractErrorMessage(error) {
  const data = error?.response?.data;

  if (data?.message) {
    return data.message;
  }

  if (error?.userMessage) {
    const lines = error.userMessage.split('\n');
    return lines[0];
  }

  return 'Nao foi possivel concluir a operacao. Tente novamente.';
}
