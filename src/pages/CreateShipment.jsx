import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShipments } from '../context/ShipmentsContext';
import { ArrowLeft, ChevronDown, Calendar, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';

export default function CreateShipment() {
  const navigate = useNavigate();
  const { addShipment } = useShipments();

  // Helper: Generate random Tracking ID
  const generateTrackingId = () => {
    const randomNums = Math.floor(1000000 + Math.random() * 9000000);
    return `#SH${randomNums}`;
  };

  // Form State
  const [trackingId, setTrackingId] = useState('');
  useEffect(() => {
    setTrackingId(generateTrackingId());
  }, []);

  // Sender Info
  const [senderCompany, setSenderCompany] = useState('GreenHaven');
  const [senderEmail, setSenderEmail] = useState('logistics@greenhaven.com');
  const [senderPhoneCode, setSenderPhoneCode] = useState('+1');
  const [senderPhone, setSenderPhone] = useState('408-555-7210');
  const [pickupAddress, setPickupAddress] = useState('1120 Birch Street, Portland, OR 97205, USA');

  // Recipient Info
  const [recipientCompany, setRecipientCompany] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientPhoneCode, setRecipientPhoneCode] = useState('+1');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Package Details
  const [itemDescription, setItemDescription] = useState('Premium Garden Tool Set');
  const [quantity, setQuantity] = useState(40);
  const [declaredValue, setDeclaredValue] = useState('$3,200');
  const [weight, setWeight] = useState(125);
  const [weightUnit, setWeightUnit] = useState('Kg');
  const [dimLength, setDimLength] = useState('80');
  const [dimWidth, setDimWidth] = useState('60');
  const [dimHeight, setDimHeight] = useState('');

  // Shipping Details
  const [freightType, setFreightType] = useState('Road Freight');
  const [carrier, setCarrier] = useState('FedEx');
  const [shippingMethod, setShippingMethod] = useState('');
  const [dateATD, setDateATD] = useState('2035-03-21');
  const [dateETA, setDateETA] = useState('');
  const [notes, setNotes] = useState('');

  // Additional Services
  const [insurance, setInsurance] = useState(true);
  const [tempControl, setTempControl] = useState(true);
  const [signature, setSignature] = useState(true);
  const [fragile, setFragile] = useState(false);
  const [notifyRecipient, setNotifyRecipient] = useState(true);

  // Errors State
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form Validations
  const validateForm = () => {
    const newErrors = {};

    if (!recipientCompany.trim()) newErrors.recipientCompany = 'Recipient company name is required';
    if (!deliveryAddress.trim()) newErrors.deliveryAddress = 'Address is required.';
    if (!shippingMethod) newErrors.shippingMethod = 'Shipping method is required.';
    
    // Weight check
    if (!weight || Number(weight) <= 0) {
      newErrors.weight = 'Weight must be a positive number';
    }

    // Quantity check
    if (!quantity || Number(quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than zero';
    }

    // Date validations (ATD required, ETA required, ETA after ATD check)
    if (!dateATD) {
      newErrors.dateATD = 'Shipment date is required';
    }
    if (!dateETA) {
      newErrors.dateETA = 'Delivery ETA date is required';
    } else if (dateATD && new Date(dateETA) <= new Date(dateATD)) {
      newErrors.dateETA = 'Estimated delivery (ETA) must be after shipment date (ATD)';
    }

    return newErrors;
  };

  // Live validation feedback clearing
  useEffect(() => {
    if (isSubmitted) {
      setErrors(validateForm());
    }
  }, [
    recipientCompany, 
    deliveryAddress, 
    shippingMethod, 
    weight, 
    quantity, 
    dateATD, 
    dateETA, 
    isSubmitted
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Structure new shipment payload
      const payload = {
        id: trackingId,
        company: senderCompany || 'Private Sender',
        companyCategory: 'Apparel', // default category
        carrier: carrier,
        type: freightType,
        weight: `${weight} ${weightUnit}`,
        weightVal: Number(weight),
        origin: pickupAddress || 'Origin Port',
        destination: deliveryAddress,
        dateATD: new Date(dateATD).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        dateETA: new Date(dateETA).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Pending',
        productCategory: itemDescription || 'General Cargo'
      };

      addShipment(payload);
      // Navigate to shipments list table view
      navigate('/shipments?view=table');
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans select-none">
      
      {/* Top Header Panel */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
        <span className="hover:text-slate-700 cursor-pointer" onClick={() => navigate('/')}>Dashboard</span>
        <span className="text-slate-300">/</span>
        <span className="hover:text-slate-700 cursor-pointer" onClick={() => navigate('/shipments')}>Shipments</span>
        <span className="text-slate-300">/</span>
        <span className="text-slate-700">Create New Shipment</span>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/shipments')}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 cursor-pointer"
          aria-label="Go back to shipments"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-black font-heading text-slate-900 leading-tight">Create New Shipment</h1>
        </div>
      </div>

      {/* Shipment Form Container */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden" noValidate>
        
        {/* Main form body layout */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Section 1: Sender & Recipient Info Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-6 border-b border-slate-100">
            
            {/* Sender Info block */}
            <div className="space-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Sender Info</h3>
              
              <div className="space-y-3">
                {/* Company Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">Company</label>
                  <input
                    type="text"
                    value={senderCompany}
                    onChange={(e) => setSenderCompany(e.target.value)}
                    placeholder="Enter sender company name"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Email / Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">Email</label>
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="logistics@company.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">Phone Number</label>
                    <div className="flex gap-1">
                      <select 
                        value={senderPhoneCode}
                        onChange={(e) => setSenderPhoneCode(e.target.value)}
                        className="px-2 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                      >
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+880">🇧🇩 +880</option>
                      </select>
                      <input
                        type="text"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        placeholder="000-000-0000"
                        className="flex-1 px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Pickup Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">Pickup Address</label>
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Enter pickup address"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Recipient Info block */}
            <div className="space-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Recipient Info</h3>
              
              <div className="space-y-3">
                {/* Company Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">Company</label>
                  <input
                    type="text"
                    value={recipientCompany}
                    onChange={(e) => setRecipientCompany(e.target.value)}
                    placeholder="Enter recipient company name"
                    className={`w-full px-3.5 py-2.5 text-xs bg-white border ${
                      errors.recipientCompany ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:ring-primary-500'
                    } rounded-xl focus:outline-none focus:ring-2`}
                  />
                  {errors.recipientCompany && (
                    <span className="text-[10px] font-bold text-red-500">{errors.recipientCompany}</span>
                  )}
                </div>

                {/* Email / Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">Email</label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      placeholder="warehouse@company.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">Phone Number</label>
                    <div className="flex gap-1">
                      <select
                        value={recipientPhoneCode}
                        onChange={(e) => setRecipientPhoneCode(e.target.value)}
                        className="px-2 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                      >
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+880">🇧🇩 +880</option>
                      </select>
                      <input
                        type="text"
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        placeholder="000-000-0000"
                        className="flex-1 px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">Delivery Address</label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Street address, city, state/province, ZIP code"
                    className={`w-full px-3.5 py-2.5 text-xs bg-white border ${
                      errors.deliveryAddress ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:ring-primary-500'
                    } rounded-xl focus:outline-none focus:ring-2`}
                  />
                  {errors.deliveryAddress && (
                    <span className="text-[10px] font-bold text-red-500">{errors.deliveryAddress}</span>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Section 2: Package & Shipping Details Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Package Details block */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Package Details</h3>
              
              <div className="space-y-3">
                {/* Item Description */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">Item Description</label>
                  <input
                    type="text"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    placeholder="Describe package contents"
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F8FAFC] border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
                  />
                </div>

                {/* Quantity & Value Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">Quantity</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F8FAFC] border ${
                        errors.quantity ? 'border-red-500 focus:ring-red-100' : 'border-slate-100 focus:ring-primary-500 focus:bg-white'
                      } rounded-xl focus:outline-none focus:ring-2`}
                    />
                    {errors.quantity && (
                      <span className="text-[10px] font-bold text-red-500">{errors.quantity}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">Value</label>
                    <input
                      type="text"
                      value={declaredValue}
                      onChange={(e) => setDeclaredValue(e.target.value)}
                      placeholder="$0.00"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F8FAFC] border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Weight & Units selector */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">Weight</label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F8FAFC] border ${
                        errors.weight ? 'border-red-500 focus:ring-red-100' : 'border-slate-100 focus:ring-primary-500 focus:bg-white'
                      } rounded-xl focus:outline-none focus:ring-2`}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">Units</label>
                    <select
                      value={weightUnit}
                      onChange={(e) => setWeightUnit(e.target.value)}
                      className="w-full px-2.5 py-2.5 text-xs bg-[#F8FAFC] border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white cursor-pointer"
                    >
                      <option value="Kg">Kg</option>
                      <option value="Lbs">Lbs</option>
                    </select>
                  </div>
                </div>
                {errors.weight && (
                  <span className="text-[10px] font-bold text-red-500 block">{errors.weight}</span>
                )}

                {/* Dimensions (Length, Width, Height) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">Dimensions</label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={dimLength}
                        onChange={(e) => setDimLength(e.target.value)}
                        placeholder="Length"
                        className="w-full pl-3 pr-8 py-2.5 text-xs bg-[#F8FAFC] border border-slate-100 rounded-xl focus:outline-none"
                      />
                      <span className="absolute right-2.5 text-[9px] font-bold text-slate-400">cm</span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={dimWidth}
                        onChange={(e) => setDimWidth(e.target.value)}
                        placeholder="Width"
                        className="w-full pl-3 pr-8 py-2.5 text-xs bg-[#F8FAFC] border border-slate-100 rounded-xl focus:outline-none"
                      />
                      <span className="absolute right-2.5 text-[9px] font-bold text-slate-400">cm</span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        value={dimHeight}
                        onChange={(e) => setDimHeight(e.target.value)}
                        placeholder="Height"
                        className="w-full pl-3 pr-8 py-2.5 text-xs bg-[#F8FAFC] border border-slate-100 rounded-xl focus:outline-none"
                      />
                      <span className="absolute right-2.5 text-[9px] font-bold text-slate-400">cm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Details block */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Shipping Details</h3>
              
              <div className="space-y-3">
                {/* Freight Type Radio Selector Row */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-500">Freight Type</label>
                  <div className="flex items-center gap-4 py-1 flex-wrap select-none">
                    {['Road Freight', 'Rail Freight', 'Ocean Freight', 'Air Freight'].map((type) => (
                      <label key={type} className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="freightType"
                          checked={freightType === type}
                          onChange={() => setFreightType(type)}
                          className="h-4 w-4 text-primary-600 border-slate-300 focus:ring-primary-500 cursor-pointer"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Carrier & Shipping Method dropdown */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">Carrier</label>
                    <select
                      value={carrier}
                      onChange={(e) => setCarrier(e.target.value)}
                      className="w-full px-2.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                    >
                      <option value="FedEx">FedEx</option>
                      <option value="DHL">DHL</option>
                      <option value="UPS">UPS</option>
                      <option value="USPS">USPS</option>
                      <option value="Aramex">Aramex</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">Shipping Method</label>
                    <select
                      value={shippingMethod}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className={`w-full px-2.5 py-2.5 text-xs bg-white border ${
                        errors.shippingMethod ? 'border-red-500 focus:ring-red-100' : 'border-slate-200 focus:ring-primary-500'
                      } rounded-xl focus:outline-none focus:ring-2 cursor-pointer`}
                    >
                      <option value="">Select Method</option>
                      <option value="Standard">Standard Delivery</option>
                      <option value="Priority">Priority Express</option>
                      <option value="Overnight">Overnight Delivery</option>
                    </select>
                  </div>
                </div>
                {errors.shippingMethod && (
                  <span className="text-[10px] font-bold text-red-500 block">{errors.shippingMethod}</span>
                )}

                {/* Shipment ID & Shipment Date / Delivery Date */}
                <div className="grid grid-cols-3 gap-3">
                  
                  {/* Tracking ID */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">Shipment ID</label>
                    <input
                      type="text"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-slate-100 text-slate-700 border border-slate-200 rounded-xl focus:outline-none"
                    />
                    <span className="text-[9px] text-slate-400 font-semibold pl-1">Auto-generated</span>
                  </div>

                  {/* Shipment Date (ATD) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">Shipment Date (ATD)</label>
                    <div className="relative flex items-center">
                      <input
                        type="date"
                        value={dateATD}
                        onChange={(e) => setDateATD(e.target.value)}
                        className={`w-full px-3 py-2.5 text-xs bg-white border ${
                          errors.dateATD ? 'border-red-500' : 'border-slate-200'
                        } rounded-xl focus:outline-none`}
                      />
                    </div>
                  </div>

                  {/* Estimated Delivery Date (ETA) */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-500">Delivery Date (ETA)</label>
                    <div className="relative flex items-center">
                      <input
                        type="date"
                        value={dateETA}
                        onChange={(e) => setDateETA(e.target.value)}
                        className={`w-full px-3 py-2.5 text-xs bg-white border ${
                          errors.dateETA ? 'border-red-500' : 'border-slate-200'
                        } rounded-xl focus:outline-none`}
                      />
                    </div>
                  </div>

                </div>
                {errors.dateETA && (
                  <span className="text-[10px] font-bold text-red-500 block">{errors.dateETA}</span>
                )}

                {/* Notes Textarea */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <label className="text-xs font-bold text-slate-500">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add special delivery notes (optional)"
                    rows={2}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#F8FAFC] border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Section 3: Additional Services & Toggle */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
            
            {/* Checkbox columns */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Additional Services</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={insurance}
                    onChange={(e) => setInsurance(e.target.checked)}
                    className="h-4.5 w-4.5 text-primary-600 border-slate-300 rounded focus:ring-primary-500 cursor-pointer"
                  />
                  Insurance Coverage
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tempControl}
                    onChange={(e) => setTempControl(e.target.checked)}
                    className="h-4.5 w-4.5 text-primary-600 border-slate-300 rounded focus:ring-primary-500 cursor-pointer"
                  />
                  Temperature Control
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={signature}
                    onChange={(e) => setSignature(e.target.checked)}
                    className="h-4.5 w-4.5 text-primary-600 border-slate-300 rounded focus:ring-primary-500 cursor-pointer"
                  />
                  Signature on Delivery
                </label>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fragile}
                    onChange={(e) => setFragile(e.target.checked)}
                    className="h-4.5 w-4.5 text-primary-600 border-slate-300 rounded focus:ring-primary-500 cursor-pointer"
                  />
                  Fragile Item Handling
                </label>
              </div>
            </div>

            {/* Toggle switch column */}
            <div className="flex items-center justify-between lg:justify-end gap-6 bg-slate-50/50 p-5 rounded-2xl border border-slate-100/50">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-800">Tracking & Status Updates</h4>
                <p className="text-[10px] font-medium text-slate-400">Notify Recipient via Email/SMS</p>
              </div>
              {/* Custom Toggle Switch */}
              <button
                type="button"
                onClick={() => setNotifyRecipient(!notifyRecipient)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifyRecipient ? 'bg-primary-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    notifyRecipient ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

          </div>

        </div>

        {/* Footer Actions block */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/shipments')}
            className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 bg-white rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                // Reset form values to default empty states
                setRecipientCompany('');
                setRecipientPhone('');
                setDeliveryAddress('');
                setDimHeight('');
                setShippingMethod('');
                setDateETA('');
                setErrors({});
                setIsSubmitted(false);
              }}
              className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            >
              Delete Form
            </button>
            
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Submit Shipment
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
