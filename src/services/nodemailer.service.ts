import * as nodemailer from 'nodemailer';

import { nodemailerConfig } from '../shared/config/nodemailerConfig';

class NodemailerService {
  private config: any;
  private transporter: any;

  constructor() {
    this.init().catch((e) => console.log(e.message));
  }

  async init() {
    this.config = await nodemailerConfig();
    this.transporter = nodemailer.createTransport(this.config);
  }

  async sendMail(p: {
    subject: string;
    from: string;
    html: string;
    to: string;
    text: string;
  }) {
    try {
      await this.transporter.sendMail({
        from: p.from,
        to: p.to,
        subject: p.subject,
        text: p.text,
        html: p.html,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export const nodemailerService = new NodemailerService();
