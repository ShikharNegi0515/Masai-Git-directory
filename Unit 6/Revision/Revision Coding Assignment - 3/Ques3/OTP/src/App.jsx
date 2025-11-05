import React, { useRef, useState } from "react";
import "./App.css";

export default function App() {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Handle input typing
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; // only digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace and navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste (4-digit OTP)
  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text");
    if (!/^\d{4}$/.test(data)) return;

    const newOtp = data.split("");
    setOtp(newOtp);
    inputRefs.current[3].focus();
  };

  const handleSubmit = () => {
    const finalOtp = otp.join("");
    if (finalOtp.length < 4) {
      alert("Please enter all 4 digits.");
      return;
    }
    alert(`Entered OTP: ${finalOtp}`);
  };

  return (
    <div className="otp-container">
      <h1>OTP Verification</h1>
      <div className="otp-inputs" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <button onClick={handleSubmit}>Submit OTP</button>

      <p className="otp-display">
        Entered OTP: <strong>{otp.join("")}</strong>
      </p>
    </div>
  );
}
