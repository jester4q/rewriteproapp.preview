import { ReactElement, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./rewriteHistorySlider.css";

const data = [
  {
    id: 0,
    text: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
  },
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
  },
  {
    id: 3,
    text: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
  },
  {
    id: 4,
    text: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
  },
  {
    id: 4,
    text: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
  },
];

type RewriterHistoryItemProps = {
  id: number;
  text: string;
};

const sliderItemStyles = {
  container: {
    padding: "19px 21px 15px",
    maxWidth: "193px",
    width: "100%",
    border: "2px solid #023169",
    borderRadius: "20px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
};

type ArrowProps = {
  className: string;
  style: Record<string, never>;
  onClick: () => any;
};

const ArrowPrev: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        left: "-58px",
        backgroundColor: "transparent",
        width: "34px",
        height: "16px",
        transform: "rotate(180deg) translate(0, 50%)",
      }}
      onClick={onClick}
    >
      <svg
        width="34"
        height="16"
        viewBox="0 0 34 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 6.78369C0.447715 6.78369 4.58063e-08 7.23141 0 7.78369C-4.58063e-08 8.33598 0.447715 8.78369 1 8.78369L1 6.78369ZM33.7071 8.4908C34.0976 8.10028 34.0976 7.46711 33.7071 7.07659L27.3431 0.712626C26.9526 0.322102 26.3195 0.322102 25.9289 0.712626C25.5384 1.10315 25.5384 1.73632 25.9289 2.12684L31.5858 7.78369L25.9289 13.4405C25.5384 13.8311 25.5384 14.4642 25.9289 14.8548C26.3195 15.2453 26.9526 15.2453 27.3431 14.8548L33.7071 8.4908ZM1 8.78369L33 8.78369L33 6.78369L1 6.78369L1 8.78369Z"
          fill="#022754"
        />
      </svg>
    </div>
  );
};

const ArrowNext: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        right: "-24px",
        backgroundColor: "transparent",
        width: "34px",
        height: "16px",
      }}
      onClick={onClick}
    >
      <svg
        width="34"
        height="16"
        viewBox="0 0 34 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 6.78369C0.447715 6.78369 4.58063e-08 7.23141 0 7.78369C-4.58063e-08 8.33598 0.447715 8.78369 1 8.78369L1 6.78369ZM33.7071 8.4908C34.0976 8.10028 34.0976 7.46711 33.7071 7.07659L27.3431 0.712626C26.9526 0.322102 26.3195 0.322102 25.9289 0.712626C25.5384 1.10315 25.5384 1.73632 25.9289 2.12684L31.5858 7.78369L25.9289 13.4405C25.5384 13.8311 25.5384 14.4642 25.9289 14.8548C26.3195 15.2453 26.9526 15.2453 27.3431 14.8548L33.7071 8.4908ZM1 8.78369L33 8.78369L33 6.78369L1 6.78369L1 8.78369Z"
          fill="#022754"
        />
      </svg>
    </div>
  );
};

const RewriterHistoryItem: React.FC<RewriterHistoryItemProps> = ({ text }) => {
  return <Box sx={sliderItemStyles.container}>{text}</Box>;
};

const styles = {
  container: {
    pb: "61px",
  },
  title: {
    mb: "20px",
    color: "secondary.main",
  },
};

const RewriterHistory = (): ReactElement => {
  const [history, setHistory] = useState(data);

  useEffect(() => {
    fetch("https://d24xz2s6bw9t0g.cloudfront.net/api/account/testHistory")
      .then((response) => response.json())
      .then((json) => {
        setHistory(json);
      });
  });

  const sliderSettings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    prevArrow: <ArrowPrev />,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nextArrow: <ArrowNext />,
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title} variant="subtitle1">
        Предыдущие запросы
      </Typography>

      <Slider {...sliderSettings}>
        {history.map((item) => (
          <RewriterHistoryItem text={item.text} id={item.id} key={item.id} />
        ))}
      </Slider>
    </Box>
  );
};

export default RewriterHistory;
