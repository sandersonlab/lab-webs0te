import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { BsTree } from 'react-icons/bs';
import { HiDesktopComputer } from 'react-icons/hi';
import { BiDna } from 'react-icons/bi';
import { CgListTree, CgPill } from 'react-icons/cg';
import { SiElasticstack } from 'react-icons/si';
import { FaGlobeAfrica, FaDatabase, FaFlask, FaClock, FaHospital } from 'react-icons/fa';
import { IoIosGitNetwork } from 'react-icons/io';

const ToolCard = ({ tool, className }) => (
  <a href={tool.url} className={`bg-white hover:bg-gray-100 border border-gray-300 rounded-lg shadow-lg text-center text-blue-500 hover:text-blue-600 transition duration-300 ${className}`}>
    <div className="flex items-center justify-center mb-2">
      {tool.icon}
      <span className="ml-2 font-medium">{tool.name}</span>
    </div>
    <p className="text-gray-600 text-sm">{tool.desc}</p>
  </a>
);

const Genomium = () => {
  const mainTools = [
    {
      name: 'Taxonium',
      url: '//taxonium.org',
      desc: 'A tool for exploring large phylogenetic trees',
      icon: <CgListTree className="inline-block mr-2" />
    },
    {
      name: 'Gensplore',
      url: '//gensplore.theo.io',
      desc: 'Explore microbial reference genomes in Genbank format',
      icon: <BiDna className="inline-block mr-2" />
    },
    {
      name: 'DeeperSeq',
      url: '//deeperseq.genomium.org',
      desc: 'A tool for exploring deep sequencing data for microbial genomes',
      icon: <SiElasticstack className="inline-block mr-2" />
    },
  ];

  const supplementalTools = [
    {
      name: 'CovGlobe',
      url: '//covglobe.org',
      desc: 'Exploring geospatial patterns in SARS-CoV-2 lineages',
      icon: <FaGlobeAfrica className="inline-block mr-1" />
    },
    {
      name: 'Codon2Nucleotide',
      url: '//codon2nucleotide.theo.io',
      desc: 'Convert coordinate types, and between ORF1ab/a/b/nsps for SARS-CoV-2',
      icon: <HiDesktopComputer className="inline-block mr-1" />
    },
    {
      name: 'PhenoPlasm',
      url: 'http://phenoplasm.org',
      desc: 'A database of published phenotypes for malaria parasite genes',
      icon: <FaDatabase className="inline-block mr-1" />
    },
    {
      name: 'Chronumental',
      url: '//github.com/theosanderson/chronumental',
      desc: 'An installable tool for dating large phylogenetic trees',
      icon: <FaClock className="inline-block mr-1" />
    },
  ];

  const honoraryTools = [
    {
      name: 'Mixology',
      url: '//mixology.science',
      desc: 'A tool for calculating recipes for laboratory solutions',
      icon: <FaFlask className="inline-block mr-2" />
    },
    {
      name: 'Hospital Medicines',
      url: '//hospitalmedicines.genomium.org',
      desc: "A data explorer for England's hospital medicine usage data",
      icon: <FaHospital className="inline-block mr-2" />
    },
    {
      name: 'Lineage networks',
      url: '//lineage-networks.genomium.org/',
      desc: 'Visualise similarities and differences between PANGO lineages',
      icon: <IoIosGitNetwork className="inline-block mr-2" />
    },
    {
      name: 'Molnupiravir branch identification helper',
      url: '//movbranchapp.streamlit.app/',
      desc: 'Likelihood for molnupiravir-origins of a branch from nucleotide contexts',
      icon: <CgPill className="inline-block mr-2" />
    }
  ];

  return (
   <Layout>
      <Head>
        <title>Genomium Tools - Sanderson Lab</title>
        <meta name="description" content="Explore Genomium, a collection of tools for microbial genome analysis and more." />
      </Head>
      <div className=" ">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tools</h1>
       

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {mainTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} className="p-4" />
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-700 mb-4">Supplemental Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {supplementalTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} className="p-3" />
          ))}
        </div>

        <h2 className="text-lg font-bold text-gray-700 mb-4">Bonus Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {honoraryTools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} className="p-3 h-32" />
          ))}
        </div>
      </div>
      </Layout>
  );
};


Genomium.getLayout = function getLayout(page) {
  return <Layout showBackground={false}>{page}</Layout>;
}


export default Genomium;