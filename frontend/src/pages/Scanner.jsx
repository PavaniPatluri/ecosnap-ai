import React, { useState, useRef } from 'react';
import { Upload, Camera, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import api from '../api';
import MetricCard from '../components/MetricCard';

const Scanner = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
      setError('');
    }
  };

  const handleScan = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/scans/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Eco Scanner</h1>
        <p className="text-lg text-gray-600">Snap a photo to reveal its hidden environmental impact.</p>
      </div>

      {!result ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-12 bg-gray-50 transition-colors hover:bg-gray-100 relative overflow-hidden group">
            {preview ? (
              <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-lg">
                <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => fileInputRef.current.click()} className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium shadow">Change Image</button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">Upload an Image</h3>
                <p className="text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-eco-600 hover:bg-eco-700"
                >
                  <Upload className="w-5 h-5 mr-2" /> Select File
                </button>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          {error && (
            <div className="mt-6 flex items-center text-red-600 bg-red-50 p-4 rounded-xl">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {preview && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleScan}
                disabled={loading}
                className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-full shadow-lg text-white bg-eco-600 hover:bg-eco-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-xl hover:-translate-y-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    Analyzing Impact...
                  </>
                ) : (
                  'Analyze with AI'
                )}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-eco-50 px-8 py-6 flex justify-between items-center border-b border-eco-100">
              <div>
                <p className="text-eco-600 font-semibold tracking-wide uppercase text-sm">Detected Object</p>
                <h2 className="text-3xl font-bold text-gray-900">{result.object_name}</h2>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md border-4 border-eco-200">
                  <span className="text-2xl font-black text-eco-600">{result.eco_score}</span>
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase mt-2">EcoScore</p>
              </div>
            </div>
            <div className="p-8">
              <p className="text-gray-700 text-lg leading-relaxed">{result.explanation}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard 
              title="Carbon Footprint" 
              value={result.carbon_footprint} 
              unit="kg CO₂" 
              icon={AlertCircle}
              colorClass="text-red-600"
            />
            <MetricCard 
              title="Water Usage" 
              value={result.water_footprint} 
              unit="Liters" 
              icon={RefreshCw}
              colorClass="text-blue-600"
            />
            <MetricCard 
              title="Energy Cost" 
              value={result.energy_consumption} 
              unit="kWh" 
              icon={AlertCircle}
              colorClass="text-yellow-600"
            />
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Better Choices</h3>
            <div className="bg-eco-50 rounded-2xl p-6 border border-eco-100">
              <h4 className="text-lg font-semibold text-eco-800 mb-2">Sustainable Alternatives</h4>
              <p className="text-eco-900 leading-relaxed">{result.sustainable_alternatives}</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="text-lg font-semibold text-blue-800 mb-2">Estimated Impact</h4>
              <p className="text-blue-900 leading-relaxed">{result.estimated_savings}</p>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={reset}
              className="inline-flex items-center px-6 py-3 border-2 border-gray-200 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" /> Scan Another Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
