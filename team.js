import React from 'react';
import Layout from '../components/Layout';
const Team = () => {
  const teamMembers = [
    { name: "Theo Sanderson", role: "Principal Investigator", image: "/theo.jpg" },
   
  ];

  return (
    <Layout>
    <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default Team;
