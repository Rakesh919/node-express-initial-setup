import { logger } from '@src/logger';
import nodemailer, { Transporter } from 'nodemailer';

export class EmailUtil {
  private transporter: Transporter;
  private toEmail: string;

  constructor() {
    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;
    this.toEmail = process.env.TO_EMAIL || '';

    if (!smtpEmail || !smtpPassword || !this.toEmail) {
      throw new Error('Missing required environment variables.');
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
    });
  }

  async sendContactEmail(senderEmail: string, senderName: string, message: string): Promise<void> {
    const mailOptions = {
      from: senderEmail,
      to: this.toEmail,
      subject: `New message from ${senderName}`,
      text: `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${senderName}</p>
        <p><strong>Email:</strong> ${senderEmail}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      logger.info("Email send successfully")
    } catch (error) {
      logger.error('Failed to send email:', error);
      throw error;
    }
  }
}
