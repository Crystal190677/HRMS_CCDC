import React, { useState } from 'react';
import axios from 'axios';

const EmployeeLeaveRequest = () => {
  const [form, setForm] = useState({ type: '', from: '', to: '' });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // ✅ track if success

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      // ✅ Fixed endpoint
      await axios.post('http://localhost:8000/api/employee/leave-request', form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Show success message
      setMessage('✅ Leave request sent successfully!');
      setIsSuccess(true);

      // Clear form
      setForm({ type: '', from: '', to: '' });

      // Optional: Auto-hide message after 3 seconds
      setTimeout(() => {
        setMessage('');
        setIsSuccess(false);
      }, 3000);

    } catch (error) {
      console.error(error);
      setMessage('❌ Error submitting leave. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h4 className="mb-4">Leave Request Form</h4>

        {/* ✅ Message Display */}
        {message && (
          <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Leave Type</label>
            <input
              type="text"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g. Sick, Vacation"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">From</label>
            <input
              type="date"
              name="from"
              value={form.from}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">To</label>
            <input
              type="date"
              name="to"
              value={form.to}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Leave
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLeaveRequest;
