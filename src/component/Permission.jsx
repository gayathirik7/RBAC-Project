import React, { useState } from 'react';

const Permissions = ({ roles, updateRole, authenticatedUser }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [permissions, setPermissions] = useState([]);

  const handleRoleChange = (e) => {
    const role = roles.find(r => r.name === e.target.value);
    setSelectedRole(role.name);
    setPermissions(role.permissions);
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPermissions([...permissions, value]);
    } else {
      setPermissions(permissions.filter(permission => permission !== value));
    }
  };

  const handleSave = () => {
    updateRole(selectedRole, permissions);
    alert('Permissions updated successfully');
  };

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600  shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Permissions</h2>
      
      <div className="mb-6">
        <label htmlFor="roles" className="block text-lg font-semibold">Select Role</label>
        <select
          id="roles"
          value={selectedRole}
          onChange={handleRoleChange}
          className="mt-2 block w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
        >
          <option value="" disabled>Select a role</option>
          {roles.map(role => (
            <option key={role.id} value={role.name}>{role.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="permissions" className="block text-lg font-semibold">Permissions</label>
        <div className="mt-3 grid grid-cols-2 gap-4">
          {['Create', 'Read', 'Update', 'Delete'].map(permission => (
            <div key={permission} className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={permission}
                value={permission}
                checked={permissions.includes(permission)}
                onChange={handlePermissionChange}
                disabled={authenticatedUser.role !== 'admin'} // Disable checkboxes for non-admin users
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              />
              <label htmlFor={permission} className="text-lg">{permission}</label>
            </div>
          ))}
        </div>
      </div>

      {authenticatedUser.role === 'admin' && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold text-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Permissions;
