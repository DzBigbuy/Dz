const Footer = () => {
    return (
      <footer className="w-full bg-background">
        <div className="container mx-auto flex h-16 items-center justify-center px-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DzBigBuy. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
    