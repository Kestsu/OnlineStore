if (!JSON.parse(localStorage.getItem('avaliacoes'))) {
  localStorage.setItem('avaliacoes', JSON.stringify([]));
}

export const readSavedEvaluations = () => JSON.parse(localStorage.getItem('avaliacoes'));

export const saveEvaluation = (evaluations) => {
  localStorage.setItem('avaliacoes', JSON.stringify([...evaluations]));
};
