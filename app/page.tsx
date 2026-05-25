'use client';

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const [contacts, setContacts] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile: '',
    company_name: '',
    job_title: '',
    city: '',
    status: '',
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await fetch('http://localhost:3001/contacts');

    const data = await response.json();

    setContacts(data);
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = async () => {
  if (
    !formData.full_name.trim() ||
    !formData.email.trim() ||
    !formData.mobile.trim() ||
    !formData.company_name.trim() ||
    !formData.job_title.trim() ||
    !formData.city.trim() ||
    !formData.status.trim()
  ) {
   toast.error('Please fill all fields');
    return;
  }

  const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|net|edu)$/;

  if (!emailRegex.test(formData.email)) {
    toast.error('Enter a valid email address');
    return;
  }

  const mobileRegex = /^[0-9]{10}$/;

  if (!mobileRegex.test(formData.mobile)) {
    toast.error('Mobile number must be exactly 10 digits');

    return;
  }

  if (editingId) {
    await fetch(
      `http://localhost:3001/contacts/${editingId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );

    toast.success('Contact updated Successfully');
  } else {
    await fetch(
      'http://localhost:3001/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );

    toast.success('Contact Added Successfully');
  }

  setFormData({
    full_name: '',
    email: '',
    mobile: '',
    company_name: '',
    job_title: '',
    city: '',
    status: '',
  });

  setEditingId(null);

  fetchContacts();
};

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #dfe9f3 0%, #ffffff 100%)',
        padding: '40px',
        fontFamily: 'Segoe UI',
      }}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '14px',
            padding: '14px',
            fontSize: '15px',
          },
        }}
      />

      <h1
  style={{
    textAlign: 'center',
    fontSize: '42px',
    fontWeight: '800',
    letterSpacing: '1px',
    marginBottom: '10px',
    color: '#2d3436',
    fontFamily: "'Poppins', sans-serif",
  }}
>
  Contact Manager Dashboard
</h1>

      <div
        style={{
          maxWidth: '1200px',
          margin: 'auto',
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '30px',
        }}
      >
        {/* LEFT CARD */}

        <div
          style={{
            background: '#e6e7ee',
            borderRadius: '24px',
            padding: '30px',
            boxShadow:
              '10px 10px 25px #c5c6cc, -10px -10px 25px #ffffff',
          }}
        >
          <h2
            style={{
              marginBottom: '20px',
              fontWeight: 'bold',
              fontFamily: "'Poppins', sans-serif",
              color: '#374151',
            }}
          >
            {editingId ? 'Edit Contact' : 'Add Contact'}
          </h2>

          <input
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="company_name"
            placeholder="Company Name"
            value={formData.company_name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="job_title"
            placeholder="Job Title"
            value={formData.job_title}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="status"
            placeholder="Status"
            value={formData.status}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '15px',
              border: 'none',
              borderRadius: '16px',
              background:
                'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '10px',
              boxShadow:
                '6px 6px 14px rgba(0,0,0,0.15)',
            }}
          >
            {editingId ? 'Update Contact' : 'Add Contact'}
          </button>
        </div>

        {/* RIGHT CARD */}

        <div
          style={{
            background: '#e6e7ee',
            borderRadius: '24px',
            padding: '30px',
            boxShadow:
              '10px 10px 25px #c5c6cc, -10px -10px 25px #ffffff',
          }}
        >
          <input
            placeholder="Search by name or email..."
            onChange={async (e) => {
  const value = e.target.value;

  const response = await fetch(
    `http://localhost:3001/contacts?search=${value}`,
  );

  const data = await response.json();

  setContacts(data);

  if (value && data.length === 0) {
    toast.error('Contact not found');
  }
}}
            style={{
              width: '100%',
              padding: '15px',
              border: 'none',
              borderRadius: '16px',
              marginBottom: '25px',
              background: '#e6e7ee',
              outline: 'none',
              boxShadow:
                'inset 6px 6px 12px #c5c6cc, inset -6px -6px 12px #ffffff',
            }}
          />

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr>
                <th style={tableHeader}>Name</th>
                <th style={tableHeader}>Email</th>
                <th style={tableHeader}>Mobile</th>
                <th style={tableHeader}>Company</th>
                <th style={tableHeader}>Job Title</th>
                <th style={tableHeader}>City</th>
                <th style={tableHeader}>Status</th>
                <th style={tableHeader}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((contact: any) => (
                <tr key={contact.id}>
                  <td style={tableCell}>
                    {contact.full_name}
                  </td>

                  <td style={tableCell}>
                    {contact.email}
                  </td>

                  <td style={tableCell}>
                    {contact.mobile}
                  </td>
                  <td style={tableCell}>
                    {contact.company_name}</td>
                  <td style={tableCell}>
                    {contact.job_title}</td>
                  <td style={tableCell}>
                    {contact.city}
                  </td>

                  <td style={tableCell}>
                    {contact.status}
                  </td>

                  <td style={tableCell}>
                    <button
                      onClick={() => {
                        setFormData({
                          full_name: contact.full_name || '',
                          email: contact.email || '',
                          mobile: contact.mobile || '',
                          company_name: contact.company_name || '',
                          job_title: contact.job_title || '',
                          city: contact.city || '',
                          status: contact.status || '',
                        });

                        setEditingId(contact.id);
                      }}
                      style={{
                        padding: '8px 14px',
                        border: 'none',
                        borderRadius: '10px',
                        background: '#667eea',
                        color: 'white',
                        cursor: 'pointer',
                        marginRight: '12px',
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={async () => {
                        await fetch(
                          `http://localhost:3001/contacts/${contact.id}`,
                          {
                            method: 'DELETE',
                          },
                        );

                        toast.success(
                          'Contact Deleted Successfully',
                        );

                        fetchContacts();
                      }}
                      style={{
                        padding: '8px 14px',
                        border: 'none',
                        borderRadius: '10px',
                        background: '#ff6b6b',
                        color: 'white',
                        cursor: 'pointer',

                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px',
  marginBottom: '18px',
  border: 'none',
  borderRadius: '14px',
  outline: 'none',
  background: '#e6e7ee',
  boxShadow:
    'inset 6px 6px 12px #c5c6cc, inset -6px -6px 12px #ffffff',
};

const tableHeader = {
  textAlign: 'left' as const,
  padding: '14px',
  color: '#374151',
  borderBottom: '2px solid #d1d5db',
};

const tableCell = {
  padding: '14px',
  borderBottom: '1px solid #d1d5db',
};