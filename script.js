function calculate() {
  var num1 = parseFloat(document.getElementById('num1').value);
  var num2 = parseFloat(document.getElementById('num2').value);
  var num3 = parseFloat(document.getElementById('num3').value);

  // Check if any input field is empty
  if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
    displayWarning("Please enter numerical values in all fields.");
    return;
  }

  // Clear any existing warning message
  clearWarning();

  var numbers = [num1, num2, num3];
  var max = Math.max(num1, num2, num3);
  var min = Math.min(num1, num2, num3);
  var mean = (num1 + num2 + num3) / 3;
  var median = calculateMedian(num1, num2, num3);
  var range = max - min;
  var mode = calculateMode(numbers);
  var variance = calculateVariance(numbers);

  displayResults(max, min, mean, median, range, mode, variance);
}

function calculateMedian(num1, num2, num3) {
  var numbers = [num1, num2, num3];
  numbers.sort(function(a, b) {
    return a - b;
  });
  return numbers[1];
}

function calculateMode(numbers) {
  var modes = [];
  var count = {};
  var maxFreq = 0;

  for (var i = 0; i < numbers.length; i++) {
    var num = numbers[i];
    count[num] = (count[num] || 0) + 1;
    maxFreq = Math.max(maxFreq, count[num]);
  }

  for (var key in count) {
    if (count[key] === maxFreq) {
      modes.push(parseFloat(key));
    }
  }

  return modes.join(', ');
}

function calculateVariance(numbers) {
  var mean = numbers.reduce(function(sum, num) {
    return sum + num;
  }, 0) / numbers.length;

  var squaredDifferences = numbers.map(function(num) {
    return Math.pow(num - mean, 2);
  });

  var variance = squaredDifferences.reduce(function(sum, squaredDifference) {
    return sum + squaredDifference;
  }, 0) / numbers.length;

  return variance.toFixed(2);
}

function displayResults(max, min, mean, median, range, mode, variance) {
  var resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
    <p><strong>Maximum:</strong> ${max}</p>
    <p><strong>Minimum:</strong> ${min}</p>
    <p><strong>Mean:</strong> ${mean.toFixed(1)}</p>
    <p><strong>Median:</strong> ${median}</p>
    <p><strong>Range:</strong> ${range}</p>
    <p><strong>Mode:</strong> ${mode}</p>
    <p><strong>Variance:</strong> ${variance}</p>
  `;
}

function displayWarning(message) {
  var warningDiv = document.getElementById('warning');
  warningDiv.innerText = message;
  warningDiv.style.display = 'block';
}

function clearWarning() {
  var warningDiv = document.getElementById('warning');
  warningDiv.innerText = '';
  warningDiv.style.display = 'none';
}

// Additional function to clear input fields
function clearInputFields() {
  document.getElementById('num1').value = '';
  document.getElementById('num2').value = '';
  document.getElementById('num3').value = '';
  clearWarning(); // Clear warning message when input fields are cleared
}
