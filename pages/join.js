import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';

const ApplyPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      for (const key in data) {
        if (key === 'cv') {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      }

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  if (submitStatus === 'success') {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Your form has been submitted successfully.</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 mt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Join us</h1>
          <p className="text-gray-600 mb-4">
            We will be advertising for multiple positions in the lab. We are also often happy to support applications for early-career fellowships.
          </p>
          <p className="text-gray-600 mb-4">
            If you are interested in joining the lab, you can send informal enquiries to <a href="mailto:theo@theo.io" className="text-indigo-600 hover:text-indigo-800">Theo Sanderson</a>, or you can fill in the form below.
          </p>
        </div>

        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 mt-8 border-2 border-indigo-100">
      <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
        🎺 PhD Studentship Opportunity - Antiviral-induced Viral Evolution
      </h2>
      <div className="space-y-4">
        <p className="text-gray-700">
          We're advertising a collaborative project between LSHTM and the Royal Veterinary College (RVC) to investigate how mutagenic antiviral drugs can generate highly mutated yet viable viruses.
        </p>
        
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-semibold text-indigo-800 mb-2">You'll have the opportunity to:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Gain skills in bioinformatic methods for studying viral evolution and modelling it</li>
            <li>Gain wet-lab virology experience using coronavirus models</li>
          </ul>
        </div>

        <div className="mt-4">
          <a 
            href="https://www.lshtm.ac.uk/study/fees-and-funding/funding-scholarships/research-degree-funding/2025-26-bloomsbury-colleges-phd-studentships"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            View Studentship Details
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <h4 className="font-semibold mb-2">Background reading:</h4>
          <ul className="space-y-1">
            <li>
              <a href="https://www.nature.com/articles/s41586-023-06649-6" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-indigo-600 hover:text-indigo-800">
                A molnupiravir-associated mutational signature in global SARS-CoV-2 genomes

              </a>
            </li>
            <li>
              <a href="https://www.pnas.org/doi/10.1073/pnas.1811345115" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-indigo-600 hover:text-indigo-800">
                The mechanism of resistance to favipiravir in influenza
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⏰ Application deadline: End of February 2025<br />
            📧 Questions? Contact <a href="mailto:theo@theo.io" className="text-indigo-600 hover:text-indigo-800">Theo Sanderson</a> or Co-Supervisor, Daniel Goldhill at RVC
          </p>
        </div>
      </div>
    </div>

        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Express informal interest in joining the laboratory
          </h2>
          <p className="text-gray-600 mb-6">By filling in the form below you will express interest in joining the lab, and we may contact you to let you know if a suitable position becomes available.</p>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Current Institution</label>
              <input
                id="institution"
                type="text"
                {...register('institution', { required: 'Institution is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.institution && <p className="mt-1 text-sm text-red-600">{errors.institution.message}</p>}
            </div>

            <div>
              <label htmlFor="github" className="block text-sm font-medium text-gray-700">GitHub Profile (Optional)</label>
              <input
                id="github"
                type="text"
                {...register('github')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Briefly, what are your scientific interests and why might you be interested in joining the lab?</label>
              <textarea
                id="message"
                {...register('message', { required: 'Message is required' })}
                rows="4"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
            </div>

            <div>
              <label htmlFor="cv" className="block text-sm font-medium text-gray-700">Upload CV (PDF)</label>
              <input
                id="cv"
                type="file"
                accept=".pdf"
                {...register('cv', { required: 'CV is required' })}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
              {errors.cv && <p className="mt-1 text-sm text-red-600">{errors.cv.message}</p>}
            </div>

            <div>
              <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">CAPTCHA: what is 3 + 3?</label>
              <input
                id="captcha"
                type="text"
                {...register('captcha', { required: 'CAPTCHA is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.captcha && <p className="mt-1 text-sm text-red-600">{errors.captcha.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-150 ease-in-out"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </button>
          </form>

          {submitStatus === 'error' && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> There was an error submitting your application. Please try again later.</span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ApplyPage;
