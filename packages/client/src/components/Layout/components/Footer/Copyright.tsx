const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="py-1 text-center text-sm sm:py-2">
      &copy; {currentYear} Totti Rdz - All Rights Reserved
    </div>
  );
};

export default Copyright;
