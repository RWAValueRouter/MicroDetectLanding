import { NextResponse } from "next/server";

const toEmail = "luoxi23vr@gmail.com";

type ContactPayload = {
  name?: string;
  company?: string;
  contact?: string;
  scene?: string;
  message?: string;
};

function buildEmailText(payload: Required<ContactPayload>) {
  return [
    "官网咨询需求",
    "",
    `姓名：${payload.name}`,
    `公司/单位：${payload.company}`,
    `联系方式：${payload.contact}`,
    `关注场景：${payload.scene}`,
    "",
    "项目需求：",
    payload.message || "未填写",
    "",
    "来源：重庆析微探物科技有限公司官网 Landing Page"
  ].join("\n");
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;
  const name = payload.name?.trim() || "";
  const company = payload.company?.trim() || "";
  const contact = payload.contact?.trim() || "";
  const scene = payload.scene?.trim() || "未填写";
  const message = payload.message?.trim() || "";

  if (!name || !company || !contact) {
    return NextResponse.json({ ok: false, message: "请填写姓名、公司/单位和联系方式。" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return NextResponse.json(
      {
        ok: false,
        fallback: true,
        message: "邮件服务未配置，已切换为邮件客户端发送。"
      },
      { status: 503 }
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: contact.includes("@") ? contact : undefined,
      subject: `析微探物官网咨询 - ${company}`,
      text: buildEmailText({ name, company, contact, scene, message })
    })
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "邮件服务发送失败，请检查 RESEND_API_KEY 和 CONTACT_FROM_EMAIL 配置。"
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
