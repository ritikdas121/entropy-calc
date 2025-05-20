document.getElementById('entropyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const yes = parseInt(document.getElementById('yes').value);
    const no = parseInt(document.getElementById('no').value);
    const errorDiv = document.getElementById('error');
    const resultDiv = document.getElementById('result');
    const formulaDiv = document.getElementById('formula');
    const entropyResult = document.getElementById('entropyResult');
    const stepsDiv = document.getElementById('steps');

    // Clear previous errors and results
    errorDiv.textContent = '';
    resultDiv.classList.remove('show');
    formulaDiv.classList.remove('show');
    stepsDiv.innerHTML = '';

    // Input validation
    if (isNaN(yes) || isNaN(no) || yes < 0 || no < 0) {
        errorDiv.textContent = 'Please enter valid non-negative numbers.';
        return;
    }

    const total = yes + no;
    if (total === 0) {
        errorDiv.textContent = 'Total instances (Yes + No) cannot be zero.';
        return;
    }

    // Calculate proportions
    const pYes = yes / total;
    const pNo = no / total;

    // Calculate entropy
    let entropy = 0;
    let steps = [];

    steps.push(`Total instances = Yes + No = ${yes} + ${no} = ${total}`);
    steps.push(`Proportion of Yes (p₁) = ${yes} / ${total} = ${pYes.toFixed(4)}`);
    steps.push(`Proportion of No (p₂) = ${no} / ${total} = ${pNo.toFixed(4)}`);

    if (pYes > 0) {
        const yesTerm = -pYes * Math.log2(pYes);
        entropy += yesTerm;
        steps.push(`Yes term: -p₁ * log₂(p₁) = -(${pYes.toFixed(4)}) * log₂(${pYes.toFixed(4)}) = -${yesTerm.toFixed(4)}`);
    } else {
        steps.push(`Yes term: p₁ = 0, so term is omitted (log₂(0) is undefined).`);
    }

    if (pNo > 0) {
        const noTerm = -pNo * Math.log2(pNo);
        entropy += noTerm;
        steps.push(`No term: -p₂ * log₂(p₂) = -(${pNo.toFixed(4)}) * log₂(${pNo.toFixed(4)}) = -${noTerm.toFixed(4)}`);
    } else {
        steps.push(`No term: p₂ = 0, so term is omitted (log₂(0) is undefined).`);
    }

    steps.push(`Entropy (H) = ${pYes > 0 ? 'Yes term' : ''}${pYes > 0 && pNo > 0 ? ' + ' : ''}${pNo > 0 ? 'No term' : ''} = ${entropy.toFixed(4)}`);

    // Display results
    entropyResult.textContent = entropy.toFixed(4);
    stepsDiv.innerHTML = steps.map(step => `<p>${step}</p>`).join('');
    resultDiv.classList.add('show');
    formulaDiv.classList.add('show');
});
