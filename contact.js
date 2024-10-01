import React from 'react';
import Layout from '../components/Layout';

const ContactUs = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
        
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-4">
              
            </p>
            
             
                Please email us at:{' '}
                <a href="mailto:theodore.sanderson@lshtm.ac.uk" className="underline hover:text-blue-600">
                  theodore.sanderson@lshtm.ac.uk
                </a>
              
           
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Address</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-4">
              Our laboratory is located at:
            </p>
            <address className="text-gray-600 not-italic">
              London School of Hygiene & Tropical Medicine<br />
              Keppel Street<br />
              London WC1E 7HT<br />
              United Kingdom
            </address>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactUs;