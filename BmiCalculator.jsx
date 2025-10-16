import { useState } from "react";

export default function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);

      if (bmiValue < 18.5) {
        setMessage("You are underweight.");
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setMessage("You have a normal weight.");
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        setMessage("You are overweight.");
      } else {
        setMessage("You are obese.");
      }
    } else {
      setMessage("Please enter valid weight and height.");
      setBmi(null);
    }
  };

  return (
    <div className="p-6 text-center bg-gray-800 text-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">BMI Calculator</h2>

      <input
        type="number"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="mb-2 p-2 rounded w-full text-black"
      />

      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="mb-2 p-2 rounded w-full text-black"
      />

      <button
        onClick={calculateBMI}
        className="bg-teal-400 text-black px-4 py-2 rounded mt-2 font-bold"
      >
        Calculate
      </button>

      {bmi && (
        <div className="mt-4">
          <p className="text-lg">Your BMI: {bmi}</p>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}