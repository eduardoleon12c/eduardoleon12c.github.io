import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { nombre, email, telefono, mensaje, asunto } = body;

    if (!nombre || !email || !mensaje || !asunto) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const ticketId = Math.random().toString(16).toUpperCase().slice(2, 8);

    const adminHTML = `
    <div style="background-color:#020617; padding:40px 10px; font-family:Arial, sans-serif;">
      <table align="center" width="100%" style="max-width:600px; background-color:#0f172a; border:1px solid rgba(250,204,21,0.35); border-collapse:separate; border-radius:12px; overflow:hidden;" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:25px; background-color:#111827; border-bottom:1px solid rgba(250,204,21,0.15);">
            <div style="color:#facc15; font-size:10px; font-weight:bold; text-transform:uppercase; letter-spacing:3px; margin-bottom:5px;">
              Nueva solicitud de contacto
            </div>
            <h1 style="color:#ffffff; margin:0; font-size:20px; font-weight:900; text-transform:uppercase;">
              Servicio eléctrico <span style="color:#facc15;">solicitado</span>
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding:30px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:25px;">
              <tr>
                <td style="padding:10px 0; border-bottom:1px solid #1e293b;">
                  <div style="color:#64748b; font-size:9px; text-transform:uppercase; letter-spacing:1px;">
                    Cliente
                  </div>
                  <div style="color:#ffffff; font-size:14px; font-weight:bold; margin-top:4px;">
                    ${nombre}
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding:10px 0; border-bottom:1px solid #1e293b;">
                  <div style="color:#64748b; font-size:9px; text-transform:uppercase; letter-spacing:1px;">
                    Correo
                  </div>
                  <div style="color:#ffffff; font-size:14px; font-weight:bold; margin-top:4px;">
                    ${email}
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding:10px 0; border-bottom:1px solid #1e293b;">
                  <div style="color:#64748b; font-size:9px; text-transform:uppercase; letter-spacing:1px;">
                    Teléfono
                  </div>
                  <div style="color:#ffffff; font-size:14px; font-weight:bold; margin-top:4px;">
                    ${telefono || "N/A"}
                  </div>
                </td>
              </tr>
            </table>

            <div style="background-color:#020617; border:1px solid #1e293b; padding:15px; border-radius:8px; margin-bottom:20px;">
              <div style="color:#facc15; font-size:9px; text-transform:uppercase; font-weight:bold; margin-bottom:8px;">
                Asunto
              </div>
              <div style="color:#ffffff; font-size:14px; font-family:monospace;">
                ${asunto}
              </div>
            </div>

            <div style="background-color:#020617; border:1px solid #1e293b; padding:20px; border-radius:8px;">
              <div style="color:#64748b; font-size:9px; text-transform:uppercase; font-weight:bold; margin-bottom:10px;">
                Detalle del mensaje
              </div>
              <div style="color:#cbd5e1; font-size:14px; line-height:1.6; font-family:monospace;">
                ${mensaje}
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:15px; background-color:#111827; text-align:center;">
            <div style="color:#475569; font-size:9px; font-family:monospace; text-transform:uppercase;">
              Ticket_ID: ${ticketId} · ElectroVolt
            </div>
          </td>
        </tr>
      </table>
    </div>
    `;

    await resend.emails.send({
      from: "ElectroVolt <soporte@sistemasavante.com>",
      to: ["soporte@sistemasavante.com"],
      subject: `[CONTACTO] ${asunto} - ${nombre}`,
      html: adminHTML,
    });

    const customerHTML = `
    <div style="background-color:#020617; padding:40px 10px; font-family:Arial, sans-serif;">
      <table align="center" width="100%" style="max-width:600px; background-color:#0f172a; border:1px solid rgba(250,204,21,0.25); border-radius:24px; border-collapse:separate; overflow:hidden;" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:40px 30px; text-align:center; background:linear-gradient(to bottom,#111827,#0f172a);">
            <div style="width:40px; height:2px; background-color:#facc15; margin:0 auto 20px auto;"></div>
            <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:900; text-transform:uppercase; letter-spacing:-0.5px;">
              Mensaje <span style="color:#facc15;">recibido</span>
            </h1>
            <p style="color:#94a3b8; font-size:13px; margin-top:10px;">
              Hemos recibido tu solicitud de servicio eléctrico correctamente.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:0 30px 30px 30px;">
            <p style="color:#cbd5e1; font-size:14px; line-height:1.6;">
              Hola <strong style="color:#ffffff;">${nombre}</strong>, gracias por contactarnos. 
              Nuestro equipo revisará tu solicitud y se pondrá en contacto contigo a la brevedad.
            </p>

            <div style="margin:25px 0; padding:20px; background-color:#020617; border:1px solid #1e293b; border-radius:12px;">
              <div style="color:#facc15; font-size:9px; font-weight:bold; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">
                Referencia de consulta
              </div>
              <div style="color:#ffffff; font-size:14px; font-weight:bold; margin-bottom:4px;">
                ${asunto}
              </div>
              <div style="color:#64748b; font-size:12px; font-style:italic; border-top:1px solid #1e293b; padding-top:10px; margin-top:10px;">
                "${mensaje.substring(0, 100)}${mensaje.length > 100 ? "..." : ""}"
              </div>
            </div>

            <p style="color:#64748b; font-size:12px; text-align:center;">
              Si necesitas agregar más información, puedes responder directamente a este correo.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding:20px; background-color:#111827; text-align:center; border-top:1px solid #1e293b;">
            <p style="color:#475569; font-size:10px; margin:0; text-transform:uppercase; letter-spacing:1px;">
              Equipo de atención — ElectroVolt Servicios Eléctricos
            </p>
          </td>
        </tr>
      </table>
    </div>
    `;

    await resend.emails.send({
      from: "ElectroVolt <soporte@sistemasavante.com>",
      to: [email],
      subject: "Hemos recibido tu solicitud — ElectroVolt",
      html: customerHTML,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error contacto:", error);

    return NextResponse.json(
      { error: "Error interno al enviar el mensaje" },
      { status: 500 }
    );
  }
}