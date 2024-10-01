import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import Layout from '../components/Layout';

export async function getServerSideProps() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'bibliography_updated.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(jsonData);

    // Sort publications by year in descending order
    const sortedPublications = data.sort((a, b) => b.year - a.year);

    // Group publications by year
    const groupedByYear = sortedPublications.reduce((acc, pub) => {
      const year = pub.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(pub);
      return acc;
    }, {});

    return {
      props: {
        publications: groupedByYear,
      },
    };
  } catch (error) {
    console.error('Error loading publications:', error);
    return {
      props: {
        publications: {},
      },
    };
  }
}

const formatAuthorName = (author) => {
  const parts = author.split(', ');
  if (parts.length === 2) {
    const lastName = parts[0];
    const firstName = parts[1];
    return `${lastName}, ${firstName.charAt(0)}.`;
  }
  return author; // Return as is if not in "LastName, FirstName" format
};

const formatAuthors = (authors, boldAuthors) => {
  return authors.map((author, index) => {
    const formattedName = formatAuthorName(author);
    const isBold = boldAuthors.includes(index);
    return (
      <span key={index}>
        {isBold ? <strong>{formattedName}</strong> : formattedName}
        {index < authors.length - 1 ? ', ' : ''}
      </span>
    );
  });
};

const Publications = ({ publications }) => {
  return (
    <Layout>
    <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Publications</h2>
      {Object.entries(publications).sort(
        // reverse
        ([year1], [year2]) => year2 - year1
      )
      .map(([year, pubs]) => (
        <div key={year} className="mb-8">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">{year}</h3>
          <ul className="space-y-4">
            {pubs.map((pub, index) => (
              <li key={index} className="border-b pb-4">
                <h4 className="font-semibold text-lg">{pub.title}</h4>
                <p className="text-gray-600">{formatAuthors(pub.authors, pub.boldAuthors)}</p>
                <p className="text-gray-500">
                  {pub.journal}
                  {pub.volume && `, ${pub.volume}`}
                  {pub.pages && `:${pub.pages}`}
                </p>
                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    DOI: {pub.doi}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </Layout>
  );
};

export default Publications;