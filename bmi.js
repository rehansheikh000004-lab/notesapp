function calculateBMI() {
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;

  if (height === "" || weight === "") {
    document.getElementById("result").innerText = "⚠️ Please enter both values!";
    return;
  }

  const h = height / 100; // convert cm to meters
  const bmi = (weight / (h * h)).toFixed(2);

  let message = "";
  if (bmi < 18.5) {
    message = "Underweight";
  } else if (bmi < 24.9) {
    message = "Normal weight";
  } else if (bmi < 29.9) {
    message = "Overweight";
  } else {
    message = "Obese";
  }

  document.getElementById("result").innerText = `Your BMI: ${bmi} (${message})`;
}