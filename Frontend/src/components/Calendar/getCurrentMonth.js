
const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
const today = new Date();
// getMonth() retorna um valor de 0 a 11, então usamos diretamente como índice do array


export default monthNames[today.getMonth()];