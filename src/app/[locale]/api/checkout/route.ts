// app/[locale]/api/checkout/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface CheckoutBody {
  orderId: string;
  total: number;

  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };

  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();

    const { orderId, total, customer, items } = body;

    if (!customer?.email) {
      return NextResponse.json(
        { success: false, error: "Email requerido" },
        { status: 400 }
      );
    }

    const itemsHtml = items
      .map(
        (item) => `
          <tr>
            <td style="padding:15px 10px; border-bottom:1px solid #1e293b;">
              <div style="color:#64748b; font-size:10px; text-transform:uppercase; font-weight:bold; letter-spacing:1px; margin-bottom:4px;">
                Servicio eléctrico
              </div>
              <div style="color:#ffffff; font-size:14px; font-weight:bold;">
                ${item.name}
                <span style="color:#64748b; font-weight:normal;">x${item.quantity}</span>
              </div>
            </td>
            <td style="padding:15px 10px; border-bottom:1px solid #1e293b; text-align:right; vertical-align:bottom;">
              <div style="color:#facc15; font-family:monospace; font-weight:bold; font-size:14px;">
                MXN ${(item.price * item.quantity).toLocaleString("es-MX", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </td>
          </tr>
        `
      )
      .join("");

    await resend.emails.send({
      from: "ElectroVolt <soporte@sistemasavante.com>",
      to: "soporte@sistemasavante.com",
      subject: `[NUEVO PEDIDO] #${orderId} - Servicios eléctricos`,
      html: `
        <div style="background-color:#020617; padding:40px 10px; font-family:Arial, sans-serif;">
          <table align="center" width="100%" style="max-width:600px; background-color:#0f172a; border:1px solid rgba(250,204,21,0.25); border-radius:16px; border-collapse:separate; overflow:hidden;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:30px; background-color:#111827; border-bottom:1px solid rgba(250,204,21,0.18);">
                <table width="100%">
                  <tr>
                    <td>
                      <div style="color:#facc15; font-size:10px; font-weight:bold; text-transform:uppercase; letter-spacing:3px; margin-bottom:8px;">
                        Notificación de pedido
                      </div>
                      <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:900; text-transform:uppercase;">
                        Nuevo servicio <span style="color:#facc15;">solicitado</span>
                      </h1>
                    </td>
                    <td style="text-align:right;">
                      <div style="display:inline-block; padding:4px 10px; background-color:#facc15; color:#020617; font-size:10px; font-weight:bold; border-radius:4px; font-family:monospace;">
                        ID: ${orderId}
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:30px;">
                <div style="color:#64748b; font-size:11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px; font-weight:bold;">
                  Datos del cliente
                </div>

                <div style="background-color:#020617; border:1px solid #1e293b; padding:20px; border-radius:12px; margin-bottom:30px;">
                  <p style="color:#ffffff; margin:0 0 10px 0; font-size:15px;">
                    <strong>${customer.firstName} ${customer.lastName}</strong>
                  </p>
                  <p style="color:#cbd5e1; margin:0 0 5px 0; font-size:13px;">
                    Email: ${customer.email}
                  </p>
                  <p style="color:#cbd5e1; margin:0 0 5px 0; font-size:13px;">
                    Tel: ${customer.phone}
                  </p>
                  <p style="color:#94a3b8; margin:15px 0 0 0; font-size:12px; font-family:monospace; line-height:1.5;">
                    DIRECCIÓN: ${customer.address}, ${customer.city}, ${customer.state}, ${customer.postalCode}
                  </p>
                </div>

                <div style="color:#64748b; font-size:11px; text-transform:uppercase; letter-spacing:1px; margin-bottom:15px; font-weight:bold;">
                  Servicios solicitados
                </div>

                <table width="100%" cellpadding="0" cellspacing="0">
                  ${itemsHtml}
                  <tr>
                    <td style="padding:20px 10px; text-align:right; color:#94a3b8; font-size:13px;">
                      TOTAL
                    </td>
                    <td style="padding:20px 10px; text-align:right; color:#ffffff; font-size:22px; font-weight:900;">
                      MXN ${total.toLocaleString("es-MX", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:20px; background-color:#020617; text-align:center; border-top:1px solid #1e293b;">
                <div style="color:#475569; font-size:9px; text-transform:uppercase; letter-spacing:2px; font-family:monospace;">
                  Pedido generado desde ElectroVolt - Servicios eléctricos
                </div>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    await resend.emails.send({
      from: "ElectroVolt <soporte@sistemasavante.com>",
      to: customer.email,
      subject: `Confirmación de pedido #${orderId}`,
      html: `
        <div style="background-color:#020617; padding:40px 10px; font-family:Arial, sans-serif;">
          <table align="center" width="100%" style="max-width:600px; background-color:#0f172a; border:1px solid rgba(250,204,21,0.25); border-radius:24px; border-collapse:separate; overflow:hidden;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:40px 30px; text-align:center; background:linear-gradient(to bottom,#111827,#0f172a);">
                <div style="width:50px; height:2px; background-color:#facc15; margin:0 auto 20px auto;"></div>
                <h1 style="color:#ffffff; margin:0; font-size:32px; font-weight:900; text-transform:uppercase; letter-spacing:-1px;">
                  Pedido <span style="color:#facc15;">confirmado</span>
                </h1>
                <p style="color:#94a3b8; font-size:14px; margin-top:10px;">
                  Tu solicitud #${orderId} fue procesada correctamente.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 30px;">
                <div style="padding:25px; background-color:#020617; border:1px solid #1e293b; border-radius:16px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${itemsHtml}
                    <tr>
                      <td style="padding:25px 0 0 0;">
                        <div style="color:#64748b; font-size:10px; text-transform:uppercase; font-weight:bold; letter-spacing:1px;">
                          Estado del pedido
                        </div>
                        <div style="color:#ffffff; font-size:14px; font-weight:bold; margin-top:5px;">
                          Confirmado
                        </div>
                      </td>
                      <td style="padding:25px 0 0 0; text-align:right;">
                        <div style="color:#64748b; font-size:10px; text-transform:uppercase; font-weight:bold; letter-spacing:1px;">
                          Total pagado
                        </div>
                        <div style="color:#facc15; font-size:24px; font-weight:900; margin-top:5px;">
                          MXN ${total.toLocaleString("es-MX", {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:30px;">
                <table width="100%" style="background-color:#111827; border-radius:12px; padding:20px;">
                  <tr>
                    <td>
                      <div style="color:#f97316; font-size:10px; font-weight:bold; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">
                        Datos de contacto y ubicación
                      </div>
                      <p style="color:#cbd5e1; font-size:12px; margin:0; line-height:1.6; font-family:monospace;">
                        ${customer.firstName} ${customer.lastName}<br>
                        ${customer.address}, ${customer.city}<br>
                        ${customer.state}, ${customer.country} CP ${customer.postalCode}
                      </p>
                    </td>
                  </tr>
                </table>

                <div style="margin-top:30px; text-align:center;">
                  <p style="color:#64748b; font-size:12px; line-height:1.5;">
                    Gracias por confiar en <strong style="color:#ffffff;">ElectroVolt</strong>.<br>
                    Nuestro equipo revisará tu solicitud y dará seguimiento al servicio eléctrico solicitado.
                  </p>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:20px; background-color:#111827; text-align:center;">
                <p style="color:#475569; font-size:10px; margin:0; text-transform:uppercase; letter-spacing:1px;">
                  Este es un mensaje automático de confirmación.
                </p>
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Error enviando correos" },
      { status: 500 }
    );
  }
}