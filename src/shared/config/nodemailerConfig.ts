import * as nodemailer from 'nodemailer';

export async function nodemailerConfig() {
  const testAccount = await nodemailer.createTestAccount();

  return {
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: 'serhiirmn@gmail.com',
      pass: 'reparol14'
    }
  };
}

