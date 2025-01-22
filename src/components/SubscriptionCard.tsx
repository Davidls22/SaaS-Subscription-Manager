import React, { useState } from "react";
import { IoTrash, IoPencil, IoInformationCircleOutline, IoClose } from "react-icons/io5";

interface SubscriptionCardProps {
  subscription: {
    _id: string;
    name: string;
    cost: number;
    billingFrequency: string;
    renewalDate: string;
    category: string;
    notes?: string;
  };
  onDelete: (id: string) => void;
  onSave: (updatedSubscription: any) => void;
}

const SubscriptionCard = ({
  subscription,
  onDelete,
  onSave,
}: SubscriptionCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(subscription);
  const [showNotesModal, setShowNotesModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md relative">
      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <select
            name="billingFrequency"
            value={formData.billingFrequency}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          >
            <option value="monthly">Monthly</option>
            <option value="annual">Annual</option>
          </select>
          <input
            type="date"
            name="renewalDate"
            value={formData.renewalDate}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            name="notes"
            value={formData.notes || ""}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
            placeholder="Notes"
          ></textarea>
          <div className="flex justify-between mt-4">
            <button
              className="text-green-500 hover:text-green-700"
              aria-label="Save Changes"
              onClick={handleSave}
            >
              <IoPencil size={24} />
            </button>
            <button
              className="text-gray-500 hover:text-gray-700"
              aria-label="Cancel Edit"
              onClick={() => setIsEditing(false)}
            >
              <IoClose size={24} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{subscription.name}</h2>
            {subscription.notes && (
              <button
                className="text-blue-500 hover:text-blue-700"
                aria-label="View Notes"
                onClick={() => setShowNotesModal(true)}
              >
                <IoInformationCircleOutline size={24} />
              </button>
            )}
          </div>
          <p className="text-gray-600">Cost: £{subscription.cost}/{subscription.billingFrequency}</p>
          <p className="text-gray-600">Renewal Date: {new Date(subscription.renewalDate).toDateString()}</p>
          <p className="text-gray-600">Category: {subscription.category}</p>
          <div className="flex justify-between mt-4">
            <button
              className="text-blue-500 hover:text-blue-700"
              aria-label="Edit Subscription"
              onClick={() => setIsEditing(true)}
            >
              <IoPencil size={20} />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              aria-label="Delete Subscription"
              onClick={() => onDelete(subscription._id)}
            >
              <IoTrash size={20} />
            </button>
          </div>
        </>
      )}

      {showNotesModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              aria-label="Close Notes"
              onClick={() => setShowNotesModal(false)}
            >
              <IoClose size={24} />
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Notes</h3>
            <p className="text-gray-600">{subscription.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;