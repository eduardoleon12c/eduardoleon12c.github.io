"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCartStore } from "@/lib/cart-store";
import { processOctanoPayment } from "@/lib/payment";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

type CheckoutForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  currency: string;
  cardName: string;
  cardNumber: string;
  cardMonth: string;
  cardYear: string;
  cvv: string;
};

type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>;

export default function CarritoPage() {
  const t = useTranslations("cart");
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [emailSent, setEmailSent] = useState<boolean | null>(null);
  const [formErrors, setFormErrors] = useState<CheckoutErrors>({});
  const locale = useLocale();

  const [form, setForm] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "MX",
    postalCode: "",
    currency: "MXN",
    cardName: "",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cvv: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = useMemo(() => {
    if (!mounted) return 0;
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [mounted, items]);

  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  const money = (value: number) =>
    value.toLocaleString(locale === "en" ? "en-US" : "es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const onlyDigits = (value: string) => value.replace(/\D/g, "");

  const handleChange = (
    field: keyof CheckoutForm,
    value: string,
    maxLength?: number
  ) => {
    const nextValue = maxLength ? value.slice(0, maxLength) : value;
    setForm((prev) => ({ ...prev, [field]: nextValue }));
    if (checkoutError) setCheckoutError("");
  };

  const validateForm = () => {
    const errors: CheckoutErrors = {};

    if (!form.firstName.trim()) errors.firstName = t("errors.firstNameRequired");
    if (!form.lastName.trim()) errors.lastName = t("errors.lastNameRequired");
    if (!form.email.trim()) errors.email = t("errors.emailRequired");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = t("errors.emailInvalid");

    if (!form.phone.trim()) errors.phone = t("errors.phoneRequired");
    if (!/^\d{7,15}$/.test(form.phone)) errors.phone = t("errors.phoneInvalid");

    if (!form.address.trim()) errors.address = t("errors.addressRequired");
    if (!form.city.trim()) errors.city = t("errors.cityRequired");
    if (!form.state.trim()) errors.state = t("errors.stateRequired");
    if (!form.country.trim()) errors.country = t("errors.countryRequired");

    if (!form.postalCode.trim()) errors.postalCode = t("errors.postalCodeRequired");
    if (!/^\d{4,6}$/.test(form.postalCode)) errors.postalCode = t("errors.postalCodeInvalid");

    if (!form.cardName.trim()) errors.cardName = t("errors.cardNameRequired");
    if (!form.cardNumber.trim()) errors.cardNumber = t("errors.cardNumberRequired");
    if (!/^\d{16}$/.test(form.cardNumber)) errors.cardNumber = t("errors.cardNumberInvalid");

    if (!form.cardMonth.trim()) errors.cardMonth = t("errors.cardMonthRequired");
    if (!/^(0[1-9]|1[0-2])$/.test(form.cardMonth)) errors.cardMonth = t("errors.cardMonthInvalid");

    if (!form.cardYear.trim()) errors.cardYear = t("errors.cardYearRequired");
    if (!/^\d{4}$/.test(form.cardYear)) errors.cardYear = t("errors.cardYearInvalid");

    if (!form.cvv.trim()) errors.cvv = t("errors.cvvRequired");
    if (!/^\d{3,4}$/.test(form.cvv)) errors.cvv = t("errors.cvvInvalid");

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isFormReady =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.address.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    form.country.trim() &&
    form.postalCode.trim() &&
    form.cardName.trim() &&
    form.cardNumber.trim() &&
    form.cardMonth.trim() &&
    form.cardYear.trim() &&
    form.cvv.trim() &&
    items.length > 0 &&
    subtotal > 0;

  const handleCheckout = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (items.length === 0) {
      setCheckoutError(t("errors.cartEmpty"));
      return;
    }

    const valid = validateForm();
    if (!valid) return;

    setIsCheckingOut(true);
    setCheckoutError("");
    setEmailSent(null);

    const newOrderId = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)
      .toUpperCase()}`;

    try {
      const paymentResponse = await processOctanoPayment({
        amount: total,
        currency: form.currency,
        orderId: newOrderId,
        ip: "127.0.0.1",
        cardData: {
          number: form.cardNumber,
          name: form.cardName,
          month: form.cardMonth,
          year: form.cardYear,
          cvv: form.cvv,
        },
        customer: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          country: form.country,
          postalCode: form.postalCode,
        },
      });

      try {
        const mailResponse = await fetch(`/${locale ?? "es"}/api/checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: newOrderId,
            customer: {
              firstName: form.firstName,
              lastName: form.lastName,
              email: form.email,
              phone: form.phone,
              address: form.address,
              city: form.city,
              state: form.state,
              country: form.country,
              postalCode: form.postalCode,
            },
            items: items.map((item) => ({
              id: item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              sku: item.sku,
              quantity: item.quantity,
            })),
            subtotal,
            iva,
            total,
            currency: form.currency,
            paymentResponse,
          }),
        });

        setEmailSent(mailResponse.ok);
      } catch {
        setEmailSent(false);
      }

      clearCart();
      setOrderId(newOrderId);
      setCheckoutComplete(true);

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "MX",
        postalCode: "",
        currency: "MXN",
        cardName: "",
        cardNumber: "",
        cardMonth: "",
        cardYear: "",
        cvv: "",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t("errors.transactionError");
      setCheckoutError(message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-slate-950">
        <Header />
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-12 h-12 border-4 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin mx-auto" />
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-yellow-400/30">
      <Header />

      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <Link
              href="/"
              className="group flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 border border-yellow-500/20 text-slate-400 hover:text-yellow-400 hover:border-yellow-400 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <h1 className="text-4xl font-black tracking-tight uppercase">
              {t("header.titlePrefix")}{" "}
              <span className="text-yellow-400">{t("header.titleHighlight")}</span>
              <span className="text-orange-500">.</span>
            </h1>
          </div>

          {checkoutComplete ? (
            <div className="max-w-2xl mx-auto text-center py-20 bg-slate-900/60 border border-emerald-400/20 rounded-3xl backdrop-blur-sm">
              <div className="w-24 h-24 mx-auto mb-6 bg-emerald-400/10 rounded-full flex items-center justify-center border border-emerald-400/50">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-pulse" />
              </div>

              <h2 className="text-3xl font-black mb-4">{t("success.title")}</h2>
              <p className="text-slate-400 mb-2">{t("success.description")}</p>

              <p className="font-mono text-yellow-400 mb-8 bg-slate-950/70 inline-block px-4 py-1 rounded-full border border-yellow-400/20">
                {t("success.orderIdLabel")} {orderId}
              </p>

              {emailSent !== null && (
                <div className="mb-8 mx-12 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm">
                  <p className={emailSent ? "text-emerald-400" : "text-orange-400"}>
                    {emailSent ? t("success.emailSent") : t("success.emailFailed")}
                  </p>
                </div>
              )}

              <Link
                href="/"
                className="inline-flex items-center px-10 py-4 bg-yellow-400 hover:bg-orange-500 text-slate-950 hover:text-white font-black rounded-xl transition-all shadow-[0_0_25px_rgba(250,204,21,0.25)]"
              >
                {t("success.backHome")}
              </Link>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-24 bg-slate-900/40 border border-dashed border-yellow-500/20 rounded-3xl">
              <ShoppingCart className="w-16 h-16 text-yellow-400/40 mx-auto mb-6" />

              <h2 className="text-2xl font-bold text-slate-300 mb-2">
                {t("empty.title")}
              </h2>

              <p className="text-slate-500 mb-8">{t("empty.description")}</p>

              <Link
                href="/planes"
                className="inline-flex items-center px-8 py-3 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-950 font-black rounded-xl transition-all"
              >
                {t("empty.cta")}
              </Link>
            </div>
          ) : (
            <form onSubmit={handleCheckout} className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                {/* LISTA DE PRODUCTOS */}
                <div className="bg-slate-900/60 border border-yellow-500/20 rounded-2xl p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      {t("review.title")}
                    </h2>

                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs uppercase tracking-widest text-slate-500 hover:text-yellow-400 transition-colors"
                    >
                      {t("review.clearAll")}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-slate-950/60 border border-slate-800 hover:border-yellow-400/40 rounded-xl p-5 flex flex-col sm:flex-row gap-6 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white">
                            {item.name}
                          </h3>

                          <p className="text-slate-500 text-sm mt-1">
                            {item.description}
                          </p>

                          <span className="inline-block mt-3 px-2 py-0.5 bg-slate-900 text-[10px] font-mono text-slate-400 rounded border border-slate-800">
                            {t("review.sku")} {item.sku}
                          </span>
                        </div>

                        <div className="flex flex-col sm:items-end justify-between gap-4">
                          <div className="text-right">
                            <p className="text-xl font-black text-yellow-400">
                              <span className="text-xs mr-1">MXN</span>
                              {money(item.price * item.quantity)}
                            </p>
                          </div>

                          <div className="flex items-center gap-4 bg-slate-950 rounded-lg p-1 border border-slate-800">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 rounded-md hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-yellow-400"
                              >
                                <Minus className="w-3 h-3" />
                              </button>

                              <span className="w-8 text-center font-mono font-bold text-yellow-400">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 rounded-md hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-orange-400"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="w-px h-4 bg-slate-800" />

                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-slate-600 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DATOS DEL CLIENTE */}
                <div className="bg-slate-900/60 border border-yellow-500/20 rounded-2xl p-8">
                  <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    {t("shipping.title")}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      ["firstName", t("shipping.firstName")],
                      ["lastName", t("shipping.lastName")],
                      ["phone", t("shipping.phone")],
                      ["postalCode", t("shipping.postalCode")],
                      ["city", t("shipping.city")],
                      ["state", t("shipping.state")],
                    ].map(([field, label]) => (
                      <div key={field} className="space-y-2">
                        <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                          {label}
                        </label>

                        <input
                          type="text"
                          required
                          value={form[field as keyof CheckoutForm]}
                          onChange={(e) =>
                            handleChange(
                              field as keyof CheckoutForm,
                              field === "phone" || field === "postalCode"
                                ? onlyDigits(e.target.value)
                                : e.target.value,
                              field === "phone" ? 15 : field === "postalCode" ? 6 : undefined
                            )
                          }
                          className={`w-full bg-slate-950 border ${
                            formErrors[field as keyof CheckoutForm]
                              ? "border-red-500"
                              : "border-slate-800 focus:border-yellow-400"
                          } rounded-xl px-4 py-3 outline-none transition-all`}
                        />

                        {formErrors[field as keyof CheckoutForm] && (
                          <p className="text-xs text-red-400">
                            {formErrors[field as keyof CheckoutForm]}
                          </p>
                        )}
                      </div>
                    ))}

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                        {t("shipping.email")}
                      </label>

                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={`w-full bg-slate-950 border ${
                          formErrors.email
                            ? "border-red-500"
                            : "border-slate-800 focus:border-yellow-400"
                        } rounded-xl px-4 py-3 outline-none transition-all`}
                      />

                      {formErrors.email && (
                        <p className="text-xs text-red-400">{formErrors.email}</p>
                      )}
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                        {t("shipping.address")}
                      </label>

                      <input
                        type="text"
                        required
                        value={form.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        className={`w-full bg-slate-950 border ${
                          formErrors.address
                            ? "border-red-500"
                            : "border-slate-800 focus:border-yellow-400"
                        } rounded-xl px-4 py-3 outline-none transition-all`}
                      />

                      {formErrors.address && (
                        <p className="text-xs text-red-400">
                          {formErrors.address}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* DATOS DE PAGO */}
                <div className="bg-slate-900/60 border border-yellow-500/20 rounded-2xl p-8">
                  <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-yellow-400" />
                    {t("payment.title")}
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                        {t("payment.cardName")}
                      </label>

                      <input
                        type="text"
                        required
                        value={form.cardName}
                        onChange={(e) => handleChange("cardName", e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-yellow-400 rounded-xl px-4 py-3 outline-none transition-all uppercase tracking-widest"
                      />

                      {formErrors.cardName && (
                        <p className="text-xs text-red-400">
                          {formErrors.cardName}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                        {t("payment.cardNumber")}
                      </label>

                      <input
                        type="text"
                        required
                        maxLength={16}
                        value={form.cardNumber}
                        onChange={(e) =>
                          handleChange("cardNumber", onlyDigits(e.target.value), 16)
                        }
                        className="w-full bg-slate-950 border border-slate-800 focus:border-yellow-400 rounded-xl px-4 py-3 outline-none transition-all font-mono tracking-[0.3em]"
                        placeholder={t("payment.cardNumberPlaceholder")}
                      />

                      {formErrors.cardNumber && (
                        <p className="text-xs text-red-400">
                          {formErrors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                        {t("payment.expiration")}
                      </label>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="MM"
                          maxLength={2}
                          value={form.cardMonth}
                          onChange={(e) =>
                            handleChange("cardMonth", onlyDigits(e.target.value), 2)
                          }
                          className="w-full bg-slate-950 border border-slate-800 focus:border-yellow-400 rounded-xl px-4 py-3 text-center outline-none"
                        />

                        <input
                          type="text"
                          required
                          placeholder="YYYY"
                          maxLength={4}
                          value={form.cardYear}
                          onChange={(e) =>
                            handleChange("cardYear", onlyDigits(e.target.value), 4)
                          }
                          className="w-full bg-slate-950 border border-slate-800 focus:border-yellow-400 rounded-xl px-4 py-3 text-center outline-none"
                        />
                      </div>

                      {formErrors.cardMonth && (
                        <p className="text-xs text-red-400">
                          {formErrors.cardMonth}
                        </p>
                      )}

                      {formErrors.cardYear && (
                        <p className="text-xs text-red-400">
                          {formErrors.cardYear}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                        {t("payment.cvv")}
                      </label>

                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={form.cvv}
                        onChange={(e) =>
                          handleChange("cvv", onlyDigits(e.target.value), 4)
                        }
                        className="w-full bg-slate-950 border border-slate-800 focus:border-yellow-400 rounded-xl px-4 py-3 text-center outline-none font-mono"
                        placeholder="***"
                      />

                      {formErrors.cvv && (
                        <p className="text-xs text-red-400">{formErrors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* RESUMEN */}
              <div className="lg:col-span-1">
                <div className="bg-slate-900 border border-yellow-500/20 rounded-2xl p-8 sticky top-32 shadow-2xl shadow-yellow-400/5">
                  <h2 className="text-xl font-black mb-6 uppercase tracking-tight">
                    {t("summary.titlePrefix")}{" "}
                    <span className="text-yellow-400">
                      {t("summary.titleHighlight")}
                    </span>
                  </h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-slate-400">
                      <span>{t("summary.subtotal")}</span>
                      <span className="font-mono text-white">${money(subtotal)}</span>
                    </div>

                    <div className="flex justify-between text-slate-400">
                      <span>{t("summary.iva")}</span>
                      <span className="font-mono text-white">${money(iva)}</span>
                    </div>

                    <div className="h-px bg-yellow-500/10 my-4" />

                    <div className="flex justify-between items-end">
                      <span className="text-slate-500 uppercase text-xs font-black">
                        {t("summary.totalLabel")}
                      </span>

                      <div className="text-right">
                        <p className="text-3xl font-black text-yellow-400 leading-none">
                          ${money(total)}
                        </p>

                        <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-widest">
                          {form.currency} - {t("summary.secureConnection")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {checkoutError && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex gap-3 items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                      <p className="text-xs text-red-200 leading-relaxed">
                        {checkoutError}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isCheckingOut || !isFormReady}
                    className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                      isCheckingOut || !isFormReady
                        ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                        : "bg-yellow-400 hover:bg-orange-500 text-slate-950 hover:text-white shadow-[0_10px_25px_rgba(250,204,21,0.2)] hover:scale-[1.02]"
                    }`}
                  >
                    {isCheckingOut ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        {t("summary.processing")}
                      </>
                    ) : (
                      <>
                        {t("summary.checkout")}
                        <ShieldCheck className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="mt-6 flex items-center justify-center gap-4 transition-all">
                    <Image src="/visa.png" width={50} height={30} alt="Visa" className="object-contain" />
                    <Image src="/mastercard.png" width={50} height={30} alt="Mastercard" className="object-contain" />
                    <Image src="/octano.png" width={120} height={130} alt="Octano" className="object-contain" />
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}