import "./paymentForm.css";

import { Button, Grid, Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React, { ReactElement, useEffect, useState } from "react";
import { PriceFormInput } from "./PriceFormInput";
import { NameFormInput } from "./NameFormInput";
import { DescriptionFormInput } from "./DescriptionFormInput";
import { EmailFormInput } from "./EmailFormInput";
import { PhoneFormInput } from "./PhoneFormInput";
import { useSubscriptionStore } from "stores/useSubscriptionStore";
import { useUserStore } from "stores/useUserStore";
import { Order } from "stores/SubscriptionStore";

const styles = {
  title: {
    color: "secondary.main",
    fontFamily: "Actay Wide",
    fontSize: "40px",
    width: 300,
    pb: "15px",
  },
  titleLink: {
    display: "inline-block",
    fontSize: "22px",
  },
  subtitle: {
    mb: "41px",
    fontSize: "22px",
    fontWeight: 700,
    fontFamily: "Evolventa",
    color: "primary.main",
  },
  link: {
    color: "secondary.main",
    textDecoration: "none",
    fontSize: "22px",
  },
  content: {
    maxWidth: "533px",
  },
  input: {
    mt: "20px",
  },
  button: {
    mt: 5,
    pl: "20px",
    pr: "20px",
    height: "55px",
    width: "100%",
    color: "primary.light",
    backgroundColor: "secondary.main",
    fontSize: "18px",
    textTransform: "none",
  },
};

type FormError = {
  name: string;
  email: string;
  phone: string;
};

const PaymentForm = ({ tariffId }: { tariffId: string }): ReactElement => {
  const ssStore = useSubscriptionStore();
  const userStore = useUserStore();
  const tariff = ssStore.getTariff(tariffId);
  const [order, setOrder] = useState<Order>();
  const [name, setName] = useState<string>(userStore.userName());
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<FormError>({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchOrder = async () => {
      setOrder(undefined);
      if (tariffId) {
        const res = await ssStore.getOrder(tariffId);
        setOrder(res);
      }
    };
    fetchOrder().catch(console.error);
  }, [tariffId]);

  const onChangeName = (v: string) => {
    let e = "";
    if (!v) {
      e = "Введите ваше ФИО";
    }
    setError({ ...error, name: e });
    setName(v);
  };

  const onChangeEmail = (v: string) => {
    let e = "";
    if (!v && !phone) {
      e = "Введите ваш e-mail";
    }
    setError({ ...error, email: e });
    setEmail(v);
  };

  const onChangePhone = (v: string) => {
    let e = "";
    if (!v && !email) {
      e = "Введите ваш номер телефона";
    }
    setError({ ...error, phone: e });
    setPhone(v);
  };

  const hasError = () =>
    !order ||
    Object.keys(error).some((e) => error[e].length > 0) ||
    !(email || phone) ||
    !name;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (hasError()) {
      return;
    }

    const TPF: HTMLFormElement = event.target as HTMLFormElement;
    const receipt = TPF.receipt.value;
    if (receipt) {
      TPF.receipt.value = JSON.stringify({
        EmailCompany: "rewritepro@yandex.ru",
        Taxation: "patent",
        Items: [
          {
            Name: TPF.description.value,
            Price: TPF.amount.value + "00",
            Quantity: 1.0,
            Amount: TPF.amount.value + "00",
            PaymentMethod: "full_prepayment",
            PaymentObject: "service",
            Tax: "none",
          },
        ],
      });
    }
    //@ts-ignore
    pay(TPF);
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography sx={styles.title}>Оплата</Typography>
        <Box sx={styles.subtitle}>
          <Link component={RouterLink} to="/account" sx={styles.link}>
            Назад
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <form noValidate autoComplete="off" onSubmit={submit}>
          <input
            type="hidden"
            name="terminalkey"
            value={process.env.REACT_APP_TINKOFF_TERMINAL}
          />
          <input type="hidden" name="frame" value="false" />
          <input type="hidden" name="language" value="ru" />
          <input type="hidden" name="receipt" value="true" />
          <input type="hidden" name="order" value={(order && order.id) || ""} />
          <Box sx={styles.content} className="paymantform">
            <PriceFormInput
              id="pf-amount"
              label="Сумма заказа"
              value={(order && String(order.amount)) || "0"}
              name="amount"
              sx={styles.input}
            />
            <DescriptionFormInput
              id="pf-description"
              label="Описание заказа"
              value={(tariff && tariff.name) || ""}
              name="description"
              sx={styles.input}
            />
            <NameFormInput
              id="pf-name"
              label="ФИО плательщика"
              name="name"
              value={name}
              onChange={onChangeName}
              error={error.name}
              sx={styles.input}
            />
            <EmailFormInput
              id="pf-email"
              label="E-mail"
              value={email}
              onChange={onChangeEmail}
              error={error.email}
              name="email"
              sx={styles.input}
            />
            <PhoneFormInput
              id="pf-email"
              label="Контактный телефон"
              value={phone}
              onChange={onChangePhone}
              error={error.phone}
              name="phone"
              sx={styles.input}
            />
            <Button sx={styles.button} disabled={hasError()} type="submit">
              Продолжить
            </Button>
          </Box>
        </form>
      </Grid>
    </>
  );
};

export default PaymentForm;
