const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="py-2 text-center text-sm">
      &copy; {currentYear} Totti Rdz - All Rights Reserved
    </div>
  );
};

export default Copyright;
