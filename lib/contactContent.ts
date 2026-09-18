export const contactLimits = {
  fieldMax: 256,
  messageMin: 2,
  messageMax: 5000,
} as const;

export const contactContent = {
  heading: "Contact me, I'd love to get in touch!",
  submit: "Send",
  pending: "Please wait...",
  successTitle: "Thank you!",
  successBody: "Your submission has been received!",
  errorLead:
    "Oops! Something went wrong while submitting the form. Try emailing me",
  fields: [
    {
      name: "name",
      type: "text",
      placeholder: "Your Name",
      autoComplete: "name",
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      autoComplete: "email",
      required: true,
    },
    {
      name: "company",
      type: "text",
      placeholder: "Company",
      autoComplete: "organization",
      required: false,
    },
  ],
  message: {
    name: "message",
    placeholder: "Message",
    required: true,
  },
} as const;
