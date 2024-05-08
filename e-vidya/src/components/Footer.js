import "../styles/Footer.css";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="footer">
      <p>&copy;{year} e_vidya</p>
    </div>
  );
};

export default Footer;
