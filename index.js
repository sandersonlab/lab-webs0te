import React from 'react';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout showBackground={true}>
    
    <div className="relative">
     
      <div className="relative z-10">
        <section className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 mt-8">
          <h1 className="text-2xl text-gray-800 uppercase mb-4">Welcome </h1>
          <p className="text-gray-600">

            We are a research group based at the London School of Hygiene & Tropical Medicine. Our research uses new phylogenetic tools to draw insights from the unprecedented scale of viral genomic data now available. We are interested in understanding the forces shaping the evolution of these genomes, and in what these data can tell us about underlying virus biology.
            </p>
        </section>
      </div>
    </div>
    </Layout>

  );
};

export default Home;
