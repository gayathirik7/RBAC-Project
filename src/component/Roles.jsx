import React, { useState } from 'react';

const RoleManagement = ({ roles, authenticatedUser, updateRole }) => {
  const [editRoleId, setEditRoleId] = useState(null);
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState([]);

  const handleEditClick = (role) => {
    setEditRoleId(role.id);
    setRoleName(role.name);
    setPermissions(role.permissions);
  };

  const handleSaveClick = () => {
    updateRole(editRoleId, { name: roleName, permissions });
    setEditRoleId(null);
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setPermissions([...permissions, value]);
    } else {
      setPermissions(permissions.filter(permission => permission !== value));
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Manage Roles</h2>
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-4 px-6 text-left text-sm uppercase font-semibold">Role Name</th>
            <th className="py-4 px-6 text-left text-sm uppercase font-semibold">Permissions</th>
            {authenticatedUser.role === 'admin' && (
              <th className="py-4 px-6 text-left text-sm uppercase font-semibold">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-6">
                {editRoleId === role.id ? (
                  <input
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    className="border-2 border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  role.name
                )}
              </td>
              <td className="py-4 px-6">
                {editRoleId === role.id ? (
                  ['Create', 'Read', 'Update', 'Delete'].map(permission => (
                    <div key={permission} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={permission}
                        value={permission}
                        checked={permissions.includes(permission)}
                        onChange={handlePermissionChange}
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                      />
                      <label htmlFor={permission} className="ml-2 text-lg">{permission}</label>
                    </div>
                  ))
                ) : (
                  role.permissions.join(', ')
                )}
              </td>
              {authenticatedUser.role === 'admin' && (
                <td className="py-4 px-6">
                  {editRoleId === role.id ? (
                    <>
                      <button
                        onClick={handleSaveClick}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditRoleId(null)}
                        className="bg-gray-600 text-white px-4 py-2 ml-2 rounded-md hover:bg-gray-700 transition duration-200 ease-in-out"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(role)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManagement;
