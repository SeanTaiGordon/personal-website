import { contactLimits } from "@/lib/contactContent";
import { recaptcha } from "@/lib/recaptcha";
import { contactEmail } from "@/lib/siteNav";

type ContactResult = {
  status: "success" | "error";
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("\r\n", "\n")
    .replaceAll("\n", "<br/>");
}

function isRecaptchaSuccess(value: unknown): boolean {
  if (!value || typeof value !== "object") {
    return false;
  }

  const data = value as {
    success?: unknown;
    action?: unknown;
    score?: unknown;
  };

  return (
    data.success === true &&
    data.action === recaptcha.action &&
    typeof data.score === "number" &&
    data.score >= recaptcha.minScore
  );
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret || !token) {
    return false;
  }

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    },
  );

  if (!response.ok) {
    return false;
  }

  return isRecaptchaSuccess(await response.json());
}

function isValidSubmission(
  name: string,
  email: string,
  company: string,
  message: string,
) {
  if (!name || name.length > contactLimits.fieldMax) {
    return false;
  }

  if (!EMAIL_PATTERN.test(email) || email.length > contactLimits.fieldMax) {
    return false;
  }

  if (company.length > contactLimits.fieldMax) {
    return false;
  }

  return (
    message.length >= contactLimits.messageMin &&
    message.length <= contactLimits.messageMax
  );
}

function jsonResult(status: ContactResult["status"], httpStatus = 200) {
  return Response.json({ status } satisfies ContactResult, {
    status: httpStatus,
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResult("error", 400);
  }

  const payload =
    body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const name = readString(payload.name);
  const email = readString(payload.email);
  const company = readString(payload.company);
  const message = readString(payload.message);
  const token = readString(payload.recaptchaToken);

  if (!isValidSubmission(name, email, company, message)) {
    return jsonResult("error");
  }

  if (!(await verifyRecaptcha(token))) {
    return jsonResult("error");
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return jsonResult("error");
  }
  const html = [
    "Form submission on seangordon.co.uk.",
    `Name: ${escapeHtml(name)}`,
    `Email: ${escapeHtml(email)}`,
    `Company: ${escapeHtml(company)}`,
    `Message: ${escapeHtml(message)}`,
  ].join("<br/>");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [contactEmail],
        reply_to: email,
        subject: "Form Submission",
        html,
      }),
    });

    if (!response.ok) {
      return jsonResult("error");
    }
  } catch {
    return jsonResult("error");
  }

  return jsonResult("success");
}
