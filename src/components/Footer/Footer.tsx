function Footer() {
  return (
    <div className="flex flex-col justify-center items-center bg-emerald-300 font-bold px-10 py-5 rounded-lg shadow-lg max-w-md mx-auto">
      <span>Created with care by: Ömer Genç</span>
      <a
        href="https://www.linkedin.com/in/omer-genc/"
        className="text-gray-500"
        target="_blank"
      >
        Linkedin: omer-genc
      </a>
      <a
        href="https://www.github.com/omer-genc/"
        className="text-gray-500"
        target="_blank"
      >
        Github: omer-genc
      </a>
    </div>
  );
}

export default Footer;
