import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../api/uploadService';
import { createProperty } from '../api/propertyService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CreateProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    price: '',
    pricingFrequency: 'monthly',
    allowBargaining: false,
  });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setUploading(true);
    setError('');
    try {
      const { data } = await uploadImage(file);
      setImageUrl(data.imageUrl);
    } catch (err) {
      setError('Image upload failed.');
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      setError('Please upload an image.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const propertyData = { ...formData, images: [imageUrl], price: Number(formData.price) };
      await createProperty(propertyData);
      navigate('/my-properties');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create property.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        List a New Property
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Property Title" required onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" />
        <textarea name="description" placeholder="Description" required onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" />
        <input type="text" name="address" placeholder="Address" required onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" />
        
        <div className="flex space-x-2">
          <input type="number" name="price" placeholder="Price" required onChange={handleInputChange} className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" />
          <select name="pricingFrequency" onChange={handleInputChange} value={formData.pricingFrequency} className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600">
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="allowBargaining" checked={formData.allowBargaining} onChange={handleInputChange} className="focus:ring-indigo-600" />
            <span>Allow Bargaining</span>
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Property Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100" />
          {uploading && <LoadingSpinner />}
          {imageUrl && !uploading && <img src={imageUrl} alt="Preview" className="w-32 h-32 object-cover mt-2 rounded" />}
        </div>
        
        <button type="submit" disabled={loading || uploading} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300">
          {loading ? 'Submitting...' : 'Create Property'}
        </button>
      </form>
    </div>
  );
};

export default CreateProperty;