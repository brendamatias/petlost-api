import Mail from '../../lib/Mail';

class ForgotPasswordMail {
  get key() {
    return 'ForgotPasswordMail';
  }

  async handle({ data }) {
    const { name, email, redirect_url, token } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Recuperação de senha',
      template: 'forgot_password',
      context: {
        user: name,
        link: `${redirect_url}?token=${token}`,
      },
    });
  }
}

export default new ForgotPasswordMail();
