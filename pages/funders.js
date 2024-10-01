import React from 'react';
import Layout from '../components/Layout';

const Funding = () => {
  return (
    <Layout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Funding</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Funders</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-medium text-gray-600 mb-2">Wellcome Trust</h3>
          <p className="text-gray-600">
            The laboratory is funded by a Career Development Award from <a href="https://wellcome.org/" className="underline hover:text-blue-600">Wellcome</a>. 
          </p>

          <img  className="w-32 h-32 my-8 rounded-full mx-auto mb-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Wellcome_Trust_logo.svg/512px-Wellcome_Trust_logo.svg.png" alt="Wellcome Trust" />

        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Support Our Work</h2>
        <p className="text-gray-600 mb-4">
          If you would like to support our work, please get in touch with us. 
        </p>
        <div className="bg-blue-100 rounded-lg p-4">
          <p className="text-blue-800">
            To discuss ways to support our research, please email Theo at:{' '}
            <a href="theodore.sanderson@lshtm.ac.uk" className="underline hover:text-blue-600">
              theodore.sanderson@lshtm.ac.uk
            </a>
          </p>
        </div>
      </section>
    </div>
    </Layout>
  );
};

export default Funding;
