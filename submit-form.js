// pages/api/submit-form.js
import { IncomingForm } from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ message: 'Error parsing form data' });
    }

    // TODO: Implement CAPTCHA verification here

    const { name, institution, github, message } = fields;
    const cvFile = files.cv && files.cv[0];  // Note: files.cv might be an array

    if (!cvFile || !cvFile.filepath) {
      console.error('CV file not found or invalid');
      return res.status(400).json({ message: 'CV file is required' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    try {
      // Read the file content
      const fileContent = await fs.readFile(cvFile.filepath);

      // Send email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: 'New Sanderson Lab Application Submission',
        text: `Name: ${name}\nInstitution: ${institution}\nGitHub: ${github}\nMessage: ${message}`,
        attachments: [
          {
            filename: cvFile.originalFilename,
            content: fileContent,
          },
        ],
      });

      // Delete the temporary file
      await fs.unlink(cvFile.filepath);

      res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
      console.error('Error processing submission:', error);
      res.status(500).json({ message: 'Error submitting application', error: error.message });
    }
  });
}