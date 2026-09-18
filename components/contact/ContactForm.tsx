"use client";

import {
  useCallback,
  useEffect,
  useState,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import styled, { css } from "styled-components";
import { Container } from "@/components/Container";
import { WipeUnderline } from "@/components/WipeUnderline";
import {
  contactContent,
  contactLimits,
  footerContacts,
  media,
  motion,
  noMotionTransition,
  recaptcha,
} from "@/lib";

type ContactState = {
  status: "idle" | "success" | "error";
};

const initialState = { status: "idle" } as const satisfies ContactState;

const { formBorderMs, submitMs } = motion.contact;

const FormSection = styled.section`
  padding-top: 0;
`;

const FormFrame = styled.div`
  max-width: var(--content-width);
  margin-right: auto;
  margin-left: auto;
`;

function FormRoot({
  children,
  className,
  onSubmit,
}: {
  children: ReactNode;
  className?: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

const Form = styled(FormRoot)`
  margin: 0;
`;

const Field = styled.div`
  position: relative;
`;

const Label = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const fieldStyles = css`
  display: block;
  width: 100%;
  height: auto;
  margin: 0 0 30px;
  padding: 8px 10px;
  border: 0;
  border-bottom: 4px solid var(--color-muted);
  border-radius: 0;
  background-color: transparent;
  color: var(--color-black);
  font-family: inherit;
  font-size: 60px;
  font-weight: 600;
  line-height: 1.2;
  appearance: none;
  transition: border-color ${formBorderMs}ms ease;

  &:focus {
    border-bottom-color: var(--color-black);
    outline: none;
  }

  &::placeholder {
    color: var(--color-muted);
  }

  ${media.down("tablet")} {
    font-size: 40px;
    font-weight: 500;
  }

  ${media.down("phone")} {
    font-size: 30px;
  }

  ${noMotionTransition}
`;

const Input = styled.input`
  ${fieldStyles}
`;

const Textarea = styled.textarea`
  ${fieldStyles}
  min-height: 1.2em;
  resize: vertical;
`;

const Actions = styled.div`
  text-align: right;

  ${media.down("tablet")} {
    text-align: left;
  }
`;

const Submit = styled.button`
  display: inline-block;
  margin: 0;
  padding: 9px 15px;
  border: 0;
  border-bottom: 10px solid var(--color-black);
  border-radius: 3%;
  background-color: transparent;
  color: var(--color-black);
  font-family: inherit;
  font-size: 100px;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;
  cursor: pointer;
  appearance: none;
  transition:
    color ${submitMs}ms ease,
    background-color ${submitMs}ms ease;

  &:hover,
  &:focus-visible {
    background-color: var(--color-black);
    color: var(--color-white);
    outline: none;
  }

  &:disabled {
    cursor: wait;
  }

  ${media.down("desktop")} {
    padding-right: 30px;
    padding-left: 30px;
  }

  ${media.down("tablet")} {
    padding-top: 13px;
    border-bottom-width: 6px;
    font-size: 60px;
  }

  ${media.down("phone")} {
    padding: 10px 15px 7px;
    border-bottom-width: 5px;
    font-size: 40px;
  }

  ${noMotionTransition}
`;

const Success = styled.div`
  padding: 15px 20px;
  border-radius: 3px;
  background-color: var(--color-black);
  color: var(--color-white);
  font-size: 20px;
`;

const ErrorBox = styled.div`
  margin-bottom: 30px;
  border-radius: 3px;
  font-size: 20px;
`;

const EmailLink = styled(WipeUnderline)`
  display: inline-block;
`;

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
const recaptchaSrc = siteKey
  ? `https://www.google.com/recaptcha/api.js?render=${siteKey}`
  : "";

type Grecaptcha = {
  ready: (callback: () => void) => void;
  execute: (key: string, options: { action: string }) => PromiseLike<string>;
};

function getGrecaptcha(): Grecaptcha | undefined {
  return (window as Window & { grecaptcha?: Grecaptcha }).grecaptcha;
}

function loadRecaptchaScript() {
  if (!recaptchaSrc || document.querySelector(`script[src="${recaptchaSrc}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.src = recaptchaSrc;
  script.async = true;
  document.body.appendChild(script);
}

function executeRecaptcha(): Promise<string> {
  const client = getGrecaptcha();
  if (!client || !siteKey) {
    return Promise.reject(new Error("recaptcha"));
  }

  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      reject(new Error("recaptcha-timeout"));
    }, recaptcha.timeoutMs);

    const finish = (callback: () => void) => {
      window.clearTimeout(timer);
      callback();
    };

    client.ready(() => {
      try {
        const tokenPromise = Promise.resolve(
          client.execute(siteKey, { action: recaptcha.action }),
        );
        tokenPromise.then(
          (token) => finish(() => resolve(token)),
          (error: unknown) => finish(() => reject(error)),
        );
      } catch (error) {
        finish(() => reject(error));
      }
    });
  });
}

function isSuccessResult(value: unknown): boolean {
  return (
    typeof value === "object" &&
    value !== null &&
    "status" in value &&
    value.status === "success"
  );
}

export function ContactForm() {
  const [state, setState] = useState<ContactState>(initialState);
  const [pending, setPending] = useState(false);
  const { email } = footerContacts;
  const busy = pending;

  useEffect(() => {
    loadRecaptchaScript();
  }, []);

  const submitForm = useCallback(
    async (form: HTMLFormElement) => {
      if (busy || !form.reportValidity()) {
        return;
      }

      const formData = new FormData(form);
      setPending(true);

      let recaptchaToken = "";
      try {
        recaptchaToken = await executeRecaptcha();
      } catch {
        // Server rejects a missing or invalid token.
      }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            company: formData.get("company"),
            message: formData.get("message"),
            recaptchaToken,
          }),
        });
        const result: unknown = await response.json();
        setState({
          status: response.ok && isSuccessResult(result) ? "success" : "error",
        });
      } catch {
        setState({ status: "error" });
      } finally {
        setPending(false);
      }
    },
    [busy],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    submitForm(event.currentTarget);
  };

  const handleSendClick = (event: MouseEvent<HTMLButtonElement>) => {
    const { form } = event.currentTarget;
    if (form) {
      submitForm(form);
    }
  };

  if (state.status === "success") {
    return (
      <FormSection>
        <Container>
          <FormFrame>
            <Success role="status">
              {contactContent.successTitle}
              <br />
              {contactContent.successBody}
            </Success>
          </FormFrame>
        </Container>
      </FormSection>
    );
  }

  return (
    <FormSection id="contact-form">
      <Container>
        <FormFrame>
          {state.status === "error" ? (
            <ErrorBox role="alert">
              {contactContent.errorLead}{" "}
              <EmailLink href={email.href}>{email.label}</EmailLink>
            </ErrorBox>
          ) : null}

          <Form onSubmit={handleSubmit}>
            {contactContent.fields.map((field) => (
              <Field key={field.name}>
                <Label htmlFor={field.name}>{field.placeholder}</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  required={field.required}
                  maxLength={contactLimits.fieldMax}
                />
              </Field>
            ))}

            <Field>
              <Label htmlFor={contactContent.message.name}>
                {contactContent.message.placeholder}
              </Label>
              <Textarea
                id={contactContent.message.name}
                name={contactContent.message.name}
                placeholder={contactContent.message.placeholder}
                required={contactContent.message.required}
                minLength={contactLimits.messageMin}
                maxLength={contactLimits.messageMax}
                rows={2}
              />
            </Field>

            <Actions>
              <Submit type="button" disabled={busy} onClick={handleSendClick}>
                {busy ? contactContent.pending : contactContent.submit}
              </Submit>
            </Actions>
          </Form>
        </FormFrame>
      </Container>
    </FormSection>
  );
}
