import React, { useState } from "react";
import Footer from "../components/core/HomePage/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  function changeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();
    console.log(formData);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]
                    text-white px-4 py-16">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT INFO CARD */}
        <div className="rounded-2xl p-8 space-y-10
                        bg-white/5 backdrop-blur-lg
                        border border-white/10 shadow-xl">
          <InfoBlock
            title="Chat with us"
            subtitle="Our friendly team is here to help."
            value="info@studynotion.com"
            highlight
          />

          <InfoBlock
            title="Visit us"
            subtitle="Come and say hello at our office HQ."
            value={
              <>
                Akshya Nagar 1st Block 1st Cross, <br />
                Ramamurthy Nagar, Bangalore-560016
              </>
            }
          />

          <InfoBlock
            title="Call us"
            subtitle="Mon–Fri from 8am to 5pm"
            value="+123 456 7869"
          />
        </div>

        {/* RIGHT FORM CARD */}
        <div className="rounded-2xl p-8
                        bg-white/5 backdrop-blur-lg
                        border border-white/10 shadow-xl">
          <h2 className="text-3xl font-bold mb-2">
            Got an idea? We’ve got the skills.
          </h2>
          <p className="text-white/70 mb-8">
            Tell us more about yourself and what you’ve got in mind.
          </p>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ModernInput
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={changeHandler}
              />
              <ModernInput
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={changeHandler}
              />
            </div>

            <ModernInput
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={changeHandler}
            />

            <ModernInput
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={changeHandler}
            />

            <textarea
              name="message"
              rows="5"
              placeholder="Enter your message here"
              value={formData.message}
              onChange={changeHandler}
              className="w-full rounded-lg bg-white/10 px-4 py-3
                         text-white placeholder-white/40
                         border border-white/10
                         focus:outline-none focus:border-yellow-400
                         focus:ring-1 focus:ring-yellow-400
                         resize-none transition"
            />

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-semibold
                         py-3 rounded-lg
                         hover:bg-yellow-300 hover:scale-[1.02]
                         active:scale-95 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;

/* ---------- Reusable Components ---------- */

const InfoBlock = ({ title, subtitle, value, highlight }) => (
  <div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-white/60 text-sm">{subtitle}</p>
    <p className={`mt-1 ${highlight ? "text-yellow-400" : "text-white/80"}`}>
      {value}
    </p>
  </div>
);

const ModernInput = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required
    className="w-full rounded-lg bg-white/10 px-4 py-3
               text-white placeholder-white/40
               border border-white/10
               focus:outline-none focus:border-yellow-400
               focus:ring-1 focus:ring-yellow-400
               transition"
  />
);