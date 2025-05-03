// src/pages/NewHousingPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import axiosInstance from '../api/axiosInstance';

const NewHousing = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();

  const [formData, setFormData] = useState({
    userId,
    price: '',
    location: '',
    body: '',
    latitude: '',
    longitude: '',
    availableFrom: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    propertyType: '',
    status: '',
    services: [],
    imageUrls: [],
  });

  const [errors, setErrors] = useState({});

  const requiredFields = ['price', 'location', 'body', 'availableFrom', 'propertyType', 'status'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split(',').map((v) => v.trim());
    setFormData((prev) => ({ ...prev, [field]: values }));
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (formData.location.length > 5) {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.location)}`)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.length > 0) {
              setFormData((prev) => ({
                ...prev,
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lon),
              }));
            }
          })
          .catch(console.error);
      }
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [formData.location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axiosInstance.post('/housing', formData);
      navigate('/housing');
    } catch (err) {
      console.error('Error creating housing item:', err);
    }
  };

  const inputClass = "w-full border p-2 rounded";

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Create New Housing Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* PRICE */}
        <div>
          <label className="block font-semibold">Price (€)</label>
          <input name="price" type="number" value={formData.price} onChange={handleChange} className={inputClass} />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        {/* LOCATION */}
        <div>
          <label className="block font-semibold">Address</label>
          <input name="location" type="text" value={formData.location} onChange={handleChange} className={inputClass} />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          <p className="text-sm text-gray-500">Lat: {formData.latitude} | Lon: {formData.longitude}</p>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block font-semibold">Description</label>
          <textarea name="body" value={formData.body} onChange={handleChange} className={inputClass} />
          {errors.body && <p className="text-red-500 text-sm">{errors.body}</p>}
        </div>

        {/* DATE & AREA */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Available From</label>
            <input name="availableFrom" type="date" value={formData.availableFrom} onChange={handleChange} className={inputClass} />
            {errors.availableFrom && <p className="text-red-500 text-sm">{errors.availableFrom}</p>}
          </div>
          <div>
            <label className="block font-semibold">Area (m²)</label>
            <input name="area" type="number" value={formData.area} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        {/* BEDROOMS & BATHROOMS */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Bedrooms</label>
            <input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block font-semibold">Bathrooms</label>
            <input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} className={inputClass} />
          </div>
        </div>

        {/* PROPERTY TYPE */}
        <div>
          <label className="block font-semibold">Property Type</label>
          <select name="propertyType" value={formData.propertyType} onChange={handleChange} className={inputClass}>
            <option value="">Select...</option>
            <option value="Shared room">Shared room</option>
            <option value="Single room">Single room</option>
            <option value="Full house">Full house</option>
          </select>
          {errors.propertyType && <p className="text-red-500 text-sm">{errors.propertyType}</p>}
        </div>

        {/* STATUS */}
        <div>
          <label className="block font-semibold">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
            <option value="">Select...</option>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Rented">Rented</option>
          </select>
          {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
        </div>

        {/* SERVICES */}
        <div>
          <label className="block font-semibold">Services (comma separated)</label>
          <input name="services" type="text" value={formData.services.join(', ')} onChange={(e) => handleArrayChange(e, 'services')} className={inputClass} />
        </div>

        {/* IMAGE URLS */}
        <div>
          <label className="block font-semibold">Image URLs (comma separated)</label>
          <input name="imageUrls" type="text" value={formData.imageUrls.join(', ')} onChange={(e) => handleArrayChange(e, 'imageUrls')} className={inputClass} />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">Create Listing</button>
      </form>
    </div>
  );
};

export default NewHousing;
